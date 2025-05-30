import { prisma } from '@/lib/prisma';
import { Event, EventStatus } from '@prisma/client';
import { S1202BatchProcessor } from '../S1202BatchProcessor';
import { S1202Processor } from '../../processors/S1202Processor';
import { logger } from '@/lib/logger';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    event: {
      findMany: jest.fn(),
      update: jest.fn()
    }
  }
}));

jest.mock('../../processors/S1202Processor');
jest.mock('@/lib/logger');

describe('S1202BatchProcessor', () => {
  let processor: S1202BatchProcessor;
  let mockEvents: Event[];

  beforeEach(() => {
    jest.clearAllMocks();
    processor = new S1202BatchProcessor({
      batchSize: 2,
      maxRetries: 2,
      retryDelay: 100
    });

    mockEvents = [
      {
        id: '1',
        type: 'S_1202',
        status: 'PENDING',
        data: {},
        retryCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        type: 'S_1202',
        status: 'PENDING',
        data: {},
        retryCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  });

  it('deve processar eventos pendentes com sucesso', async () => {
    // Mock da busca de eventos
    (prisma.event.findMany as jest.Mock).mockResolvedValue(mockEvents);

    // Mock do processador
    const mockProcess = jest.fn().mockResolvedValue(undefined);
    (S1202Processor as jest.Mock).mockImplementation(() => ({
      process: mockProcess
    }));

    // Executar processamento
    await processor.process();

    // Verificar se os eventos foram processados
    expect(prisma.event.findMany).toHaveBeenCalledWith({
      where: {
        type: 'S_1202',
        status: 'PENDING',
        OR: [
          { retryCount: { lt: 2 } },
          { retryCount: null }
        ]
      },
      orderBy: {
        createdAt: 'asc'
      },
      take: 2
    });

    expect(mockProcess).toHaveBeenCalledTimes(2);
    expect(logger.info).toHaveBeenCalledWith('Processamento em lote concluído com sucesso');
  });

  it('deve lidar com erro no processamento e tentar novamente', async () => {
    // Mock da busca de eventos
    (prisma.event.findMany as jest.Mock).mockResolvedValue([mockEvents[0]]);

    // Mock do processador com erro na primeira tentativa
    const mockProcess = jest.fn()
      .mockRejectedValueOnce(new Error('Erro temporário'))
      .mockResolvedValueOnce(undefined);
    (S1202Processor as jest.Mock).mockImplementation(() => ({
      process: mockProcess
    }));

    // Executar processamento
    await processor.process();

    // Verificar se houve retry
    expect(mockProcess).toHaveBeenCalledTimes(2);
    expect(prisma.event.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { retryCount: 1 }
    });
  });

  it('deve marcar evento como erro após exceder número máximo de tentativas', async () => {
    // Mock da busca de eventos
    (prisma.event.findMany as jest.Mock).mockResolvedValue([mockEvents[0]]);

    // Mock do processador com erro persistente
    const mockProcess = jest.fn().mockRejectedValue(new Error('Erro persistente'));
    (S1202Processor as jest.Mock).mockImplementation(() => ({
      process: mockProcess
    }));

    // Executar processamento
    await processor.process();

    // Verificar se o evento foi marcado como erro
    expect(prisma.event.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: {
        status: 'ERROR',
        error: 'Erro persistente'
      }
    });
  });

  it('deve lidar com erro no processamento em lote', async () => {
    // Mock da busca de eventos com erro
    (prisma.event.findMany as jest.Mock).mockRejectedValue(new Error('Erro no banco'));

    // Executar processamento
    await expect(processor.process()).rejects.toThrow('Erro no banco');

    // Verificar log de erro
    expect(logger.error).toHaveBeenCalledWith('Erro no processamento em lote', {
      error: expect.any(Error)
    });
  });

  it('deve retornar quando não houver eventos pendentes', async () => {
    // Mock da busca de eventos vazia
    (prisma.event.findMany as jest.Mock).mockResolvedValue([]);

    // Executar processamento
    await processor.process();

    // Verificar log
    expect(logger.info).toHaveBeenCalledWith('Nenhum evento S-1202 pendente para processamento');
    expect(S1202Processor).not.toHaveBeenCalled();
  });
}); 
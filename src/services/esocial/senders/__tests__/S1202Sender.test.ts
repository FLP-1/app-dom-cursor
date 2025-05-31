import { describe, it, expect, vi, beforeEach } from 'vitest';
import { S1202Sender } from '../S1202Sender';
import { prisma } from '@/lib/prisma';
import { esocialApi } from '@/lib/esocial-api';
import { logger } from '@/lib/logger';
import { S1202XmlGenerator } from '../xml/S1202XmlGenerator';

// Mock das dependências
vi.mock('@/lib/prisma', () => ({
  prisma: {
    event: {
      update: vi.fn(),
      findUnique: vi.fn()
    },
    eventLog: {
      create: vi.fn()
    }
  }
}));

vi.mock('@/lib/esocial-api', () => ({
  esocialApi: {
    sendEvent: vi.fn()
  }
}));

vi.mock('@/lib/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn()
  }
}));

vi.mock('../xml/S1202XmlGenerator', () => ({
  S1202XmlGenerator: vi.fn()
}));

describe('S1202Sender', () => {
  const mockEvent = {
    id: '123',
    type: 'S_1202',
    status: 'PENDING',
    data: {
      ideEvento: {
        indRetif: 1,
        perApur: '2024-03'
      }
    },
    companyId: '456',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should send event successfully', async () => {
    // Mock da resposta da API
    const mockResponse = {
      protocol: '123456789',
      status: 'success'
    };

    (esocialApi.sendEvent as any).mockResolvedValue(mockResponse);

    // Criar instância do sender
    const sender = new S1202Sender(mockEvent as any);

    // Enviar evento
    await sender.send();

    // Verificar se o XML foi gerado e enviado
    expect(esocialApi.sendEvent).toHaveBeenCalledWith('S-1202', expect.any(String));

    // Verificar se o status foi atualizado
    expect(prisma.event.update).toHaveBeenCalledWith({
      where: { id: mockEvent.id },
      data: {
        status: 'PROCESSED',
        error: null,
        processedAt: expect.any(Date),
        data: {
          ...mockEvent.data,
          protocol: mockResponse.protocol
        }
      }
    });

    // Verificar se os logs foram registrados
    expect(prisma.eventLog.create).toHaveBeenCalledTimes(3);
    expect(logger.info).toHaveBeenCalledTimes(3);
  });

  it('should handle API error', async () => {
    // Mock do erro da API
    const mockError = new Error('API Error');
    (esocialApi.sendEvent as any).mockRejectedValue(mockError);

    // Criar instância do sender
    const sender = new S1202Sender(mockEvent as any);

    // Tentar enviar evento e verificar se o erro é propagado
    await expect(sender.send()).rejects.toThrow('API Error');

    // Verificar se o status foi atualizado para ERROR
    expect(prisma.event.update).toHaveBeenCalledWith({
      where: { id: mockEvent.id },
      data: {
        status: 'ERROR',
        error: 'API Error',
        processedAt: null,
        data: mockEvent.data
      }
    });

    // Verificar se os logs de erro foram registrados
    expect(prisma.eventLog.create).toHaveBeenCalledWith({
      data: {
        eventId: mockEvent.id,
        level: 'ERROR',
        message: 'Erro ao enviar evento S-1202 para o eSocial',
        details: { error: mockError }
      }
    });

    expect(logger.error).toHaveBeenCalledWith(
      'Erro ao enviar evento S-1202 para o eSocial',
      { eventId: mockEvent.id, error: mockError }
    );
  });

  it('should handle XML generation error', async () => {
    // Mock do erro de geração de XML
    const mockError = new Error('Invalid XML');
    (S1202XmlGenerator as any).mockImplementation(() => ({
      generate: () => {
        throw mockError;
      }
    }));

    // Criar instância do sender
    const sender = new S1202Sender(mockEvent as any);

    // Tentar enviar evento e verificar se o erro é propagado
    await expect(sender.send()).rejects.toThrow('Invalid XML');

    // Verificar se o status foi atualizado para ERROR
    expect(prisma.event.update).toHaveBeenCalledWith({
      where: { id: mockEvent.id },
      data: {
        status: 'ERROR',
        error: 'Invalid XML',
        processedAt: null,
        data: mockEvent.data
      }
    });

    // Verificar se os logs de erro foram registrados
    expect(prisma.eventLog.create).toHaveBeenCalledWith({
      data: {
        eventId: mockEvent.id,
        level: 'ERROR',
        message: 'Erro ao enviar evento S-1202 para o eSocial',
        details: { error: mockError }
      }
    });
  });

  it('should handle database error', async () => {
    // Mock do erro do banco de dados
    const mockError = new Error('Database Error');
    (prisma.event.update as any).mockRejectedValue(mockError);

    // Mock da resposta da API
    const mockResponse = {
      protocol: '123456789',
      status: 'success'
    };
    (esocialApi.sendEvent as any).mockResolvedValue(mockResponse);

    // Criar instância do sender
    const sender = new S1202Sender(mockEvent as any);

    // Tentar enviar evento e verificar se o erro é propagado
    await expect(sender.send()).rejects.toThrow('Database Error');

    // Verificar se os logs de erro foram registrados
    expect(prisma.eventLog.create).toHaveBeenCalledWith({
      data: {
        eventId: mockEvent.id,
        level: 'ERROR',
        message: 'Erro ao enviar evento S-1202 para o eSocial',
        details: { error: mockError }
      }
    });
  });
}); 
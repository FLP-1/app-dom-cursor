import { S1202Scheduler } from '../S1202Scheduler';
import { S1202BatchProcessor } from '../../batch/S1202BatchProcessor';
import { logger } from '@/lib/logger';

jest.mock('../../batch/S1202BatchProcessor');
jest.mock('@/lib/logger');

describe('S1202Scheduler', () => {
  let scheduler: S1202Scheduler;
  let mockProcess: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    mockProcess = jest.fn();
    (S1202BatchProcessor as jest.Mock).mockImplementation(() => ({
      process: mockProcess
    }));

    scheduler = new S1202Scheduler();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('deve iniciar o agendador com intervalo padrão', () => {
    scheduler.start();

    expect(logger.info).toHaveBeenCalledWith('Iniciando S1202Scheduler', {
      intervalMs: 5 * 60 * 1000
    });
  });

  it('deve iniciar o agendador com intervalo personalizado', () => {
    const customInterval = 1000;
    scheduler.start(customInterval);

    expect(logger.info).toHaveBeenCalledWith('Iniciando S1202Scheduler', {
      intervalMs: customInterval
    });
  });

  it('deve processar eventos no intervalo configurado', async () => {
    scheduler.start(1000);

    // Avançar o tempo
    jest.advanceTimersByTime(1000);

    // Aguardar processamento assíncrono
    await Promise.resolve();

    expect(mockProcess).toHaveBeenCalledTimes(1);
  });

  it('deve parar o agendador', () => {
    scheduler.start();
    scheduler.stop();

    expect(logger.info).toHaveBeenCalledWith('Parando S1202Scheduler');
    expect(scheduler.isRunning()).toBe(false);
  });

  it('não deve iniciar o agendador se já estiver em execução', () => {
    scheduler.start();
    scheduler.start();

    expect(logger.warn).toHaveBeenCalledWith('S1202Scheduler já está em execução');
  });

  it('não deve parar o agendador se não estiver em execução', () => {
    scheduler.stop();

    expect(logger.warn).toHaveBeenCalledWith('S1202Scheduler não está em execução');
  });

  it('deve processar eventos manualmente', async () => {
    await scheduler.processNow();

    expect(mockProcess).toHaveBeenCalledTimes(1);
  });

  it('não deve processar manualmente se já estiver processando', async () => {
    // Simular processamento em andamento
    mockProcess.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));

    // Iniciar primeiro processamento
    const firstProcess = scheduler.processNow();

    // Tentar processar novamente
    await scheduler.processNow();

    expect(logger.warn).toHaveBeenCalledWith('Processamento já em andamento');
    expect(mockProcess).toHaveBeenCalledTimes(1);

    // Aguardar conclusão do primeiro processamento
    await firstProcess;
  });

  it('deve lidar com erro no processamento', async () => {
    const error = new Error('Erro no processamento');
    mockProcess.mockRejectedValue(error);

    scheduler.start(1000);
    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    expect(logger.error).toHaveBeenCalledWith('Erro no processamento agendado', {
      error
    });
  });

  it('deve pular ciclo se processamento anterior ainda estiver em andamento', async () => {
    // Simular processamento lento
    mockProcess.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 2000)));

    scheduler.start(1000);

    // Primeiro ciclo
    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    // Segundo ciclo (deve ser pulado)
    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    expect(logger.debug).toHaveBeenCalledWith(
      'Processamento anterior ainda em andamento, pulando ciclo'
    );
    expect(mockProcess).toHaveBeenCalledTimes(1);
  });
}); 
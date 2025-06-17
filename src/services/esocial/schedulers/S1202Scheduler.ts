/**
 * Arquivo: S1202Scheduler.ts
 * Caminho: src/services/esocial/schedulers/S1202Scheduler.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Agendador do evento S-1202
 */

import { S1202BatchProcessor } from '../batch/S1202BatchProcessor';
import { logger } from '@/lib/logger';

export class S1202Scheduler {
  private processor: S1202BatchProcessor;
  private interval: NodeJS.Timeout | null;
  private isProcessing: boolean;

  constructor(options: {
    interval?: number;
    batchSize?: number;
    maxRetries?: number;
    retryDelay?: number;
  } = {}) {
    this.processor = new S1202BatchProcessor({
      batchSize: options.batchSize,
      maxRetries: options.maxRetries,
      retryDelay: options.retryDelay
    });
    this.interval = null;
    this.isProcessing = false;
  }

  start(intervalMs: number = 5 * 60 * 1000): void {
    if (this.interval) {
      logger.warn('S1202Scheduler já está em execução');
      return;
    }

    logger.info('Iniciando S1202Scheduler', { intervalMs });

    this.interval = setInterval(async () => {
      if (this.isProcessing) {
        logger.debug('Processamento anterior ainda em andamento, pulando ciclo');
        return;
      }

      try {
        this.isProcessing = true;
        await this.processor.process();
      } catch (error) {
        logger.error('Erro no processamento agendado', { error });
      } finally {
        this.isProcessing = false;
      }
    }, intervalMs);
  }

  stop(): void {
    if (!this.interval) {
      logger.warn('S1202Scheduler não está em execução');
      return;
    }

    logger.info('Parando S1202Scheduler');
    clearInterval(this.interval);
    this.interval = null;
  }

  async processNow(): Promise<void> {
    if (this.isProcessing) {
      logger.warn('Processamento já em andamento');
      return;
    }

    try {
      this.isProcessing = true;
      await this.processor.process();
    } catch (error) {
      logger.error('Erro no processamento manual', { error });
      throw error;
    } finally {
      this.isProcessing = false;
    }
  }

  isRunning(): boolean {
    return this.interval !== null;
  }
} 

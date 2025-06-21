/**
 * Arquivo: S1202BatchProcessor.ts
 * Caminho: src/services/esocial/batch/S1202BatchProcessor.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Processador de lotes do evento S-1202
 */

import { prisma } from '@/lib/prisma';
import { Event, EventStatus } from '@prisma/client';
import { S1202Processor } from '../processors/S1202Processor';
import { logger } from '@/lib/logger';

export class S1202BatchProcessor {
  private batchSize: number;
  private maxRetries: number;
  private retryDelay: number;

  constructor(options: {
    batchSize?: number;
    maxRetries?: number;
    retryDelay?: number;
  } = {}) {
    this.batchSize = options.batchSize || 10;
    this.maxRetries = options.maxRetries || 3;
    this.retryDelay = options.retryDelay || 5000; // 5 segundos
  }

  async process(): Promise<void> {
    try {
      // Buscar eventos pendentes
      const events = await this.getPendingEvents();

      if (events.length === 0) {
        logger.info('Nenhum evento S-1202 pendente para processamento');
        return;
      }

      logger.info(`Iniciando processamento em lote de ${events.length} eventos S-1202`);

      // Processar eventos em paralelo
      await Promise.all(
        events.map(event => this.processEventWithRetry(event))
      );

      logger.info('Processamento em lote concluído com sucesso');
    } catch (error) {
      logger.error('Erro no processamento em lote', { error });
      throw error;
    }
  }

  private async getPendingEvents(): Promise<Event[]> {
    return prisma.event.findMany({
      where: {
        type: 'S_1202',
        status: 'PENDING',
        OR: [
          { retryCount: { lt: this.maxRetries } },
          { retryCount: null }
        ]
      },
      orderBy: {
        createdAt: 'asc'
      },
      take: this.batchSize
    });
  }

  private async processEventWithRetry(event: Event): Promise<void> {
    const retryCount = event.retryCount || 0;

    try {
      // Atualizar contador de tentativas
      await this.updateRetryCount(event.id, retryCount + 1);

      // Processar evento
      const processor = new S1202Processor(event);
      await processor.process();

      logger.info(`Evento ${event.id} processado com sucesso`);
    } catch (error) {
      logger.error(`Erro ao processar evento ${event.id}`, { error, retryCount });

      if (retryCount < this.maxRetries) {
        // Aguardar antes de tentar novamente
        await this.delay(this.retryDelay);

        // Tentar processar novamente
        await this.processEventWithRetry(event);
      } else {
        // Marcar como erro após todas as tentativas
        await this.markAsError(event.id, error);
      }
    }
  }

  private async updateRetryCount(eventId: string, retryCount: number): Promise<void> {
    await prisma.event.update({
      where: { id: eventId },
      data: { retryCount }
    });
  }

  private async markAsError(eventId: string, error: unknown): Promise<void> {
    await prisma.event.update({
      where: { id: eventId },
      data: {
        status: 'ERROR',
        error: error instanceof Error ? error.message : typeof error === 'string' ? error : 'Erro desconhecido'
      }
    });
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
} 

import { prisma } from '@/lib/prisma';
import { Event } from '@prisma/client';
import { S1202XmlGenerator } from '../xml/S1202XmlGenerator';
import { logger } from '@/lib/logger';
import { esocialApi } from '@/lib/esocial-api';

export class S1202Sender {
  private event: Event;

  constructor(event: Event) {
    this.event = event;
  }

  async send(): Promise<void> {
    try {
      // Gerar XML
      const xmlGenerator = new S1202XmlGenerator(this.event.data);
      const xml = xmlGenerator.generate();

      // Registrar log de início
      await this.log('INFO', 'Iniciando envio do evento S-1202 para o eSocial');

      // Enviar para o eSocial
      const response = await esocialApi.sendEvent('S-1202', xml);

      // Registrar resposta
      await this.log('INFO', 'Evento S-1202 enviado com sucesso', { response });

      // Atualizar status do evento
      await this.updateEventStatus('PROCESSED', response.protocol);

      // Registrar log de sucesso
      await this.log('INFO', 'Evento S-1202 processado com sucesso', { protocol: response.protocol });
    } catch (error) {
      // Registrar erro
      await this.log('ERROR', 'Erro ao enviar evento S-1202 para o eSocial', { error });

      // Atualizar status do evento
      await this.updateEventStatus('ERROR', undefined, error instanceof Error ? error.message : 'Erro desconhecido');

      // Propagar erro
      throw error;
    }
  }

  private async updateEventStatus(status: 'PROCESSED' | 'ERROR', protocol?: string, error?: string): Promise<void> {
    await prisma.event.update({
      where: { id: this.event.id },
      data: {
        status,
        error,
        processedAt: status === 'PROCESSED' ? new Date() : null,
        data: {
          ...this.event.data,
          protocol
        }
      }
    });
  }

  private async log(level: string, message: string, details?: any): Promise<void> {
    await prisma.eventLog.create({
      data: {
        eventId: this.event.id,
        level,
        message,
        details
      }
    });

    // Registrar também no logger do sistema
    logger[level.toLowerCase()](message, { eventId: this.event.id, ...details });
  }
} 
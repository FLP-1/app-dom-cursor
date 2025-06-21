/**
 * Arquivo: esocial-event.service.ts
 * Caminho: src/services/esocial-event.service.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de eventos do eSocial
 */

import { prisma } from '@/lib/prisma';
import { EsocialEvent, EsocialEventFilter, EsocialEventFormData } from '@/types/esocial';

class EsocialEventManager {
  private static instance: EsocialEventManager;

  private constructor() {}

  static getInstance(): EsocialEventManager {
    if (!EsocialEventManager.instance) {
      EsocialEventManager.instance = new EsocialEventManager();
    }
    return EsocialEventManager.instance;
  }

  async getEvents(filter?: EsocialEventFilter): Promise<EsocialEvent[]> {
    const where = {
      ...(filter?.tipo && { tipo: filter.tipo.codigo }),
      ...(filter?.status && { status: filter.status.codigo }),
      ...(filter?.dataInicio && { dataEvento: { gte: filter.dataInicio } }),
      ...(filter?.dataFim && { dataEvento: { lte: filter.dataFim } }),
      ...(filter?.empregadoDomesticoId && { empregadoDomesticoId: filter.empregadoDomesticoId })
    };

    const events = await prisma.esocialEvent.findMany({
      where,
      include: {
        usuario: true,
        empregadoDomestico: true
      },
      orderBy: {
        dataEvento: 'desc'
      }
    });

    return events;
  }

  async getEvent(id: string): Promise<EsocialEvent | null> {
    const event = await prisma.esocialEvent.findUnique({
      where: { id },
      include: {
        usuario: true,
        empregadoDomestico: true
      }
    });

    return event;
  }

  async createEvent(data: EsocialEventFormData): Promise<EsocialEvent> {
    const event = await prisma.esocialEvent.create({
      data: {
        tipo: data.tipo.codigo,
        status: 'PENDENTE',
        dataEvento: data.dataEvento,
        payload: data.payload,
        usuarioId: data.usuarioId,
        empregadoDomesticoId: data.empregadoDomesticoId
      },
      include: {
        usuario: true,
        empregadoDomestico: true
      }
    });

    return event;
  }

  async updateEventStatus(id: string, status: string, mensagemErro?: string): Promise<EsocialEvent> {
    const event = await prisma.esocialEvent.update({
      where: { id },
      data: {
        status,
        ...(status === 'ENVIADO' && { dataEnvio: new Date() }),
        ...(status === 'PROCESSADO' && { dataProcessamento: new Date() }),
        ...(mensagemErro && { mensagemErro })
      },
      include: {
        usuario: true,
        empregadoDomestico: true
      }
    });

    return event;
  }

  async deleteEvent(id: string): Promise<void> {
    await prisma.esocialEvent.delete({
      where: { id }
    });
  }
}

export const esocialEventManager = EsocialEventManager.getInstance();

export const EsocialEventService = {
  async getEvents(filter?: EsocialEventFilter): Promise<EsocialEvent[]> {
    return esocialEventManager.getEvents(filter);
  },

  async getEvent(id: string): Promise<EsocialEvent | null> {
    return esocialEventManager.getEvent(id);
  },

  async createEvent(data: EsocialEventFormData): Promise<EsocialEvent> {
    return esocialEventManager.createEvent(data);
  },

  async updateEventStatus(id: string, status: string, mensagemErro?: string): Promise<EsocialEvent> {
    return esocialEventManager.updateEventStatus(id, status, mensagemErro);
  },

  async deleteEvent(id: string): Promise<void> {
    return esocialEventManager.deleteEvent(id);
  }
};

export { EsocialEventService as esocialEventService }; 

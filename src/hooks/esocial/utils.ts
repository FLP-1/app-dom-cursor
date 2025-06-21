/**
 * Arquivo: utils.ts
 * Caminho: src/hooks/esocial/utils.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Utilitários para hooks do eSocial
 */

import { EsocialEvent } from '@/types/esocial';
import { esocialEventService } from '@/services/esocial-event.service';

export const loadEvent = async (id: string): Promise<EsocialEvent> => {
  return await esocialEventService.getEvent(id);
};

export const updateEventStatus = async (id: string, status: string): Promise<void> => {
  await esocialEventService.updateStatus(id, status);
};

export const createNewEvent = async (data: EsocialEvent): Promise<void> => {
  await esocialEventService.create(data);
}; 

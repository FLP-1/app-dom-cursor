import { EsocialEvent } from '@/types/esocial';
import { esocialEventService } from '@/services/esocial/event.service';

export const loadEvent = async (id: string): Promise<EsocialEvent> => {
  return await esocialEventService.getEvent(id);
};

export const updateEventStatus = async (id: string, status: string): Promise<void> => {
  await esocialEventService.updateStatus(id, status);
};

export const createNewEvent = async (data: EsocialEvent): Promise<void> => {
  await esocialEventService.create(data);
}; 
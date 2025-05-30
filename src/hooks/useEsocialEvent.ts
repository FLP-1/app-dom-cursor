import { useState } from 'react';
import { EsocialEventService } from '@/services/esocial-event.service';
import { EsocialEvent, EsocialEventFilter, EsocialEventFormData } from '@/types/esocial';

export function useEsocialEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const service = new EsocialEventService();

  const getEvents = async (filter?: EsocialEventFilter) => {
    try {
      setLoading(true);
      setError(null);
      const events = await service.getEvents(filter);
      return events;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar eventos');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getEvent = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const event = await service.getEvent(id);
      return event;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar evento');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (data: EsocialEventFormData) => {
    try {
      setLoading(true);
      setError(null);
      const event = await service.createEvent(data);
      return event;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar evento');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateEventStatus = async (id: string, status: string, mensagemErro?: string) => {
    try {
      setLoading(true);
      setError(null);
      const event = await service.updateEventStatus(id, status, mensagemErro);
      return event;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar status do evento');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await service.deleteEvent(id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir evento');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getEvents,
    getEvent,
    createEvent,
    updateEventStatus,
    deleteEvent
  };
} 
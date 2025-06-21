/**
 * Arquivo: useEsocialEvent.ts
 * Caminho: src/hooks/useEsocialEvent.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useState, useCallback } from 'react';
import { EsocialEventService } from '@/services/esocial-event.service';
import { EsocialEvent, EsocialEventFilter, EsocialEventFormData } from '@/types/esocial';
import { EsocialEventResponse } from '@/types/esocial';

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

  const getEvent = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/esocial/eventos/${id}`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar evento');
      }

      return response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar evento');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createEvent = useCallback(async (data: EsocialEventFormData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/esocial/eventos', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Erro ao criar evento');
      }

      return response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar evento');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEventStatus = useCallback(async (id: string, status: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/esocial/eventos/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error('Erro ao atualizar status do evento');
      }

      return response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar status do evento');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

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

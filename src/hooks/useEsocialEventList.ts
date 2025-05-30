import { useState, useEffect, useCallback } from 'react';
import { EsocialEvent, EsocialEventFilter, EsocialEventType } from '../types/esocial-event';
import { EsocialEventService } from '../services/esocial-event.service';

interface UseEsocialEventListResult {
  eventos: EsocialEvent[];
  tipos: EsocialEventType[];
  loading: boolean;
  error: string | null;
  filtros: EsocialEventFilter;
  setFiltros: (filtros: EsocialEventFilter) => void;
  atualizar: () => void;
}

export function useEsocialEventList(): UseEsocialEventListResult {
  const [eventos, setEventos] = useState<EsocialEvent[]>([]);
  const [tipos, setTipos] = useState<EsocialEventType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filtros, setFiltros] = useState<EsocialEventFilter>({});

  const fetchEventos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [eventosData, tiposData] = await Promise.all([
        EsocialEventService.list(filtros),
        EsocialEventService.listTypes(),
      ]);
      setEventos(eventosData);
      setTipos(tiposData);
    } catch (e) {
      setError('Erro ao carregar eventos do eSocial.');
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  useEffect(() => {
    fetchEventos();
  }, [fetchEventos]);

  return {
    eventos,
    tipos,
    loading,
    error,
    filtros,
    setFiltros,
    atualizar: fetchEventos,
  };
} 
/**
 * Arquivo: useEsocialEventList.ts
 * Caminho: src/hooks/useEsocialEventList.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useState, useCallback } from 'react';
import { EsocialEventResponse } from '@/types/esocial';

interface EsocialEventFilter {
  tipo?: string;
  status?: string;
  dataInicio?: string;
  dataFim?: string;
}

export const useEsocialEventList = () => {
  const [eventos, setEventos] = useState<EsocialEventResponse[]>([]);
  const [tipos, setTipos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filtros, setFiltros] = useState<EsocialEventFilter>({});

  const atualizar = useCallback(async () => {
    setLoading(true);
    try {
      // Simular chamada à API
      const response = await fetch('/api/esocial/eventos');
      const data = await response.json();
      setEventos(data.eventos);
      setTipos(data.tipos);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar eventos');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    eventos,
    tipos,
    loading,
    error,
    filtros,
    setFiltros,
    atualizar,
  };
}; 

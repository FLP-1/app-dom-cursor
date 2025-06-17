/**
 * Arquivo: useAlerts.ts
 * Caminho: src/hooks/useAlerts.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useState, useEffect, useCallback } from 'react';
import { AlertService } from '@/services/alert.service';

// Tipo provisório para alerta, ajuste conforme a estrutura real
interface Alert {
  id?: string;
  mensagem?: string;
  tipo?: string;
  [key: string]: unknown;
}

interface AlertFilters {
  type?: string;
  severity?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  message?: string;
}

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hoje = new Date();
  const ontem = new Date();
  ontem.setDate(hoje.getDate() - 1);
  const [filtros, setFiltros] = useState<AlertFilters>({
    type: '',
    severity: '',
    startDate: ontem,
    endDate: hoje,
    message: '',
  });

  const fetchAlerts = useCallback(async (filters: AlertFilters = filtros) => {
    setLoading(true);
    setError(null);
    try {
      const data = await AlertService.getAlerts(filters);
      setAlerts(data);
    } catch (err) {
      setError('Erro ao buscar alertas');
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  useEffect(() => {
    fetchAlerts(filtros);
  }, [fetchAlerts, filtros]);

  const addAlert = (alert: Alert) => setAlerts(prev => [...prev, alert]);
  const atualizar = () => fetchAlerts(filtros);

  // Função segura para atualizar filtros sem undefined
  const safeSetFiltros = (newFiltros: AlertFilters) => {
    setFiltros({
      ...newFiltros,
      type: typeof newFiltros.type === 'undefined' ? '' : newFiltros.type,
      severity: typeof newFiltros.severity === 'undefined' ? '' : newFiltros.severity,
      message: typeof newFiltros.message === 'undefined' ? '' : newFiltros.message,
    });
  };

  return { alerts, addAlert, loading, error, atualizar, filtros, setFiltros: safeSetFiltros };
} 

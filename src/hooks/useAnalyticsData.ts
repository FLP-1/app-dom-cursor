/**
 * Arquivo: useAnalyticsData.ts
 * Caminho: src/hooks/useAnalyticsData.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Hook customizado para buscar e gerenciar os dados de analytics do sistema.
 */

import useSWR from 'swr';
import axios from 'axios';

export interface AnalyticsMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: number;
  trendType: 'up' | 'down' | 'neutral';
  icon: string;
  color: string;
}

export interface AnalyticsChart {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
  }[];
}

export interface AnalyticsData {
  metrics: AnalyticsMetric[];
  mainChart: AnalyticsChart;
  secondaryChart: AnalyticsChart;
  trends: {
    id: string;
    name: string;
    value: number;
    trend: number;
    trendType: 'up' | 'down' | 'neutral';
  }[];
  summary: {
    total: number;
    growth: number;
    bestMonth: string;
    worstMonth: string;
  };
}

const fetcher = (url: string) => axios.get<AnalyticsData>(url).then(res => res.data);

export const useAnalyticsData = () => {
  const { data, error, mutate } = useSWR<AnalyticsData>('/api/analytics', fetcher);

  const refreshAnalytics = async () => {
    mutate();
  };

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    refreshAnalytics,
  };
}; 
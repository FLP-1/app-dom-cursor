/**
 * Arquivo: useRelatoriosData.ts
 * Caminho: src/hooks/useRelatoriosData.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Hook customizado para buscar e gerenciar os dados de relatórios.
 */

import useSWR from 'swr';
import axios from 'axios';

export interface ReportMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: string;
  color: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
  }[];
}

export interface ReportData {
  metrics: ReportMetric[];
  revenueChart: ChartData;
  employeeChart: ChartData;
  taskChart: ChartData;
  recentActivity: {
    id: string;
    type: string;
    description: string;
    timestamp: string;
    user: string;
    status: 'completed' | 'pending' | 'failed';
  }[];
  topPerformers: {
    id: string;
    name: string;
    avatar?: string;
    role: string;
    performance: number;
    tasksCompleted: number;
  }[];
  departmentStats: {
    id: string;
    name: string;
    employeeCount: number;
    avgPerformance: number;
    totalTasks: number;
    completedTasks: number;
  }[];
  summary: {
    totalRevenue: number;
    totalEmployees: number;
    totalTasks: number;
    avgPerformance: number;
    growthRate: number;
  };
}

const fetcher = (url: string) => axios.get<ReportData>(url).then(res => res.data);

export const useRelatoriosData = () => {
  const { data, error, mutate } = useSWR<ReportData>('/api/relatorios', fetcher);

  const generateReport = async (type: string, dateRange: { start: string; end: string }) => {
    try {
      const response = await axios.post('/api/relatorios/generate', {
        type,
        dateRange
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      throw error;
    }
  };

  const exportReport = async (type: string, format: 'pdf' | 'excel' | 'csv') => {
    try {
      const response = await axios.post('/api/relatorios/export', {
        type,
        format
      }, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao exportar relatório:', error);
      throw error;
    }
  };

  const updateMetrics = async (metrics: Partial<ReportMetric>[]) => {
    try {
      await axios.put('/api/relatorios/metrics', { metrics });
      mutate(); // Revalida os dados
    } catch (error) {
      console.error('Erro ao atualizar métricas:', error);
      throw error;
    }
  };

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    generateReport,
    exportReport,
    updateMetrics,
  };
}; 
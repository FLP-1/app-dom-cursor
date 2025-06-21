/**
 * Arquivo: usePontoData.ts
 * Caminho: src/hooks/usePontoData.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Hook customizado para buscar e gerenciar os dados de ponto eletrônico.
 */

import useSWR from 'swr';
import axios from 'axios';

export interface PontoRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  time: string;
  type: 'entrada' | 'saida' | 'intervalo_inicio' | 'intervalo_fim';
  location?: string;
  device?: string;
  notes?: string;
  status: 'normal' | 'atraso' | 'saida_antecipada' | 'horas_extras';
}

export interface PontoSummary {
  date: string;
  totalHours: number;
  workedHours: number;
  breakHours: number;
  overtimeHours: number;
  lateMinutes: number;
  earlyLeaveMinutes: number;
  records: PontoRecord[];
}

export interface PontoData {
  todayRecords: PontoRecord[];
  weeklySummary: PontoSummary[];
  monthlyStats: {
    totalWorkedDays: number;
    totalHours: number;
    averageHoursPerDay: number;
    overtimeHours: number;
    lateDays: number;
  };
  recentRecords: PontoRecord[];
  upcomingBreaks: PontoRecord[];
}

const fetcher = (url: string) => axios.get<PontoData>(url).then(res => res.data);

export const usePontoData = () => {
  const { data, error, mutate } = useSWR<PontoData>('/api/ponto', fetcher);

  const registerPonto = async (record: Omit<PontoRecord, 'id'>) => {
    try {
      await axios.post('/api/ponto/register', record);
      mutate(); // Revalida os dados
    } catch (error) {
      console.error('Erro ao registrar ponto:', error);
      throw error;
    }
  };

  const updatePontoRecord = async (id: string, updates: Partial<PontoRecord>) => {
    try {
      await axios.put(`/api/ponto/${id}`, updates);
      mutate(); // Revalida os dados
    } catch (error) {
      console.error('Erro ao atualizar registro:', error);
      throw error;
    }
  };

  const deletePontoRecord = async (id: string) => {
    try {
      await axios.delete(`/api/ponto/${id}`);
      mutate(); // Revalida os dados
    } catch (error) {
      console.error('Erro ao deletar registro:', error);
      throw error;
    }
  };

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    registerPonto,
    updatePontoRecord,
    deletePontoRecord,
  };
}; 
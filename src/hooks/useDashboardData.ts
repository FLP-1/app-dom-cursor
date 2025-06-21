/**
 * Arquivo: useDashboardData.ts
 * Caminho: src/hooks/useDashboardData.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Hook customizado para buscar e gerenciar os dados da página de dashboard.
 */

import useSWR from 'swr';
import axios from 'axios';

// Interface para a estrutura de dados esperada da API do dashboard
export interface StatsCardData {
  title: string;
  value: string;
  change: string;
  icon: string; // O nome do ícone como string
  color: string;
  gradient: string;
}

export interface ActivityData {
  icon: string;
  text: string;
  time: string;
  color: string;
}

export interface DashboardData {
  statsCards: StatsCardData[];
  recentActivities: ActivityData[];
  monthlyProgress: {
    label: string;
    value: number;
  }[];
  quickMessages: {
    name: string;
    message: string;
    time: string;
    avatar: string;
  }[];
}

// Função fetcher que o SWR usará
const fetcher = (url: string) => axios.get<DashboardData>(url).then(res => res.data);

export const useDashboardData = () => {
  const { data, error } = useSWR<DashboardData>('/api/dashboard', fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}; 
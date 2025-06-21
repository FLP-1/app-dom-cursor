/**
 * Arquivo: useSecurityData.ts
 * Caminho: src/hooks/useSecurityData.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Hook customizado para buscar e gerenciar os dados de segurança do sistema.
 */

import useSWR from 'swr';
import axios from 'axios';

export interface SecurityLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  ip: string;
  location: string;
  status: 'success' | 'failed' | 'warning';
  details: string;
}

export interface SecuritySettings {
  twoFactorAuth: boolean;
  loginAlerts: boolean;
  sessionTimeout: number;
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
  };
}

export interface SecurityData {
  logs: SecurityLog[];
  settings: SecuritySettings;
  stats: {
    totalLogins: number;
    failedAttempts: number;
    suspiciousActivities: number;
    lastPasswordChange: string;
  };
  recentActivity: SecurityLog[];
}

const fetcher = (url: string) => axios.get<SecurityData>(url).then(res => res.data);

export const useSecurityData = () => {
  const { data, error, mutate } = useSWR<SecurityData>('/api/security', fetcher);

  const updateSecuritySettings = async (settings: Partial<SecuritySettings>) => {
    try {
      await axios.put('/api/security/settings', settings);
      mutate();
    } catch (error) {
      console.error('Erro ao atualizar configurações de segurança:', error);
      throw error;
    }
  };

  const blockUser = async (userId: string) => {
    try {
      await axios.post(`/api/security/block/${userId}`);
      mutate();
    } catch (error) {
      console.error('Erro ao bloquear usuário:', error);
      throw error;
    }
  };

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    updateSecuritySettings,
    blockUser,
  };
}; 
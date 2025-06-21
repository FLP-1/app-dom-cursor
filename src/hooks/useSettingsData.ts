/**
 * Arquivo: useSettingsData.ts
 * Caminho: src/hooks/useSettingsData.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Hook customizado para buscar e gerenciar os dados de configurações do sistema.
 */

import useSWR from 'swr';
import axios from 'axios';

export interface SettingsData {
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    notifications: boolean;
    autoUpdate: boolean;
  };
  integrations: {
    googleDrive: boolean;
    dropbox: boolean;
    slack: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    loginAlerts: boolean;
    lastPasswordChange: string;
  };
}

const fetcher = (url: string) => axios.get<SettingsData>(url).then(res => res.data);

export const useSettingsData = () => {
  const { data, error, mutate } = useSWR<SettingsData>('/api/configuracoes', fetcher);

  const updatePreferences = async (preferences: Partial<SettingsData['preferences']>) => {
    try {
      await axios.put('/api/configuracoes/preferences', preferences);
      mutate();
    } catch (error) {
      console.error('Erro ao atualizar preferências:', error);
      throw error;
    }
  };

  const updateIntegrations = async (integrations: Partial<SettingsData['integrations']>) => {
    try {
      await axios.put('/api/configuracoes/integrations', integrations);
      mutate();
    } catch (error) {
      console.error('Erro ao atualizar integrações:', error);
      throw error;
    }
  };

  const updateSecurity = async (security: Partial<SettingsData['security']>) => {
    try {
      await axios.put('/api/configuracoes/security', security);
      mutate();
    } catch (error) {
      console.error('Erro ao atualizar segurança:', error);
      throw error;
    }
  };

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    updatePreferences,
    updateIntegrations,
    updateSecurity,
  };
}; 
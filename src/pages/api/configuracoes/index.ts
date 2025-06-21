/**
 * Arquivo: index.ts
 * Caminho: src/pages/api/configuracoes/index.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Endpoint da API para fornecer dados de configurações do sistema.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { SettingsData } from '@/hooks/useSettingsData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SettingsData>
) {
  const mockData: SettingsData = {
    preferences: {
      theme: 'light',
      language: 'pt-BR',
      notifications: true,
      autoUpdate: false
    },
    integrations: {
      googleDrive: true,
      dropbox: false,
      slack: true
    },
    security: {
      twoFactorAuth: true,
      loginAlerts: true,
      lastPasswordChange: '2025-01-10T09:00:00Z'
    }
  };

  res.status(200).json(mockData);
} 
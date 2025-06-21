/**
 * Arquivo: index.ts
 * Caminho: src/pages/api/security/index.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Endpoint da API para fornecer dados de segurança do sistema.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { SecurityData } from '@/hooks/useSecurityData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SecurityData>
) {
  const mockData: SecurityData = {
    logs: [
      {
        id: '1',
        timestamp: '2025-01-27T14:30:00Z',
        user: 'joao.silva@email.com',
        action: 'Login',
        ip: '192.168.1.100',
        location: 'São Paulo, SP',
        status: 'success',
        details: 'Login realizado com sucesso'
      },
      {
        id: '2',
        timestamp: '2025-01-27T14:25:00Z',
        user: 'maria.costa@email.com',
        action: 'Logout',
        ip: '192.168.1.101',
        location: 'Rio de Janeiro, RJ',
        status: 'success',
        details: 'Logout realizado'
      },
      {
        id: '3',
        timestamp: '2025-01-27T14:20:00Z',
        user: 'unknown@email.com',
        action: 'Login Failed',
        ip: '203.0.113.1',
        location: 'Unknown',
        status: 'failed',
        details: 'Tentativa de login com credenciais inválidas'
      },
      {
        id: '4',
        timestamp: '2025-01-27T14:15:00Z',
        user: 'pedro.lima@email.com',
        action: 'Password Change',
        ip: '192.168.1.102',
        location: 'Belo Horizonte, MG',
        status: 'success',
        details: 'Senha alterada com sucesso'
      }
    ],
    settings: {
      twoFactorAuth: true,
      loginAlerts: true,
      sessionTimeout: 30,
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true
      }
    },
    stats: {
      totalLogins: 156,
      failedAttempts: 3,
      suspiciousActivities: 1,
      lastPasswordChange: '2025-01-10T09:00:00Z'
    },
    recentActivity: [
      {
        id: '1',
        timestamp: '2025-01-27T14:30:00Z',
        user: 'joao.silva@email.com',
        action: 'Login',
        ip: '192.168.1.100',
        location: 'São Paulo, SP',
        status: 'success',
        details: 'Login realizado com sucesso'
      },
      {
        id: '2',
        timestamp: '2025-01-27T14:25:00Z',
        user: 'maria.costa@email.com',
        action: 'Logout',
        ip: '192.168.1.101',
        location: 'Rio de Janeiro, RJ',
        status: 'success',
        details: 'Logout realizado'
      },
      {
        id: '3',
        timestamp: '2025-01-27T14:20:00Z',
        user: 'unknown@email.com',
        action: 'Login Failed',
        ip: '203.0.113.1',
        location: 'Unknown',
        status: 'failed',
        details: 'Tentativa de login com credenciais inválidas'
      }
    ]
  };

  res.status(200).json(mockData);
} 
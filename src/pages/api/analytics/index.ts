/**
 * Arquivo: index.ts
 * Caminho: src/pages/api/analytics/index.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Endpoint da API para fornecer dados de analytics do sistema.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { AnalyticsData } from '@/hooks/useAnalyticsData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnalyticsData>
) {
  const mockData: AnalyticsData = {
    metrics: [
      {
        id: '1',
        name: 'Usuários Ativos',
        value: 1200,
        unit: '',
        trend: 5.2,
        trendType: 'up',
        icon: '👤',
        color: '#2196F3'
      },
      {
        id: '2',
        name: 'Novos Documentos',
        value: 340,
        unit: '',
        trend: 2.1,
        trendType: 'up',
        icon: '📄',
        color: '#4CAF50'
      },
      {
        id: '3',
        name: 'Tarefas Concluídas',
        value: 890,
        unit: '',
        trend: -1.8,
        trendType: 'down',
        icon: '✅',
        color: '#FF9800'
      },
      {
        id: '4',
        name: 'Alertas',
        value: 27,
        unit: '',
        trend: 0,
        trendType: 'neutral',
        icon: '⚠️',
        color: '#F44336'
      }
    ],
    mainChart: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [
        {
          label: 'Usuários Ativos',
          data: [800, 950, 1100, 1200, 1150, 1200],
          backgroundColor: 'rgba(33, 150, 243, 0.2)',
          borderColor: '#2196F3'
        }
      ]
    },
    secondaryChart: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [
        {
          label: 'Tarefas Concluídas',
          data: [600, 700, 800, 850, 900, 890],
          backgroundColor: 'rgba(255, 152, 0, 0.2)',
          borderColor: '#FF9800'
        }
      ]
    },
    trends: [
      {
        id: 't1',
        name: 'Crescimento de Usuários',
        value: 5.2,
        trend: 5.2,
        trendType: 'up'
      },
      {
        id: 't2',
        name: 'Queda de Tarefas',
        value: -1.8,
        trend: -1.8,
        trendType: 'down'
      },
      {
        id: 't3',
        name: 'Estabilidade de Alertas',
        value: 0,
        trend: 0,
        trendType: 'neutral'
      }
    ],
    summary: {
      total: 1200,
      growth: 5.2,
      bestMonth: 'Abril',
      worstMonth: 'Janeiro'
    }
  };

  res.status(200).json(mockData);
} 
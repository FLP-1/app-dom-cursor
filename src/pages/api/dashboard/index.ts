/**
 * Arquivo: index.ts
 * Caminho: src/pages/api/dashboard/index.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Endpoint da API para fornecer dados para a página de dashboard.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { DashboardData } from '@/hooks/useDashboardData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DashboardData>
) {
  // Dados de exemplo (mock)
  const mockData: DashboardData = {
    statsCards: [
      { title: 'Pontos Registrados', value: '52', change: '+8%', icon: 'AccessTime', color: '#4CAF50', gradient: 'linear-gradient(135deg, #4CAF50, #45a049)' },
      { title: 'Documentos', value: '25', change: '+2', icon: 'Description', color: '#2196F3', gradient: 'linear-gradient(135deg, #2196F3, #1976D2)' },
      { title: 'Tarefas Ativas', value: '7', change: '-1', icon: 'Assignment', color: '#FF9800', gradient: 'linear-gradient(135deg, #FF9800, #F57C00)' },
      { title: 'Compras Pendentes', value: '12', change: '+1', icon: 'ShoppingCart', color: '#E91E63', gradient: 'linear-gradient(135deg, #E91E63, #C2185B)' }
    ],
    recentActivities: [
      { icon: 'CheckCircle', text: 'Ponto de entrada registrado', time: '1h atrás', color: '#4CAF50' },
      { icon: 'Description', text: 'Novo documento "Recibo de Aluguel" adicionado', time: '3h atrás', color: '#2196F3' },
      { icon: 'Assignment', text: 'Tarefa "Pagar conta de luz" concluída', time: '5h atrás', color: '#FF9800' },
      { icon: 'Warning', text: 'A CNH de João vence em 7 dias', time: '1d atrás', color: '#F44336' }
    ],
    monthlyProgress: [
      { label: 'Pontos Registrados', value: 92 },
      { label: 'Tarefas Concluídas', value: 85 }
    ],
    quickMessages: [
      { name: 'Empregador Chefe', message: 'Por favor, compre pão.', time: '5min', avatar: 'EC' },
      { name: 'Filho Adolescente', message: 'Preciso de dinheiro para o lanche.', time: '30min', avatar: 'FA' }
    ]
  };

  res.status(200).json(mockData);
} 
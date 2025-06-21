/**
 * Arquivo: index.ts
 * Caminho: src/pages/api/calendario/index.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Endpoint da API para fornecer dados do calendário.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { CalendarData } from '@/hooks/useCalendarData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CalendarData>
) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const mockData: CalendarData = {
    events: [
      {
        id: '1',
        title: 'Limpeza da Casa',
        description: 'Limpeza geral da casa incluindo banheiros e cozinha',
        date: today.toISOString().split('T')[0],
        time: '09:00',
        type: 'task',
        priority: 'high',
        completed: false,
        color: '#FF9800'
      },
      {
        id: '2',
        title: 'Consulta Médica',
        description: 'Consulta de rotina com Dr. Silva',
        date: tomorrow.toISOString().split('T')[0],
        time: '14:30',
        type: 'appointment',
        priority: 'medium',
        completed: false,
        color: '#2196F3'
      },
      {
        id: '3',
        title: 'Pagamento Aluguel',
        description: 'Vencimento do aluguel',
        date: '2025-02-05',
        time: '00:00',
        type: 'payment',
        priority: 'high',
        completed: false,
        color: '#F44336'
      },
      {
        id: '4',
        title: 'Compras Supermercado',
        description: 'Comprar itens básicos para a semana',
        date: '2025-01-29',
        time: '16:00',
        type: 'task',
        priority: 'medium',
        completed: false,
        color: '#4CAF50'
      },
      {
        id: '5',
        title: 'Aniversário João',
        description: 'Aniversário do filho João',
        date: '2025-02-10',
        time: '18:00',
        type: 'reminder',
        priority: 'high',
        completed: false,
        color: '#E91E63'
      }
    ],
    todayTasks: [
      {
        id: '1',
        title: 'Limpeza da Casa',
        description: 'Limpeza geral da casa incluindo banheiros e cozinha',
        date: today.toISOString().split('T')[0],
        time: '09:00',
        type: 'task',
        priority: 'high',
        completed: false,
        color: '#FF9800'
      }
    ],
    upcomingEvents: [
      {
        id: '2',
        title: 'Consulta Médica',
        description: 'Consulta de rotina com Dr. Silva',
        date: tomorrow.toISOString().split('T')[0],
        time: '14:30',
        type: 'appointment',
        priority: 'medium',
        completed: false,
        color: '#2196F3'
      },
      {
        id: '4',
        title: 'Compras Supermercado',
        description: 'Comprar itens básicos para a semana',
        date: '2025-01-29',
        time: '16:00',
        type: 'task',
        priority: 'medium',
        completed: false,
        color: '#4CAF50'
      }
    ],
    monthlyStats: {
      totalEvents: 15,
      completedTasks: 8,
      pendingTasks: 5,
      overdueTasks: 2
    }
  };

  res.status(200).json(mockData);
} 
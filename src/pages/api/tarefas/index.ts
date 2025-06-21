/**
 * Arquivo: index.ts
 * Caminho: src/pages/api/tarefas/index.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Endpoint da API para fornecer dados de tarefas.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { TasksData } from '@/hooks/useTasksData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TasksData>
) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const mockData: TasksData = {
    tasks: [
      {
        id: '1',
        title: 'Limpeza da Casa',
        description: 'Limpeza geral incluindo banheiros, cozinha e sala',
        priority: 'high',
        status: 'pending',
        category: 'housework',
        dueDate: today.toISOString().split('T')[0],
        createdAt: '2025-01-25',
        tags: ['limpeza', 'casa', 'importante'],
        estimatedTime: '2h'
      },
      {
        id: '2',
        title: 'Compras Supermercado',
        description: 'Comprar itens básicos para a semana',
        priority: 'medium',
        status: 'in_progress',
        category: 'shopping',
        dueDate: tomorrow.toISOString().split('T')[0],
        createdAt: '2025-01-24',
        tags: ['compras', 'alimentação'],
        estimatedTime: '1h'
      },
      {
        id: '3',
        title: 'Consulta Médica',
        description: 'Consulta de rotina com Dr. Silva',
        priority: 'high',
        status: 'pending',
        category: 'health',
        dueDate: '2025-01-30',
        createdAt: '2025-01-23',
        tags: ['saúde', 'consulta'],
        estimatedTime: '1h'
      },
      {
        id: '4',
        title: 'Pagar Contas',
        description: 'Pagar contas de luz, água e internet',
        priority: 'high',
        status: 'completed',
        category: 'personal',
        dueDate: '2025-01-20',
        createdAt: '2025-01-19',
        completedAt: '2025-01-20',
        tags: ['contas', 'pagamento'],
        estimatedTime: '30min',
        actualTime: '25min'
      },
      {
        id: '5',
        title: 'Organizar Documentos',
        description: 'Organizar documentos pessoais e trabalhistas',
        priority: 'medium',
        status: 'pending',
        category: 'work',
        dueDate: '2025-02-05',
        createdAt: '2025-01-22',
        tags: ['documentos', 'organização'],
        estimatedTime: '1h30min'
      },
      {
        id: '6',
        title: 'Exercícios Físicos',
        description: 'Caminhada no parque e exercícios em casa',
        priority: 'low',
        status: 'pending',
        category: 'health',
        dueDate: today.toISOString().split('T')[0],
        createdAt: '2025-01-26',
        tags: ['exercícios', 'saúde'],
        estimatedTime: '45min'
      }
    ],
    todayTasks: [
      {
        id: '1',
        title: 'Limpeza da Casa',
        description: 'Limpeza geral incluindo banheiros, cozinha e sala',
        priority: 'high',
        status: 'pending',
        category: 'housework',
        dueDate: today.toISOString().split('T')[0],
        createdAt: '2025-01-25',
        tags: ['limpeza', 'casa', 'importante'],
        estimatedTime: '2h'
      },
      {
        id: '6',
        title: 'Exercícios Físicos',
        description: 'Caminhada no parque e exercícios em casa',
        priority: 'low',
        status: 'pending',
        category: 'health',
        dueDate: today.toISOString().split('T')[0],
        createdAt: '2025-01-26',
        tags: ['exercícios', 'saúde'],
        estimatedTime: '45min'
      }
    ],
    upcomingTasks: [
      {
        id: '2',
        title: 'Compras Supermercado',
        description: 'Comprar itens básicos para a semana',
        priority: 'medium',
        status: 'in_progress',
        category: 'shopping',
        dueDate: tomorrow.toISOString().split('T')[0],
        createdAt: '2025-01-24',
        tags: ['compras', 'alimentação'],
        estimatedTime: '1h'
      },
      {
        id: '3',
        title: 'Consulta Médica',
        description: 'Consulta de rotina com Dr. Silva',
        priority: 'high',
        status: 'pending',
        category: 'health',
        dueDate: '2025-01-30',
        createdAt: '2025-01-23',
        tags: ['saúde', 'consulta'],
        estimatedTime: '1h'
      }
    ],
    completedTasks: [
      {
        id: '4',
        title: 'Pagar Contas',
        description: 'Pagar contas de luz, água e internet',
        priority: 'high',
        status: 'completed',
        category: 'personal',
        dueDate: '2025-01-20',
        createdAt: '2025-01-19',
        completedAt: '2025-01-20',
        tags: ['contas', 'pagamento'],
        estimatedTime: '30min',
        actualTime: '25min'
      }
    ],
    categories: [
      { name: 'Trabalho Doméstico', count: 1, color: '#4CAF50' },
      { name: 'Compras', count: 1, color: '#FF9800' },
      { name: 'Saúde', count: 2, color: '#F44336' },
      { name: 'Pessoal', count: 1, color: '#2196F3' },
      { name: 'Trabalho', count: 1, color: '#9C27B0' },
      { name: 'Outros', count: 0, color: '#757575' }
    ],
    stats: {
      total: 6,
      pending: 4,
      inProgress: 1,
      completed: 1,
      overdue: 0
    }
  };

  res.status(200).json(mockData);
} 
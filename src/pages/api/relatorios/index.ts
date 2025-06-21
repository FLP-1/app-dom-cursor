/**
 * Arquivo: index.ts
 * Caminho: src/pages/api/relatorios/index.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Endpoint da API para fornecer dados de relatórios.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { ReportData } from '@/hooks/useRelatoriosData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReportData>
) {
  const mockData: ReportData = {
    metrics: [
      {
        id: '1',
        name: 'Receita Total',
        value: 125000,
        unit: 'R$',
        change: 12.5,
        changeType: 'increase',
        icon: '💰',
        color: '#4CAF50'
      },
      {
        id: '2',
        name: 'Funcionários',
        value: 45,
        unit: '',
        change: 8.2,
        changeType: 'increase',
        icon: '👥',
        color: '#2196F3'
      },
      {
        id: '3',
        name: 'Tarefas Concluídas',
        value: 89,
        unit: '%',
        change: -2.1,
        changeType: 'decrease',
        icon: '✅',
        color: '#FF9800'
      },
      {
        id: '4',
        name: 'Satisfação',
        value: 94,
        unit: '%',
        change: 5.3,
        changeType: 'increase',
        icon: '😊',
        color: '#9C27B0'
      }
    ],
    revenueChart: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [
        {
          label: 'Receita',
          data: [85000, 92000, 105000, 98000, 115000, 125000],
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          borderColor: '#4CAF50'
        }
      ]
    },
    employeeChart: {
      labels: ['RH', 'TI', 'Financeiro', 'Operações', 'Marketing'],
      datasets: [
        {
          label: 'Funcionários',
          data: [12, 8, 6, 15, 4],
          backgroundColor: [
            'rgba(33, 150, 243, 0.8)',
            'rgba(156, 39, 176, 0.8)',
            'rgba(255, 152, 0, 0.8)',
            'rgba(76, 175, 80, 0.8)',
            'rgba(244, 67, 54, 0.8)'
          ],
          borderColor: [
            '#2196F3',
            '#9C27B0',
            '#FF9800',
            '#4CAF50',
            '#F44336'
          ]
        }
      ]
    },
    taskChart: {
      labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      datasets: [
        {
          label: 'Tarefas Concluídas',
          data: [15, 18, 22, 19, 25, 12, 8],
          backgroundColor: 'rgba(255, 152, 0, 0.2)',
          borderColor: '#FF9800'
        }
      ]
    },
    recentActivity: [
      {
        id: '1',
        type: 'task',
        description: 'Relatório mensal concluído',
        timestamp: '2025-01-27T14:30:00Z',
        user: 'Maria Silva',
        status: 'completed'
      },
      {
        id: '2',
        type: 'employee',
        description: 'Novo funcionário contratado',
        timestamp: '2025-01-27T13:45:00Z',
        user: 'João Santos',
        status: 'completed'
      },
      {
        id: '3',
        type: 'project',
        description: 'Projeto DOM iniciado',
        timestamp: '2025-01-27T12:20:00Z',
        user: 'Ana Costa',
        status: 'pending'
      },
      {
        id: '4',
        type: 'report',
        description: 'Relatório de vendas gerado',
        timestamp: '2025-01-27T11:15:00Z',
        user: 'Pedro Lima',
        status: 'completed'
      }
    ],
    topPerformers: [
      {
        id: '1',
        name: 'Maria Silva',
        avatar: '/avatars/maria.jpg',
        role: 'Analista de RH',
        performance: 98,
        tasksCompleted: 45
      },
      {
        id: '2',
        name: 'João Santos',
        avatar: '/avatars/joao.jpg',
        role: 'Desenvolvedor',
        performance: 95,
        tasksCompleted: 38
      },
      {
        id: '3',
        name: 'Ana Costa',
        avatar: '/avatars/ana.jpg',
        role: 'Gerente de Projetos',
        performance: 92,
        tasksCompleted: 42
      },
      {
        id: '4',
        name: 'Pedro Lima',
        avatar: '/avatars/pedro.jpg',
        role: 'Analista Financeiro',
        performance: 89,
        tasksCompleted: 35
      }
    ],
    departmentStats: [
      {
        id: '1',
        name: 'Recursos Humanos',
        employeeCount: 12,
        avgPerformance: 94,
        totalTasks: 156,
        completedTasks: 142
      },
      {
        id: '2',
        name: 'Tecnologia da Informação',
        employeeCount: 8,
        avgPerformance: 91,
        totalTasks: 98,
        completedTasks: 87
      },
      {
        id: '3',
        name: 'Financeiro',
        employeeCount: 6,
        avgPerformance: 88,
        totalTasks: 78,
        completedTasks: 69
      },
      {
        id: '4',
        name: 'Operações',
        employeeCount: 15,
        avgPerformance: 86,
        totalTasks: 203,
        completedTasks: 178
      },
      {
        id: '5',
        name: 'Marketing',
        employeeCount: 4,
        avgPerformance: 93,
        totalTasks: 45,
        completedTasks: 42
      }
    ],
    summary: {
      totalRevenue: 125000,
      totalEmployees: 45,
      totalTasks: 580,
      avgPerformance: 90.4,
      growthRate: 12.5
    }
  };

  res.status(200).json(mockData);
} 

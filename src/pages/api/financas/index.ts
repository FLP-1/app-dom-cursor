/**
 * Arquivo: index.ts
 * Caminho: src/pages/api/financas/index.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Endpoint da API para fornecer dados financeiros.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { FinanceData } from '@/hooks/useFinanceData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FinanceData>
) {
  const mockData: FinanceData = {
    transactions: [
      {
        id: '1',
        type: 'income',
        category: 'Salário',
        description: 'Salário mensal',
        amount: 2500,
        date: '2025-01-25',
        status: 'completed',
        paymentMethod: 'transfer',
        tags: ['salário', 'renda'],
        recurring: true,
        recurringPeriod: 'monthly'
      },
      {
        id: '2',
        type: 'expense',
        category: 'Aluguel',
        description: 'Pagamento do aluguel',
        amount: 800,
        date: '2025-01-20',
        status: 'completed',
        paymentMethod: 'transfer',
        tags: ['moradia', 'fixo'],
        recurring: true,
        recurringPeriod: 'monthly'
      },
      {
        id: '3',
        type: 'expense',
        category: 'Alimentação',
        description: 'Compras do supermercado',
        amount: 350,
        date: '2025-01-22',
        status: 'completed',
        paymentMethod: 'card',
        tags: ['alimentação', 'essencial']
      },
      {
        id: '4',
        type: 'expense',
        category: 'Transporte',
        description: 'Combustível',
        amount: 120,
        date: '2025-01-23',
        status: 'completed',
        paymentMethod: 'card',
        tags: ['transporte', 'combustível']
      },
      {
        id: '5',
        type: 'expense',
        category: 'Saúde',
        description: 'Consulta médica',
        amount: 150,
        date: '2025-01-24',
        status: 'completed',
        paymentMethod: 'pix',
        tags: ['saúde', 'consulta']
      },
      {
        id: '6',
        type: 'income',
        category: 'Freelance',
        description: 'Trabalho extra',
        amount: 500,
        date: '2025-01-26',
        status: 'completed',
        paymentMethod: 'pix',
        tags: ['renda extra', 'freelance']
      }
    ],
    budgets: [
      {
        id: '1',
        category: 'Alimentação',
        limit: 500,
        spent: 350,
        period: 'monthly',
        startDate: '2025-01-01',
        endDate: '2025-01-31'
      },
      {
        id: '2',
        category: 'Transporte',
        limit: 200,
        spent: 120,
        period: 'monthly',
        startDate: '2025-01-01',
        endDate: '2025-01-31'
      },
      {
        id: '3',
        category: 'Lazer',
        limit: 300,
        spent: 80,
        period: 'monthly',
        startDate: '2025-01-01',
        endDate: '2025-01-31'
      }
    ],
    recentTransactions: [
      {
        id: '6',
        type: 'income',
        category: 'Freelance',
        description: 'Trabalho extra',
        amount: 500,
        date: '2025-01-26',
        status: 'completed',
        paymentMethod: 'pix',
        tags: ['renda extra', 'freelance']
      },
      {
        id: '5',
        type: 'expense',
        category: 'Saúde',
        description: 'Consulta médica',
        amount: 150,
        date: '2025-01-24',
        status: 'completed',
        paymentMethod: 'pix',
        tags: ['saúde', 'consulta']
      },
      {
        id: '4',
        type: 'expense',
        category: 'Transporte',
        description: 'Combustível',
        amount: 120,
        date: '2025-01-23',
        status: 'completed',
        paymentMethod: 'card',
        tags: ['transporte', 'combustível']
      }
    ],
    monthlyStats: {
      income: 3000,
      expenses: 1420,
      balance: 1580,
      savings: 800
    },
    categoryStats: [
      { category: 'Alimentação', amount: 350, percentage: 25, color: '#4CAF50' },
      { category: 'Transporte', amount: 120, percentage: 8, color: '#2196F3' },
      { category: 'Saúde', amount: 150, percentage: 11, color: '#F44336' },
      { category: 'Aluguel', amount: 800, percentage: 56, color: '#FF9800' }
    ],
    upcomingPayments: [
      {
        id: '7',
        type: 'expense',
        category: 'Contas',
        description: 'Conta de luz',
        amount: 120,
        date: '2025-02-05',
        status: 'pending',
        paymentMethod: 'pix',
        tags: ['contas', 'energia'],
        recurring: true,
        recurringPeriod: 'monthly'
      },
      {
        id: '8',
        type: 'expense',
        category: 'Contas',
        description: 'Conta de água',
        amount: 80,
        date: '2025-02-10',
        status: 'pending',
        paymentMethod: 'pix',
        tags: ['contas', 'água'],
        recurring: true,
        recurringPeriod: 'monthly'
      }
    ]
  };

  res.status(200).json(mockData);
} 
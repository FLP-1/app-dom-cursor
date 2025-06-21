/**
 * Arquivo: useFinanceData.ts
 * Caminho: src/hooks/useFinanceData.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Hook customizado para buscar e gerenciar os dados financeiros.
 */

import useSWR from 'swr';
import axios from 'axios';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  paymentMethod: 'cash' | 'card' | 'transfer' | 'pix';
  tags: string[];
  recurring?: boolean;
  recurringPeriod?: 'weekly' | 'monthly' | 'yearly';
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: 'monthly' | 'yearly';
  startDate: string;
  endDate: string;
}

export interface FinanceData {
  transactions: Transaction[];
  budgets: Budget[];
  recentTransactions: Transaction[];
  monthlyStats: {
    income: number;
    expenses: number;
    balance: number;
    savings: number;
  };
  categoryStats: {
    category: string;
    amount: number;
    percentage: number;
    color: string;
  }[];
  upcomingPayments: Transaction[];
}

const fetcher = (url: string) => axios.get<FinanceData>(url).then(res => res.data);

export const useFinanceData = () => {
  const { data, error, mutate } = useSWR<FinanceData>('/api/financas', fetcher);

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      await axios.post('/api/financas/transactions', transaction);
      mutate();
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      throw error;
    }
  };

  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    try {
      await axios.put(`/api/financas/transactions/${id}`, updates);
      mutate();
    } catch (error) {
      console.error('Erro ao atualizar transação:', error);
      throw error;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await axios.delete(`/api/financas/transactions/${id}`);
      mutate();
    } catch (error) {
      console.error('Erro ao deletar transação:', error);
      throw error;
    }
  };

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
}; 
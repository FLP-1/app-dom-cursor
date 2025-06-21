/**
 * Arquivo: useTasksData.ts
 * Caminho: src/hooks/useTasksData.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Hook customizado para buscar e gerenciar os dados de tarefas.
 */

import useSWR from 'swr';
import axios from 'axios';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  category: 'housework' | 'personal' | 'work' | 'health' | 'shopping' | 'other';
  dueDate: string;
  createdAt: string;
  completedAt?: string;
  assignedTo?: string;
  tags: string[];
  estimatedTime?: string;
  actualTime?: string;
}

export interface TasksData {
  tasks: Task[];
  todayTasks: Task[];
  upcomingTasks: Task[];
  completedTasks: Task[];
  categories: {
    name: string;
    count: number;
    color: string;
  }[];
  stats: {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    overdue: number;
  };
}

const fetcher = (url: string) => axios.get<TasksData>(url).then(res => res.data);

export const useTasksData = () => {
  const { data, error, mutate } = useSWR<TasksData>('/api/tarefas', fetcher);

  const createTask = async (task: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      await axios.post('/api/tarefas', task);
      mutate(); // Revalida os dados
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      throw error;
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      await axios.put(`/api/tarefas/${id}`, updates);
      mutate(); // Revalida os dados
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`/api/tarefas/${id}`);
      mutate(); // Revalida os dados
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      throw error;
    }
  };

  const toggleTaskStatus = async (id: string, currentStatus: Task['status']) => {
    try {
      const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
      const updates: Partial<Task> = { status: newStatus };
      
      if (newStatus === 'completed') {
        updates.completedAt = new Date().toISOString();
      } else {
        updates.completedAt = undefined;
      }
      
      await axios.put(`/api/tarefas/${id}`, updates);
      mutate(); // Revalida os dados
    } catch (error) {
      console.error('Erro ao alterar status da tarefa:', error);
      throw error;
    }
  };

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
  };
}; 
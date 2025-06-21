/**
 * Arquivo: useCalendarData.ts
 * Caminho: src/hooks/useCalendarData.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Hook customizado para buscar e gerenciar os dados do calendário.
 */

import useSWR from 'swr';
import axios from 'axios';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'task' | 'appointment' | 'reminder' | 'payment';
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  color: string;
}

export interface CalendarData {
  events: CalendarEvent[];
  todayTasks: CalendarEvent[];
  upcomingEvents: CalendarEvent[];
  monthlyStats: {
    totalEvents: number;
    completedTasks: number;
    pendingTasks: number;
    overdueTasks: number;
  };
}

const fetcher = (url: string) => axios.get<CalendarData>(url).then(res => res.data);

export const useCalendarData = () => {
  const { data, error, mutate } = useSWR<CalendarData>('/api/calendario', fetcher);

  const addEvent = async (event: Omit<CalendarEvent, 'id'>) => {
    try {
      await axios.post('/api/calendario', event);
      mutate(); // Revalida os dados
    } catch (error) {
      console.error('Erro ao adicionar evento:', error);
      throw error;
    }
  };

  const updateEvent = async (id: string, updates: Partial<CalendarEvent>) => {
    try {
      await axios.put(`/api/calendario/${id}`, updates);
      mutate(); // Revalida os dados
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
      throw error;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await axios.delete(`/api/calendario/${id}`);
      mutate(); // Revalida os dados
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
      throw error;
    }
  };

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    addEvent,
    updateEvent,
    deleteEvent,
  };
}; 
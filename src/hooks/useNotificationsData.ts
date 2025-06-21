/**
 * Arquivo: useNotificationsData.ts
 * Caminho: src/hooks/useNotificationsData.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Hook customizado para buscar e gerenciar os dados de notificações do sistema.
 */

import useSWR from 'swr';
import axios from 'axios';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface NotificationsData {
  notifications: Notification[];
  unreadCount: number;
}

const fetcher = (url: string) => axios.get<NotificationsData>(url).then(res => res.data);

export const useNotificationsData = () => {
  const { data, error, mutate } = useSWR<NotificationsData>('/api/notificacoes', fetcher);

  const markAsRead = async (id: string) => {
    try {
      await axios.put(`/api/notificacoes/${id}/read`);
      mutate();
    } catch (error) {
      console.error('Erro ao marcar como lida:', error);
      throw error;
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await axios.delete(`/api/notificacoes/${id}`);
      mutate();
    } catch (error) {
      console.error('Erro ao deletar notificação:', error);
      throw error;
    }
  };

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    markAsRead,
    deleteNotification,
  };
}; 
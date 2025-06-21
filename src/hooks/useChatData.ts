/**
 * Arquivo: useChatData.ts
 * Caminho: src/hooks/useChatData.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Hook customizado para buscar e gerenciar os dados de chat.
 */

import useSWR from 'swr';
import axios from 'axios';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'audio';
  status: 'sent' | 'delivered' | 'read';
  isOwn: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  participants: string[];
  type: 'individual' | 'group';
}

export interface ChatData {
  conversations: Conversation[];
  currentConversation?: Conversation;
  messages: Message[];
  contacts: {
    id: string;
    name: string;
    avatar?: string;
    isOnline: boolean;
    lastSeen?: string;
  }[];
  stats: {
    totalConversations: number;
    unreadMessages: number;
    onlineContacts: number;
  };
}

const fetcher = (url: string) => axios.get<ChatData>(url).then(res => res.data);

export const useChatData = () => {
  const { data, error, mutate } = useSWR<ChatData>('/api/chat', fetcher);

  const sendMessage = async (conversationId: string, content: string, type: 'text' | 'image' | 'file' | 'audio' = 'text') => {
    try {
      await axios.post('/api/chat/messages', {
        conversationId,
        content,
        type
      });
      mutate(); // Revalida os dados
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      throw error;
    }
  };

  const createConversation = async (participants: string[], name?: string, type: 'individual' | 'group' = 'individual') => {
    try {
      await axios.post('/api/chat/conversations', {
        participants,
        name,
        type
      });
      mutate(); // Revalida os dados
    } catch (error) {
      console.error('Erro ao criar conversa:', error);
      throw error;
    }
  };

  const markAsRead = async (conversationId: string) => {
    try {
      await axios.put(`/api/chat/conversations/${conversationId}/read`);
      mutate(); // Revalida os dados
    } catch (error) {
      console.error('Erro ao marcar como lida:', error);
      throw error;
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      await axios.delete(`/api/chat/messages/${messageId}`);
      mutate(); // Revalida os dados
    } catch (error) {
      console.error('Erro ao deletar mensagem:', error);
      throw error;
    }
  };

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    sendMessage,
    createConversation,
    markAsRead,
    deleteMessage,
  };
}; 
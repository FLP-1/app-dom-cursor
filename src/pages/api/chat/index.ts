/**
 * Arquivo: index.ts
 * Caminho: src/pages/api/chat/index.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Endpoint da API para fornecer dados de chat.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatData } from '@/hooks/useChatData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatData>
) {
  const mockData: ChatData = {
    conversations: [
      {
        id: '1',
        name: 'Maria Silva',
        avatar: '/avatars/maria.jpg',
        lastMessage: 'Olá! Como está o projeto?',
        lastMessageTime: '2025-01-27T14:30:00Z',
        unreadCount: 2,
        isOnline: true,
        participants: ['user1', 'user2'],
        type: 'individual'
      },
      {
        id: '2',
        name: 'João Santos',
        avatar: '/avatars/joao.jpg',
        lastMessage: 'Reunião confirmada para amanhã às 10h',
        lastMessageTime: '2025-01-27T13:45:00Z',
        unreadCount: 0,
        isOnline: false,
        participants: ['user1', 'user3'],
        type: 'individual'
      },
      {
        id: '3',
        name: 'Equipe DOM',
        avatar: '/avatars/team.jpg',
        lastMessage: 'Ana: Documentos enviados com sucesso',
        lastMessageTime: '2025-01-27T12:20:00Z',
        unreadCount: 5,
        isOnline: true,
        participants: ['user1', 'user2', 'user3', 'user4'],
        type: 'group'
      },
      {
        id: '4',
        name: 'Ana Costa',
        avatar: '/avatars/ana.jpg',
        lastMessage: 'Obrigada pela ajuda!',
        lastMessageTime: '2025-01-27T11:15:00Z',
        unreadCount: 0,
        isOnline: true,
        participants: ['user1', 'user5'],
        type: 'individual'
      }
    ],
    currentConversation: {
      id: '1',
      name: 'Maria Silva',
      avatar: '/avatars/maria.jpg',
      lastMessage: 'Olá! Como está o projeto?',
      lastMessageTime: '2025-01-27T14:30:00Z',
      unreadCount: 2,
      isOnline: true,
      participants: ['user1', 'user2'],
      type: 'individual'
    },
    messages: [
      {
        id: '1',
        conversationId: '1',
        senderId: 'user2',
        senderName: 'Maria Silva',
        senderAvatar: '/avatars/maria.jpg',
        content: 'Olá! Como está o projeto?',
        timestamp: '2025-01-27T14:30:00Z',
        type: 'text',
        status: 'read',
        isOwn: false
      },
      {
        id: '2',
        conversationId: '1',
        senderId: 'user1',
        senderName: 'Você',
        senderAvatar: '/avatars/user.jpg',
        content: 'Oi Maria! Está tudo bem, o projeto está no prazo.',
        timestamp: '2025-01-27T14:32:00Z',
        type: 'text',
        status: 'delivered',
        isOwn: true
      },
      {
        id: '3',
        conversationId: '1',
        senderId: 'user2',
        senderName: 'Maria Silva',
        senderAvatar: '/avatars/maria.jpg',
        content: 'Que ótimo! Pode me enviar o relatório atualizado?',
        timestamp: '2025-01-27T14:35:00Z',
        type: 'text',
        status: 'sent',
        isOwn: false
      },
      {
        id: '4',
        conversationId: '1',
        senderId: 'user1',
        senderName: 'Você',
        senderAvatar: '/avatars/user.jpg',
        content: 'Claro! Vou preparar e enviar em alguns minutos.',
        timestamp: '2025-01-27T14:36:00Z',
        type: 'text',
        status: 'sent',
        isOwn: true
      }
    ],
    contacts: [
      {
        id: 'user2',
        name: 'Maria Silva',
        avatar: '/avatars/maria.jpg',
        isOnline: true,
        lastSeen: '2025-01-27T14:35:00Z'
      },
      {
        id: 'user3',
        name: 'João Santos',
        avatar: '/avatars/joao.jpg',
        isOnline: false,
        lastSeen: '2025-01-27T13:45:00Z'
      },
      {
        id: 'user4',
        name: 'Pedro Lima',
        avatar: '/avatars/pedro.jpg',
        isOnline: true,
        lastSeen: '2025-01-27T14:40:00Z'
      },
      {
        id: 'user5',
        name: 'Ana Costa',
        avatar: '/avatars/ana.jpg',
        isOnline: true,
        lastSeen: '2025-01-27T14:38:00Z'
      },
      {
        id: 'user6',
        name: 'Carlos Oliveira',
        avatar: '/avatars/carlos.jpg',
        isOnline: false,
        lastSeen: '2025-01-27T12:30:00Z'
      }
    ],
    stats: {
      totalConversations: 4,
      unreadMessages: 7,
      onlineContacts: 3
    }
  };

  res.status(200).json(mockData);
} 
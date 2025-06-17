/**
 * Arquivo: types.ts
 * Caminho: src/lib/communication/types.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { UserRole } from '../permissions/types';

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  DOCUMENT = 'document',
  ALERT = 'alert',
  NOTIFICATION = 'notification'
}

export enum MessagePriority {
  NORMAL = 'normal',
  ERROR = 'error',
  CRITICAL = 'critical',
  URGENT = 'urgent'
}

export enum MessageStatus {
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed'
}

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  sender: {
    id: string;
    role: UserRole;
    name: string;
  };
  recipients: {
    id: string;
    role: UserRole;
    name: string;
  }[];
  priority: MessagePriority;
  status: MessageStatus;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'private' | 'group' | 'broadcast';
  participants: {
    id: string;
    role: UserRole;
    name: string;
  }[];
  lastMessage?: Message;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageFilter {
  type?: MessageType;
  priority?: MessagePriority;
  status?: MessageStatus;
  startDate?: Date;
  endDate?: Date;
  senderId?: string;
  recipientId?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
} 

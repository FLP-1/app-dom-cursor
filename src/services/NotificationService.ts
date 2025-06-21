/**
 * Arquivo: NotificationService.ts
 * Caminho: src/services/NotificationService.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de notificações
 */

import { MessagePriority } from '@/lib/communication/types';

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: MessagePriority;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

class NotificationService {
  private static instance: NotificationService;
  private listeners: ((notification: Notification) => void)[] = [];

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  subscribe(listener: (notification: Notification) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify(notification: Notification) {
    this.listeners.forEach(listener => listener(notification));
  }

  success(message: string, title = 'Sucesso', duration = 5000) {
    this.notify({
      id: crypto.randomUUID(),
      type: NotificationType.SUCCESS,
      title,
      message,
      priority: MessagePriority.NORMAL,
      duration,
    });
  }

  error(message: string, title = 'Erro', duration = 0) {
    this.notify({
      id: crypto.randomUUID(),
      type: NotificationType.ERROR,
      title,
      message,
      priority: MessagePriority.ERROR,
      duration,
    });
  }

  warning(message: string, title = 'Atenção', duration = 5000) {
    this.notify({
      id: crypto.randomUUID(),
      type: NotificationType.WARNING,
      title,
      message,
      priority: MessagePriority.CRITICAL,
      duration,
    });
  }

  info(message: string, title = 'Informação', duration = 3000) {
    this.notify({
      id: crypto.randomUUID(),
      type: NotificationType.INFO,
      title,
      message,
      priority: MessagePriority.NORMAL,
      duration,
    });
  }

  custom(notification: Omit<Notification, 'id'>) {
    this.notify({
      id: crypto.randomUUID(),
      ...notification,
    });
  }
}

export const notificationService = NotificationService.getInstance();
export { NotificationService }; 

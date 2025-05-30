import { useState, useCallback } from 'react';
import { notificationService, NotificationType, MessagePriority } from '../services/NotificationService';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  type: NotificationType;
  message: string;
}

export function useNotification() {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = useCallback((notification: Notification) => {
    setNotification(notification);
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const success = useCallback(
    (message: string, title = 'Sucesso', duration = 5000) => {
      notificationService.success(message, title, duration);
    },
    []
  );

  const error = useCallback(
    (message: string, title = 'Erro', duration = 0) => {
      notificationService.error(message, title, duration);
    },
    []
  );

  const warning = useCallback(
    (message: string, title = 'Atenção', duration = 5000) => {
      notificationService.warning(message, title, duration);
    },
    []
  );

  const info = useCallback(
    (message: string, title = 'Informação', duration = 3000) => {
      notificationService.info(message, title, duration);
    },
    []
  );

  const custom = useCallback(
    (notification: {
      type: NotificationType;
      title: string;
      message: string;
      priority: MessagePriority;
      duration?: number;
      action?: {
        label: string;
        onClick: () => void;
      };
    }) => {
      notificationService.custom(notification);
    },
    []
  );

  return {
    notification,
    showNotification,
    hideNotification,
    success,
    error,
    warning,
    info,
    custom,
  };
} 
/**
 * Arquivo: alert.service.ts
 * Caminho: src/services/alert.service.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Serviço expandido para gerenciar alertas de vencimento de documentos e ponto
 */

import { Alert, AlertFilter, DocumentAlert, TimeRecordAlert } from '@/types/alert';
import { alertMessages } from '@/i18n/messages/alert.messages';

// Tipo provisório para Alert, ajuste conforme necessário
export interface Alert {
  id?: string;
  mensagem?: string;
  tipo?: string;
  [key: string]: unknown;
}

// Tipos de alerta expandidos
export interface AlertWithMetadata extends Alert {
  metadata?: {
    documentId?: string;
    timeRecordId?: string;
    daysUntilExpiration?: number;
    isOverdue?: boolean;
    holidayDate?: string;
    overtimeHours?: number;
  };
}

export interface AlertNotification {
  type: 'EMAIL' | 'SMS' | 'PUSH' | 'WHATSAPP';
  recipient: string;
  message: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
}

export function getAlerts(): Alert[] {
  return [];
}

export function addAlert(alert: Alert): Alert {
  // mock
  return alert;
}

export const AlertService = {
  async getAlerts(filters?: Record<string, unknown>): Promise<Alert[]> {
    try {
      let url = '/api/alerts';
      if (filters) {
        const params = new URLSearchParams();
        if (filters.type) params.append('type', filters.type as string);
        if (filters.severity) params.append('severity', filters.severity as string);
        if (filters.startDate) params.append('startDate', new Date(filters.startDate as string).toISOString());
        if (filters.endDate) params.append('endDate', new Date(filters.endDate as string).toISOString());
        if (filters.message) params.append('message', filters.message as string);
        const query = params.toString();
        if (query) url += `?${query}`;
      }
      const token = localStorage.getItem('token'); // ajuste conforme seu fluxo de auth
      const response = await fetch(url, {
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
      });
      if (!response.ok) throw new Error(alertMessages.pt.errors.loadFailed);
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar alertas:', error);
      return [];
    }
  },

  async addAlert(alert: Alert): Promise<boolean> {
    try {
      const token = localStorage.getItem('token'); // ajuste conforme seu fluxo de auth
      const response = await fetch('/api/alerts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(alert),
      });
      if (!response.ok) throw new Error(alertMessages.pt.errors.createFailed);
      return true;
    } catch (error) {
      console.error('Erro ao criar alerta:', error);
      return false;
    }
  },

  async updateAlert(id: string, alert: Partial<Alert>): Promise<boolean> {
    try {
      const token = localStorage.getItem('token'); // ajuste conforme seu fluxo de auth
      const response = await fetch(`/api/alerts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(alert),
      });
      if (!response.ok) throw new Error(alertMessages.pt.errors.updateFailed);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar alerta:', error);
      return false;
    }
  },

  async remove(id: string): Promise<boolean> {
    try {
      const token = localStorage.getItem('token'); // ajuste conforme seu fluxo de auth
      const response = await fetch(`/api/alerts/${id}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
      });
      if (!response.ok) throw new Error(alertMessages.pt.errors.deleteFailed);
      return true;
    } catch (error) {
      console.error('Erro ao remover alerta:', error);
      return false;
    }
  },

  // Novos métodos para alertas específicos

  async checkDocumentExpiration(): Promise<DocumentAlert[]> {
    try {
      const response = await fetch('/api/alerts/check-document-expiration', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error(alertMessages.pt.errors.loadFailed);
      return await response.json();
    } catch (error) {
      console.error('Erro ao verificar vencimento de documentos:', error);
      return [];
    }
  },

  async checkTimeRecordAlerts(): Promise<TimeRecordAlert[]> {
    try {
      const response = await fetch('/api/alerts/check-time-record', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error(alertMessages.pt.errors.loadFailed);
      return await response.json();
    } catch (error) {
      console.error('Erro ao verificar alertas de ponto:', error);
      return [];
    }
  },

  async sendNotification(notification: AlertNotification): Promise<boolean> {
    try {
      const response = await fetch('/api/alerts/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(notification),
      });
      if (!response.ok) throw new Error('Erro ao enviar notificação');
      return true;
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
      return false;
    }
  },

  async getAlertSettings(): Promise<{
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    whatsappNotifications: boolean;
    documentExpirationDays: number;
    timeRecordReminderHours: number;
  }> {
    try {
      const response = await fetch('/api/alerts/settings', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Erro ao buscar configurações de alertas');
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar configurações de alertas:', error);
      return {
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        whatsappNotifications: false,
        documentExpirationDays: 30,
        timeRecordReminderHours: 24,
      };
    }
  },

  async updateAlertSettings(settings: {
    emailNotifications?: boolean;
    smsNotifications?: boolean;
    pushNotifications?: boolean;
    whatsappNotifications?: boolean;
    documentExpirationDays?: number;
    timeRecordReminderHours?: number;
  }): Promise<boolean> {
    try {
      const response = await fetch('/api/alerts/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(settings),
      });
      if (!response.ok) throw new Error('Erro ao atualizar configurações de alertas');
      return true;
    } catch (error) {
      console.error('Erro ao atualizar configurações de alertas:', error);
      return false;
    }
  },

  // Método para criar alertas automáticos baseados em regras
  async createAutomaticAlerts(): Promise<void> {
    try {
      // Verificar documentos próximos do vencimento
      const documentAlerts = await this.checkDocumentExpiration();
      for (const alert of documentAlerts) {
        await this.addAlert({
          type: 'DOCUMENT_EXPIRATION',
          message: alert.message,
          severity: alert.severity,
          channels: alert.channels,
          criteria: alert.criteria,
          preferences: alert.preferences,
        });
      }

      // Verificar alertas de ponto
      const timeAlerts = await this.checkTimeRecordAlerts();
      for (const alert of timeAlerts) {
        await this.addAlert({
          type: 'TIME_RECORD',
          message: alert.message,
          severity: alert.severity,
          channels: ['PUSH', 'EMAIL'],
          criteria: {},
          preferences: {},
        });
      }
    } catch (error) {
      console.error('Erro ao criar alertas automáticos:', error);
    }
  },

  // Método para processar notificações em lote
  async processBatchNotifications(): Promise<void> {
    try {
      const alerts = await this.getAlerts({ status: 'active' });
      const settings = await this.getAlertSettings();

      for (const alert of alerts) {
        const notifications: AlertNotification[] = [];

        // Email
        if (settings.emailNotifications && alert.channels.includes('EMAIL')) {
          notifications.push({
            type: 'EMAIL',
            recipient: 'user@example.com', // Obter do contexto do usuário
            message: alert.message,
            priority: alert.severity as 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT',
          });
        }

        // WhatsApp
        if (settings.whatsappNotifications && alert.channels.includes('WHATSAPP')) {
          notifications.push({
            type: 'WHATSAPP',
            recipient: '+5511999999999', // Obter do contexto do usuário
            message: alert.message,
            priority: alert.severity as 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT',
          });
        }

        // Enviar notificações
        for (const notification of notifications) {
          await this.sendNotification(notification);
        }
      }
    } catch (error) {
      console.error('Erro ao processar notificações em lote:', error);
    }
  },
}; 

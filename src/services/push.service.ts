/**
 * Arquivo: push.service.ts
 * Caminho: src/services/push.service.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Serviço de Push Notifications com Web Push API
 */

import webpush from 'web-push';
import { LogService, TipoLog, CategoriaLog } from '@/services/log.service';
import { CacheService } from '@/services/cache.service';
import { pushMessages } from '@/i18n/messages/push.messages';

/**
 * Serviço de Push Notifications
 * @description Gerencia notificações push usando Web Push API
 * @author DOM
 * @version 1.0.0
 * @since 2025-01-27
 */

export type TipoPush = 'sistema' | 'usuario' | 'empresa' | 'ponto' | 'ocorrencia' | 'documento' | 'esocial' | 'backup' | 'seguranca';

export type StatusPush = 'PENDENTE' | 'ENVIADO' | 'RECEBIDO' | 'CLICADO' | 'FALHA' | 'CANCELADO';

export interface NotificacaoPush {
  id: string;
  tipo: TipoPush;
  titulo: string;
  mensagem: string;
  status: StatusPush;
  userId?: string;
  subscriptionId: string;
  dataEnvio?: Date;
  dataRecebimento?: Date;
  dataClique?: Date;
  erro?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface PushSubscription {
  id: string;
  userId: string;
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PushConfig {
  id: string;
  vapidPublicKey: string;
  vapidPrivateKey: string;
  subject: string;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface PushPayload {
  title: string;
  message: string;
  icon?: string;
  badge?: string;
  image?: string;
  url?: string;
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
  data?: Record<string, any>;
}

class PushManager {
  private static instance: PushManager;
  private readonly CACHE_KEY = 'push:';
  private readonly CACHE_EXPIRACAO = 3600; // 1 hora
  private readonly vapidPublicKey = process.env.VAPID_PUBLIC_KEY || '';
  private readonly vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || '';
  private readonly subject = process.env.VAPID_SUBJECT || 'mailto:admin@dom.com';

  private constructor() {
    webpush.setVapidDetails(
      this.subject,
      this.vapidPublicKey,
      this.vapidPrivateKey
    );
  }

  static getInstance(): PushManager {
    if (!PushManager.instance) {
      PushManager.instance = new PushManager();
    }
    return PushManager.instance;
  }

  async sendNotification(subscription: PushSubscription, payload: PushPayload): Promise<boolean> {
    try {
      const pushPayload = JSON.stringify({
        title: payload.title,
        body: payload.message,
        icon: payload.icon || '/favicon.ico',
        badge: payload.badge || '/favicon.ico',
        image: payload.image,
        data: {
          url: payload.url,
          actions: payload.actions,
          ...payload.data
        }
      });

      await webpush.sendNotification(
        {
          endpoint: subscription.endpoint,
          keys: subscription.keys
        },
        pushPayload
      );

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.PUSH,
        mensagem: pushMessages.pt.notification.success,
        detalhes: { subscriptionId: subscription.id, payload }
      });

      return true;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: pushMessages.pt.errors.sendError,
        detalhes: { error, subscription, payload }
      });

      return false;
    }
  }

  async sendWelcomeNotification(userId: string, name: string): Promise<boolean> {
    try {
      const subscription = await this.getUserSubscription(userId);
      if (!subscription) {
        throw new Error(pushMessages.pt.errors.userNotFound);
      }

      const payload: PushPayload = {
        title: pushMessages.pt.welcome.title,
        message: pushMessages.pt.welcome.message.replace('{name}', name),
        url: '/dashboard'
      };

      return this.sendNotification(subscription, payload);
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: pushMessages.pt.errors.sendError,
        detalhes: { error, userId, name }
      });
      return false;
    }
  }

  async sendPasswordResetNotification(userId: string): Promise<boolean> {
    try {
      const subscription = await this.getUserSubscription(userId);
      if (!subscription) {
        throw new Error(pushMessages.pt.errors.userNotFound);
      }

      const payload: PushPayload = {
        title: pushMessages.pt.passwordReset.title,
        message: pushMessages.pt.passwordReset.message,
        url: '/login'
      };

      return this.sendNotification(subscription, payload);
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: pushMessages.pt.errors.sendError,
        detalhes: { error, userId }
      });
      return false;
    }
  }

  async sendTimeRecordNotification(userId: string, type: 'entry' | 'exit' | 'break', time: string): Promise<boolean> {
    try {
      const subscription = await this.getUserSubscription(userId);
      if (!subscription) {
        throw new Error(pushMessages.pt.errors.userNotFound);
      }

      const timeRecordMessages = pushMessages.pt.timeRecord;
      const payload: PushPayload = {
        title: timeRecordMessages[type].title,
        message: timeRecordMessages[type].message.replace('{time}', time),
        url: '/ponto'
      };

      return this.sendNotification(subscription, payload);
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: pushMessages.pt.errors.sendError,
        detalhes: { error, userId, type, time }
      });
      return false;
    }
  }

  async sendDocumentNotification(userId: string, documentName: string): Promise<boolean> {
    try {
      const subscription = await this.getUserSubscription(userId);
      if (!subscription) {
        throw new Error(pushMessages.pt.errors.userNotFound);
      }

      const payload: PushPayload = {
        title: pushMessages.pt.document.title,
        message: pushMessages.pt.document.message.replace('{documentName}', documentName),
        url: '/documentos'
      };

      return this.sendNotification(subscription, payload);
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: pushMessages.pt.errors.sendError,
        detalhes: { error, userId, documentName }
      });
      return false;
    }
  }

  async sendESocialNotification(userId: string, event: string, status: string): Promise<boolean> {
    try {
      const subscription = await this.getUserSubscription(userId);
      if (!subscription) {
        throw new Error(pushMessages.pt.errors.userNotFound);
      }

      const payload: PushPayload = {
        title: pushMessages.pt.esocial.title,
        message: pushMessages.pt.esocial.message
          .replace('{event}', event)
          .replace('{status}', status),
        url: '/esocial'
      };

      return this.sendNotification(subscription, payload);
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: pushMessages.pt.errors.sendError,
        detalhes: { error, userId, event, status }
      });
      return false;
    }
  }

  async sendGeneralNotification(userId: string, title: string, message: string, url?: string): Promise<boolean> {
    try {
      const subscription = await this.getUserSubscription(userId);
      if (!subscription) {
        throw new Error(pushMessages.pt.errors.userNotFound);
      }

      const payload: PushPayload = {
        title: title || pushMessages.pt.notification.title,
        message: message || pushMessages.pt.notification.message,
        url: url || '/notificacoes'
      };

      return this.sendNotification(subscription, payload);
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: pushMessages.pt.errors.sendError,
        detalhes: { error, userId, title, message }
      });
      return false;
    }
  }

  private async getUserSubscription(userId: string): Promise<PushSubscription | null> {
    try {
      const cacheKey = `${this.CACHE_KEY}subscription:${userId}`;
      const cached = await CacheService.get<PushSubscription>(cacheKey);
      
      if (cached) {
        return cached;
      }

      // Aqui você faria a consulta ao banco de dados
      // Por enquanto, retornamos null para simular
      return null;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: pushMessages.pt.errors.subscriptionError,
        detalhes: { error, userId }
      });
      return null;
    }
  }

  async listar(filtros?: any): Promise<NotificacaoPush[]> {
    try {
      const cacheKey = `${this.CACHE_KEY}list:${JSON.stringify(filtros)}`;
      const cached = await CacheService.get<NotificacaoPush[]>(cacheKey);
      
      if (cached) {
        return cached;
      }

      // Aqui você faria a consulta ao banco de dados
      // Por enquanto, retornamos array vazio
      const data: NotificacaoPush[] = [];
      
      await CacheService.set(cacheKey, data, this.CACHE_EXPIRACAO);
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: pushMessages.pt.errors.listError,
        detalhes: { error, filtros }
      });
      throw error;
    }
  }

  async obter(id: string): Promise<NotificacaoPush> {
    try {
      const cacheKey = `${this.CACHE_KEY}${id}`;
      const cached = await CacheService.get<NotificacaoPush>(cacheKey);
      
      if (cached) {
        return cached;
      }

      // Aqui você faria a consulta ao banco de dados
      throw new Error('Notificação não encontrada');
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: pushMessages.pt.errors.getError,
        detalhes: { id, error }
      });
      throw error;
    }
  }

  async remover(id: string): Promise<void> {
    try {
      // Aqui você faria a remoção no banco de dados
      await CacheService.delete(`${this.CACHE_KEY}${id}`);
      
      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.PUSH,
        mensagem: pushMessages.pt.notification.success,
        detalhes: { id }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: pushMessages.pt.errors.deleteError,
        detalhes: { id, error }
      });
      throw error;
    }
  }

  async obterConfiguracao(): Promise<PushConfig> {
    try {
      // Aqui você faria a consulta ao banco de dados
      return {
        id: '1',
        vapidPublicKey: this.vapidPublicKey,
        vapidPrivateKey: this.vapidPrivateKey,
        subject: this.subject,
        ativo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: pushMessages.pt.errors.configError,
        detalhes: { error }
      });
      throw error;
    }
  }

  async atualizarConfiguracao(
    config: Partial<Omit<PushConfig, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<PushConfig> {
    try {
      // Aqui você faria a atualização no banco de dados
      const updatedConfig: PushConfig = {
        id: '1',
        vapidPublicKey: config.vapidPublicKey || this.vapidPublicKey,
        vapidPrivateKey: config.vapidPrivateKey || this.vapidPrivateKey,
        subject: config.subject || this.subject,
        ativo: config.ativo ?? true,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.PUSH,
        mensagem: pushMessages.pt.notification.success,
        detalhes: { config: updatedConfig }
      });

      return updatedConfig;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: pushMessages.pt.errors.updateConfigError,
        detalhes: { config, error }
      });
      throw error;
    }
  }

  async testarConfiguracao(): Promise<{ sucesso: boolean; mensagem: string }> {
    try {
      // Testa a configuração VAPID
      const testSubscription = {
        endpoint: 'https://fcm.googleapis.com/fcm/send/test',
        keys: {
          p256dh: 'test',
          auth: 'test'
        }
      };

      await webpush.sendNotification(testSubscription, 'Test message');

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.PUSH,
        mensagem: pushMessages.pt.notification.success,
        detalhes: { test: 'success' }
      });

      return {
        sucesso: true,
        mensagem: pushMessages.pt.notification.success
      };
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: pushMessages.pt.errors.testConfigError,
        detalhes: { error }
      });

      return {
        sucesso: false,
        mensagem: pushMessages.pt.errors.testConfigError
      };
    }
  }
}

const pushManager = PushManager.getInstance();

export const PushService = {
  async sendNotification(subscription: PushSubscription, payload: PushPayload): Promise<boolean> {
    return pushManager.sendNotification(subscription, payload);
  },

  async sendWelcomeNotification(userId: string, name: string): Promise<boolean> {
    return pushManager.sendWelcomeNotification(userId, name);
  },

  async sendPasswordResetNotification(userId: string): Promise<boolean> {
    return pushManager.sendPasswordResetNotification(userId);
  },

  async sendTimeRecordNotification(userId: string, type: 'entry' | 'exit' | 'break', time: string): Promise<boolean> {
    return pushManager.sendTimeRecordNotification(userId, type, time);
  },

  async sendDocumentNotification(userId: string, documentName: string): Promise<boolean> {
    return pushManager.sendDocumentNotification(userId, documentName);
  },

  async sendESocialNotification(userId: string, event: string, status: string): Promise<boolean> {
    return pushManager.sendESocialNotification(userId, event, status);
  },

  async sendGeneralNotification(userId: string, title: string, message: string, url?: string): Promise<boolean> {
    return pushManager.sendGeneralNotification(userId, title, message, url);
  },

  async listar(filtros?: any): Promise<NotificacaoPush[]> {
    return pushManager.listar(filtros);
  },

  async obter(id: string): Promise<NotificacaoPush> {
    return pushManager.obter(id);
  },

  async remover(id: string): Promise<void> {
    return pushManager.remover(id);
  },

  async obterConfiguracao(): Promise<PushConfig> {
    return pushManager.obterConfiguracao();
  },

  async atualizarConfiguracao(
    config: Partial<Omit<PushConfig, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<PushConfig> {
    return pushManager.atualizarConfiguracao(config);
  },

  async testarConfiguracao(): Promise<{ sucesso: boolean; mensagem: string }> {
    return pushManager.testarConfiguracao();
  }
};

export const pushService = PushService; 

/**
 * Arquivo: push-notification.service.ts
 * Caminho: src/services/push-notification.service.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Serviço de notificações push com suporte a Web Push API
 */

import axios from 'axios';
import { LogService, TipoLog, CategoriaLog } from '@/services/log.service';
import { CacheService } from '@/services/cache.service';

/**
 * Serviço de Notificações Push
 * @description Gerencia o envio de notificações push
 * @author DOM
 * @version 1.0.0
 * @since 2025-01-27
 */

export type TipoPushNotification = 'sistema' | 'usuario' | 'empresa' | 'ponto' | 'ocorrencia' | 'documento' | 'esocial' | 'backup' | 'seguranca';

export type StatusPushNotification = 'PENDENTE' | 'ENVIADO' | 'RECEBIDO' | 'CLICADO' | 'FALHA' | 'CANCELADO';

export interface PushNotification {
  id: string;
  tipo: TipoPushNotification;
  titulo: string;
  mensagem: string;
  icone?: string;
  imagem?: string;
  url?: string;
  dados?: Record<string, unknown>;
  status: StatusPushNotification;
  usuarioId: string;
  dispositivoId?: string;
  dataEnvio?: Date;
  dataRecebimento?: Date;
  dataClique?: Date;
  erro?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PushNotificationFilter {
  tipo?: TipoPushNotification;
  status?: StatusPushNotification;
  usuarioId?: string;
  dataInicio?: Date;
  dataFim?: Date;
}

export interface PushSubscription {
  id: string;
  usuarioId: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  dispositivo: string;
  navegador: string;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PushConfig {
  id: string;
  vapidPublicKey: string;
  vapidPrivateKey: string;
  vapidSubject: string;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface PushMessage {
  title: string;
  body: string;
  icon?: string;
  image?: string;
  badge?: string;
  tag?: string;
  data?: Record<string, unknown>;
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
  requireInteraction?: boolean;
  silent?: boolean;
  timestamp?: number;
  vibrate?: number[];
}

class PushNotificationManager {
  private static instance: PushNotificationManager;
  private readonly CACHE_KEY = 'push:';
  private readonly CACHE_EXPIRACAO = 3600; // 1 hora
  private readonly vapidPublicKey = process.env.VAPID_PUBLIC_KEY || '';
  private readonly vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || '';
  private readonly vapidSubject = process.env.VAPID_SUBJECT || '';

  private constructor() {}

  static getInstance(): PushNotificationManager {
    if (!PushNotificationManager.instance) {
      PushNotificationManager.instance = new PushNotificationManager();
    }
    return PushNotificationManager.instance;
  }

  async sendNotification(
    subscription: PushSubscription,
    message: PushMessage
  ): Promise<boolean> {
    try {
      const { data } = await axios.post('/api/push/send', {
        subscription,
        message
      });

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Notificação push enviada com sucesso',
        detalhes: { 
          subscriptionId: subscription.id,
          messageId: data.id 
        }
      });

      return true;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Erro ao enviar notificação push',
        detalhes: { error, subscription, message }
      });

      return false;
    }
  }

  async sendToUser(
    usuarioId: string,
    titulo: string,
    mensagem: string,
    dados?: Record<string, unknown>
  ): Promise<boolean> {
    try {
      const subscriptions = await this.getUserSubscriptions(usuarioId);
      
      if (subscriptions.length === 0) {
        return false;
      }

      const message: PushMessage = {
        title: titulo,
        body: mensagem,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        data: dados,
        timestamp: Date.now(),
        requireInteraction: false,
        silent: false
      };

      const results = await Promise.allSettled(
        subscriptions.map(subscription => 
          this.sendNotification(subscription, message)
        )
      );

      const successCount = results.filter(
        result => result.status === 'fulfilled' && result.value
      ).length;

      return successCount > 0;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Erro ao enviar notificação push para usuário',
        detalhes: { error, usuarioId, titulo, mensagem }
      });

      return false;
    }
  }

  async sendWelcomeNotification(usuarioId: string, nome: string): Promise<boolean> {
    return this.sendToUser(
      usuarioId,
      'Bem-vindo ao DOM!',
      `Olá ${nome}, seu cadastro foi realizado com sucesso.`,
      { action: 'welcome', userId: usuarioId }
    );
  }

  async sendPasswordResetNotification(usuarioId: string): Promise<boolean> {
    return this.sendToUser(
      usuarioId,
      'Redefinição de Senha',
      'Sua senha foi redefinida com sucesso.',
      { action: 'password_reset', userId: usuarioId }
    );
  }

  async sendPontoNotification(
    usuarioId: string,
    tipo: 'entrada' | 'saida' | 'intervalo',
    horario: string
  ): Promise<boolean> {
    const titulo = tipo === 'entrada' ? 'Ponto Registrado' : 
                  tipo === 'saida' ? 'Saída Registrada' : 'Intervalo Registrado';
    
    const mensagem = `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} registrada às ${horario}`;

    return this.sendToUser(
      usuarioId,
      titulo,
      mensagem,
      { action: 'ponto', tipo, horario, userId: usuarioId }
    );
  }

  async sendDocumentNotification(
    usuarioId: string,
    documentoNome: string
  ): Promise<boolean> {
    return this.sendToUser(
      usuarioId,
      'Novo Documento',
      `Documento "${documentoNome}" foi adicionado.`,
      { action: 'document', documentName: documentoNome, userId: usuarioId }
    );
  }

  async sendEsocialNotification(
    usuarioId: string,
    evento: string,
    status: string
  ): Promise<boolean> {
    return this.sendToUser(
      usuarioId,
      'Evento eSocial',
      `Evento ${evento} ${status.toLowerCase()}.`,
      { action: 'esocial', evento, status, userId: usuarioId }
    );
  }

  async getUserSubscriptions(usuarioId: string): Promise<PushSubscription[]> {
    try {
      const cacheKey = `${this.CACHE_KEY}subscriptions:${usuarioId}`;
      const cached = await CacheService.get<PushSubscription[]>(cacheKey);
      
      if (cached) {
        return cached;
      }

      const { data } = await axios.get<PushSubscription[]>(`/api/push/subscriptions`, {
        params: { usuarioId, ativo: true }
      });
      
      await CacheService.set(cacheKey, data, this.CACHE_EXPIRACAO);
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Erro ao obter subscrições do usuário',
        detalhes: { error, usuarioId }
      });
      return [];
    }
  }

  async subscribeUser(
    usuarioId: string,
    subscription: {
      endpoint: string;
      p256dh: string;
      auth: string;
    },
    dispositivo: string,
    navegador: string
  ): Promise<PushSubscription> {
    try {
      const { data } = await axios.post<PushSubscription>('/api/push/subscribe', {
        usuarioId,
        endpoint: subscription.endpoint,
        p256dh: subscription.p256dh,
        auth: subscription.auth,
        dispositivo,
        navegador
      });

      await CacheService.delete(`${this.CACHE_KEY}subscriptions:${usuarioId}`);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Usuário inscrito em notificações push',
        detalhes: { usuarioId, subscriptionId: data.id }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Erro ao inscrever usuário em notificações push',
        detalhes: { error, usuarioId }
      });
      throw error;
    }
  }

  async unsubscribeUser(subscriptionId: string): Promise<void> {
    try {
      await axios.delete(`/api/push/subscribe/${subscriptionId}`);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Usuário desinscrito de notificações push',
        detalhes: { subscriptionId }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Erro ao desinscrever usuário de notificações push',
        detalhes: { error, subscriptionId }
      });
      throw error;
    }
  }

  async listar(filtros?: PushNotificationFilter): Promise<PushNotification[]> {
    try {
      const cacheKey = `${this.CACHE_KEY}list:${JSON.stringify(filtros)}`;
      const cached = await CacheService.get<PushNotification[]>(cacheKey);
      
      if (cached) {
        return cached;
      }

      const { data } = await axios.get<PushNotification[]>('/api/push', { params: filtros });
      
      await CacheService.set(cacheKey, data, this.CACHE_EXPIRACAO);
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Erro ao listar notificações push',
        detalhes: { error, filtros }
      });
      throw error;
    }
  }

  async obter(id: string): Promise<PushNotification> {
    try {
      const cacheKey = `${this.CACHE_KEY}${id}`;
      const cached = await CacheService.get<PushNotification>(cacheKey);
      
      if (cached) {
        return cached;
      }

      const { data } = await axios.get<PushNotification>(`/api/push/${id}`);
      
      await CacheService.set(cacheKey, data, this.CACHE_EXPIRACAO);
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Erro ao obter notificação push',
        detalhes: { id, error }
      });
      throw error;
    }
  }

  async enviar(
    notificacao: Omit<PushNotification, 'id' | 'status' | 'dataEnvio' | 'dataRecebimento' | 'dataClique' | 'createdAt' | 'updatedAt'>
  ): Promise<PushNotification> {
    try {
      const { data } = await axios.post<PushNotification>('/api/push', notificacao);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Notificação push enviada',
        detalhes: { notificacao: data }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Erro ao enviar notificação push',
        detalhes: { notificacao, error }
      });
      throw error;
    }
  }

  async remover(id: string): Promise<void> {
    try {
      await axios.delete(`/api/push/${id}`);
      
      await CacheService.delete(`${this.CACHE_KEY}${id}`);
      
      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Notificação push removida',
        detalhes: { id }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Erro ao remover notificação push',
        detalhes: { id, error }
      });
      throw error;
    }
  }

  async obterConfiguracao(): Promise<PushConfig> {
    try {
      const { data } = await axios.get<PushConfig>('/api/push/config');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Erro ao obter configuração de push',
        detalhes: { error }
      });
      throw error;
    }
  }

  async atualizarConfiguracao(
    config: Partial<Omit<PushConfig, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<PushConfig> {
    try {
      const { data } = await axios.patch<PushConfig>('/api/push/config', config);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Configuração de push atualizada',
        detalhes: { config }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Erro ao atualizar configuração de push',
        detalhes: { config, error }
      });
      throw error;
    }
  }

  async testarConfiguracao(): Promise<{ sucesso: boolean; mensagem: string }> {
    try {
      const { data } = await axios.post<{ sucesso: boolean; mensagem: string }>(
        '/api/push/config/testar'
      );

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Configuração de push testada',
        detalhes: data
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Erro ao testar configuração de push',
        detalhes: { error }
      });
      throw error;
    }
  }

  getVapidPublicKey(): string {
    return this.vapidPublicKey;
  }
}

const pushNotificationManager = PushNotificationManager.getInstance();

export const PushNotificationService = {
  async sendNotification(
    subscription: PushSubscription,
    message: PushMessage
  ): Promise<boolean> {
    return pushNotificationManager.sendNotification(subscription, message);
  },

  async sendToUser(
    usuarioId: string,
    titulo: string,
    mensagem: string,
    dados?: Record<string, unknown>
  ): Promise<boolean> {
    return pushNotificationManager.sendToUser(usuarioId, titulo, mensagem, dados);
  },

  async sendWelcomeNotification(usuarioId: string, nome: string): Promise<boolean> {
    return pushNotificationManager.sendWelcomeNotification(usuarioId, nome);
  },

  async sendPasswordResetNotification(usuarioId: string): Promise<boolean> {
    return pushNotificationManager.sendPasswordResetNotification(usuarioId);
  },

  async sendPontoNotification(
    usuarioId: string,
    tipo: 'entrada' | 'saida' | 'intervalo',
    horario: string
  ): Promise<boolean> {
    return pushNotificationManager.sendPontoNotification(usuarioId, tipo, horario);
  },

  async sendDocumentNotification(
    usuarioId: string,
    documentoNome: string
  ): Promise<boolean> {
    return pushNotificationManager.sendDocumentNotification(usuarioId, documentoNome);
  },

  async sendEsocialNotification(
    usuarioId: string,
    evento: string,
    status: string
  ): Promise<boolean> {
    return pushNotificationManager.sendEsocialNotification(usuarioId, evento, status);
  },

  async getUserSubscriptions(usuarioId: string): Promise<PushSubscription[]> {
    return pushNotificationManager.getUserSubscriptions(usuarioId);
  },

  async subscribeUser(
    usuarioId: string,
    subscription: {
      endpoint: string;
      p256dh: string;
      auth: string;
    },
    dispositivo: string,
    navegador: string
  ): Promise<PushSubscription> {
    return pushNotificationManager.subscribeUser(usuarioId, subscription, dispositivo, navegador);
  },

  async unsubscribeUser(subscriptionId: string): Promise<void> {
    return pushNotificationManager.unsubscribeUser(subscriptionId);
  },

  async listar(filtros?: PushNotificationFilter): Promise<PushNotification[]> {
    return pushNotificationManager.listar(filtros);
  },

  async obter(id: string): Promise<PushNotification> {
    return pushNotificationManager.obter(id);
  },

  async enviar(
    notificacao: Omit<PushNotification, 'id' | 'status' | 'dataEnvio' | 'dataRecebimento' | 'dataClique' | 'createdAt' | 'updatedAt'>
  ): Promise<PushNotification> {
    return pushNotificationManager.enviar(notificacao);
  },

  async remover(id: string): Promise<void> {
    return pushNotificationManager.remover(id);
  },

  async obterConfiguracao(): Promise<PushConfig> {
    return pushNotificationManager.obterConfiguracao();
  },

  async atualizarConfiguracao(
    config: Partial<Omit<PushConfig, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<PushConfig> {
    return pushNotificationManager.atualizarConfiguracao(config);
  },

  async testarConfiguracao(): Promise<{ sucesso: boolean; mensagem: string }> {
    return pushNotificationManager.testarConfiguracao();
  },

  getVapidPublicKey(): string {
    return pushNotificationManager.getVapidPublicKey();
  }
};

export const pushNotificationService = PushNotificationService; 
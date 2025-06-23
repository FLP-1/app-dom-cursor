/**
 * Arquivo: sms.service.ts
 * Caminho: src/services/sms.service.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Serviço de SMS com suporte a múltiplos provedores
 */

import axios from 'axios';
import { LogService, TipoLog, CategoriaLog } from '@/services/log.service';
import { CacheService } from '@/services/cache.service';

/**
 * Serviço de SMS
 * @description Gerencia o envio de mensagens SMS
 * @author DOM
 * @version 1.0.0
 * @since 2025-01-27
 */

export type TipoSMS = 'sistema' | 'usuario' | 'empresa' | 'ponto' | 'ocorrencia' | 'documento' | 'esocial' | 'backup' | 'seguranca';

export type StatusSMS = 'PENDENTE' | 'ENVIADO' | 'ENTREGUE' | 'FALHA' | 'CANCELADO';

export interface MensagemSMS {
  id: string;
  tipo: TipoSMS;
  numero: string;
  mensagem: string;
  status: StatusSMS;
  provedor: string;
  custo?: number;
  dataEnvio?: Date;
  dataEntrega?: Date;
  erro?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SMSFilter {
  tipo?: TipoSMS;
  status?: StatusSMS;
  numero?: string;
  dataInicio?: Date;
  dataFim?: Date;
  provedor?: string;
}

export interface SMSConfig {
  id: string;
  provedor: string;
  apiKey: string;
  apiSecret: string;
  numero: string;
  limiteDiario: number;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface SMSMessage {
  to: string;
  message: string;
  from?: string;
}

class SMSManager {
  private static instance: SMSManager;
  private readonly CACHE_KEY = 'sms:';
  private readonly CACHE_EXPIRACAO = 3600; // 1 hora
  private readonly apiUrl = process.env.SMS_API_URL || '';
  private readonly apiKey = process.env.SMS_API_KEY || '';
  private readonly apiSecret = process.env.SMS_API_SECRET || '';
  private readonly fromNumber = process.env.SMS_FROM_NUMBER || '';

  private constructor() {}

  static getInstance(): SMSManager {
    if (!SMSManager.instance) {
      SMSManager.instance = new SMSManager();
    }
    return SMSManager.instance;
  }

  async sendMessage(message: SMSMessage): Promise<boolean> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/messages`,
        {
          to: message.to,
          message: message.message,
          from: message.from || this.fromNumber
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SMS,
        mensagem: 'SMS enviado com sucesso',
        detalhes: { to: message.to, messageId: response.data.id }
      });

      return true;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SMS,
        mensagem: 'Erro ao enviar SMS',
        detalhes: { error, message }
      });

      return false;
    }
  }

  async sendTextMessage(to: string, message: string): Promise<boolean> {
    return this.sendMessage({
      to,
      message
    });
  }

  async sendVerificationCode(to: string, code: string): Promise<boolean> {
    const message = `Seu código de verificação DOM é: ${code}. Válido por 15 minutos.`;
    return this.sendTextMessage(to, message);
  }

  async sendPasswordResetCode(to: string, code: string): Promise<boolean> {
    const message = `Seu código para redefinir senha DOM é: ${code}. Válido por 15 minutos.`;
    return this.sendTextMessage(to, message);
  }

  async sendNotificationMessage(to: string, notification: any): Promise<boolean> {
    const title = notification?.title || 'Notificação';
    const message = notification?.message || 'Você tem uma nova notificação';
    
    const smsMessage = `${title}: ${message}`;
    return this.sendTextMessage(to, smsMessage);
  }

  async sendWelcomeMessage(to: string, name: string): Promise<boolean> {
    const message = `Bem-vindo ao DOM, ${name}! Seu cadastro foi realizado com sucesso.`;
    return this.sendTextMessage(to, message);
  }

  async listar(filtros?: SMSFilter): Promise<MensagemSMS[]> {
    try {
      const cacheKey = `${this.CACHE_KEY}list:${JSON.stringify(filtros)}`;
      const cached = await CacheService.get<MensagemSMS[]>(cacheKey);
      
      if (cached) {
        return cached;
      }

      const { data } = await axios.get<MensagemSMS[]>('/api/sms', { params: filtros });
      
      await CacheService.set(cacheKey, data, this.CACHE_EXPIRACAO);
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SMS,
        mensagem: 'Erro ao listar SMS',
        detalhes: { error, filtros }
      });
      throw error;
    }
  }

  async obter(id: string): Promise<MensagemSMS> {
    try {
      const cacheKey = `${this.CACHE_KEY}${id}`;
      const cached = await CacheService.get<MensagemSMS>(cacheKey);
      
      if (cached) {
        return cached;
      }

      const { data } = await axios.get<MensagemSMS>(`/api/sms/${id}`);
      
      await CacheService.set(cacheKey, data, this.CACHE_EXPIRACAO);
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SMS,
        mensagem: 'Erro ao obter SMS',
        detalhes: { id, error }
      });
      throw error;
    }
  }

  async enviar(
    mensagem: Omit<MensagemSMS, 'id' | 'status' | 'dataEnvio' | 'dataEntrega' | 'createdAt' | 'updatedAt'>
  ): Promise<MensagemSMS> {
    try {
      const { data } = await axios.post<MensagemSMS>('/api/sms', mensagem);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SMS,
        mensagem: 'SMS enviado',
        detalhes: { sms: data }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SMS,
        mensagem: 'Erro ao enviar SMS',
        detalhes: { mensagem, error }
      });
      throw error;
    }
  }

  async remover(id: string): Promise<void> {
    try {
      await axios.delete(`/api/sms/${id}`);
      
      await CacheService.delete(`${this.CACHE_KEY}${id}`);
      
      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SMS,
        mensagem: 'SMS removido',
        detalhes: { id }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SMS,
        mensagem: 'Erro ao remover SMS',
        detalhes: { id, error }
      });
      throw error;
    }
  }

  async obterConfiguracao(): Promise<SMSConfig> {
    try {
      const { data } = await axios.get<SMSConfig>('/api/sms/config');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SMS,
        mensagem: 'Erro ao obter configuração de SMS',
        detalhes: { error }
      });
      throw error;
    }
  }

  async atualizarConfiguracao(
    config: Partial<Omit<SMSConfig, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<SMSConfig> {
    try {
      const { data } = await axios.patch<SMSConfig>('/api/sms/config', config);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SMS,
        mensagem: 'Configuração de SMS atualizada',
        detalhes: { config }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SMS,
        mensagem: 'Erro ao atualizar configuração de SMS',
        detalhes: { config, error }
      });
      throw error;
    }
  }

  async testarConfiguracao(): Promise<{ sucesso: boolean; mensagem: string }> {
    try {
      const { data } = await axios.post<{ sucesso: boolean; mensagem: string }>(
        '/api/sms/config/testar'
      );

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SMS,
        mensagem: 'Configuração de SMS testada',
        detalhes: data
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SMS,
        mensagem: 'Erro ao testar configuração de SMS',
        detalhes: { error }
      });
      throw error;
    }
  }
}

const smsManager = SMSManager.getInstance();

export const SMSService = {
  async sendMessage(message: SMSMessage): Promise<boolean> {
    return smsManager.sendMessage(message);
  },

  async sendTextMessage(to: string, message: string): Promise<boolean> {
    return smsManager.sendTextMessage(to, message);
  },

  async sendVerificationCode(to: string, code: string): Promise<boolean> {
    return smsManager.sendVerificationCode(to, code);
  },

  async sendPasswordResetCode(to: string, code: string): Promise<boolean> {
    return smsManager.sendPasswordResetCode(to, code);
  },

  async sendNotificationMessage(to: string, notification: any): Promise<boolean> {
    return smsManager.sendNotificationMessage(to, notification);
  },

  async sendWelcomeMessage(to: string, name: string): Promise<boolean> {
    return smsManager.sendWelcomeMessage(to, name);
  },

  async listar(filtros?: SMSFilter): Promise<MensagemSMS[]> {
    return smsManager.listar(filtros);
  },

  async obter(id: string): Promise<MensagemSMS> {
    return smsManager.obter(id);
  },

  async enviar(
    mensagem: Omit<MensagemSMS, 'id' | 'status' | 'dataEnvio' | 'dataEntrega' | 'createdAt' | 'updatedAt'>
  ): Promise<MensagemSMS> {
    return smsManager.enviar(mensagem);
  },

  async remover(id: string): Promise<void> {
    return smsManager.remover(id);
  },

  async obterConfiguracao(): Promise<SMSConfig> {
    return smsManager.obterConfiguracao();
  },

  async atualizarConfiguracao(
    config: Partial<Omit<SMSConfig, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<SMSConfig> {
    return smsManager.atualizarConfiguracao(config);
  },

  async testarConfiguracao(): Promise<{ sucesso: boolean; mensagem: string }> {
    return smsManager.testarConfiguracao();
  }
};

export const smsService = SMSService; 

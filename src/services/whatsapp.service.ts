/**
 * Arquivo: whatsapp.service.ts
 * Caminho: src/services/whatsapp.service.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de WhatsApp
 */

import axios from 'axios';
import { LogService, TipoLog, CategoriaLog } from '@/services/log.service';
import { CacheService } from '@/services/cache.service';
import { I18nService } from '@/services/i18n.service';

/**
 * Serviço de WhatsApp
 * @description Gerencia o envio de mensagens pelo WhatsApp
 * @author DOM
 * @version 1.0.0
 * @since 2025-01-01
 */

export type TipoWhatsApp = 'sistema' | 'usuario' | 'empresa' | 'ponto' | 'ocorrencia' | 'documento' | 'esocial' | 'backup' | 'seguranca';

export type StatusWhatsApp = 'pendente' | 'enviado' | 'entregue' | 'lido' | 'erro';

export type TipoMensagem = 'texto' | 'imagem' | 'audio' | 'video' | 'documento' | 'localizacao' | 'contato' | 'template';

export interface MensagemWhatsApp {
  id: string;
  tipo: TipoWhatsApp;
  tipoMensagem: TipoMensagem;
  mensagem: string;
  destinatario: string;
  status: StatusWhatsApp;
  erro?: string;
  midia?: {
    tipo: string;
    url: string;
    nome?: string;
    legenda?: string;
  };
  template?: {
    nome: string;
    idioma: string;
    variaveis: string[];
  };
  dataEnvio?: Date;
  dataEntrega?: Date;
  dataLeitura?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface WhatsAppFilter {
  tipo?: TipoWhatsApp;
  tipoMensagem?: TipoMensagem;
  status?: StatusWhatsApp;
  dataInicio?: Date;
  dataFim?: Date;
  destinatario?: string;
}

export interface WhatsAppTemplate {
  id: string;
  tipo: TipoWhatsApp;
  nome: string;
  categoria: string;
  idioma: string;
  conteudo: string;
  variaveis: string[];
  aprovado: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WhatsAppConfig {
  id: string;
  provedor: string;
  apiKey: string;
  apiSecret: string;
  numero: string;
  limiteDiario: number;
  createdAt: Date;
  updatedAt: Date;
}

interface WhatsAppMessage {
  to: string;
  type: 'text' | 'template' | 'document' | 'image';
  text?: string;
  template?: {
    name: string;
    language: {
      code: string;
    };
    components?: Array<{
      type: string;
      parameters: Array<{
        type: string;
        text: string;
      }>;
    }>;
  };
  document?: {
    link: string;
    caption?: string;
  };
  image?: {
    link: string;
    caption?: string;
  };
}

class WhatsAppManager {
  private static instance: WhatsAppManager;
  private readonly CACHE_KEY = 'whatsapp:';
  private readonly CACHE_EXPIRACAO = 3600; // 1 hora
  private readonly apiUrl = process.env.WHATSAPP_API_URL || '';
  private readonly apiKey = process.env.WHATSAPP_API_KEY || '';
  private readonly phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || '';

  private constructor() {}

  static getInstance(): WhatsAppManager {
    if (!WhatsAppManager.instance) {
      WhatsAppManager.instance = new WhatsAppManager();
    }
    return WhatsAppManager.instance;
  }

  async sendMessage(message: WhatsAppMessage): Promise<boolean> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: message.to,
          type: message.type,
          ...(message.text && { text: { body: message.text } }),
          ...(message.template && { template: message.template }),
          ...(message.document && { document: message.document }),
          ...(message.image && { image: message.image })
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
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Mensagem WhatsApp enviada com sucesso',
        detalhes: { to: message.to, type: message.type }
      });

      return true;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao enviar mensagem WhatsApp',
        detalhes: { error, message }
      });

      return false;
    }
  }

  async sendTextMessage(to: string, text: string): Promise<boolean> {
    return this.sendMessage({
      to,
      type: 'text',
      text
    });
  }

  async sendTemplateMessage(
    to: string,
    templateName: string,
    languageCode: string,
    parameters?: Array<{ type: string; text: string }>
  ): Promise<boolean> {
    return this.sendMessage({
      to,
      type: 'template',
      template: {
        name: templateName,
        language: {
          code: languageCode
        },
        ...(parameters && {
          components: [{
            type: 'body',
            parameters
          }]
        })
      }
    });
  }

  async sendDocumentMessage(to: string, documentUrl: string, caption?: string): Promise<boolean> {
    return this.sendMessage({
      to,
      type: 'document',
      document: {
        link: documentUrl,
        caption
      }
    });
  }

  async sendImageMessage(to: string, imageUrl: string, caption?: string): Promise<boolean> {
    return this.sendMessage({
      to,
      type: 'image',
      image: {
        link: imageUrl,
        caption
      }
    });
  }

  async sendWelcomeMessage(to: string, name: string): Promise<boolean> {
    return this.sendTemplateMessage(
      to,
      'welcome_template',
      'pt_BR',
      [{ type: 'text', text: name }]
    );
  }

  async sendPasswordResetMessage(to: string, resetToken: string): Promise<boolean> {
    return this.sendTemplateMessage(
      to,
      'password_reset_template',
      'pt_BR',
      [{ type: 'text', text: resetToken }]
    );
  }

  async sendNotificationMessage(to: string, notification: any): Promise<boolean> {
    const title = notification?.title || 'Notificação';
    const message = notification?.message || 'Você tem uma nova notificação';
    const action = notification?.action;

    return this.sendTemplateMessage(
      to,
      'notification_template',
      'pt_BR',
      [
        { type: 'text', text: title },
        { type: 'text', text: message },
        ...(action ? [{ type: 'text', text: action }] : [])
      ]
    );
  }

  async listar(filtros?: WhatsAppFilter): Promise<MensagemWhatsApp[]> {
    try {
      const { data } = await axios.get<MensagemWhatsApp[]>('/api/whatsapp', {
        params: {
          ...filtros,
          dataInicio: filtros?.dataInicio?.toISOString(),
          dataFim: filtros?.dataFim?.toISOString()
        }
      });
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao listar mensagens WhatsApp',
        detalhes: { error }
      });
      throw error;
    }
  }

  async obter(id: string): Promise<MensagemWhatsApp> {
    try {
      const { data } = await axios.get<MensagemWhatsApp>(`/api/whatsapp/${id}`);
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao obter mensagem WhatsApp',
        detalhes: { id, error }
      });
      throw error;
    }
  }

  async enviar(
    mensagem: Omit<MensagemWhatsApp, 'id' | 'status' | 'dataEnvio' | 'dataEntrega' | 'dataLeitura' | 'createdAt' | 'updatedAt'>
  ): Promise<MensagemWhatsApp> {
    try {
      const { data } = await axios.post<MensagemWhatsApp>('/api/whatsapp', mensagem);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Mensagem WhatsApp enviada',
        detalhes: { mensagemId: data.id }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao enviar mensagem WhatsApp',
        detalhes: { error }
      });
      throw error;
    }
  }

  async remover(id: string): Promise<void> {
    try {
      await axios.delete(`/api/whatsapp/${id}`);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Mensagem WhatsApp removida',
        detalhes: { id }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao remover mensagem WhatsApp',
        detalhes: { id, error }
      });
      throw error;
    }
  }

  async listarTemplates(): Promise<WhatsAppTemplate[]> {
    try {
      const { data } = await axios.get<WhatsAppTemplate[]>('/api/whatsapp/templates');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao listar templates WhatsApp',
        detalhes: { error }
      });
      throw error;
    }
  }

  async obterTemplate(id: string): Promise<WhatsAppTemplate> {
    try {
      const { data } = await axios.get<WhatsAppTemplate>(`/api/whatsapp/templates/${id}`);
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao obter template WhatsApp',
        detalhes: { id, error }
      });
      throw error;
    }
  }

  async criarTemplate(
    template: Omit<WhatsAppTemplate, 'id' | 'aprovado' | 'createdAt' | 'updatedAt'>
  ): Promise<WhatsAppTemplate> {
    try {
      const { data } = await axios.post<WhatsAppTemplate>('/api/whatsapp/templates', template);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Template WhatsApp criado',
        detalhes: { templateId: data.id }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao criar template WhatsApp',
        detalhes: { error }
      });
      throw error;
    }
  }

  async atualizarTemplate(
    id: string,
    template: Partial<Omit<WhatsAppTemplate, 'id' | 'aprovado' | 'createdAt' | 'updatedAt'>>
  ): Promise<WhatsAppTemplate> {
    try {
      const { data } = await axios.put<WhatsAppTemplate>(`/api/whatsapp/templates/${id}`, template);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Template WhatsApp atualizado',
        detalhes: { templateId: id }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao atualizar template WhatsApp',
        detalhes: { id, error }
      });
      throw error;
    }
  }

  async removerTemplate(id: string): Promise<void> {
    try {
      await axios.delete(`/api/whatsapp/templates/${id}`);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Template WhatsApp removido',
        detalhes: { id }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao remover template WhatsApp',
        detalhes: { id, error }
      });
      throw error;
    }
  }

  async obterConfiguracao(): Promise<WhatsAppConfig> {
    try {
      const { data } = await axios.get<WhatsAppConfig>('/api/whatsapp/configuracao');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao obter configuração WhatsApp',
        detalhes: { error }
      });
      throw error;
    }
  }

  async atualizarConfiguracao(
    config: Partial<Omit<WhatsAppConfig, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<WhatsAppConfig> {
    try {
      const { data } = await axios.put<WhatsAppConfig>('/api/whatsapp/configuracao', config);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Configuração WhatsApp atualizada',
        detalhes: { provedor: config.provedor }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao atualizar configuração WhatsApp',
        detalhes: { error }
      });
      throw error;
    }
  }

  async testarConfiguracao(): Promise<{ sucesso: boolean; mensagem: string }> {
    try {
      const { data } = await axios.post<{ sucesso: boolean; mensagem: string }>('/api/whatsapp/configuracao/teste');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao testar configuração WhatsApp',
        detalhes: { error }
      });
      throw error;
    }
  }

  async obterEstatisticas(): Promise<{
    total: number;
    porTipo: Record<TipoWhatsApp, number>;
    porTipoMensagem: Record<TipoMensagem, number>;
    porStatus: Record<StatusWhatsApp, number>;
    limiteDiario: number;
    enviadosHoje: number;
  }> {
    try {
      const { data } = await axios.get('/api/whatsapp/estatisticas');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao obter estatísticas WhatsApp',
        detalhes: { error }
      });
      throw error;
    }
  }
}

export const whatsappManager = WhatsAppManager.getInstance();

export const WhatsAppService = {
  async sendMessage(message: WhatsAppMessage): Promise<boolean> {
    return whatsappManager.sendMessage(message);
  },

  async sendTextMessage(to: string, text: string): Promise<boolean> {
    return whatsappManager.sendTextMessage(to, text);
  },

  async sendTemplateMessage(
    to: string,
    templateName: string,
    languageCode: string,
    parameters?: Array<{ type: string; text: string }>
  ): Promise<boolean> {
    return whatsappManager.sendTemplateMessage(to, templateName, languageCode, parameters);
  },

  async sendDocumentMessage(to: string, documentUrl: string, caption?: string): Promise<boolean> {
    return whatsappManager.sendDocumentMessage(to, documentUrl, caption);
  },

  async sendImageMessage(to: string, imageUrl: string, caption?: string): Promise<boolean> {
    return whatsappManager.sendImageMessage(to, imageUrl, caption);
  },

  async sendWelcomeMessage(to: string, name: string): Promise<boolean> {
    return whatsappManager.sendWelcomeMessage(to, name);
  },

  async sendPasswordResetMessage(to: string, resetToken: string): Promise<boolean> {
    return whatsappManager.sendPasswordResetMessage(to, resetToken);
  },

  async sendNotificationMessage(to: string, notification: any): Promise<boolean> {
    return whatsappManager.sendNotificationMessage(to, notification);
  },

  async listar(filtros?: WhatsAppFilter): Promise<MensagemWhatsApp[]> {
    return whatsappManager.listar(filtros);
  },

  async obter(id: string): Promise<MensagemWhatsApp> {
    return whatsappManager.obter(id);
  },

  async enviar(
    mensagem: Omit<MensagemWhatsApp, 'id' | 'status' | 'dataEnvio' | 'dataEntrega' | 'dataLeitura' | 'createdAt' | 'updatedAt'>
  ): Promise<MensagemWhatsApp> {
    return whatsappManager.enviar(mensagem);
  },

  async remover(id: string): Promise<void> {
    return whatsappManager.remover(id);
  },

  async listarTemplates(): Promise<WhatsAppTemplate[]> {
    return whatsappManager.listarTemplates();
  },

  async obterTemplate(id: string): Promise<WhatsAppTemplate> {
    return whatsappManager.obterTemplate(id);
  },

  async criarTemplate(
    template: Omit<WhatsAppTemplate, 'id' | 'aprovado' | 'createdAt' | 'updatedAt'>
  ): Promise<WhatsAppTemplate> {
    return whatsappManager.criarTemplate(template);
  },

  async atualizarTemplate(
    id: string,
    template: Partial<Omit<WhatsAppTemplate, 'id' | 'aprovado' | 'createdAt' | 'updatedAt'>>
  ): Promise<WhatsAppTemplate> {
    return whatsappManager.atualizarTemplate(id, template);
  },

  async removerTemplate(id: string): Promise<void> {
    return whatsappManager.removerTemplate(id);
  },

  async obterConfiguracao(): Promise<WhatsAppConfig> {
    return whatsappManager.obterConfiguracao();
  },

  async atualizarConfiguracao(
    config: Partial<Omit<WhatsAppConfig, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<WhatsAppConfig> {
    return whatsappManager.atualizarConfiguracao(config);
  },

  async testarConfiguracao(): Promise<{ sucesso: boolean; mensagem: string }> {
    return whatsappManager.testarConfiguracao();
  },

  async obterEstatisticas(): Promise<{
    total: number;
    porTipo: Record<TipoWhatsApp, number>;
    porTipoMensagem: Record<TipoMensagem, number>;
    porStatus: Record<StatusWhatsApp, number>;
    limiteDiario: number;
    enviadosHoje: number;
  }> {
    return whatsappManager.obterEstatisticas();
  }
}; 

import axios from 'axios';
import { LogService, TipoLog, CategoriaLog } from './log.service';
import { CacheService } from './cache.service';
import { I18nService } from './i18n.service';

/**
 * Serviço de WhatsApp
 * @description Gerencia o envio de mensagens pelo WhatsApp
 * @author DOM
 * @version 1.0.0
 * @since 2024-01-01
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

export const WhatsAppService = {
  private readonly CACHE_KEY = 'whatsapp:';
  private readonly CACHE_EXPIRACAO = 3600; // 1 hora

  /**
   * Lista todas as mensagens
   * @param filtros Filtros para a listagem
   * @returns Lista de mensagens
   */
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
        mensagem: 'Erro ao listar mensagens do WhatsApp',
        detalhes: { filtros, error }
      });
      throw error;
    }
  },

  /**
   * Obtém uma mensagem específica
   * @param id ID da mensagem
   * @returns Mensagem
   */
  async obter(id: string): Promise<MensagemWhatsApp> {
    try {
      const { data } = await axios.get<MensagemWhatsApp>(`/api/whatsapp/${id}`);
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao obter mensagem do WhatsApp',
        detalhes: { id, error }
      });
      throw error;
    }
  },

  /**
   * Envia uma nova mensagem
   * @param mensagem Dados da mensagem
   * @returns Mensagem enviada
   */
  async enviar(
    mensagem: Omit<MensagemWhatsApp, 'id' | 'status' | 'dataEnvio' | 'dataEntrega' | 'dataLeitura' | 'createdAt' | 'updatedAt'>
  ): Promise<MensagemWhatsApp> {
    try {
      const { data } = await axios.post<MensagemWhatsApp>('/api/whatsapp', mensagem);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Mensagem do WhatsApp enviada',
        detalhes: { mensagem: data }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao enviar mensagem do WhatsApp',
        detalhes: { mensagem, error }
      });
      throw error;
    }
  },

  /**
   * Remove uma mensagem
   * @param id ID da mensagem
   */
  async remover(id: string): Promise<void> {
    try {
      await axios.delete(`/api/whatsapp/${id}`);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Mensagem do WhatsApp removida',
        detalhes: { id }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao remover mensagem do WhatsApp',
        detalhes: { id, error }
      });
      throw error;
    }
  },

  /**
   * Lista os templates
   * @returns Lista de templates
   */
  async listarTemplates(): Promise<WhatsAppTemplate[]> {
    try {
      const { data } = await axios.get<WhatsAppTemplate[]>('/api/whatsapp/template');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao listar templates do WhatsApp',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Obtém um template específico
   * @param id ID do template
   * @returns Template
   */
  async obterTemplate(id: string): Promise<WhatsAppTemplate> {
    try {
      const { data } = await axios.get<WhatsAppTemplate>(`/api/whatsapp/template/${id}`);
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao obter template do WhatsApp',
        detalhes: { id, error }
      });
      throw error;
    }
  },

  /**
   * Cria um novo template
   * @param template Dados do template
   * @returns Template criado
   */
  async criarTemplate(
    template: Omit<WhatsAppTemplate, 'id' | 'aprovado' | 'createdAt' | 'updatedAt'>
  ): Promise<WhatsAppTemplate> {
    try {
      const { data } = await axios.post<WhatsAppTemplate>('/api/whatsapp/template', template);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Template do WhatsApp criado',
        detalhes: { template: data }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao criar template do WhatsApp',
        detalhes: { template, error }
      });
      throw error;
    }
  },

  /**
   * Atualiza um template
   * @param id ID do template
   * @param template Novos dados do template
   * @returns Template atualizado
   */
  async atualizarTemplate(
    id: string,
    template: Partial<Omit<WhatsAppTemplate, 'id' | 'aprovado' | 'createdAt' | 'updatedAt'>>
  ): Promise<WhatsAppTemplate> {
    try {
      const { data } = await axios.patch<WhatsAppTemplate>(`/api/whatsapp/template/${id}`, template);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Template do WhatsApp atualizado',
        detalhes: { id, template }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao atualizar template do WhatsApp',
        detalhes: { id, template, error }
      });
      throw error;
    }
  },

  /**
   * Remove um template
   * @param id ID do template
   */
  async removerTemplate(id: string): Promise<void> {
    try {
      await axios.delete(`/api/whatsapp/template/${id}`);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Template do WhatsApp removido',
        detalhes: { id }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao remover template do WhatsApp',
        detalhes: { id, error }
      });
      throw error;
    }
  },

  /**
   * Obtém a configuração do WhatsApp
   * @returns Configuração
   */
  async obterConfiguracao(): Promise<WhatsAppConfig> {
    try {
      const { data } = await axios.get<WhatsAppConfig>('/api/whatsapp/config');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao obter configuração do WhatsApp',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Atualiza a configuração do WhatsApp
   * @param config Novos dados da configuração
   * @returns Configuração atualizada
   */
  async atualizarConfiguracao(
    config: Partial<Omit<WhatsAppConfig, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<WhatsAppConfig> {
    try {
      const { data } = await axios.patch<WhatsAppConfig>('/api/whatsapp/config', config);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Configuração do WhatsApp atualizada',
        detalhes: { config }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao atualizar configuração do WhatsApp',
        detalhes: { config, error }
      });
      throw error;
    }
  },

  /**
   * Testa a configuração do WhatsApp
   * @returns Resultado do teste
   */
  async testarConfiguracao(): Promise<{ sucesso: boolean; mensagem: string }> {
    try {
      const { data } = await axios.post<{ sucesso: boolean; mensagem: string }>(
        '/api/whatsapp/config/testar'
      );

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Configuração do WhatsApp testada',
        detalhes: data
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WHATSAPP,
        mensagem: 'Erro ao testar configuração do WhatsApp',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Obtém estatísticas das mensagens
   * @returns Estatísticas
   */
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
        mensagem: 'Erro ao obter estatísticas do WhatsApp',
        detalhes: { error }
      });
      throw error;
    }
  }
}; 
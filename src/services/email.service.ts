import axios from 'axios';
import { LogService, TipoLog, CategoriaLog } from './log.service';
import { CacheService } from './cache.service';
import { I18nService } from './i18n.service';

/**
 * Serviço de Email
 * @description Gerencia o envio de emails do sistema
 * @author DOM
 * @version 1.0.0
 * @since 2024-01-01
 */

export type TipoEmail = 'sistema' | 'usuario' | 'empresa' | 'ponto' | 'ocorrencia' | 'documento' | 'esocial' | 'backup' | 'seguranca';

export type StatusEmail = 'pendente' | 'enviado' | 'erro';

export interface Email {
  id: string;
  tipo: TipoEmail;
  assunto: string;
  conteudo: string;
  remetente: string;
  destinatarios: string[];
  copias?: string[];
  copiasOcultas?: string[];
  anexos?: {
    nome: string;
    tipo: string;
    tamanho: number;
    url: string;
  }[];
  status: StatusEmail;
  erro?: string;
  dataEnvio?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailFilter {
  tipo?: TipoEmail;
  status?: StatusEmail;
  dataInicio?: Date;
  dataFim?: Date;
  destinatario?: string;
}

export interface EmailTemplate {
  id: string;
  tipo: TipoEmail;
  nome: string;
  assunto: string;
  conteudo: string;
  variaveis: string[];
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailConfig {
  id: string;
  servidor: string;
  porta: number;
  seguranca: 'nenhuma' | 'ssl' | 'tls';
  usuario: string;
  senha: string;
  remetente: string;
  limiteDiario: number;
  createdAt: Date;
  updatedAt: Date;
}

export const EmailService = {
  private readonly CACHE_KEY = 'email:';
  private readonly CACHE_EXPIRACAO = 3600; // 1 hora

  /**
   * Lista todos os emails
   * @param filtros Filtros para a listagem
   * @returns Lista de emails
   */
  async listar(filtros?: EmailFilter): Promise<Email[]> {
    try {
      const { data } = await axios.get<Email[]>('/api/email', {
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
        categoria: CategoriaLog.EMAIL,
        mensagem: 'Erro ao listar emails',
        detalhes: { filtros, error }
      });
      throw error;
    }
  },

  /**
   * Obtém um email específico
   * @param id ID do email
   * @returns Email
   */
  async obter(id: string): Promise<Email> {
    try {
      const { data } = await axios.get<Email>(`/api/email/${id}`);
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.EMAIL,
        mensagem: 'Erro ao obter email',
        detalhes: { id, error }
      });
      throw error;
    }
  },

  /**
   * Envia um novo email
   * @param email Dados do email
   * @returns Email enviado
   */
  async enviar(
    email: Omit<Email, 'id' | 'status' | 'dataEnvio' | 'createdAt' | 'updatedAt'>
  ): Promise<Email> {
    try {
      const { data } = await axios.post<Email>('/api/email', email);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.EMAIL,
        mensagem: 'Email enviado',
        detalhes: { email: data }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.EMAIL,
        mensagem: 'Erro ao enviar email',
        detalhes: { email, error }
      });
      throw error;
    }
  },

  /**
   * Remove um email
   * @param id ID do email
   */
  async remover(id: string): Promise<void> {
    try {
      await axios.delete(`/api/email/${id}`);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.EMAIL,
        mensagem: 'Email removido',
        detalhes: { id }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.EMAIL,
        mensagem: 'Erro ao remover email',
        detalhes: { id, error }
      });
      throw error;
    }
  },

  /**
   * Lista os templates de email
   * @returns Lista de templates
   */
  async listarTemplates(): Promise<EmailTemplate[]> {
    try {
      const { data } = await axios.get<EmailTemplate[]>('/api/email/template');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.EMAIL,
        mensagem: 'Erro ao listar templates de email',
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
  async obterTemplate(id: string): Promise<EmailTemplate> {
    try {
      const { data } = await axios.get<EmailTemplate>(`/api/email/template/${id}`);
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.EMAIL,
        mensagem: 'Erro ao obter template de email',
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
    template: Omit<EmailTemplate, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<EmailTemplate> {
    try {
      const { data } = await axios.post<EmailTemplate>('/api/email/template', template);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.EMAIL,
        mensagem: 'Template de email criado',
        detalhes: { template: data }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.EMAIL,
        mensagem: 'Erro ao criar template de email',
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
    template: Partial<Omit<EmailTemplate, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<EmailTemplate> {
    try {
      const { data } = await axios.patch<EmailTemplate>(`/api/email/template/${id}`, template);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.EMAIL,
        mensagem: 'Template de email atualizado',
        detalhes: { id, template }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.EMAIL,
        mensagem: 'Erro ao atualizar template de email',
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
      await axios.delete(`/api/email/template/${id}`);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.EMAIL,
        mensagem: 'Template de email removido',
        detalhes: { id }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.EMAIL,
        mensagem: 'Erro ao remover template de email',
        detalhes: { id, error }
      });
      throw error;
    }
  },

  /**
   * Obtém a configuração de email
   * @returns Configuração
   */
  async obterConfiguracao(): Promise<EmailConfig> {
    try {
      const { data } = await axios.get<EmailConfig>('/api/email/config');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.EMAIL,
        mensagem: 'Erro ao obter configuração de email',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Atualiza a configuração de email
   * @param config Novos dados da configuração
   * @returns Configuração atualizada
   */
  async atualizarConfiguracao(
    config: Partial<Omit<EmailConfig, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<EmailConfig> {
    try {
      const { data } = await axios.patch<EmailConfig>('/api/email/config', config);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.EMAIL,
        mensagem: 'Configuração de email atualizada',
        detalhes: { config }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.EMAIL,
        mensagem: 'Erro ao atualizar configuração de email',
        detalhes: { config, error }
      });
      throw error;
    }
  },

  /**
   * Testa a configuração de email
   * @returns Resultado do teste
   */
  async testarConfiguracao(): Promise<{ sucesso: boolean; mensagem: string }> {
    try {
      const { data } = await axios.post<{ sucesso: boolean; mensagem: string }>(
        '/api/email/config/testar'
      );

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.EMAIL,
        mensagem: 'Configuração de email testada',
        detalhes: data
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.EMAIL,
        mensagem: 'Erro ao testar configuração de email',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Obtém estatísticas dos emails
   * @returns Estatísticas
   */
  async obterEstatisticas(): Promise<{
    total: number;
    porTipo: Record<TipoEmail, number>;
    porStatus: Record<StatusEmail, number>;
    limiteDiario: number;
    enviadosHoje: number;
  }> {
    try {
      const { data } = await axios.get('/api/email/estatisticas');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.EMAIL,
        mensagem: 'Erro ao obter estatísticas de email',
        detalhes: { error }
      });
      throw error;
    }
  }
}; 
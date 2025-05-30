import { LogService, TipoLog, CategoriaLog } from './log.service';
import { CacheService } from './cache.service';
import { I18nService } from './i18n.service';

/**
 * Serviço de Push
 * @description Gerencia as notificações push do sistema
 * @author DOM
 * @version 1.0.0
 * @since 2024-01-01
 */

export type TipoPush = 'sistema' | 'usuario' | 'empresa' | 'ponto' | 'ocorrencia' | 'documento' | 'esocial' | 'backup' | 'seguranca';

export type StatusPush = 'pendente' | 'enviado' | 'entregue' | 'erro';

export interface Push {
  id: string;
  tipo: TipoPush;
  titulo: string;
  mensagem: string;
  icone?: string;
  imagem?: string;
  link?: string;
  dados?: Record<string, unknown>;
  destinatarios: string[];
  status: StatusPush;
  erro?: string;
  dataEnvio?: Date;
  dataEntrega?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PushFilter {
  tipo?: TipoPush;
  status?: StatusPush;
  dataInicio?: Date;
  dataFim?: Date;
  destinatario?: string;
}

export interface PushTemplate {
  id: string;
  tipo: TipoPush;
  nome: string;
  titulo: string;
  mensagem: string;
  icone?: string;
  imagem?: string;
  link?: string;
  variaveis: string[];
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PushConfig {
  id: string;
  provedor: string;
  apiKey: string;
  apiSecret: string;
  limiteDiario: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PushSubscription {
  id: string;
  usuarioId: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const PushService = {
  private readonly CACHE_KEY = 'push:';
  private readonly CACHE_EXPIRACAO = 3600; // 1 hora

  /**
   * Lista todas as notificações push
   * @param filtros Filtros para a listagem
   * @returns Lista de notificações
   */
  async listar(filtros?: PushFilter): Promise<Push[]> {
    try {
      const { data } = await axios.get<Push[]>('/api/push', {
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
        categoria: CategoriaLog.PUSH,
        mensagem: 'Erro ao listar notificações push',
        detalhes: { filtros, error }
      });
      throw error;
    }
  },

  /**
   * Obtém uma notificação específica
   * @param id ID da notificação
   * @returns Notificação
   */
  async obter(id: string): Promise<Push> {
    try {
      const { data } = await axios.get<Push>(`/api/push/${id}`);
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
  },

  /**
   * Envia uma nova notificação
   * @param push Dados da notificação
   * @returns Notificação enviada
   */
  async enviar(
    push: Omit<Push, 'id' | 'status' | 'dataEnvio' | 'dataEntrega' | 'createdAt' | 'updatedAt'>
  ): Promise<Push> {
    try {
      const { data } = await axios.post<Push>('/api/push', push);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Notificação push enviada',
        detalhes: { push: data }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Erro ao enviar notificação push',
        detalhes: { push, error }
      });
      throw error;
    }
  },

  /**
   * Remove uma notificação
   * @param id ID da notificação
   */
  async remover(id: string): Promise<void> {
    try {
      await axios.delete(`/api/push/${id}`);

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
  },

  /**
   * Lista os templates
   * @returns Lista de templates
   */
  async listarTemplates(): Promise<PushTemplate[]> {
    try {
      const { data } = await axios.get<PushTemplate[]>('/api/push/template');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Erro ao listar templates de push',
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
  async obterTemplate(id: string): Promise<PushTemplate> {
    try {
      const { data } = await axios.get<PushTemplate>(`/api/push/template/${id}`);
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Erro ao obter template de push',
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
    template: Omit<PushTemplate, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<PushTemplate> {
    try {
      const { data } = await axios.post<PushTemplate>('/api/push/template', template);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Template de push criado',
        detalhes: { template: data }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Erro ao criar template de push',
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
    template: Partial<Omit<PushTemplate, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<PushTemplate> {
    try {
      const { data } = await axios.patch<PushTemplate>(`/api/push/template/${id}`, template);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Template de push atualizado',
        detalhes: { id, template }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Erro ao atualizar template de push',
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
      await axios.delete(`/api/push/template/${id}`);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Template de push removido',
        detalhes: { id }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Erro ao remover template de push',
        detalhes: { id, error }
      });
      throw error;
    }
  },

  /**
   * Obtém a configuração do serviço
   * @returns Configuração
   */
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
  },

  /**
   * Atualiza a configuração do serviço
   * @param config Novos dados da configuração
   * @returns Configuração atualizada
   */
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
  },

  /**
   * Testa a configuração do serviço
   * @returns Resultado do teste
   */
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
  },

  /**
   * Obtém estatísticas das notificações
   * @returns Estatísticas
   */
  async obterEstatisticas(): Promise<{
    total: number;
    porTipo: Record<TipoPush, number>;
    porStatus: Record<StatusPush, number>;
    limiteDiario: number;
    enviadosHoje: number;
  }> {
    try {
      const { data } = await axios.get('/api/push/estatisticas');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Erro ao obter estatísticas de push',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Registra uma nova inscrição
   * @param subscription Dados da inscrição
   * @returns Inscrição registrada
   */
  async registrarInscricao(
    subscription: Omit<PushSubscription, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<PushSubscription> {
    try {
      const { data } = await axios.post<PushSubscription>('/api/push/subscription', subscription);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Inscrição de push registrada',
        detalhes: { subscription: data }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Erro ao registrar inscrição de push',
        detalhes: { subscription, error }
      });
      throw error;
    }
  },

  /**
   * Remove uma inscrição
   * @param id ID da inscrição
   */
  async removerInscricao(id: string): Promise<void> {
    try {
      await axios.delete(`/api/push/subscription/${id}`);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Inscrição de push removida',
        detalhes: { id }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Erro ao remover inscrição de push',
        detalhes: { id, error }
      });
      throw error;
    }
  },

  /**
   * Lista as inscrições de um usuário
   * @param usuarioId ID do usuário
   * @returns Lista de inscrições
   */
  async listarInscricoes(usuarioId: string): Promise<PushSubscription[]> {
    try {
      const { data } = await axios.get<PushSubscription[]>(`/api/push/subscription/usuario/${usuarioId}`);
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PUSH,
        mensagem: 'Erro ao listar inscrições de push',
        detalhes: { usuarioId, error }
      });
      throw error;
    }
  }
}; 
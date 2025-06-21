/**
 * Arquivo: notification.service.ts
 * Caminho: src/services/notification.service.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de notificações
 */

import axios from 'axios';
import { LogService, TipoLog, CategoriaLog } from '@/services/log.service';

/**
 * Serviço de Notificação
 * @description Gerencia notificações do sistema
 * @author DOM
 * @version 1.0.0
 * @since 2025-01-01
 */

export interface Notificacao {
  id: string;
  tipo: 'SISTEMA' | 'PONTO' | 'OCORRENCIA' | 'DOCUMENTO' | 'ESOCIAL' | 'BACKUP' | 'SEGURANCA';
  titulo: string;
  mensagem: string;
  prioridade: 'BAIXA' | 'MEDIA' | 'ALTA' | 'URGENTE';
  status: 'NAO_LIDA' | 'LIDA' | 'ARQUIVADA';
  destinatarioId: string;
  remetenteId?: string;
  dataEnvio: Date;
  dataLeitura?: Date;
  dataArquivamento?: Date;
  acao?: {
    tipo: 'LINK' | 'BOTAO' | 'FORMULARIO';
    texto: string;
    url?: string;
    dados?: Record<string, unknown>;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificacaoFilter {
  tipo?: Notificacao['tipo'];
  prioridade?: Notificacao['prioridade'];
  status?: Notificacao['status'];
  dataInicio?: Date;
  dataFim?: Date;
  destinatarioId?: string;
  remetenteId?: string;
}

export interface NotificacaoConfig {
  id: string;
  usuarioId: string;
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
  push: boolean;
  tipos: Notificacao['tipo'][];
  prioridades: Notificacao['prioridade'][];
  createdAt: Date;
  updatedAt: Date;
}

export const NotificationService = {
  /**
   * Lista todas as notificações
   * @param filtros Filtros para a listagem
   * @returns Lista de notificações
   */
  async listar(filtros?: NotificacaoFilter): Promise<Notificacao[]> {
    try {
      const { data } = await axios.get<Notificacao[]>('/api/notificacao', {
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
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao listar notificações',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Obtém uma notificação específica
   * @param id ID da notificação
   * @returns Notificação
   */
  async obter(id: string): Promise<Notificacao> {
    try {
      const { data } = await axios.get<Notificacao>(`/api/notificacao/${id}`);
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao obter notificação',
        detalhes: { id, error }
      });
      throw error;
    }
  },

  /**
   * Cria uma nova notificação
   * @param notificacao Dados da notificação
   * @returns Notificação criada
   */
  async criar(
    notificacao: Omit<Notificacao, 'id' | 'status' | 'dataEnvio' | 'createdAt' | 'updatedAt'>
  ): Promise<Notificacao> {
    try {
      const { data } = await axios.post<Notificacao>('/api/notificacao', notificacao);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Notificação criada',
        detalhes: { notificacao }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao criar notificação',
        detalhes: { notificacao, error }
      });
      throw error;
    }
  },

  /**
   * Marca uma notificação como lida
   * @param id ID da notificação
   * @returns Notificação atualizada
   */
  async marcarComoLida(id: string): Promise<Notificacao> {
    try {
      const { data } = await axios.post<Notificacao>(`/api/notificacao/${id}/ler`);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Notificação marcada como lida',
        detalhes: { id }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao marcar notificação como lida',
        detalhes: { id, error }
      });
      throw error;
    }
  },

  /**
   * Marca uma notificação como arquivada
   * @param id ID da notificação
   * @returns Notificação atualizada
   */
  async arquivar(id: string): Promise<Notificacao> {
    try {
      const { data } = await axios.post<Notificacao>(`/api/notificacao/${id}/arquivar`);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Notificação arquivada',
        detalhes: { id }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao arquivar notificação',
        detalhes: { id, error }
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
      await axios.delete(`/api/notificacao/${id}`);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Notificação removida',
        detalhes: { id }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao remover notificação',
        detalhes: { id, error }
      });
      throw error;
    }
  },

  /**
   * Marca todas as notificações como lidas
   * @param filtros Filtros para as notificações
   * @returns Número de notificações atualizadas
   */
  async marcarTodasComoLidas(filtros?: NotificacaoFilter): Promise<{ atualizadas: number }> {
    try {
      const { data } = await axios.post<{ atualizadas: number }>(
        '/api/notificacao/marcar-todas-lidas',
        filtros
      );

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Todas as notificações marcadas como lidas',
        detalhes: { filtros, atualizadas: data.atualizadas }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao marcar todas as notificações como lidas',
        detalhes: { filtros, error }
      });
      throw error;
    }
  },

  /**
   * Arquivar todas as notificações
   * @param filtros Filtros para as notificações
   * @returns Número de notificações arquivadas
   */
  async arquivarTodas(filtros?: NotificacaoFilter): Promise<{ arquivadas: number }> {
    try {
      const { data } = await axios.post<{ arquivadas: number }>(
        '/api/notificacao/arquivar-todas',
        filtros
      );

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Todas as notificações arquivadas',
        detalhes: { filtros, arquivadas: data.arquivadas }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao arquivar todas as notificações',
        detalhes: { filtros, error }
      });
      throw error;
    }
  },

  /**
   * Remove todas as notificações
   * @param filtros Filtros para as notificações
   * @returns Número de notificações removidas
   */
  async removerTodas(filtros?: NotificacaoFilter): Promise<{ removidas: number }> {
    try {
      const { data } = await axios.post<{ removidas: number }>(
        '/api/notificacao/remover-todas',
        filtros
      );

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Todas as notificações removidas',
        detalhes: { filtros, removidas: data.removidas }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao remover todas as notificações',
        detalhes: { filtros, error }
      });
      throw error;
    }
  },

  /**
   * Obtém a configuração de notificações
   * @param usuarioId ID do usuário
   * @returns Configuração de notificações
   */
  async obterConfiguracao(usuarioId: string): Promise<NotificacaoConfig> {
    try {
      const { data } = await axios.get<NotificacaoConfig>(`/api/notificacao/configuracao/${usuarioId}`);
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao obter configuração de notificações',
        detalhes: { usuarioId, error }
      });
      throw error;
    }
  },

  /**
   * Atualiza a configuração de notificações
   * @param config Nova configuração
   * @returns Configuração atualizada
   */
  async atualizarConfiguracao(
    config: Partial<Omit<NotificacaoConfig, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<NotificacaoConfig> {
    try {
      const { data } = await axios.put<NotificacaoConfig>('/api/notificacao/configuracao', config);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Configuração de notificações atualizada',
        detalhes: { config }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao atualizar configuração de notificações',
        detalhes: { config, error }
      });
      throw error;
    }
  },

  /**
   * Obtém estatísticas de notificações
   * @param filtros Filtros para as estatísticas
   * @returns Estatísticas de notificações
   */
  async obterEstatisticas(filtros?: NotificacaoFilter): Promise<{
    total: number;
    naoLidas: number;
    lidas: number;
    arquivadas: number;
    porTipo: Record<Notificacao['tipo'], number>;
    porPrioridade: Record<Notificacao['prioridade'], number>;
  }> {
    try {
      const { data } = await axios.get<{
        total: number;
        naoLidas: number;
        lidas: number;
        arquivadas: number;
        porTipo: Record<Notificacao['tipo'], number>;
        porPrioridade: Record<Notificacao['prioridade'], number>;
      }>('/api/notificacao/estatisticas', {
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
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao obter estatísticas de notificações',
        detalhes: { filtros, error }
      });
      throw error;
    }
  }
}; 

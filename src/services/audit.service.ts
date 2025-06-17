/**
 * Arquivo: audit.service.ts
 * Caminho: src/services/audit.service.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de auditoria
 */

import axios from 'axios';
import { LogService, TipoLog, CategoriaLog } from './log.service';

/**
 * Serviço de Auditoria
 * @description Gerencia registros de auditoria do sistema
 * @author DOM
 * @version 1.0.0
 * @since 2025-01-01
 */

export interface AuditLog {
  id: string;
  tipo: 'CRIACAO' | 'ATUALIZACAO' | 'EXCLUSAO' | 'CONSULTA' | 'EXPORTACAO' | 'IMPORTACAO' | 'LOGIN' | 'LOGOUT' | 'PERMISSAO' | 'CONFIGURACAO';
  categoria: 'USUARIO' | 'EMPREGADO' | 'PONTO' | 'OCORRENCIA' | 'DOCUMENTO' | 'ESOCIAL' | 'BACKUP' | 'SEGURANCA' | 'SISTEMA';
  usuarioId: string;
  ip: string;
  userAgent: string;
  recurso: string;
  recursoId: string;
  acao: string;
  detalhes: Record<string, unknown>;
  dadosAntigos?: Record<string, unknown>;
  dadosNovos?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditFilter {
  tipo?: AuditLog['tipo'];
  categoria?: AuditLog['categoria'];
  usuarioId?: string;
  recurso?: string;
  recursoId?: string;
  dataInicio?: Date;
  dataFim?: Date;
}

export const AuditService = {
  /**
   * Lista todos os logs de auditoria
   * @param filtros Filtros para a listagem
   * @returns Lista de logs de auditoria
   */
  async listar(filtros?: AuditFilter): Promise<AuditLog[]> {
    try {
      const { data } = await axios.get<AuditLog[]>('/api/audit', {
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
        mensagem: 'Erro ao listar logs de auditoria',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Obtém um log de auditoria específico
   * @param id ID do log
   * @returns Log de auditoria
   */
  async obter(id: string): Promise<AuditLog> {
    try {
      const { data } = await axios.get<AuditLog>(`/api/audit/${id}`);
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao obter log de auditoria',
        detalhes: { id, error }
      });
      throw error;
    }
  },

  /**
   * Registra um novo log de auditoria
   * @param log Dados do log
   * @returns Log registrado
   */
  async registrar(
    log: Omit<AuditLog, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<AuditLog> {
    try {
      const { data } = await axios.post<AuditLog>('/api/audit', log);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Log de auditoria registrado',
        detalhes: { log }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao registrar log de auditoria',
        detalhes: { log, error }
      });
      throw error;
    }
  },

  /**
   * Exporta logs de auditoria
   * @param filtros Filtros para a exportação
   * @param formato Formato do arquivo (csv, xlsx, pdf)
   * @returns URL do arquivo
   */
  async exportar(
    filtros?: AuditFilter,
    formato: 'csv' | 'xlsx' | 'pdf' = 'xlsx'
  ): Promise<string> {
    try {
      const { data } = await axios.post<{ url: string }>('/api/audit/exportar', {
        ...filtros,
        dataInicio: filtros?.dataInicio?.toISOString(),
        dataFim: filtros?.dataFim?.toISOString(),
        formato
      });

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Logs de auditoria exportados',
        detalhes: { filtros, formato }
      });

      return data.url;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao exportar logs de auditoria',
        detalhes: { filtros, formato, error }
      });
      throw error;
    }
  },

  /**
   * Limpa logs de auditoria antigos
   * @param dias Número de dias para manter
   * @returns Número de logs removidos
   */
  async limparLogsAntigos(dias: number): Promise<{ removidos: number }> {
    try {
      const { data } = await axios.post<{ removidos: number }>('/api/audit/limpar', {
        dias
      });

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Logs de auditoria antigos removidos',
        detalhes: { dias, removidos: data.removidos }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao limpar logs de auditoria antigos',
        detalhes: { dias, error }
      });
      throw error;
    }
  },

  /**
   * Obtém estatísticas de auditoria
   * @param filtros Filtros para as estatísticas
   * @returns Estatísticas de auditoria
   */
  async obterEstatisticas(filtros?: AuditFilter): Promise<{
    total: number;
    porTipo: Record<AuditLog['tipo'], number>;
    porCategoria: Record<AuditLog['categoria'], number>;
    porRecurso: Record<string, number>;
    porUsuario: Record<string, number>;
    porDia: Record<string, number>;
    porMes: Record<string, number>;
    porAno: Record<string, number>;
  }> {
    try {
      const { data } = await axios.get<{
        total: number;
        porTipo: Record<AuditLog['tipo'], number>;
        porCategoria: Record<AuditLog['categoria'], number>;
        porRecurso: Record<string, number>;
        porUsuario: Record<string, number>;
        porDia: Record<string, number>;
        porMes: Record<string, number>;
        porAno: Record<string, number>;
      }>('/api/audit/estatisticas', {
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
        mensagem: 'Erro ao obter estatísticas de auditoria',
        detalhes: { filtros, error }
      });
      throw error;
    }
  },

  /**
   * Obtém o histórico de alterações de um recurso
   * @param recurso Tipo do recurso
   * @param recursoId ID do recurso
   * @returns Lista de alterações
   */
  async obterHistoricoAlteracoes(
    recurso: string,
    recursoId: string
  ): Promise<AuditLog[]> {
    try {
      const { data } = await axios.get<AuditLog[]>(`/api/audit/historico/${recurso}/${recursoId}`);
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao obter histórico de alterações',
        detalhes: { recurso, recursoId, error }
      });
      throw error;
    }
  },

  /**
   * Obtém o histórico de ações de um usuário
   * @param usuarioId ID do usuário
   * @returns Lista de ações
   */
  async obterHistoricoUsuario(usuarioId: string): Promise<AuditLog[]> {
    try {
      const { data } = await axios.get<AuditLog[]>(`/api/audit/usuario/${usuarioId}`);
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao obter histórico de usuário',
        detalhes: { usuarioId, error }
      });
      throw error;
    }
  }
}; 

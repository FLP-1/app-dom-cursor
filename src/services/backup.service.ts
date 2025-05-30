import axios from 'axios';
import { LogService, TipoLog, CategoriaLog } from './log.service';

/**
 * Serviço de Backup
 * @description Gerencia backups do sistema
 * @author DOM
 * @version 1.0.0
 * @since 2024-01-01
 */

export interface Backup {
  id: string;
  nome: string;
  descricao: string;
  tipo: 'COMPLETO' | 'INCREMENTAL' | 'DIFERENCIAL';
  status: 'AGENDADO' | 'EM_ANDAMENTO' | 'CONCLUIDO' | 'FALHA';
  tamanho: number;
  dataInicio: Date;
  dataFim?: Date;
  erro?: string;
  url?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BackupConfig {
  id: string;
  tipo: 'COMPLETO' | 'INCREMENTAL' | 'DIFERENCIAL';
  frequencia: 'DIARIA' | 'SEMANAL' | 'MENSAL';
  hora: string;
  diaSemana?: number;
  diaMes?: number;
  retencao: number;
  destino: 'LOCAL' | 'NUVEM' | 'AMBOS';
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BackupFilter {
  tipo?: Backup['tipo'];
  status?: Backup['status'];
  dataInicio?: Date;
  dataFim?: Date;
}

export const BackupService = {
  /**
   * Lista todos os backups
   * @param filtros Filtros para a listagem
   * @returns Lista de backups
   */
  async listar(filtros?: BackupFilter): Promise<Backup[]> {
    try {
      const { data } = await axios.get<Backup[]>('/api/backup', {
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
        categoria: CategoriaLog.BACKUP,
        mensagem: 'Erro ao listar backups',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Obtém um backup específico
   * @param id ID do backup
   * @returns Backup
   */
  async obter(id: string): Promise<Backup> {
    try {
      const { data } = await axios.get<Backup>(`/api/backup/${id}`);
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.BACKUP,
        mensagem: 'Erro ao obter backup',
        detalhes: { id, error }
      });
      throw error;
    }
  },

  /**
   * Inicia um novo backup
   * @param tipo Tipo do backup
   * @param descricao Descrição do backup
   * @returns Backup iniciado
   */
  async iniciar(
    tipo: Backup['tipo'],
    descricao?: string
  ): Promise<Backup> {
    try {
      const { data } = await axios.post<Backup>('/api/backup', {
        tipo,
        descricao
      });

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.BACKUP,
        mensagem: 'Backup iniciado',
        detalhes: { tipo, descricao }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.BACKUP,
        mensagem: 'Erro ao iniciar backup',
        detalhes: { tipo, descricao, error }
      });
      throw error;
    }
  },

  /**
   * Cancela um backup em andamento
   * @param id ID do backup
   */
  async cancelar(id: string): Promise<void> {
    try {
      await axios.post(`/api/backup/${id}/cancelar`);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.BACKUP,
        mensagem: 'Backup cancelado',
        detalhes: { id }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.BACKUP,
        mensagem: 'Erro ao cancelar backup',
        detalhes: { id, error }
      });
      throw error;
    }
  },

  /**
   * Restaura um backup
   * @param id ID do backup
   * @param confirmacao Confirmação da restauração
   */
  async restaurar(id: string, confirmacao: boolean): Promise<void> {
    if (!confirmacao) {
      throw new Error('Confirmação necessária para restaurar backup');
    }

    try {
      await axios.post(`/api/backup/${id}/restaurar`);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.BACKUP,
        mensagem: 'Backup restaurado',
        detalhes: { id }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.BACKUP,
        mensagem: 'Erro ao restaurar backup',
        detalhes: { id, error }
      });
      throw error;
    }
  },

  /**
   * Remove um backup
   * @param id ID do backup
   */
  async remover(id: string): Promise<void> {
    try {
      await axios.delete(`/api/backup/${id}`);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.BACKUP,
        mensagem: 'Backup removido',
        detalhes: { id }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.BACKUP,
        mensagem: 'Erro ao remover backup',
        detalhes: { id, error }
      });
      throw error;
    }
  },

  /**
   * Obtém a configuração de backup
   * @returns Configuração de backup
   */
  async obterConfiguracao(): Promise<BackupConfig> {
    try {
      const { data } = await axios.get<BackupConfig>('/api/backup/configuracao');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.BACKUP,
        mensagem: 'Erro ao obter configuração de backup',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Atualiza a configuração de backup
   * @param config Nova configuração
   * @returns Configuração atualizada
   */
  async atualizarConfiguracao(
    config: Partial<Omit<BackupConfig, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<BackupConfig> {
    try {
      const { data } = await axios.put<BackupConfig>('/api/backup/configuracao', config);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.BACKUP,
        mensagem: 'Configuração de backup atualizada',
        detalhes: { config }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.BACKUP,
        mensagem: 'Erro ao atualizar configuração de backup',
        detalhes: { config, error }
      });
      throw error;
    }
  },

  /**
   * Testa a configuração de backup
   * @returns Resultado do teste
   */
  async testarConfiguracao(): Promise<{ sucesso: boolean; mensagem: string }> {
    try {
      const { data } = await axios.post<{ sucesso: boolean; mensagem: string }>(
        '/api/backup/configuracao/testar'
      );

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.BACKUP,
        mensagem: 'Configuração de backup testada',
        detalhes: { resultado: data }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.BACKUP,
        mensagem: 'Erro ao testar configuração de backup',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Obtém o espaço em disco disponível
   * @returns Espaço em disco disponível
   */
  async obterEspacoDisco(): Promise<{
    total: number;
    usado: number;
    disponivel: number;
  }> {
    try {
      const { data } = await axios.get<{
        total: number;
        usado: number;
        disponivel: number;
      }>('/api/backup/espaco-disco');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.BACKUP,
        mensagem: 'Erro ao obter espaço em disco',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Limpa backups antigos
   * @param dias Número de dias para manter
   * @returns Número de backups removidos
   */
  async limparBackupsAntigos(dias: number): Promise<{ removidos: number }> {
    try {
      const { data } = await axios.post<{ removidos: number }>('/api/backup/limpar', {
        dias
      });

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.BACKUP,
        mensagem: 'Backups antigos removidos',
        detalhes: { dias, removidos: data.removidos }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.BACKUP,
        mensagem: 'Erro ao limpar backups antigos',
        detalhes: { dias, error }
      });
      throw error;
    }
  }
}; 
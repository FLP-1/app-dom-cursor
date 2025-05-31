import axios from 'axios';
import { CacheService } from './cache.service';
import { I18nService } from './i18n.service';

/**
 * Serviço de Log
 * @description Gerencia os logs do sistema
 * @author DOM
 * @version 1.0.0
 * @since 2024-01-01
 */

export type TipoLog = 'info' | 'warn' | 'error' | 'debug' | 'trace';

export type CategoriaLog =
  | 'sistema'
  | 'usuario'
  | 'empresa'
  | 'ponto'
  | 'ocorrencia'
  | 'documento'
  | 'esocial'
  | 'backup'
  | 'seguranca'
  | 'email'
  | 'sms'
  | 'whatsapp'
  | 'push'
  | 'websocket'
  | 'cache'
  | 'i18n'
  | 'theme';

export interface Log {
  id: string;
  tipo: TipoLog;
  categoria: CategoriaLog;
  mensagem: string;
  detalhes?: Record<string, unknown>;
  usuarioId?: string;
  ip?: string;
  userAgent?: string;
  createdAt: Date;
}

export interface LogFilter {
  tipo?: TipoLog;
  categoria?: CategoriaLog;
  dataInicio?: Date;
  dataFim?: Date;
  usuarioId?: string;
  mensagem?: string;
}

export interface LogConfig {
  id: string;
  nivel: TipoLog;
  categorias: CategoriaLog[];
  retencao: number;
  maxTamanho: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface LogEstatisticas {
  total: number;
  porTipo: Record<TipoLog, number>;
  porCategoria: Record<CategoriaLog, number>;
  porDia: Record<string, number>;
  porUsuario: Record<string, number>;
  tamanhoTotal: number;
}

export const LogService = {
  CACHE_KEY: 'log:',
  CACHE_EXPIRACAO: 3600, // 1 hora
  config: null as LogConfig | null,

  /**
   * Inicializa o serviço
   * @returns Promise<void>
   */
  async inicializar(): Promise<void> {
    try {
      this.config = await this.obterConfiguracao();
      await this.limparAntigos();
    } catch (error) {
      console.error('Erro ao inicializar log:', error);
      throw error;
    }
  },

  /**
   * Cria um novo log
   * @param log Dados do log
   * @returns Log criado
   */
  async create(log: Omit<Log, 'id' | 'createdAt'>): Promise<Log> {
    try {
      if (!this.config) {
        throw new Error('Serviço de log não inicializado');
      }

      if (!this.config.categorias.includes(log.categoria)) {
        return;
      }

      const niveis: Record<TipoLog, number> = {
        trace: 0,
        debug: 1,
        info: 2,
        warn: 3,
        error: 4
      };

      if (niveis[log.tipo] < niveis[this.config.nivel]) {
        return;
      }

      const { data } = await axios.post<Log>('/api/log', {
        ...log,
        ip: await this.obterIP(),
        userAgent: await this.obterUserAgent()
      });

      await CacheService.definir(`${this.CACHE_KEY}${data.id}`, data, this.CACHE_EXPIRACAO);

      return data;
    } catch (error) {
      console.error('Erro ao criar log:', error);
      throw error;
    }
  },

  /**
   * Lista os logs
   * @param filtros Filtros para a listagem
   * @returns Lista de logs
   */
  async listar(filtros?: LogFilter): Promise<Log[]> {
    try {
      const { data } = await axios.get<Log[]>('/api/log', {
        params: {
          ...filtros,
          dataInicio: filtros?.dataInicio?.toISOString(),
          dataFim: filtros?.dataFim?.toISOString()
        }
      });
      return data;
    } catch (error) {
      console.error('Erro ao listar logs:', error);
      throw error;
    }
  },

  /**
   * Obtém um log específico
   * @param id ID do log
   * @returns Log
   */
  async obter(id: string): Promise<Log> {
    try {
      const cacheKey = `${this.CACHE_KEY}${id}`;
      const cached = await CacheService.obter<Log>(cacheKey);

      if (cached) {
        return cached;
      }

      const { data } = await axios.get<Log>(`/api/log/${id}`);
      await CacheService.definir(cacheKey, data, this.CACHE_EXPIRACAO);

      return data;
    } catch (error) {
      console.error('Erro ao obter log:', error);
      throw error;
    }
  },

  /**
   * Remove um log
   * @param id ID do log
   * @returns true se o log foi removido, false caso contrário
   */
  async remover(id: string): Promise<boolean> {
    try {
      await axios.delete(`/api/log/${id}`);
      await CacheService.remover(`${this.CACHE_KEY}${id}`);
      return true;
    } catch (error) {
      console.error('Erro ao remover log:', error);
      throw error;
    }
  },

  /**
   * Limpa logs antigos
   * @returns Promise<void>
   */
  async limparAntigos(): Promise<void> {
    try {
      if (!this.config) {
        throw new Error('Serviço de log não inicializado');
      }

      const dataLimite = new Date();
      dataLimite.setDate(dataLimite.getDate() - this.config.retencao);

      await axios.delete('/api/log', {
        params: {
          dataLimite: dataLimite.toISOString()
        }
      });
    } catch (error) {
      console.error('Erro ao limpar logs antigos:', error);
      throw error;
    }
  },

  /**
   * Exporta logs
   * @param filtros Filtros para a exportação
   * @param formato Formato de exportação (csv, xlsx, json)
   * @returns Arquivo exportado
   */
  async exportar(
    filtros?: LogFilter,
    formato: 'csv' | 'xlsx' | 'json' = 'json'
  ): Promise<Blob> {
    try {
      const { data } = await axios.get('/api/log/exportar', {
        params: {
          ...filtros,
          dataInicio: filtros?.dataInicio?.toISOString(),
          dataFim: filtros?.dataFim?.toISOString(),
          formato
        },
        responseType: 'blob'
      });

      return data;
    } catch (error) {
      console.error('Erro ao exportar logs:', error);
      throw error;
    }
  },

  /**
   * Obtém a configuração do serviço
   * @returns Configuração
   */
  async obterConfiguracao(): Promise<LogConfig> {
    try {
      const { data } = await axios.get<LogConfig>('/api/log/config');
      return data;
    } catch (error) {
      console.error('Erro ao obter configuração do log:', error);
      throw error;
    }
  },

  /**
   * Atualiza a configuração do serviço
   * @param config Novos dados da configuração
   * @returns Configuração atualizada
   */
  async atualizarConfiguracao(
    config: Partial<Omit<LogConfig, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<LogConfig> {
    try {
      const { data } = await axios.patch<LogConfig>('/api/log/config', config);

      this.config = data;
      return data;
    } catch (error) {
      console.error('Erro ao atualizar configuração do log:', error);
      throw error;
    }
  },

  /**
   * Obtém estatísticas dos logs
   * @returns Estatísticas
   */
  async obterEstatisticas(): Promise<LogEstatisticas> {
    try {
      const { data } = await axios.get<LogEstatisticas>('/api/log/estatisticas');
      return data;
    } catch (error) {
      console.error('Erro ao obter estatísticas do log:', error);
      throw error;
    }
  },

  /**
   * Obtém o IP do usuário
   * @returns IP do usuário
   */
  private async obterIP(): Promise<string> {
    try {
      const { data } = await axios.get<{ ip: string }>('/api/ip');
      return data.ip;
    } catch (error) {
      console.error('Erro ao obter IP:', error);
      return '0.0.0.0';
    }
  },

  /**
   * Obtém o User Agent do usuário
   * @returns User Agent do usuário
   */
  private async obterUserAgent(): Promise<string> {
    return navigator.userAgent;
  }
}; 
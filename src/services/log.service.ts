/**
 * Arquivo: log.service.ts
 * Caminho: src/services/log.service.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de logs
 */

import axios from 'axios';
import { CacheService } from './cache.service';
import { I18nService } from './i18n.service';

/**
 * Serviço de Log
 * @description Gerencia os logs do sistema
 * @author DOM
 * @version 1.0.0
 * @since 2025-01-01
 */

export enum TipoLog {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug',
  TRACE = 'trace'
}

export enum CategoriaLog {
  SISTEMA = 'sistema',
  USUARIO = 'usuario',
  EMPRESA = 'empresa',
  PONTO = 'ponto',
  OCORRENCIA = 'ocorrencia',
  DOCUMENTO = 'documento',
  ESOCIAL = 'esocial',
  BACKUP = 'backup',
  SEGURANCA = 'seguranca',
  EMAIL = 'email',
  SMS = 'sms',
  WHATSAPP = 'whatsapp',
  PUSH = 'push',
  WEBSOCKET = 'websocket',
  CACHE = 'cache',
  I18N = 'i18n',
  THEME = 'theme'
}

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

class LogManager {
  private static instance: LogManager;
  private readonly CACHE_KEY = 'log:';
  private readonly CACHE_EXPIRACAO = 3600; // 1 hora
  private config: LogConfig | null = null;

  private constructor() {}

  static getInstance(): LogManager {
    if (!LogManager.instance) {
      LogManager.instance = new LogManager();
    }
    return LogManager.instance;
  }

  async inicializar(): Promise<void> {
    try {
      this.config = await this.obterConfiguracao();
      await this.limparAntigos();
    } catch (error) {
      console.error('Erro ao inicializar log:', error);
      throw error;
    }
  }

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
  }

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
  }

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
  }

  async remover(id: string): Promise<boolean> {
    try {
      await axios.delete(`/api/log/${id}`);
      await CacheService.remover(`${this.CACHE_KEY}${id}`);
      return true;
    } catch (error) {
      console.error('Erro ao remover log:', error);
      return false;
    }
  }

  async limparAntigos(): Promise<void> {
    try {
      if (!this.config) {
        throw new Error('Serviço de log não inicializado');
      }

      const dataLimite = new Date();
      dataLimite.setDate(dataLimite.getDate() - this.config.retencao);

      await axios.delete('/api/log/limpar', {
        params: {
          dataLimite: dataLimite.toISOString()
        }
      });
    } catch (error) {
      console.error('Erro ao limpar logs antigos:', error);
      throw error;
    }
  }

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
  }

  async obterConfiguracao(): Promise<LogConfig> {
    try {
      const { data } = await axios.get<LogConfig>('/api/log/configuracao');
      return data;
    } catch (error) {
      console.error('Erro ao obter configuração de log:', error);
      throw error;
    }
  }

  async atualizarConfiguracao(
    config: Partial<Omit<LogConfig, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<LogConfig> {
    try {
      const { data } = await axios.put<LogConfig>('/api/log/configuracao', config);
      this.config = data;
      return data;
    } catch (error) {
      console.error('Erro ao atualizar configuração de log:', error);
      throw error;
    }
  }

  async obterEstatisticas(): Promise<LogEstatisticas> {
    try {
      const { data } = await axios.get<LogEstatisticas>('/api/log/estatisticas');
      return data;
    } catch (error) {
      console.error('Erro ao obter estatísticas de log:', error);
      throw error;
    }
  }

  private async obterIP(): Promise<string> {
    try {
      const { data } = await axios.get<string>('/api/ip');
      return data;
    } catch (error) {
      console.error('Erro ao obter IP:', error);
      return '0.0.0.0';
    }
  }

  private async obterUserAgent(): Promise<string> {
    try {
      const { data } = await axios.get<string>('/api/user-agent');
      return data;
    } catch (error) {
      console.error('Erro ao obter User Agent:', error);
      return 'unknown';
    }
  }
}

export const logManager = LogManager.getInstance();

export const LogService = {
  async inicializar(): Promise<void> {
    return logManager.inicializar();
  },

  async create(log: Omit<Log, 'id' | 'createdAt'>): Promise<Log> {
    return logManager.create(log);
  },

  async listar(filtros?: LogFilter): Promise<Log[]> {
    return logManager.listar(filtros);
  },

  async obter(id: string): Promise<Log> {
    return logManager.obter(id);
  },

  async remover(id: string): Promise<boolean> {
    return logManager.remover(id);
  },

  async limparAntigos(): Promise<void> {
    return logManager.limparAntigos();
  },

  async exportar(
    filtros?: LogFilter,
    formato: 'csv' | 'xlsx' | 'json' = 'json'
  ): Promise<Blob> {
    return logManager.exportar(filtros, formato);
  },

  async obterConfiguracao(): Promise<LogConfig> {
    return logManager.obterConfiguracao();
  },

  async atualizarConfiguracao(
    config: Partial<Omit<LogConfig, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<LogConfig> {
    return logManager.atualizarConfiguracao(config);
  },

  async obterEstatisticas(): Promise<LogEstatisticas> {
    return logManager.obterEstatisticas();
  }
};

export type { TipoLog, CategoriaLog }; 

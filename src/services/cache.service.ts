/**
 * Arquivo: cache.service.ts
 * Caminho: src/services/cache.service.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de cache
 */

import { LogService, TipoLog, CategoriaLog } from '@/services/log.service';
import axios from 'axios';

/**
 * Serviço de Cache
 * @description Gerencia o cache do sistema
 * @author DOM
 * @version 1.0.0
 * @since 2025-01-01
 */

export type TipoCache = 'memoria' | 'redis' | 'localStorage' | 'sessionStorage';

export interface CacheConfig {
  id: string;
  tipo: TipoCache;
  prefixo: string;
  expiracao: number;
  maxItens: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CacheItem<T = unknown> {
  chave: string;
  valor: T;
  expiracao: number;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface CacheEstatisticas {
  total: number;
  porTipo: Record<TipoCache, number>;
  tamanhoTotal: number;
  expirados: number;
  hits: number;
  misses: number;
}

class CacheManager {
  private static instance: CacheManager;
  private readonly CACHE_KEY = 'cache:';
  private readonly CACHE_EXPIRACAO = 3600; // 1 hora
  private cache: Map<string, CacheItem>;
  private config: CacheConfig | null;

  private constructor() {
    this.cache = new Map<string, CacheItem>();
    this.config = null;
  }

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  async inicializar(): Promise<void> {
    try {
      this.config = await this.obterConfiguracao();
      await this.limparExpirados();
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.CACHE,
        mensagem: 'Erro ao inicializar cache',
        detalhes: { error }
      });
      throw error;
    }
  }

  async obter<T>(chave: string): Promise<T | null> {
    try {
      const item = this.cache.get(this.getChaveCompleta(chave));

      if (!item) {
        await LogService.create({
          tipo: TipoLog.INFO,
          categoria: CategoriaLog.CACHE,
          mensagem: 'Cache miss',
          detalhes: { chave }
        });
        return null;
      }

      if (this.isExpirado(item)) {
        await this.remover(chave);
        await LogService.create({
          tipo: TipoLog.INFO,
          categoria: CategoriaLog.CACHE,
          mensagem: 'Item expirado removido',
          detalhes: { chave, item }
        });
        return null;
      }

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.CACHE,
        mensagem: 'Cache hit',
        detalhes: { chave, item }
      });

      return item.valor as T;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.CACHE,
        mensagem: 'Erro ao obter item do cache',
        detalhes: { chave, error }
      });
      throw error;
    }
  }

  async definir<T>(
    chave: string,
    valor: T,
    expiracao?: number
  ): Promise<CacheItem<T>> {
    try {
      const chaveCompleta = this.getChaveCompleta(chave);
      const agora = new Date();

      const item: CacheItem<T> = {
        chave: chaveCompleta,
        valor,
        expiracao: expiracao || this.config?.expiracao || this.CACHE_EXPIRACAO,
        criadoEm: agora,
        atualizadoEm: agora
      };

      this.cache.set(chaveCompleta, item);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.CACHE,
        mensagem: 'Item definido no cache',
        detalhes: { chave, item }
      });

      return item;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.CACHE,
        mensagem: 'Erro ao definir item no cache',
        detalhes: { chave, valor, expiracao, error }
      });
      throw error;
    }
  }

  async remover(chave: string): Promise<boolean> {
    try {
      const chaveCompleta = this.getChaveCompleta(chave);
      const removido = this.cache.delete(chaveCompleta);

      if (removido) {
        await LogService.create({
          tipo: TipoLog.INFO,
          categoria: CategoriaLog.CACHE,
          mensagem: 'Item removido do cache',
          detalhes: { chave }
        });
      }

      return removido;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.CACHE,
        mensagem: 'Erro ao remover item do cache',
        detalhes: { chave, error }
      });
      throw error;
    }
  }

  async limpar(): Promise<void> {
    try {
      this.cache.clear();

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.CACHE,
        mensagem: 'Cache limpo'
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.CACHE,
        mensagem: 'Erro ao limpar cache',
        detalhes: { error }
      });
      throw error;
    }
  }

  async limparExpirados(): Promise<void> {
    try {
      const agora = new Date();
      let removidos = 0;

      for (const [chave, item] of this.cache.entries()) {
        if (this.isExpirado(item)) {
          this.cache.delete(chave);
          removidos++;
        }
      }

      if (removidos > 0) {
        await LogService.create({
          tipo: TipoLog.INFO,
          categoria: CategoriaLog.CACHE,
          mensagem: 'Itens expirados removidos',
          detalhes: { removidos }
        });
      }
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.CACHE,
        mensagem: 'Erro ao limpar itens expirados',
        detalhes: { error }
      });
      throw error;
    }
  }

  private isExpirado(item: CacheItem): boolean {
    const agora = new Date();
    const expiracao = new Date(item.criadoEm.getTime() + item.expiracao * 1000);
    return agora > expiracao;
  }

  private getChaveCompleta(chave: string): string {
    return `${this.config?.prefixo || this.CACHE_KEY}${chave}`;
  }

  async obterConfiguracao(): Promise<CacheConfig> {
    try {
      const { data } = await axios.get<CacheConfig>('/api/cache/configuracao');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.CACHE,
        mensagem: 'Erro ao obter configuração de cache',
        detalhes: { error }
      });
      throw error;
    }
  }

  async atualizarConfiguracao(
    config: Partial<Omit<CacheConfig, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<CacheConfig> {
    try {
      const { data } = await axios.put<CacheConfig>('/api/cache/configuracao', config);
      this.config = data;

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.CACHE,
        mensagem: 'Configuração de cache atualizada',
        detalhes: { config: data }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.CACHE,
        mensagem: 'Erro ao atualizar configuração de cache',
        detalhes: { config, error }
      });
      throw error;
    }
  }

  async obterEstatisticas(): Promise<CacheEstatisticas> {
    try {
      const { data } = await axios.get<CacheEstatisticas>('/api/cache/estatisticas');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.CACHE,
        mensagem: 'Erro ao obter estatísticas de cache',
        detalhes: { error }
      });
      throw error;
    }
  }
}

export const cacheManager = CacheManager.getInstance();

export const CacheService = {
  async inicializar(): Promise<void> {
    return cacheManager.inicializar();
  },

  async obter<T>(chave: string): Promise<T | null> {
    return cacheManager.obter<T>(chave);
  },

  async definir<T>(
    chave: string,
    valor: T,
    expiracao?: number
  ): Promise<CacheItem<T>> {
    return cacheManager.definir<T>(chave, valor, expiracao);
  },

  async remover(chave: string): Promise<boolean> {
    return cacheManager.remover(chave);
  },

  async limpar(): Promise<void> {
    return cacheManager.limpar();
  },

  async limparExpirados(): Promise<void> {
    return cacheManager.limparExpirados();
  },

  async obterConfiguracao(): Promise<CacheConfig> {
    return cacheManager.obterConfiguracao();
  },

  async atualizarConfiguracao(
    config: Partial<Omit<CacheConfig, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<CacheConfig> {
    return cacheManager.atualizarConfiguracao(config);
  },

  async obterEstatisticas(): Promise<CacheEstatisticas> {
    return cacheManager.obterEstatisticas();
  }
}; 

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

export const CacheService = {
  CACHE_KEY: 'cache:',
  CACHE_EXPIRACAO: 3600, // 1 hora
  cache: new Map<string, CacheItem>(),
  config: null as CacheConfig | null,

  /**
   * Inicializa o serviço
   * @returns Promise<void>
   */
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
  },

  /**
   * Obtém um item do cache
   * @param chave Chave do item
   * @returns Item do cache ou null se não existir
   */
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
  },

  /**
   * Define um item no cache
   * @param chave Chave do item
   * @param valor Valor do item
   * @param expiracao Tempo de expiração em segundos
   * @returns Item definido
   */
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
  },

  /**
   * Remove um item do cache
   * @param chave Chave do item
   * @returns true se o item foi removido, false caso contrário
   */
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
  },

  /**
   * Limpa todos os itens do cache
   * @returns Promise<void>
   */
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
  },

  /**
   * Limpa os itens expirados do cache
   * @returns Promise<void>
   */
  async limparExpirados(): Promise<void> {
    try {
      for (const [chave, item] of this.cache.entries()) {
        if (this.isExpirado(item)) {
          this.cache.delete(chave);
        }
      }

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.CACHE,
        mensagem: 'Itens expirados removidos do cache'
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.CACHE,
        mensagem: 'Erro ao limpar itens expirados do cache',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Verifica se um item está expirado
   * @param item Item do cache
   * @returns true se o item está expirado, false caso contrário
   */
  private isExpirado(item: CacheItem): boolean {
    const agora = new Date();
    const expiracao = new Date(item.criadoEm.getTime() + item.expiracao * 1000);
    return agora > expiracao;
  },

  /**
   * Obtém a chave completa do cache
   * @param chave Chave do item
   * @returns Chave completa
   */
  private getChaveCompleta(chave: string): string {
    return `${this.config?.prefixo || this.CACHE_KEY}${chave}`;
  },

  /**
   * Obtém a configuração do serviço
   * @returns Configuração
   */
  async obterConfiguracao(): Promise<CacheConfig> {
    try {
      const { data } = await axios.get<CacheConfig>('/api/cache/config');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.CACHE,
        mensagem: 'Erro ao obter configuração do cache',
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
    config: Partial<Omit<CacheConfig, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<CacheConfig> {
    try {
      const { data } = await axios.patch<CacheConfig>('/api/cache/config', config);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.CACHE,
        mensagem: 'Configuração do cache atualizada',
        detalhes: { config }
      });

      this.config = data;
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.CACHE,
        mensagem: 'Erro ao atualizar configuração do cache',
        detalhes: { config, error }
      });
      throw error;
    }
  },

  /**
   * Obtém estatísticas do cache
   * @returns Estatísticas
   */
  async obterEstatisticas(): Promise<CacheEstatisticas> {
    try {
      const estatisticas: CacheEstatisticas = {
        total: this.cache.size,
        porTipo: {
          memoria: this.cache.size,
          redis: 0,
          localStorage: 0,
          sessionStorage: 0
        },
        tamanhoTotal: 0,
        expirados: 0,
        hits: 0,
        misses: 0
      };

      for (const item of this.cache.values()) {
        if (this.isExpirado(item)) {
          estatisticas.expirados++;
        }

        estatisticas.tamanhoTotal += JSON.stringify(item).length;
      }

      const { data } = await axios.get<CacheEstatisticas>('/api/cache/estatisticas');
      return { ...estatisticas, ...data };
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.CACHE,
        mensagem: 'Erro ao obter estatísticas do cache',
        detalhes: { error }
      });
      throw error;
    }
  }
}; 

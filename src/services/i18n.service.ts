/**
 * Arquivo: i18n.service.ts
 * Caminho: src/services/i18n.service.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de internacionalização
 */

import { LogService, TipoLog, CategoriaLog } from '@/services/log.service';
import { CacheService } from '@/services/cache.service';
import { ConfigService } from '@/services/config.service';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import axios from 'axios';

/**
 * Serviço de Internacionalização
 * @description Gerencia traduções e formatação de datas/números
 * @author DOM
 * @version 1.0.0
 * @since 2025-01-01
 */

export type Idioma = 'pt-BR' | 'en-US' | 'es-ES';

export interface Traducao {
  id: string;
  chave: string;
  valor: string;
  idioma: Idioma;
  categoria: 'sistema' | 'usuario' | 'empresa' | 'ponto' | 'ocorrencia' | 'documento' | 'esocial' | 'backup' | 'seguranca' | 'email' | 'sms' | 'whatsapp';
  createdAt: Date;
  updatedAt: Date;
}

export interface TraducaoFilter {
  chave?: string;
  idioma?: Idioma;
  categoria?: Traducao['categoria'];
}

class I18nManager {
  private static instance: I18nManager;
  private readonly CACHE_KEY = 'i18n:';
  private readonly CACHE_EXPIRACAO = 3600; // 1 hora
  private idiomaAtual: Idioma;

  private constructor() {
    this.idiomaAtual = 'pt-BR';
  }

  static getInstance(): I18nManager {
    if (!I18nManager.instance) {
      I18nManager.instance = new I18nManager();
    }
    return I18nManager.instance;
  }

  async definirIdioma(idioma: Idioma): Promise<void> {
    try {
      this.idiomaAtual = idioma;
      await ConfigService.definir(
        'idioma',
        idioma,
        'string',
        'Idioma do sistema',
        'sistema',
        true,
        true
      );

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Idioma definido',
        detalhes: { idioma }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao definir idioma',
        detalhes: { idioma, error }
      });
      throw error;
    }
  }

  async obterIdioma(): Promise<Idioma> {
    try {
      const idioma = await ConfigService.obter<Idioma>('idioma');
      if (idioma) {
        this.idiomaAtual = idioma;
      }
      return this.idiomaAtual;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao obter idioma',
        detalhes: { error }
      });
      throw error;
    }
  }

  async traduzir(
    chave: string,
    variaveis?: Record<string, string>
  ): Promise<string> {
    try {
      // Tenta obter do cache
      const cacheKey = this.CACHE_KEY + this.idiomaAtual + ':' + chave;
      const cached = await CacheService.obter<string>(cacheKey);
      if (cached !== undefined) {
        return this.substituirVariaveis(cached, variaveis);
      }

      // Se não estiver em cache, busca da API
      const { data } = await axios.get<Traducao>(`/api/i18n/${this.idiomaAtual}/${chave}`);
      
      // Salva no cache
      await CacheService.definir(cacheKey, data.valor, this.CACHE_EXPIRACAO);
      
      return this.substituirVariaveis(data.valor, variaveis);
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao traduzir chave',
        detalhes: { chave, idioma: this.idiomaAtual, error }
      });
      return chave;
    }
  }

  async definirTraducao(
    chave: string,
    valor: string,
    idioma: Idioma,
    categoria: Traducao['categoria']
  ): Promise<void> {
    try {
      const traducao: Omit<Traducao, 'id' | 'createdAt' | 'updatedAt'> = {
        chave,
        valor,
        idioma,
        categoria
      };

      await axios.post('/api/i18n', traducao);

      // Atualiza o cache
      const cacheKey = this.CACHE_KEY + idioma + ':' + chave;
      await CacheService.definir(cacheKey, valor, this.CACHE_EXPIRACAO);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Tradução definida',
        detalhes: { chave, idioma, categoria }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao definir tradução',
        detalhes: { chave, valor, idioma, categoria, error }
      });
      throw error;
    }
  }

  async removerTraducao(chave: string, idioma: Idioma): Promise<void> {
    try {
      await axios.delete(`/api/i18n/${idioma}/${chave}`);

      // Remove do cache
      const cacheKey = this.CACHE_KEY + idioma + ':' + chave;
      await CacheService.remover(cacheKey);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Tradução removida',
        detalhes: { chave, idioma }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao remover tradução',
        detalhes: { chave, idioma, error }
      });
      throw error;
    }
  }

  async listarTraducoes(filtros?: TraducaoFilter): Promise<Traducao[]> {
    try {
      const { data } = await axios.get<Traducao[]>('/api/i18n', {
        params: filtros
      });
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao listar traduções',
        detalhes: { filtros, error }
      });
      throw error;
    }
  }

  async importarTraducoes(arquivo: File): Promise<{
    total: number;
    sucesso: number;
    erro: number;
  }> {
    try {
      const formData = new FormData();
      formData.append('arquivo', arquivo);

      const { data } = await axios.post<{
        total: number;
        sucesso: number;
        erro: number;
      }>('/api/i18n/importar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Traduções importadas',
        detalhes: { data }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao importar traduções',
        detalhes: { error }
      });
      throw error;
    }
  }

  async exportarTraducoes(
    filtros?: TraducaoFilter,
    formato: 'csv' | 'xlsx' | 'json' = 'json'
  ): Promise<string> {
    try {
      const { data } = await axios.get('/api/i18n/exportar', {
        params: {
          ...filtros,
          formato
        },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `traducoes.${formato}`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Traduções exportadas',
        detalhes: { formato }
      });

      return url;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao exportar traduções',
        detalhes: { formato, error }
      });
      throw error;
    }
  }

  formatarData(data: Date, formato: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }): string {
    try {
      return new Intl.DateTimeFormat(this.idiomaAtual, formato).format(data);
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao formatar data',
        detalhes: { data, formato, error }
      });
      return data.toISOString();
    }
  }

  formatarNumero(
    numero: number,
    formato: Intl.NumberFormatOptions = {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  ): string {
    try {
      return new Intl.NumberFormat(this.idiomaAtual, formato).format(numero);
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao formatar número',
        detalhes: { numero, formato, error }
      });
      return numero.toString();
    }
  }

  formatarMoeda(
    valor: number,
    moeda: string = 'BRL'
  ): string {
    try {
      return new Intl.NumberFormat(this.idiomaAtual, {
        style: 'currency',
        currency: moeda
      }).format(valor);
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao formatar moeda',
        detalhes: { valor, moeda, error }
      });
      return valor.toString();
    }
  }

  private substituirVariaveis(
    texto: string,
    variaveis?: Record<string, string>
  ): string {
    if (!variaveis) {
      return texto;
    }

    return texto.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return variaveis[key] || match;
    });
  }
}

export const i18nManager = I18nManager.getInstance();

export const I18nService = {
  async definirIdioma(idioma: Idioma): Promise<void> {
    return i18nManager.definirIdioma(idioma);
  },

  async obterIdioma(): Promise<Idioma> {
    return i18nManager.obterIdioma();
  },

  async traduzir(
    chave: string,
    variaveis?: Record<string, string>
  ): Promise<string> {
    return i18nManager.traduzir(chave, variaveis);
  },

  async definirTraducao(
    chave: string,
    valor: string,
    idioma: Idioma,
    categoria: Traducao['categoria']
  ): Promise<void> {
    return i18nManager.definirTraducao(chave, valor, idioma, categoria);
  },

  async removerTraducao(chave: string, idioma: Idioma): Promise<void> {
    return i18nManager.removerTraducao(chave, idioma);
  },

  async listarTraducoes(filtros?: TraducaoFilter): Promise<Traducao[]> {
    return i18nManager.listarTraducoes(filtros);
  },

  async importarTraducoes(arquivo: File): Promise<{
    total: number;
    sucesso: number;
    erro: number;
  }> {
    return i18nManager.importarTraducoes(arquivo);
  },

  async exportarTraducoes(
    filtros?: TraducaoFilter,
    formato: 'csv' | 'xlsx' | 'json' = 'json'
  ): Promise<string> {
    return i18nManager.exportarTraducoes(filtros, formato);
  },

  formatarData(data: Date, formato?: Intl.DateTimeFormatOptions): string {
    return i18nManager.formatarData(data, formato);
  },

  formatarNumero(numero: number, formato?: Intl.NumberFormatOptions): string {
    return i18nManager.formatarNumero(numero, formato);
  },

  formatarMoeda(valor: number, moeda?: string): string {
    return i18nManager.formatarMoeda(valor, moeda);
  }
};

// Inicialização básica do i18next para integração com react-i18next
// Ajuste as configurações conforme necessário para seu projeto
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      lng: 'pt-BR',
      fallbackLng: 'pt-BR',
      interpolation: { escapeValue: false },
      resources: {}, // Carregue seus recursos conforme necessário
    });
}

export default i18n; 

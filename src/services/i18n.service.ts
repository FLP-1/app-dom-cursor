import { LogService, TipoLog, CategoriaLog } from './log.service';
import { CacheService } from './cache.service';
import { ConfigService } from './config.service';

/**
 * Serviço de Internacionalização
 * @description Gerencia traduções e formatação de datas/números
 * @author DOM
 * @version 1.0.0
 * @since 2024-01-01
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

export const I18nService = {
  private readonly CACHE_KEY = 'i18n:';
  private readonly CACHE_EXPIRACAO = 3600; // 1 hora
  private idiomaAtual: Idioma = 'pt-BR';

  /**
   * Define o idioma atual
   * @param idioma Idioma a ser definido
   */
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
  },

  /**
   * Obtém o idioma atual
   * @returns Idioma atual
   */
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
  },

  /**
   * Traduz uma chave
   * @param chave Chave a ser traduzida
   * @param variaveis Variáveis para substituição
   * @returns Texto traduzido
   */
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
  },

  /**
   * Define uma tradução
   * @param chave Chave da tradução
   * @param valor Valor da tradução
   * @param idioma Idioma da tradução
   * @param categoria Categoria da tradução
   */
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
  },

  /**
   * Remove uma tradução
   * @param chave Chave da tradução
   * @param idioma Idioma da tradução
   */
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
  },

  /**
   * Lista todas as traduções
   * @param filtros Filtros para a listagem
   * @returns Lista de traduções
   */
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
  },

  /**
   * Importa traduções de um arquivo
   * @param arquivo Arquivo com as traduções
   * @returns Resultado da importação
   */
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
      }>('/api/i18n/importar', formData);

      // Limpa o cache
      await CacheService.limpar();

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Traduções importadas',
        detalhes: data
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
  },

  /**
   * Exporta traduções para um arquivo
   * @param filtros Filtros para a exportação
   * @param formato Formato do arquivo (csv, xlsx, json)
   * @returns URL do arquivo
   */
  async exportarTraducoes(
    filtros?: TraducaoFilter,
    formato: 'csv' | 'xlsx' | 'json' = 'json'
  ): Promise<string> {
    try {
      const { data } = await axios.post<{ url: string }>('/api/i18n/exportar', {
        ...filtros,
        formato
      });

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Traduções exportadas',
        detalhes: { filtros, formato }
      });

      return data.url;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao exportar traduções',
        detalhes: { filtros, formato, error }
      });
      throw error;
    }
  },

  /**
   * Formata uma data
   * @param data Data a ser formatada
   * @param formato Formato da data
   * @returns Data formatada
   */
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
  },

  /**
   * Formata um número
   * @param numero Número a ser formatado
   * @param formato Formato do número
   * @returns Número formatado
   */
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
  },

  /**
   * Formata uma moeda
   * @param valor Valor a ser formatado
   * @param moeda Código da moeda
   * @returns Valor formatado
   */
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
  },

  /**
   * Substitui variáveis em um texto
   * @param texto Texto com variáveis
   * @param variaveis Variáveis para substituição
   * @returns Texto com variáveis substituídas
   */
  private substituirVariaveis(
    texto: string,
    variaveis?: Record<string, string>
  ): string {
    if (!variaveis) {
      return texto;
    }

    return texto.replace(/\{(\w+)\}/g, (match, key) => {
      return variaveis[key] || match;
    });
  }
}; 
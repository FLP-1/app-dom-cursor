import axios from 'axios';
import { LogService, TipoLog, CategoriaLog } from './log.service';
import { CacheService } from './cache.service';

/**
 * Serviço de Configuração
 * @description Gerencia as configurações do sistema
 * @author DOM
 * @version 1.0.0
 * @since 2024-01-01
 */

export interface Config {
  id: string;
  chave: string;
  valor: string;
  descricao: string;
  tipo: 'string' | 'number' | 'boolean' | 'json' | 'date';
  categoria: 'sistema' | 'usuario' | 'empresa' | 'ponto' | 'ocorrencia' | 'documento' | 'esocial' | 'backup' | 'seguranca' | 'email' | 'sms' | 'whatsapp';
  visivel: boolean;
  editavel: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConfigFilter {
  chave?: string;
  categoria?: Config['categoria'];
  visivel?: boolean;
  editavel?: boolean;
}

export interface ConfigFormData {
  chave: string;
  valor: string;
  descricao?: string;
}

export const ConfigService = {
  private readonly CACHE_KEY = 'config:';
  private readonly CACHE_EXPIRACAO = 3600; // 1 hora

  /**
   * Obtém uma configuração
   * @param chave Chave da configuração
   * @returns Valor da configuração
   */
  async obter<T>(chave: string): Promise<T | undefined> {
    try {
      // Tenta obter do cache
      const cacheKey = this.CACHE_KEY + chave;
      const cached = await CacheService.obter<T>(cacheKey);
      if (cached !== undefined) {
        return cached;
      }

      // Se não estiver em cache, busca da API
      const { data } = await axios.get<Config>(`/api/config/${chave}`);
      
      // Converte o valor para o tipo correto
      const valor = this.converterValor<T>(data.valor, data.tipo);
      
      // Salva no cache
      await CacheService.definir(cacheKey, valor, this.CACHE_EXPIRACAO);
      
      return valor;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao obter configuração',
        detalhes: { chave, error }
      });
      throw error;
    }
  },

  /**
   * Define uma configuração
   * @param chave Chave da configuração
   * @param valor Valor da configuração
   * @param tipo Tipo do valor
   * @param descricao Descrição da configuração
   * @param categoria Categoria da configuração
   * @param visivel Se a configuração é visível
   * @param editavel Se a configuração é editável
   */
  async definir(
    chave: string,
    valor: unknown,
    tipo: Config['tipo'],
    descricao: string,
    categoria: Config['categoria'],
    visivel = true,
    editavel = true
  ): Promise<void> {
    try {
      const config: Omit<Config, 'id' | 'createdAt' | 'updatedAt'> = {
        chave,
        valor: this.converterParaString(valor, tipo),
        tipo,
        descricao,
        categoria,
        visivel,
        editavel
      };

      await axios.post('/api/config', config);

      // Atualiza o cache
      const cacheKey = this.CACHE_KEY + chave;
      await CacheService.definir(cacheKey, valor, this.CACHE_EXPIRACAO);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Configuração definida',
        detalhes: { chave, tipo, categoria }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao definir configuração',
        detalhes: { chave, valor, tipo, categoria, error }
      });
      throw error;
    }
  },

  /**
   * Remove uma configuração
   * @param chave Chave da configuração
   */
  async remover(chave: string): Promise<void> {
    try {
      await axios.delete(`/api/config/${chave}`);

      // Remove do cache
      const cacheKey = this.CACHE_KEY + chave;
      await CacheService.remover(cacheKey);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Configuração removida',
        detalhes: { chave }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao remover configuração',
        detalhes: { chave, error }
      });
      throw error;
    }
  },

  /**
   * Lista todas as configurações
   * @param filtros Filtros para a listagem
   * @returns Lista de configurações
   */
  async listar(filtros?: ConfigFilter): Promise<Config[]> {
    try {
      const { data } = await axios.get<Config[]>('/api/config', {
        params: filtros
      });
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao listar configurações',
        detalhes: { filtros, error }
      });
      throw error;
    }
  },

  /**
   * Importa configurações de um arquivo
   * @param arquivo Arquivo com as configurações
   * @returns Resultado da importação
   */
  async importar(arquivo: File): Promise<{
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
      }>('/api/config/importar', formData);

      // Limpa o cache
      await CacheService.limpar();

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Configurações importadas',
        detalhes: data
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao importar configurações',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Exporta configurações para um arquivo
   * @param filtros Filtros para a exportação
   * @param formato Formato do arquivo (csv, xlsx, json)
   * @returns URL do arquivo
   */
  async exportar(
    filtros?: ConfigFilter,
    formato: 'csv' | 'xlsx' | 'json' = 'json'
  ): Promise<string> {
    try {
      const { data } = await axios.post<{ url: string }>('/api/config/exportar', {
        ...filtros,
        formato
      });

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Configurações exportadas',
        detalhes: { filtros, formato }
      });

      return data.url;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao exportar configurações',
        detalhes: { filtros, formato, error }
      });
      throw error;
    }
  },

  /**
   * Converte um valor para string
   * @param valor Valor a ser convertido
   * @param tipo Tipo do valor
   * @returns Valor convertido para string
   */
  private converterParaString(valor: unknown, tipo: Config['tipo']): string {
    switch (tipo) {
      case 'json':
        return JSON.stringify(valor);
      case 'date':
        return (valor as Date).toISOString();
      default:
        return String(valor);
    }
  },

  /**
   * Converte uma string para o tipo correto
   * @param valor Valor a ser convertido
   * @param tipo Tipo do valor
   * @returns Valor convertido
   */
  private converterValor<T>(valor: string, tipo: Config['tipo']): T {
    switch (tipo) {
      case 'number':
        return Number(valor) as T;
      case 'boolean':
        return (valor === 'true') as T;
      case 'json':
        return JSON.parse(valor) as T;
      case 'date':
        return new Date(valor) as T;
      default:
        return valor as T;
    }
  },

  async getById(id: string): Promise<Config> {
    const { data } = await axios.get<Config>(`/api/config/${id}`);
    return data;
  },

  async getByChave(chave: string): Promise<Config> {
    const { data } = await axios.get<Config>(`/api/config/chave/${chave}`);
    return data;
  },

  async create(formData: ConfigFormData): Promise<Config> {
    const { data } = await axios.post<Config>('/api/config', formData);
    return data;
  },

  async update(id: string, formData: Partial<ConfigFormData>): Promise<Config> {
    const { data } = await axios.put<Config>(`/api/config/${id}`, formData);
    return data;
  },

  async remove(id: string): Promise<void> {
    await axios.delete(`/api/config/${id}`);
  },

  async obterValor(chave: string): Promise<string> {
    const { data } = await axios.get<{ valor: string }>(`/api/config/valor/${chave}`);
    return data.valor;
  },

  async definirValor(chave: string, valor: string): Promise<void> {
    await axios.post(`/api/config/valor/${chave}`, { valor });
  },
}; 
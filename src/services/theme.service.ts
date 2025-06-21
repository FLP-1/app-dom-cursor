/**
 * Arquivo: theme.service.ts
 * Caminho: src/services/theme.service.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de temas
 */

import { LogService, TipoLog, CategoriaLog } from '@/services/log.service';
import { CacheService } from '@/services/cache.service';
import { I18nService } from '@/services/i18n.service';

/**
 * Serviço de Tema
 * @description Gerencia os temas do sistema
 * @author DOM
 * @version 1.0.0
 * @since 2025-01-01
 */

export type Modo = 'claro' | 'escuro' | 'sistema';

export interface Tema {
  id: string;
  nome: string;
  modo: Modo;
  cores: {
    primaria: string;
    secundaria: string;
    sucesso: string;
    erro: string;
    aviso: string;
    info: string;
    fundo: string;
    texto: string;
    borda: string;
  };
  tipografia: {
    fonte: string;
    tamanhoBase: number;
    peso: {
      regular: number;
      medio: number;
      negrito: number;
    };
    altura: {
      compacta: number;
      normal: number;
      espacada: number;
    };
  };
  espacamento: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  bordas: {
    raio: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    espessura: {
      fina: number;
      media: number;
      grossa: number;
    };
  };
  sombras: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface TemaFilter {
  nome?: string;
  modo?: Modo;
}

export interface TemaConfig {
  id: string;
  temaPadrao: string;
  modoPadrao: Modo;
  permitirPersonalizacao: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TemaEstatisticas {
  total: number;
  porModo: Record<Modo, number>;
  maisUsados: Tema[];
  ultimosCriados: Tema[];
}

export const ThemeService = {
  CACHE_KEY: 'theme:',
  CACHE_EXPIRACAO: 3600, // 1 hora
  config: null as TemaConfig | null,

  /**
   * Inicializa o serviço
   * @returns Promise<void>
   */
  async inicializar(): Promise<void> {
    try {
      this.config = await this.obterConfiguracao();
      await this.aplicarTemaPadrao();
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.THEME,
        mensagem: 'Erro ao inicializar tema',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Obtém o tema atual
   * @returns Tema atual
   */
  async obterTema(): Promise<Tema> {
    try {
      const cacheKey = `${this.CACHE_KEY}atual`;
      const cached = await CacheService.obter<Tema>(cacheKey);

      if (cached) {
        return cached;
      }

      const { data } = await axios.get<Tema>('/api/theme/atual');
      await CacheService.definir(cacheKey, data, this.CACHE_EXPIRACAO);

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.THEME,
        mensagem: 'Erro ao obter tema atual',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Define o tema atual
   * @param tema Tema a ser definido
   * @returns Tema definido
   */
  async definirTema(tema: Tema): Promise<Tema> {
    try {
      const { data } = await axios.post<Tema>('/api/theme/atual', tema);

      await CacheService.definir(`${this.CACHE_KEY}atual`, data, this.CACHE_EXPIRACAO);
      await this.aplicarTema(data);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.THEME,
        mensagem: 'Tema definido',
        detalhes: { tema: data }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.THEME,
        mensagem: 'Erro ao definir tema',
        detalhes: { tema, error }
      });
      throw error;
    }
  },

  /**
   * Define o modo do tema
   * @param modo Modo a ser definido
   * @returns Tema atualizado
   */
  async definirModo(modo: Modo): Promise<Tema> {
    try {
      const tema = await this.obterTema();
      const temaAtualizado = { ...tema, modo };

      return await this.definirTema(temaAtualizado);
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.THEME,
        mensagem: 'Erro ao definir modo do tema',
        detalhes: { modo, error }
      });
      throw error;
    }
  },

  /**
   * Lista os temas
   * @param filtros Filtros para a listagem
   * @returns Lista de temas
   */
  async listar(filtros?: TemaFilter): Promise<Tema[]> {
    try {
      const { data } = await axios.get<Tema[]>('/api/theme', {
        params: filtros
      });
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.THEME,
        mensagem: 'Erro ao listar temas',
        detalhes: { filtros, error }
      });
      throw error;
    }
  },

  /**
   * Obtém um tema específico
   * @param id ID do tema
   * @returns Tema
   */
  async obter(id: string): Promise<Tema> {
    try {
      const cacheKey = `${this.CACHE_KEY}${id}`;
      const cached = await CacheService.obter<Tema>(cacheKey);

      if (cached) {
        return cached;
      }

      const { data } = await axios.get<Tema>(`/api/theme/${id}`);
      await CacheService.definir(cacheKey, data, this.CACHE_EXPIRACAO);

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.THEME,
        mensagem: 'Erro ao obter tema',
        detalhes: { id, error }
      });
      throw error;
    }
  },

  /**
   * Cria um novo tema
   * @param tema Dados do tema
   * @returns Tema criado
   */
  async criar(tema: Omit<Tema, 'id' | 'createdAt' | 'updatedAt'>): Promise<Tema> {
    try {
      const { data } = await axios.post<Tema>('/api/theme', tema);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.THEME,
        mensagem: 'Tema criado',
        detalhes: { tema: data }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.THEME,
        mensagem: 'Erro ao criar tema',
        detalhes: { tema, error }
      });
      throw error;
    }
  },

  /**
   * Atualiza um tema
   * @param id ID do tema
   * @param tema Novos dados do tema
   * @returns Tema atualizado
   */
  async atualizar(
    id: string,
    tema: Partial<Omit<Tema, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Tema> {
    try {
      const { data } = await axios.patch<Tema>(`/api/theme/${id}`, tema);

      await CacheService.remover(`${this.CACHE_KEY}${id}`);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.THEME,
        mensagem: 'Tema atualizado',
        detalhes: { id, tema: data }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.THEME,
        mensagem: 'Erro ao atualizar tema',
        detalhes: { id, tema, error }
      });
      throw error;
    }
  },

  /**
   * Remove um tema
   * @param id ID do tema
   * @returns true se o tema foi removido, false caso contrário
   */
  async remover(id: string): Promise<boolean> {
    try {
      await axios.delete(`/api/theme/${id}`);
      await CacheService.remover(`${this.CACHE_KEY}${id}`);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.THEME,
        mensagem: 'Tema removido',
        detalhes: { id }
      });

      return true;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.THEME,
        mensagem: 'Erro ao remover tema',
        detalhes: { id, error }
      });
      throw error;
    }
  },

  /**
   * Importa temas de um arquivo
   * @param arquivo Arquivo com os temas
   * @returns Temas importados
   */
  async importar(arquivo: File): Promise<Tema[]> {
    try {
      const formData = new FormData();
      formData.append('arquivo', arquivo);

      const { data } = await axios.post<Tema[]>('/api/theme/importar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.THEME,
        mensagem: 'Temas importados',
        detalhes: { temas: data }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.THEME,
        mensagem: 'Erro ao importar temas',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Exporta temas para um arquivo
   * @param temas Temas a serem exportados
   * @param formato Formato de exportação (json, csv)
   * @returns Arquivo exportado
   */
  async exportar(temas: Tema[], formato: 'json' | 'csv' = 'json'): Promise<Blob> {
    try {
      const { data } = await axios.post(
        '/api/theme/exportar',
        { temas, formato },
        {
          responseType: 'blob'
        }
      );

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.THEME,
        mensagem: 'Temas exportados',
        detalhes: { temas, formato }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.THEME,
        mensagem: 'Erro ao exportar temas',
        detalhes: { temas, formato, error }
      });
      throw error;
    }
  },

  /**
   * Gera um tema baseado em uma cor primária
   * @param corPrimaria Cor primária
   * @param modo Modo do tema
   * @returns Tema gerado
   */
  async gerarTema(corPrimaria: string, modo: Modo): Promise<Tema> {
    try {
      const { data } = await axios.post<Tema>('/api/theme/gerar', {
        corPrimaria,
        modo
      });

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.THEME,
        mensagem: 'Tema gerado',
        detalhes: { corPrimaria, modo, tema: data }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.THEME,
        mensagem: 'Erro ao gerar tema',
        detalhes: { corPrimaria, modo, error }
      });
      throw error;
    }
  },

  /**
   * Obtém a configuração do serviço
   * @returns Configuração
   */
  async obterConfiguracao(): Promise<TemaConfig> {
    try {
      const { data } = await axios.get<TemaConfig>('/api/theme/config');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.THEME,
        mensagem: 'Erro ao obter configuração do tema',
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
    config: Partial<Omit<TemaConfig, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<TemaConfig> {
    try {
      const { data } = await axios.patch<TemaConfig>('/api/theme/config', config);

      this.config = data;

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.THEME,
        mensagem: 'Configuração do tema atualizada',
        detalhes: { config }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.THEME,
        mensagem: 'Erro ao atualizar configuração do tema',
        detalhes: { config, error }
      });
      throw error;
    }
  },

  /**
   * Obtém estatísticas dos temas
   * @returns Estatísticas
   */
  async obterEstatisticas(): Promise<TemaEstatisticas> {
    try {
      const { data } = await axios.get<TemaEstatisticas>('/api/theme/estatisticas');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.THEME,
        mensagem: 'Erro ao obter estatísticas do tema',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Aplica o tema padrão
   * @returns Promise<void>
   */
  private async aplicarTemaPadrao(): Promise<void> {
    try {
      if (!this.config) {
        throw new Error('Serviço de tema não inicializado');
      }

      const tema = await this.obter(this.config.temaPadrao);
      await this.definirTema({ ...tema, modo: this.config.modoPadrao });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.THEME,
        mensagem: 'Erro ao aplicar tema padrão',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Aplica um tema
   * @param tema Tema a ser aplicado
   * @returns Promise<void>
   */
  private async aplicarTema(tema: Tema): Promise<void> {
    try {
      const root = document.documentElement;

      // Cores
      Object.entries(tema.cores).forEach(([chave, valor]) => {
        root.style.setProperty(`--cor-${chave}`, valor);
      });

      // Tipografia
      root.style.setProperty('--fonte', tema.tipografia.fonte);
      root.style.setProperty('--tamanho-base', `${tema.tipografia.tamanhoBase}px`);
      Object.entries(tema.tipografia.peso).forEach(([chave, valor]) => {
        root.style.setProperty(`--peso-${chave}`, valor.toString());
      });
      Object.entries(tema.tipografia.altura).forEach(([chave, valor]) => {
        root.style.setProperty(`--altura-${chave}`, valor.toString());
      });

      // Espaçamento
      Object.entries(tema.espacamento).forEach(([chave, valor]) => {
        root.style.setProperty(`--espaco-${chave}`, `${valor}px`);
      });

      // Bordas
      Object.entries(tema.bordas.raio).forEach(([chave, valor]) => {
        root.style.setProperty(`--raio-${chave}`, `${valor}px`);
      });
      Object.entries(tema.bordas.espessura).forEach(([chave, valor]) => {
        root.style.setProperty(`--espessura-${chave}`, `${valor}px`);
      });

      // Sombras
      Object.entries(tema.sombras).forEach(([chave, valor]) => {
        root.style.setProperty(`--sombra-${chave}`, valor);
      });

      // Modo
      root.setAttribute('data-modo', tema.modo);
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.THEME,
        mensagem: 'Erro ao aplicar tema',
        detalhes: { tema, error }
      });
      throw error;
    }
  }
}; 

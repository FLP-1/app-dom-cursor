import axios from 'axios';
import { LogService, TipoLog, CategoriaLog } from './log.service';

/**
 * Serviço de Mensagens
 * @description Gerencia mensagens do sistema para internacionalização e padronização
 * @author DOM
 * @version 1.0.0
 * @since 2024-01-01
 */

export enum TipoMensagem {
  SUCESSO = 'SUCESSO',
  ERRO = 'ERRO',
  ALERTA = 'ALERTA',
  INFO = 'INFO'
}

export enum CategoriaMensagem {
  SISTEMA = 'SISTEMA',
  USUARIO = 'USUARIO',
  AUTENTICACAO = 'AUTENTICACAO',
  PONTO = 'PONTO',
  OCORRENCIA = 'OCORRENCIA',
  DOCUMENTO = 'DOCUMENTO',
  ESOCIAL = 'ESOCIAL',
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  WHATSAPP = 'WHATSAPP',
  BACKUP = 'BACKUP',
  SEGURANCA = 'SEGURANCA'
}

export interface Mensagem {
  id: string;
  tipo: TipoMensagem;
  categoria: CategoriaMensagem;
  codigo: string;
  mensagem: string;
  descricao?: string;
  variaveis?: Record<string, string>;
  idioma: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MensagemFilter {
  tipo?: TipoMensagem;
  categoria?: CategoriaMensagem;
  codigo?: string;
  idioma?: string;
}

export const MessageService = {
  /**
   * Obtém uma mensagem pelo código
   * @param codigo Código da mensagem
   * @param idioma Idioma da mensagem
   * @param variaveis Variáveis para substituição
   * @returns Mensagem formatada
   */
  async getMessage(
    codigo: string,
    idioma: string = 'pt-BR',
    variaveis?: Record<string, string>
  ): Promise<string> {
    try {
      const { data } = await axios.get<Mensagem>(`/api/messages/${codigo}`, {
        params: { idioma }
      });

      let mensagem = data.mensagem;

      // Substitui variáveis na mensagem
      if (variaveis) {
        Object.entries(variaveis).forEach(([chave, valor]) => {
          mensagem = mensagem.replace(`{${chave}}`, valor);
        });
      }

      return mensagem;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao obter mensagem',
        detalhes: { codigo, idioma, error }
      });
      return `Erro ao carregar mensagem: ${codigo}`;
    }
  },

  /**
   * Lista mensagens com filtros
   * @param filtros Filtros para busca
   * @returns Lista de mensagens
   */
  async list(filtros: MensagemFilter): Promise<Mensagem[]> {
    try {
      const { data } = await axios.get<Mensagem[]>('/api/messages', {
        params: filtros
      });
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao listar mensagens',
        detalhes: { filtros, error }
      });
      return [];
    }
  },

  /**
   * Cria uma nova mensagem
   * @param mensagem Dados da mensagem
   * @returns Mensagem criada
   */
  async create(mensagem: Omit<Mensagem, 'id' | 'createdAt' | 'updatedAt'>): Promise<Mensagem> {
    try {
      const { data } = await axios.post<Mensagem>('/api/messages', mensagem);
      
      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Mensagem criada',
        detalhes: { codigo: mensagem.codigo }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao criar mensagem',
        detalhes: { mensagem, error }
      });
      throw error;
    }
  },

  /**
   * Atualiza uma mensagem existente
   * @param codigo Código da mensagem
   * @param mensagem Dados da mensagem
   * @returns Mensagem atualizada
   */
  async update(
    codigo: string,
    mensagem: Partial<Omit<Mensagem, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Mensagem> {
    try {
      const { data } = await axios.put<Mensagem>(`/api/messages/${codigo}`, mensagem);
      
      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Mensagem atualizada',
        detalhes: { codigo }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao atualizar mensagem',
        detalhes: { codigo, mensagem, error }
      });
      throw error;
    }
  },

  /**
   * Remove uma mensagem
   * @param codigo Código da mensagem
   */
  async remove(codigo: string): Promise<void> {
    try {
      await axios.delete(`/api/messages/${codigo}`);
      
      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Mensagem removida',
        detalhes: { codigo }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao remover mensagem',
        detalhes: { codigo, error }
      });
      throw error;
    }
  },

  /**
   * Importa mensagens de um arquivo
   * @param arquivo Arquivo com mensagens
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
      }>('/api/messages/importar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Mensagens importadas',
        detalhes: data
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao importar mensagens',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Exporta mensagens para um arquivo
   * @param filtros Filtros para exportação
   * @returns URL do arquivo
   */
  async exportar(filtros: MensagemFilter): Promise<string> {
    try {
      const { data } = await axios.post<{ url: string }>('/api/messages/exportar', filtros);
      
      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Mensagens exportadas',
        detalhes: { filtros }
      });

      return data.url;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao exportar mensagens',
        detalhes: { filtros, error }
      });
      throw error;
    }
  },

  /**
   * Obtém estatísticas das mensagens
   * @returns Estatísticas
   */
  async obterEstatisticas(): Promise<{
    total: number;
    porTipo: Record<TipoMensagem, number>;
    porCategoria: Record<CategoriaMensagem, number>;
    porIdioma: Record<string, number>;
  }> {
    try {
      const { data } = await axios.get('/api/messages/estatisticas');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao obter estatísticas de mensagens',
        detalhes: { error }
      });
      throw error;
    }
  }
}; 
/**
 * Arquivo: stats.service.ts
 * Caminho: src/services/stats.service.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de estatísticas
 */

import axios from 'axios';
import { LogService, TipoLog, CategoriaLog } from '@/services/log.service';

/**
 * Serviço de Estatísticas
 * @description Gerencia estatísticas e métricas do sistema
 * @author DOM
 * @version 1.0.0
 * @since 2025-01-01
 */

export interface EstatisticaPonto {
  total: number;
  porTipo: Record<string, number>;
  porDia: Record<string, number>;
  porMes: Record<string, number>;
  porAno: Record<string, number>;
  porUsuario: Record<string, number>;
  porEmpregado: Record<string, number>;
  atrasos: number;
  faltas: number;
  horasExtras: number;
}

export interface EstatisticaOcorrencia {
  total: number;
  porTipo: Record<string, number>;
  porDia: Record<string, number>;
  porMes: Record<string, number>;
  porAno: Record<string, number>;
  porUsuario: Record<string, number>;
  porEmpregado: Record<string, number>;
}

export interface EstatisticaDocumento {
  total: number;
  porTipo: Record<string, number>;
  porDia: Record<string, number>;
  porMes: Record<string, number>;
  porAno: Record<string, number>;
  porUsuario: Record<string, number>;
  porEmpregado: Record<string, number>;
  tamanhoTotal: number;
}

export interface EstatisticaEsocial {
  total: number;
  porTipo: Record<string, number>;
  porDia: Record<string, number>;
  porMes: Record<string, number>;
  porAno: Record<string, number>;
  porUsuario: Record<string, number>;
  porEmpregado: Record<string, number>;
  porStatus: Record<string, number>;
}

export interface EstatisticaUsuario {
  total: number;
  ativos: number;
  inativos: number;
  porTipo: Record<string, number>;
  porDia: Record<string, number>;
  porMes: Record<string, number>;
  porAno: Record<string, number>;
}

export interface EstatisticaEmpregado {
  total: number;
  ativos: number;
  inativos: number;
  porTipo: Record<string, number>;
  porDia: Record<string, number>;
  porMes: Record<string, number>;
  porAno: Record<string, number>;
}

export interface EstatisticaSistema {
  usuarios: EstatisticaUsuario;
  empregados: EstatisticaEmpregado;
  pontos: EstatisticaPonto;
  ocorrencias: EstatisticaOcorrencia;
  documentos: EstatisticaDocumento;
  esocial: EstatisticaEsocial;
  logs: {
    total: number;
    porTipo: Record<string, number>;
    porCategoria: Record<string, number>;
    porDia: Record<string, number>;
    porMes: Record<string, number>;
    porAno: Record<string, number>;
    porUsuario: Record<string, number>;
  };
}

export const StatsService = {
  /**
   * Obtém estatísticas do sistema
   * @param dataInicio Data inicial
   * @param dataFim Data final
   * @returns Estatísticas do sistema
   */
  async obterEstatisticasSistema(
    dataInicio: Date,
    dataFim: Date
  ): Promise<EstatisticaSistema> {
    try {
      const { data } = await axios.get<EstatisticaSistema>('/api/stats/sistema', {
        params: {
          dataInicio: dataInicio.toISOString(),
          dataFim: dataFim.toISOString()
        }
      });
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao obter estatísticas do sistema',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Obtém estatísticas de ponto
   * @param dataInicio Data inicial
   * @param dataFim Data final
   * @returns Estatísticas de ponto
   */
  async obterEstatisticasPonto(
    dataInicio: Date,
    dataFim: Date
  ): Promise<EstatisticaPonto> {
    try {
      const { data } = await axios.get<EstatisticaPonto>('/api/stats/ponto', {
        params: {
          dataInicio: dataInicio.toISOString(),
          dataFim: dataFim.toISOString()
        }
      });
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao obter estatísticas de ponto',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Obtém estatísticas de ocorrências
   * @param dataInicio Data inicial
   * @param dataFim Data final
   * @returns Estatísticas de ocorrências
   */
  async obterEstatisticasOcorrencia(
    dataInicio: Date,
    dataFim: Date
  ): Promise<EstatisticaOcorrencia> {
    try {
      const { data } = await axios.get<EstatisticaOcorrencia>('/api/stats/ocorrencia', {
        params: {
          dataInicio: dataInicio.toISOString(),
          dataFim: dataFim.toISOString()
        }
      });
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao obter estatísticas de ocorrências',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Obtém estatísticas de documentos
   * @param dataInicio Data inicial
   * @param dataFim Data final
   * @returns Estatísticas de documentos
   */
  async obterEstatisticasDocumento(
    dataInicio: Date,
    dataFim: Date
  ): Promise<EstatisticaDocumento> {
    try {
      const { data } = await axios.get<EstatisticaDocumento>('/api/stats/documento', {
        params: {
          dataInicio: dataInicio.toISOString(),
          dataFim: dataFim.toISOString()
        }
      });
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao obter estatísticas de documentos',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Obtém estatísticas de eSocial
   * @param dataInicio Data inicial
   * @param dataFim Data final
   * @returns Estatísticas de eSocial
   */
  async obterEstatisticasEsocial(
    dataInicio: Date,
    dataFim: Date
  ): Promise<EstatisticaEsocial> {
    try {
      const { data } = await axios.get<EstatisticaEsocial>('/api/stats/esocial', {
        params: {
          dataInicio: dataInicio.toISOString(),
          dataFim: dataFim.toISOString()
        }
      });
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao obter estatísticas de eSocial',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Obtém estatísticas de usuários
   * @param dataInicio Data inicial
   * @param dataFim Data final
   * @returns Estatísticas de usuários
   */
  async obterEstatisticasUsuario(
    dataInicio: Date,
    dataFim: Date
  ): Promise<EstatisticaUsuario> {
    try {
      const { data } = await axios.get<EstatisticaUsuario>('/api/stats/usuario', {
        params: {
          dataInicio: dataInicio.toISOString(),
          dataFim: dataFim.toISOString()
        }
      });
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao obter estatísticas de usuários',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Obtém estatísticas de empregados
   * @param dataInicio Data inicial
   * @param dataFim Data final
   * @returns Estatísticas de empregados
   */
  async obterEstatisticasEmpregado(
    dataInicio: Date,
    dataFim: Date
  ): Promise<EstatisticaEmpregado> {
    try {
      const { data } = await axios.get<EstatisticaEmpregado>('/api/stats/empregado', {
        params: {
          dataInicio: dataInicio.toISOString(),
          dataFim: dataFim.toISOString()
        }
      });
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao obter estatísticas de empregados',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Exporta estatísticas para um arquivo
   * @param dataInicio Data inicial
   * @param dataFim Data final
   * @param formato Formato do arquivo (csv, xlsx, pdf)
   * @returns URL do arquivo
   */
  async exportarEstatisticas(
    dataInicio: Date,
    dataFim: Date,
    formato: 'csv' | 'xlsx' | 'pdf'
  ): Promise<string> {
    try {
      const { data } = await axios.post<{ url: string }>('/api/stats/exportar', {
        dataInicio: dataInicio.toISOString(),
        dataFim: dataFim.toISOString(),
        formato
      });

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Estatísticas exportadas',
        detalhes: { formato }
      });

      return data.url;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao exportar estatísticas',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Gera um relatório personalizado
   * @param config Configuração do relatório
   * @returns URL do relatório
   */
  async gerarRelatorio(config: {
    tipo: 'ponto' | 'ocorrencia' | 'documento' | 'esocial' | 'usuario' | 'empregado';
    dataInicio: Date;
    dataFim: Date;
    filtros?: Record<string, unknown>;
    formato: 'csv' | 'xlsx' | 'pdf';
  }): Promise<string> {
    try {
      const { data } = await axios.post<{ url: string }>('/api/stats/relatorio', {
        ...config,
        dataInicio: config.dataInicio.toISOString(),
        dataFim: config.dataFim.toISOString()
      });

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Relatório gerado',
        detalhes: { tipo: config.tipo, formato: config.formato }
      });

      return data.url;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao gerar relatório',
        detalhes: { config, error }
      });
      throw error;
    }
  }
}; 

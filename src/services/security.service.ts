import axios from 'axios';
import { LogService, TipoLog, CategoriaLog } from './log.service';

/**
 * Serviço de Segurança
 * @description Gerencia funcionalidades de segurança do sistema
 * @author DOM
 * @version 1.0.0
 * @since 2024-01-01
 */

export interface LoginAttempt {
  id: string;
  usuarioId?: string;
  email: string;
  ip: string;
  userAgent: string;
  sucesso: boolean;
  erro?: string;
  data: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SecurityConfig {
  id: string;
  senhaMinima: number;
  senhaMaiuscula: boolean;
  senhaMinuscula: boolean;
  senhaNumero: boolean;
  senhaEspecial: boolean;
  senhaExpiracao: number;
  senhaHistorico: number;
  tentativasLogin: number;
  bloqueioTemporario: number;
  sessaoExpiracao: number;
  doisFatores: boolean;
  doisFatoresMetodo: 'EMAIL' | 'SMS' | 'WHATSAPP' | 'AUTHENTICATOR';
  doisFatoresExpiracao: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SecurityLog {
  id: string;
  tipo: 'LOGIN' | 'LOGOUT' | 'SENHA' | 'PERMISSAO' | 'ACESSO' | 'CONFIGURACAO';
  usuarioId?: string;
  ip: string;
  userAgent: string;
  detalhes: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface SecurityFilter {
  tipo?: SecurityLog['tipo'];
  usuarioId?: string;
  dataInicio?: Date;
  dataFim?: Date;
}

export const SecurityService = {
  /**
   * Lista todas as tentativas de login
   * @param filtros Filtros para a listagem
   * @returns Lista de tentativas de login
   */
  async listarTentativasLogin(filtros?: {
    usuarioId?: string;
    email?: string;
    sucesso?: boolean;
    dataInicio?: Date;
    dataFim?: Date;
  }): Promise<LoginAttempt[]> {
    try {
      const { data } = await axios.get<LoginAttempt[]>('/api/security/login-attempts', {
        params: {
          ...filtros,
          dataInicio: filtros?.dataInicio?.toISOString(),
          dataFim: filtros?.dataFim?.toISOString()
        }
      });
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SEGURANCA,
        mensagem: 'Erro ao listar tentativas de login',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Lista todos os logs de segurança
   * @param filtros Filtros para a listagem
   * @returns Lista de logs de segurança
   */
  async listarLogs(filtros?: SecurityFilter): Promise<SecurityLog[]> {
    try {
      const { data } = await axios.get<SecurityLog[]>('/api/security/logs', {
        params: {
          ...filtros,
          dataInicio: filtros?.dataInicio?.toISOString(),
          dataFim: filtros?.dataFim?.toISOString()
        }
      });
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SEGURANCA,
        mensagem: 'Erro ao listar logs de segurança',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Obtém a configuração de segurança
   * @returns Configuração de segurança
   */
  async obterConfiguracao(): Promise<SecurityConfig> {
    try {
      const { data } = await axios.get<SecurityConfig>('/api/security/configuracao');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SEGURANCA,
        mensagem: 'Erro ao obter configuração de segurança',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Atualiza a configuração de segurança
   * @param config Nova configuração
   * @returns Configuração atualizada
   */
  async atualizarConfiguracao(
    config: Partial<Omit<SecurityConfig, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<SecurityConfig> {
    try {
      const { data } = await axios.put<SecurityConfig>('/api/security/configuracao', config);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SEGURANCA,
        mensagem: 'Configuração de segurança atualizada',
        detalhes: { config }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SEGURANCA,
        mensagem: 'Erro ao atualizar configuração de segurança',
        detalhes: { config, error }
      });
      throw error;
    }
  },

  /**
   * Verifica se um usuário está bloqueado
   * @param email Email do usuário
   * @returns Status do bloqueio
   */
  async verificarBloqueio(email: string): Promise<{
    bloqueado: boolean;
    tentativasRestantes: number;
    tempoBloqueio?: number;
  }> {
    try {
      const { data } = await axios.get<{
        bloqueado: boolean;
        tentativasRestantes: number;
        tempoBloqueio?: number;
      }>('/api/security/verificar-bloqueio', {
        params: { email }
      });
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SEGURANCA,
        mensagem: 'Erro ao verificar bloqueio',
        detalhes: { email, error }
      });
      throw error;
    }
  },

  /**
   * Desbloqueia um usuário
   * @param email Email do usuário
   */
  async desbloquear(email: string): Promise<void> {
    try {
      await axios.post('/api/security/desbloquear', { email });

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SEGURANCA,
        mensagem: 'Usuário desbloqueado',
        detalhes: { email }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SEGURANCA,
        mensagem: 'Erro ao desbloquear usuário',
        detalhes: { email, error }
      });
      throw error;
    }
  },

  /**
   * Verifica a força de uma senha
   * @param senha Senha a ser verificada
   * @returns Força da senha
   */
  async verificarForcaSenha(senha: string): Promise<{
    forca: 'FRACA' | 'MEDIA' | 'FORTE';
    pontos: number;
    criterios: {
      tamanho: boolean;
      maiuscula: boolean;
      minuscula: boolean;
      numero: boolean;
      especial: boolean;
    };
  }> {
    try {
      const { data } = await axios.post<{
        forca: 'FRACA' | 'MEDIA' | 'FORTE';
        pontos: number;
        criterios: {
          tamanho: boolean;
          maiuscula: boolean;
          minuscula: boolean;
          numero: boolean;
          especial: boolean;
        };
      }>('/api/security/verificar-senha', { senha });
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SEGURANCA,
        mensagem: 'Erro ao verificar força da senha',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Verifica se uma senha está no histórico
   * @param usuarioId ID do usuário
   * @param senha Senha a ser verificada
   * @returns Status da verificação
   */
  async verificarHistoricoSenha(
    usuarioId: string,
    senha: string
  ): Promise<{ noHistorico: boolean }> {
    try {
      const { data } = await axios.post<{ noHistorico: boolean }>(
        '/api/security/verificar-historico-senha',
        { usuarioId, senha }
      );
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SEGURANCA,
        mensagem: 'Erro ao verificar histórico de senha',
        detalhes: { usuarioId, error }
      });
      throw error;
    }
  },

  /**
   * Gera um código de autenticação de dois fatores
   * @param usuarioId ID do usuário
   * @returns Código gerado
   */
  async gerarCodigoDoisFatores(usuarioId: string): Promise<{
    codigo: string;
    expiracao: Date;
  }> {
    try {
      const { data } = await axios.post<{
        codigo: string;
        expiracao: Date;
      }>('/api/security/gerar-codigo-dois-fatores', { usuarioId });

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SEGURANCA,
        mensagem: 'Código de dois fatores gerado',
        detalhes: { usuarioId }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SEGURANCA,
        mensagem: 'Erro ao gerar código de dois fatores',
        detalhes: { usuarioId, error }
      });
      throw error;
    }
  },

  /**
   * Verifica um código de autenticação de dois fatores
   * @param usuarioId ID do usuário
   * @param codigo Código a ser verificado
   * @returns Status da verificação
   */
  async verificarCodigoDoisFatores(
    usuarioId: string,
    codigo: string
  ): Promise<{ valido: boolean }> {
    try {
      const { data } = await axios.post<{ valido: boolean }>(
        '/api/security/verificar-codigo-dois-fatores',
        { usuarioId, codigo }
      );

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SEGURANCA,
        mensagem: 'Código de dois fatores verificado',
        detalhes: { usuarioId, valido: data.valido }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SEGURANCA,
        mensagem: 'Erro ao verificar código de dois fatores',
        detalhes: { usuarioId, error }
      });
      throw error;
    }
  },

  /**
   * Obtém estatísticas de segurança
   * @param filtros Filtros para as estatísticas
   * @returns Estatísticas de segurança
   */
  async obterEstatisticas(filtros?: SecurityFilter): Promise<{
    totalLogins: number;
    loginsSucesso: number;
    loginsFalha: number;
    usuariosBloqueados: number;
    tentativasBloqueio: number;
    porTipo: Record<SecurityLog['tipo'], number>;
    porDia: Record<string, number>;
    porMes: Record<string, number>;
    porAno: Record<string, number>;
  }> {
    try {
      const { data } = await axios.get<{
        totalLogins: number;
        loginsSucesso: number;
        loginsFalha: number;
        usuariosBloqueados: number;
        tentativasBloqueio: number;
        porTipo: Record<SecurityLog['tipo'], number>;
        porDia: Record<string, number>;
        porMes: Record<string, number>;
        porAno: Record<string, number>;
      }>('/api/security/estatisticas', {
        params: {
          ...filtros,
          dataInicio: filtros?.dataInicio?.toISOString(),
          dataFim: filtros?.dataFim?.toISOString()
        }
      });
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SEGURANCA,
        mensagem: 'Erro ao obter estatísticas de segurança',
        detalhes: { filtros, error }
      });
      throw error;
    }
  }
}; 
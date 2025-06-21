/**
 * Arquivo: sms.service.ts
 * Caminho: src/services/sms.service.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de integração com SMS
 */

import axios from 'axios';
import { LogService, TipoLog, CategoriaLog } from '@/services/log.service';

/**
 * Serviço de integração com SMS
 * @description Gerencia o envio de mensagens SMS e templates
 * @author DOM
 * @version 1.0.0
 * @since 2025-01-01
 */

export enum SMSErrorType {
  NUMERO_INVALIDO = 'NUMERO_INVALIDO',
  MENSAGEM_INVALIDA = 'MENSAGEM_INVALIDA',
  PROVEDOR_INDISPONIVEL = 'PROVEDOR_INDISPONIVEL',
  SALDO_INSUFICIENTE = 'SALDO_INSUFICIENTE',
  TEMPLATE_NAO_ENCONTRADO = 'TEMPLATE_NAO_ENCONTRADO',
  CONFIGURACAO_INVALIDA = 'CONFIGURACAO_INVALIDA'
}

export class SMSError extends Error {
  constructor(
    public tipo: SMSErrorType,
    public mensagem: string,
    public detalhes?: Record<string, unknown>
  ) {
    super(mensagem);
    this.name = 'SMSError';
  }
}

export interface SMSMessage {
  id: string;
  destinatario: string;
  conteudo: string;
  status: 'PENDENTE' | 'ENVIADO' | 'ENTREGUE' | 'ERRO';
  erro?: string;
  dataEnvio?: Date;
  dataEntrega?: Date;
  consentimento: boolean;
  finalidade: string;
  politicaPrivacidade: string;
  dataConsentimento: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SMSTemplate {
  id: string;
  nome: string;
  conteudo: string;
  variaveis: string[];
  descricaoAcessivel?: string;
  instrucoesAcessibilidade?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SMSTestCase {
  descricao: string;
  entrada: {
    destinatario: string;
    conteudo: string;
  };
  saidaEsperada: {
    status: SMSMessage['status'];
    erro?: string;
  };
}

export const SMSService = {
  /**
   * Valida o formato do número de telefone
   * @param numero Número de telefone a ser validado
   * @returns true se o número for válido
   */
  validarNumeroTelefone(numero: string): boolean {
    const regex = /^\+?[1-9]\d{1,14}$/;
    return regex.test(numero.replace(/\D/g, ''));
  },

  /**
   * Valida o conteúdo da mensagem
   * @param conteudo Conteúdo da mensagem a ser validado
   * @returns true se o conteúdo for válido
   */
  validarConteudo(conteudo: string): boolean {
    return conteudo.length > 0 && conteudo.length <= 160;
  },

  /**
   * Envia uma mensagem SMS
   * @param destinatario Número do destinatário
   * @param conteudo Conteúdo da mensagem
   * @param finalidade Finalidade do envio (LGPD)
   * @returns Mensagem enviada
   */
  async enviarSMS(
    destinatario: string,
    conteudo: string,
    finalidade: string
  ): Promise<SMSMessage> {
    try {
      // Validações
      if (!this.validarNumeroTelefone(destinatario)) {
        throw new SMSError(
          SMSErrorType.NUMERO_INVALIDO,
          'Número de telefone inválido'
        );
      }

      if (!this.validarConteudo(conteudo)) {
        throw new SMSError(
          SMSErrorType.MENSAGEM_INVALIDA,
          'Mensagem inválida ou excede o limite de 160 caracteres'
        );
      }

      const { data } = await axios.post<SMSMessage>('/api/sms', {
        destinatario,
        conteudo,
        finalidade,
        consentimento: true,
        politicaPrivacidade: 'https://dom.com.br/politica-privacidade',
        dataConsentimento: new Date()
      });

      // Log de auditoria
      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SMS,
        mensagem: `SMS enviado para ${destinatario}`,
        detalhes: {
          mensagemId: data.id,
          status: data.status,
          finalidade
        }
      });

      return data;
    } catch (error) {
      // Log de erro
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SMS,
        mensagem: `Erro ao enviar SMS para ${destinatario}`,
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Envia uma mensagem SMS usando template
   * @param destinatario Número do destinatário
   * @param template Nome do template
   * @param variaveis Variáveis do template
   * @param finalidade Finalidade do envio (LGPD)
   * @param idioma Idioma da mensagem
   * @returns Mensagem enviada
   */
  async enviarTemplate(
    destinatario: string,
    template: string,
    variaveis: Record<string, string>,
    finalidade: string,
    idioma: string = 'pt-BR'
  ): Promise<SMSMessage> {
    try {
      if (!this.validarNumeroTelefone(destinatario)) {
        throw new SMSError(
          SMSErrorType.NUMERO_INVALIDO,
          'Número de telefone inválido'
        );
      }

      const { data } = await axios.post<SMSMessage>('/api/sms/template', {
        destinatario,
        template,
        variaveis,
        finalidade,
        idioma,
        consentimento: true,
        politicaPrivacidade: 'https://dom.com.br/politica-privacidade',
        dataConsentimento: new Date()
      });

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SMS,
        mensagem: `SMS template enviado para ${destinatario}`,
        detalhes: {
          mensagemId: data.id,
          template,
          status: data.status,
          finalidade
        }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SMS,
        mensagem: `Erro ao enviar SMS template para ${destinatario}`,
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Obtém o status de uma mensagem
   * @param mensagemId ID da mensagem
   * @returns Status da mensagem
   */
  async obterStatus(mensagemId: string): Promise<SMSMessage> {
    try {
      const { data } = await axios.get<SMSMessage>(`/api/sms/${mensagemId}`);
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SMS,
        mensagem: `Erro ao obter status do SMS ${mensagemId}`,
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Lista todos os templates disponíveis
   * @returns Lista de templates
   */
  async listarTemplates(): Promise<SMSTemplate[]> {
    try {
      const { data } = await axios.get<SMSTemplate[]>('/api/sms/templates');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SMS,
        mensagem: 'Erro ao listar templates de SMS',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Obtém um template específico
   * @param templateId ID do template
   * @returns Template encontrado
   */
  async obterTemplate(templateId: string): Promise<SMSTemplate> {
    try {
      const { data } = await axios.get<SMSTemplate>(`/api/sms/template/${templateId}`);
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SMS,
        mensagem: `Erro ao obter template de SMS ${templateId}`,
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Cria um novo template
   * @param template Dados do template
   * @returns Template criado
   */
  async criarTemplate(template: Omit<SMSTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<SMSTemplate> {
    try {
      const { data } = await axios.post<SMSTemplate>('/api/sms/template', template);
      
      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SMS,
        mensagem: `Template de SMS criado: ${template.nome}`,
        detalhes: { templateId: data.id }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SMS,
        mensagem: 'Erro ao criar template de SMS',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Atualiza um template existente
   * @param templateId ID do template
   * @param template Dados do template
   * @returns Template atualizado
   */
  async atualizarTemplate(
    templateId: string,
    template: Partial<Omit<SMSTemplate, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<SMSTemplate> {
    try {
      const { data } = await axios.put<SMSTemplate>(`/api/sms/template/${templateId}`, template);
      
      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SMS,
        mensagem: `Template de SMS atualizado: ${templateId}`,
        detalhes: { template }
      });

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SMS,
        mensagem: `Erro ao atualizar template de SMS ${templateId}`,
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Remove um template
   * @param templateId ID do template
   */
  async removerTemplate(templateId: string): Promise<void> {
    try {
      await axios.delete(`/api/sms/template/${templateId}`);
      
      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SMS,
        mensagem: `Template de SMS removido: ${templateId}`
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SMS,
        mensagem: `Erro ao remover template de SMS ${templateId}`,
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Obtém a configuração do serviço
   * @returns Configuração atual
   */
  async obterConfiguracao(): Promise<{
    provedor: string;
    apiKey: string;
    remetente: string;
  }> {
    try {
      const { data } = await axios.get('/api/sms/config');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SMS,
        mensagem: 'Erro ao obter configuração do SMS',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Atualiza a configuração do serviço
   * @param config Nova configuração
   */
  async atualizarConfiguracao(config: {
    provedor: string;
    apiKey: string;
    remetente: string;
  }): Promise<void> {
    try {
      await axios.put('/api/sms/config', config);
      
      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SMS,
        mensagem: 'Configuração do SMS atualizada',
        detalhes: { provedor: config.provedor }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SMS,
        mensagem: 'Erro ao atualizar configuração do SMS',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Testa a configuração do serviço
   * @returns Resultado do teste
   */
  async testarConfiguracao(): Promise<{
    sucesso: boolean;
    mensagem: string;
  }> {
    try {
      const { data } = await axios.post('/api/sms/testar');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SMS,
        mensagem: 'Erro ao testar configuração do SMS',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Obtém o saldo disponível
   * @returns Saldo e data de atualização
   */
  async obterSaldo(): Promise<{
    saldo: number;
    dataAtualizacao: Date;
  }> {
    try {
      const { data } = await axios.get('/api/sms/saldo');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SMS,
        mensagem: 'Erro ao obter saldo do SMS',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Obtém o histórico de mensagens
   * @param dataInicio Data inicial
   * @param dataFim Data final
   * @param status Status das mensagens
   * @returns Lista de mensagens
   */
  async obterHistorico(
    dataInicio: Date,
    dataFim: Date,
    status?: SMSMessage['status']
  ): Promise<SMSMessage[]> {
    try {
      const { data } = await axios.get<SMSMessage[]>('/api/sms/historico', {
        params: {
          dataInicio: dataInicio.toISOString(),
          dataFim: dataFim.toISOString(),
          status,
        },
      });
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SMS,
        mensagem: 'Erro ao obter histórico de SMS',
        detalhes: { error }
      });
      throw error;
    }
  },
}; 

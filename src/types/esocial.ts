import { User } from './user';
import { EmpregadorDomestico } from './empregador-domestico';

export enum TipoEventoEsocial {
  S2200 = 'S2200', // Cadastramento Inicial do Vínculo
  S2205 = 'S2205', // Alteração de Dados Cadastrais
  S2206 = 'S2206', // Alteração de Contrato de Trabalho
  S2210 = 'S2210', // Comunicação de Acidente de Trabalho
  S2220 = 'S2220', // Monitoramento da Saúde do Trabalhador
  S2230 = 'S2230', // Afastamento Temporário
  S2240 = 'S2240', // Condições Ambientais do Trabalho
  S2300 = 'S2300', // Trabalhador Sem Vínculo de Emprego/Estatutário
  S2399 = 'S2399', // Trabalhador Sem Vínculo de Emprego/Estatutário - Término
  S2400 = 'S2400', // Cadastro de Benefícios Previdenciários
  S3000 = 'S3000', // Exclusão de Eventos
  S5001 = 'S5001', // Informações das Contribuições Sociais por Trabalhador
  S5002 = 'S5002', // Imposto de Renda Retido na Fonte
  S5003 = 'S5003', // Contribuições Sociais Consolidadas
  S5011 = 'S5011', // Informações das Contribuições Sociais por Trabalhador
  S5012 = 'S5012', // Imposto de Renda Retido na Fonte
  S5013 = 'S5013', // Contribuições Sociais Consolidadas
}

export enum StatusEventoEsocial {
  PENDENTE = 'PENDENTE',
  ENVIADO = 'ENVIADO',
  PROCESSADO = 'PROCESSADO',
  REJEITADO = 'REJEITADO',
  ERRO = 'ERRO',
}

export interface EsocialEvent {
  id: string;
  tipo: TipoEventoEsocial;
  status: StatusEventoEsocial;
  dataEvento: Date;
  dataEnvio?: Date;
  dataProcessamento?: Date;
  mensagemErro?: string;
  payload: Record<string, unknown>;
  usuarioId: string;
  empregadoDomesticoId: string;
  usuario: User;
  empregadoDomestico: EmpregadorDomestico;
  createdAt: Date;
  updatedAt: Date;
}

export interface EsocialEventFilter {
  tipo?: TipoEventoEsocial;
  status?: StatusEventoEsocial;
  dataInicio?: Date;
  dataFim?: Date;
  empregadoDomesticoId?: string;
}

export interface EsocialEventFormData {
  tipo: TipoEventoEsocial;
  dataEvento: Date;
  payload: Record<string, unknown>;
  empregadoDomesticoId: string;
} 
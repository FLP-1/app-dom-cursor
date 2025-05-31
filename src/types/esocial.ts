import { User } from './user';
import { EmpregadorDomestico } from './empregador-domestico';
import { EsocialTabela, EsocialTabelaItem } from '@prisma/client';

// Tipos para as tabelas do eSocial
export type CategoriaTrabalhador = EsocialTabelaItem & { tabela: EsocialTabela };
export type FinanciamentoAposentadoria = EsocialTabelaItem & { tabela: EsocialTabela };
export type NaturezaRubrica = EsocialTabelaItem & { tabela: EsocialTabela };
export type FpasTerceiro = EsocialTabelaItem & { tabela: EsocialTabela };
export type TipoInscricao = EsocialTabelaItem & { tabela: EsocialTabela };
export type Pais = EsocialTabelaItem & { tabela: EsocialTabela };
export type TipoDependente = EsocialTabelaItem & { tabela: EsocialTabela };
export type TipoDocumento = EsocialTabelaItem & { tabela: EsocialTabela };
export type TipoOcorrencia = EsocialTabelaItem & { tabela: EsocialTabela };
export type StatusEvento = EsocialTabelaItem & { tabela: EsocialTabela };
export type TipoEvento = EsocialTabelaItem & { tabela: EsocialTabela };

export interface EsocialEvent {
  id: string;
  tipo: string;
  dataEvento: Date;
  status: string;
  dataEnvio?: Date;
  dataProcessamento?: Date;
  detalhes?: unknown;
}

export interface EsocialEventFilter {
  tipo?: string;
  status?: string;
  dataInicio?: Date;
  dataFim?: Date;
}

export interface EsocialEventLog {
  id: string;
  eventId: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  details?: unknown;
  timestamp: Date;
}

export interface EsocialEventProcessor {
  validateBusinessRules(data: unknown): Promise<void>;
  processEvent(data: unknown): Promise<void>;
  log(level: string, message: string, details?: unknown): Promise<EsocialEventLog>;
}

export interface EsocialEventFormData {
  tipo: TipoEvento;
  dataEvento: Date;
  payload: Record<string, unknown>;
  empregadoDomesticoId: string;
} 
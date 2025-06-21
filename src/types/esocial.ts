/**
 * Arquivo: esocial.ts
 * Caminho: src/types/esocial.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Tipos de eventos do eSocial
 */

import { User } from '@/types/user';
import { EmpregadoDomestico } from '@/types/empregado-domestico';
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

// Tipos específicos para itens das tabelas do eSocial
export interface CategoriaTrabalhadorItem {
  codigo: string;
  descricao: string;
  valor?: string;
  dataInicio: Date;
  dataFim?: Date;
  ativo: boolean;
}

export interface TipoInscricaoItem {
  codigo: string;
  descricao: string;
  valor?: string;
  dataInicio: Date;
  dataFim?: Date;
  ativo: boolean;
}

export interface PaisItem {
  codigo: string;
  descricao: string;
  valor?: string;
  dataInicio: Date;
  dataFim?: Date;
  ativo: boolean;
}

// Tipos específicos para outras tabelas do eSocial
export interface AgenteRiscoItem {
  codigo: string;
  descricao: string;
  valor?: string;
  dataInicio: Date;
  dataFim?: Date;
  ativo: boolean;
}

export interface TipoExameItem {
  codigo: string;
  descricao: string;
  valor?: string;
  dataInicio: Date;
  dataFim?: Date;
  ativo: boolean;
}

export interface TipoLocalItem {
  codigo: string;
  descricao: string;
  valor?: string;
  dataInicio: Date;
  dataFim?: Date;
  ativo: boolean;
}

export interface ParteAtingidaItem {
  codigo: string;
  descricao: string;
  valor?: string;
  dataInicio: Date;
  dataFim?: Date;
  ativo: boolean;
}

export interface MotivoAfastamentoItem {
  codigo: string;
  descricao: string;
  valor?: string;
  dataInicio: Date;
  dataFim?: Date;
  ativo: boolean;
}

export interface CidItem {
  codigo: string;
  descricao: string;
  valor?: string;
  dataInicio: Date;
  dataFim?: Date;
  ativo: boolean;
}

export interface EpiItem {
  codigo: string;
  descricao: string;
  valor?: string;
  dataInicio: Date;
  dataFim?: Date;
  ativo: boolean;
}

export interface MotivoAvisoItem {
  codigo: string;
  descricao: string;
  valor?: string;
  dataInicio: Date;
  dataFim?: Date;
  ativo: boolean;
} 

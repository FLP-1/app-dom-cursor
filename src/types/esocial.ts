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
  tipo: TipoEvento;
  status: StatusEvento;
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
  tipo?: TipoEvento;
  status?: StatusEvento;
  dataInicio?: Date;
  dataFim?: Date;
  empregadoDomesticoId?: string;
}

export interface EsocialEventFormData {
  tipo: TipoEvento;
  dataEvento: Date;
  payload: Record<string, unknown>;
  empregadoDomesticoId: string;
} 
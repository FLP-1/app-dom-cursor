/**
 * Arquivo: esocial.ts
 * Caminho: src/types/esocial.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Tipos de tabelas e estruturas do eSocial
 */

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

// Enum para eventos do eSocial
export enum TipoEventoEsocial {
  S1000 = 'S1000',
  S1005 = 'S1005',
  S1010 = 'S1010',
  S1020 = 'S1020',
  S1030 = 'S1030',
  S1040 = 'S1040',
  S1050 = 'S1050',
  S1060 = 'S1060',
  S1070 = 'S1070',
  S1080 = 'S1080',
  S1200 = 'S1200',
  S1202 = 'S1202',
  S1207 = 'S1207',
  S1210 = 'S1210',
  S1220 = 'S1220',
  S1250 = 'S1250',
  S1260 = 'S1260',
  S1270 = 'S1270',
  S1280 = 'S1280',
  S1295 = 'S1295',
  S1298 = 'S1298',
  S1299 = 'S1299',
  S1300 = 'S1300',
  S2200 = 'S2200',
  S2205 = 'S2205',
  S2206 = 'S2206',
  S2210 = 'S2210',
  S2220 = 'S2220',
  S2230 = 'S2230',
  S2240 = 'S2240',
  S2241 = 'S2241',
  S2245 = 'S2245',
  S2250 = 'S2250',
  S2260 = 'S2260',
  S2298 = 'S2298',
  S2299 = 'S2299',
  S2300 = 'S2300',
  S2306 = 'S2306',
  S2399 = 'S2399',
  S2400 = 'S2400',
  S2405 = 'S2405',
  S2410 = 'S2410',
  S2416 = 'S2416',
  S2418 = 'S2418',
  S2420 = 'S2420',
  S2500 = 'S2500',
  S2501 = 'S2501',
  S3000 = 'S3000',
  S4000 = 'S4000',
  S5001 = 'S5001',
  S5002 = 'S5002',
  S5003 = 'S5003',
  S5011 = 'S5011',
  S5012 = 'S5012',
  S5013 = 'S5013'
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
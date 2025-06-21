/**
 * Arquivo: empregador-domestico.ts
 * Caminho: src/types/empregador-domestico.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Tipos de empregador doméstico
 */

import { User } from '@/types/user';
import { Document } from '@/types/document';
import { EsocialEvent } from '@/types/esocial';
import { Ocorrencia } from '@/types/ocorrencia';
import { RegistroPonto } from '@/types/ponto';

export enum TipoContrato {
  CLT = 'CLT',
  ESTATUTARIO = 'ESTATUTARIO',
  TEMPORARIO = 'TEMPORARIO',
  EXPERIENCIA = 'EXPERIENCIA',
}

export enum TipoJornada {
  INTEGRAL = 'INTEGRAL',
  PARCIAL = 'PARCIAL',
  INTERMITENTE = 'INTERMITENTE',
}

export interface EmpregadoDomestico {
  id: string;
  nome: string;
  cpf: string;
  rg?: string;
  dataNascimento: Date;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  email?: string;
  tipoContrato: TipoContrato;
  tipoJornada: TipoJornada;
  dataAdmissao: Date;
  dataDemissao?: Date;
  salario: number;
  cargaHoraria: number;
  horaInicio: string;
  horaFim: string;
  intervaloInicio?: string;
  intervaloFim?: string;
  usuarioId: string;
  usuario: User;
  documentos: Document[];
  eventosEsocial: EsocialEvent[];
  ocorrencias: Ocorrencia[];
  registrosPonto: RegistroPonto[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EmpregadoDomesticoFilter {
  nome?: string;
  cpf?: string;
  tipoContrato?: TipoContrato;
  tipoJornada?: TipoJornada;
  dataAdmissaoInicio?: Date;
  dataAdmissaoFim?: Date;
  dataDemissaoInicio?: Date;
  dataDemissaoFim?: Date;
}

export interface EmpregadoDomesticoFormData {
  nome: string;
  cpf: string;
  rg?: string;
  dataNascimento: Date;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  email?: string;
  tipoContrato: TipoContrato;
  tipoJornada: TipoJornada;
  dataAdmissao: Date;
  dataDemissao?: Date;
  salario: number;
  cargaHoraria: number;
  horaInicio: string;
  horaFim: string;
  intervaloInicio?: string;
  intervaloFim?: string;
} 

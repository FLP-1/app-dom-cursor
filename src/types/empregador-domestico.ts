import { User } from './user';
import { Document } from './document';
import { EsocialEvent } from './esocial';
import { Ocorrencia } from './ocorrencia';
import { RegistroPonto } from './ponto';

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

export interface EmpregadorDomestico {
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

export interface EmpregadorDomesticoFilter {
  nome?: string;
  cpf?: string;
  tipoContrato?: TipoContrato;
  tipoJornada?: TipoJornada;
  dataAdmissaoInicio?: Date;
  dataAdmissaoFim?: Date;
  dataDemissaoInicio?: Date;
  dataDemissaoFim?: Date;
}

export interface EmpregadorDomesticoFormData {
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
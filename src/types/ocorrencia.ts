import { TipoOcorrenciaEsocial } from '@prisma/client';
import { User } from './user';
import { EmpregadorDomestico } from './empregador-domestico';
import { EsocialEvent } from './esocial-event';
import { Document } from './document';

export interface Ocorrencia {
  id: string;
  tipo: TipoOcorrenciaEsocial;
  dataInicio: Date;
  dataFim: Date;
  justificativa?: string;
  documentos: Document[];
  usuarioId: string;
  usuario: User;
  empregadoDomesticoId: string;
  empregadoDomestico: EmpregadorDomestico;
  esocialEventId?: string;
  esocialEvent?: EsocialEvent;
  validado: boolean;
  validadoPor?: string;
  validadoEm?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OcorrenciaFilter {
  tipo?: TipoOcorrenciaEsocial;
  dataInicio?: Date;
  dataFim?: Date;
  empregadoDomesticoId?: string;
  esocialEventId?: string;
  validado?: boolean;
}

export interface OcorrenciaFormData {
  tipo: TipoOcorrenciaEsocial;
  dataInicio: Date;
  dataFim: Date;
  justificativa?: string;
  documentos?: File[];
  empregadoDomesticoId: string;
  esocialEventId?: string;
} 
/**
 * Arquivo: ocorrencia.ts
 * Caminho: src/types/ocorrencia.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Tipos de ocorrências do sistema, incluindo filtros e dados de formulário.
 */

import { User } from '@/types/user';
import { Empregado } from '@/types/empregado';
import { EsocialEvent } from '@/types/esocial-event';
import { GeneralDocument } from '@/types/general-document';

export type TipoOcorrencia = 'AFASTAMENTO' | 'FERIAS' | 'LICENCA' | 'OUTROS';

export interface Ocorrencia {
  id: string;
  tipo: TipoOcorrencia;
  dataInicio: Date;
  dataFim: Date;
  justificativa?: string;
  documentos: GeneralDocument[];
  usuarioId: string;
  usuario: User;
  empregadoId: string;
  empregado: Empregado;
  esocialEventId?: string;
  esocialEvent?: EsocialEvent;
  validado: boolean;
  validadoPor?: string;
  validadoEm?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OcorrenciaFilter {
  tipo?: TipoOcorrencia;
  dataInicio?: Date;
  dataFim?: Date;
  empregadoId?: string;
  esocialEventId?: string;
  validado?: boolean;
}

export interface OcorrenciaFormData {
  tipo: TipoOcorrencia;
  dataInicio: Date;
  dataFim: Date;
  justificativa?: string;
  documentos?: File[];
  empregadoId: string;
  esocialEventId?: string;
} 

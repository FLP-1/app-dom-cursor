/**
 * Arquivo: ocorrencia.ts
 * Caminho: src/types/ocorrencia.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Tipos de ocorrências do sistema, incluindo filtros e dados de formulário.
 */

// import { TipoOcorrenciaEsocial } from '@prisma/client';
// TODO: TipoOcorrenciaEsocial não existe no Prisma. Revisar uso.
import { User } from '@/types/user';
import { EmpregadoDomestico } from '@/types/empregado-domestico';
import { EsocialEvent } from '@/types/esocial-event';
import { Document } from '@/types/document';

// Justificativa: O campo 'tipo' depende de valores dinâmicos vindos do backend e pode variar conforme integrações futuras. Idealmente, substituir por enum ou union type quando possível.
export interface Ocorrencia {
  id: string;
  tipo: unknown;
  dataInicio: Date;
  dataFim: Date;
  justificativa?: string;
  documentos: Document[];
  usuarioId: string;
  usuario: User;
  empregadoDomesticoId: string;
  empregadoDomestico: EmpregadoDomestico;
  esocialEventId?: string;
  esocialEvent?: EsocialEvent;
  validado: boolean;
  validadoPor?: string;
  validadoEm?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OcorrenciaFilter {
  tipo?: unknown;
  dataInicio?: Date;
  dataFim?: Date;
  empregadoDomesticoId?: string;
  esocialEventId?: string;
  validado?: boolean;
}

export interface OcorrenciaFormData {
  tipo: unknown;
  dataInicio: Date;
  dataFim: Date;
  justificativa?: string;
  documentos?: File[];
  empregadoDomesticoId: string;
  esocialEventId?: string;
} 

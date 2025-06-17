/**
 * Arquivo: esocial-document.ts
 * Caminho: src/types/esocial-document.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Tipos de documentos relacionados ao eSocial
 */

import { User } from '@/types/user';
import { EmpregadoDomestico } from '@/types/empregado-domestico';
import { EsocialEvent } from '@/types/esocial';

export enum TipoDocumento {
  RG = 'RG',
  CPF = 'CPF',
  PIS = 'PIS',
  CTPS = 'CTPS',
  CERTIDAO_NASCIMENTO = 'CERTIDAO_NASCIMENTO',
  CERTIDAO_CASAMENTO = 'CERTIDAO_CASAMENTO',
  COMPROVANTE_RESIDENCIA = 'COMPROVANTE_RESIDENCIA',
  COMPROVANTE_ESCOLARIDADE = 'COMPROVANTE_ESCOLARIDADE',
  ATESTADO_MEDICO = 'ATESTADO_MEDICO',
  LAUDO_MEDICO = 'LAUDO_MEDICO',
  DECLARACAO_ACIDENTE = 'DECLARACAO_ACIDENTE',
  OUTROS = 'OUTROS',
}

export interface EsocialDocument {
  id: string;
  tipo: TipoDocumento;
  nome: string;
  descricao?: string;
  url: string;
  tamanho: number;
  tipoArquivo: string;
  usuarioId: string;
  empregadoDomesticoId: string;
  esocialEventId?: string;
  usuario: User;
  empregadoDomestico: EmpregadoDomestico;
  esocialEvent?: EsocialEvent;
  createdAt: Date;
  updatedAt: Date;
}

export interface EsocialDocumentFilter {
  tipo?: TipoDocumento;
  empregadoDomesticoId?: string;
  esocialEventId?: string;
}

export interface EsocialDocumentFormData {
  tipo: TipoDocumento;
  nome: string;
  descricao?: string;
  arquivo: File;
  empregadoDomesticoId: string;
  esocialEventId?: string;
} 
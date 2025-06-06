import { User } from './user';
import { EmpregadorDomestico } from './empregador-domestico';
import { EsocialEvent } from './esocial';

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

export interface Document {
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
  empregadoDomestico: EmpregadorDomestico;
  esocialEvent?: EsocialEvent;
  createdAt: Date;
  updatedAt: Date;
}

export interface DocumentFilter {
  tipo?: TipoDocumento;
  empregadoDomesticoId?: string;
  esocialEventId?: string;
}

export interface DocumentFormData {
  tipo: TipoDocumento;
  nome: string;
  descricao?: string;
  arquivo: File;
  empregadoDomesticoId: string;
  esocialEventId?: string;
} 
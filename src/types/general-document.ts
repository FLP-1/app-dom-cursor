/**
 * Arquivo: general-document.ts
 * Caminho: src/types/general-document.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Tipos de documentos gerais do sistema
 */

export interface GeneralDocument {
  id: string;
  nome: string;
  tipo: string;
  dataUpload: Date;
  tamanho: number;
  url: string;
  metadata?: Record<string, unknown>;
}

export interface GeneralDocumentFilter {
  tipo?: string;
  dataInicio?: Date;
  dataFim?: Date;
  nome?: string;
}

export interface GeneralDocumentQueryParams {
  where: GeneralDocumentFilter;
  orderBy?: {
    [key: string]: 'asc' | 'desc';
  };
  skip?: number;
  take?: number;
} 
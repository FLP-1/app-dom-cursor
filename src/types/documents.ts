/**
 * Arquivo: documents.ts
 * Caminho: src/types/documents.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Tipos de documentos
 */

export interface Document {
  id: string;
  nome: string;
  tipo: string;
  dataUpload: Date;
  tamanho: number;
  url: string;
  metadata?: Record<string, unknown>;
}

export interface DocumentFilter {
  tipo?: string;
  dataInicio?: Date;
  dataFim?: Date;
  nome?: string;
}

export interface DocumentQueryParams {
  where: DocumentFilter;
  orderBy?: {
    [key: string]: 'asc' | 'desc';
  };
  skip?: number;
  take?: number;
} 

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
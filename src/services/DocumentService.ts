/**
 * Arquivo: DocumentService.ts
 * Caminho: src/services/DocumentService.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de documentos
 */

import { Document, TipoDocumentoEsocial } from '@prisma/client';
import { api } from '@/lib/api';

export interface DocumentFilter {
  tipo?: TipoDocumentoEsocial;
  empregadoId?: string;
  esocialEventId?: string;
  page?: number;
  limit?: number;
}

export interface DocumentResponse {
  documents: Document[];
  total: number;
  pages: number;
}

export interface UploadResponse {
  url: string;
  name: string;
  size: number;
  type: string;
}

export class DocumentService {
  static async list(filters: DocumentFilter = {}): Promise<DocumentResponse> {
    const { data } = await api.get('/api/documents', { params: filters });
    return data;
  }

  static async getById(id: string): Promise<Document> {
    const { data } = await api.get(`/api/documents/${id}`);
    return data;
  }

  static async create(document: Partial<Document>): Promise<Document> {
    const { data } = await api.post('/api/documents', document);
    return data;
  }

  static async update(id: string, document: Partial<Document>): Promise<Document> {
    const { data } = await api.put(`/api/documents/${id}`, document);
    return data;
  }

  static async delete(id: string): Promise<void> {
    await api.delete(`/api/documents/${id}`);
  }

  static async upload(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await api.post('/api/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  }

  static async download(url: string): Promise<Blob> {
    const { data } = await api.get(url, {
      responseType: 'blob',
    });
    return data;
  }
} 

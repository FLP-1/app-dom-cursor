/**
 * Arquivo: document.service.ts
 * Caminho: src/services/document.service.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de documentos
 */

import { Document, DocumentFilter, DocumentFormData } from '@/types/document';
import axios from 'axios';

const API_URL = '/api/document';

export const DocumentService = {
  async list(filters?: DocumentFilter): Promise<Document[]> {
    const { data } = await axios.get<Document[]>(API_URL, { params: filters });
    return data;
  },

  async getById(id: string): Promise<Document> {
    const { data } = await axios.get<Document>(`${API_URL}/${id}`);
    return data;
  },

  async create(formData: DocumentFormData): Promise<Document> {
    const form = new FormData();
    form.append('nome', formData.nome);
    form.append('tipo', formData.tipo);
    form.append('file', formData.file);
    if (formData.dataValidade) {
      form.append('dataValidade', formData.dataValidade.toISOString());
    }
    if (formData.empregadoDomesticoId) {
      form.append('empregadoDomesticoId', formData.empregadoDomesticoId);
    }
    if (formData.esocialEventId) {
      form.append('esocialEventId', formData.esocialEventId);
    }
    form.append('isPublic', formData.isPublic.toString());

    const { data } = await axios.post<Document>(API_URL, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  async update(id: string, formData: Partial<DocumentFormData>): Promise<Document> {
    const form = new FormData();
    if (formData.nome) form.append('nome', formData.nome);
    if (formData.tipo) form.append('tipo', formData.tipo);
    if (formData.file) form.append('file', formData.file);
    if (formData.dataValidade) {
      form.append('dataValidade', formData.dataValidade.toISOString());
    }
    if (formData.empregadoDomesticoId) {
      form.append('empregadoDomesticoId', formData.empregadoDomesticoId);
    }
    if (formData.esocialEventId) {
      form.append('esocialEventId', formData.esocialEventId);
    }
    if (formData.isPublic !== undefined) {
      form.append('isPublic', formData.isPublic.toString());
    }

    const { data } = await axios.put<Document>(`${API_URL}/${id}`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  async remove(id: string): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  },

  async download(id: string): Promise<Blob> {
    const { data } = await axios.get(`${API_URL}/${id}/download`, {
      responseType: 'blob',
    });
    return data;
  },
};

export default DocumentService;
export { DocumentService as documentService }; 

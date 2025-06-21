/**
 * Arquivo: useDocumentsData.ts
 * Caminho: src/hooks/useDocumentsData.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Hook customizado para buscar e gerenciar os dados de documentos.
 */

import useSWR from 'swr';
import axios from 'axios';

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  category: 'personal' | 'work' | 'medical' | 'financial' | 'legal' | 'other';
  status: 'active' | 'archived' | 'expired';
  description: string;
  tags: string[];
  url: string;
  thumbnail?: string;
}

export interface DocumentsData {
  documents: Document[];
  recentUploads: Document[];
  categories: {
    name: string;
    count: number;
    color: string;
  }[];
  storageStats: {
    used: number;
    total: number;
    percentage: number;
  };
}

const fetcher = (url: string) => axios.get<DocumentsData>(url).then(res => res.data);

export const useDocumentsData = () => {
  const { data, error, mutate } = useSWR<DocumentsData>('/api/documents', fetcher);

  const uploadDocument = async (file: File, metadata: Partial<Document>) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('metadata', JSON.stringify(metadata));
      
      await axios.post('/api/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      mutate(); // Revalida os dados
    } catch (error) {
      console.error('Erro ao fazer upload do documento:', error);
      throw error;
    }
  };

  const updateDocument = async (id: string, updates: Partial<Document>) => {
    try {
      await axios.put(`/api/documents/${id}`, updates);
      mutate(); // Revalida os dados
    } catch (error) {
      console.error('Erro ao atualizar documento:', error);
      throw error;
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      await axios.delete(`/api/documents/${id}`);
      mutate(); // Revalida os dados
    } catch (error) {
      console.error('Erro ao deletar documento:', error);
      throw error;
    }
  };

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    uploadDocument,
    updateDocument,
    deleteDocument,
  };
}; 
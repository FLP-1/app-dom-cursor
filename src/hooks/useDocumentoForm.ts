/**
 * Arquivo: useDocumentoForm.ts
 * Caminho: src/hooks/useDocumentoForm.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useState } from 'react';
import { api } from '@/services/api';
import { DocumentFormData } from '@/types/document';

export function useDocumentoForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: DocumentFormData) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as any);
        }
      });
      await api.post('/documentos', formData);
    } catch (err) {
      setError('Erro ao salvar documento.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, data: DocumentFormData) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as any);
        }
      });
      await api.put(`/documentos/${id}`, formData);
    } catch (err) {
      setError('Erro ao atualizar documento.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteDocumento = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/documentos/${id}`);
    } catch (err) {
      setError('Erro ao excluir documento.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submit, update, deleteDocumento, loading, error };
} 

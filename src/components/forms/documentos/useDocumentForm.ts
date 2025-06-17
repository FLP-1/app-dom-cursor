/**
 * Arquivo: useDocumentForm.ts
 * Caminho: src/components/forms/documentos/useDocumentForm.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Hook customizado para gerenciar o estado e lógica do formulário de documentos.
 */

import { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { useNotification } from '@/hooks/useNotification';
import { DocumentFormData, documentFormSchema } from './DocumentFormTypes';
import { formatDocumentData } from './DocumentFormUtils';

interface UseDocumentFormReturn extends UseFormReturn<DocumentFormData> {
  apiError: string | null;
  apiSuccess: string | null;
  loading: boolean;
}

export function useDocumentForm(initialValues?: Partial<DocumentFormData>): UseDocumentFormReturn {
  const { t } = useTranslation();
  const { showNotification } = useNotification();
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<DocumentFormData>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (data: DocumentFormData) => {
    try {
      setApiError(null);
      setApiSuccess(null);
      setLoading(true);

      const formattedData = formatDocumentData(data);
      const token = localStorage.getItem('token');

      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || t('document.errors.saveError'));
      }

      setApiSuccess(t('document.messages.saveSuccess'));
      showNotification({
        type: 'success',
        message: t('document.messages.saveSuccess'),
      });
    } catch (error) {
      console.error('Erro ao salvar documento:', error);
      setApiError(error instanceof Error ? error.message : t('document.errors.saveError'));
      showNotification({
        type: 'error',
        message: error instanceof Error ? error.message : t('document.errors.saveError'),
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    ...form,
    apiError,
    apiSuccess,
    loading,
    handleSubmit: form.handleSubmit(onSubmit),
  };
} 
/**
 * Arquivo: useFamiliarForm.ts
 * Caminho: src/components/forms/familiar/useFamiliarForm.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Hook customizado para gerenciar o estado e lógica do formulário de familiar.
 */

import { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { useNotification } from '@/hooks/useNotification';
import { FamiliarFormData, familiarFormSchema } from './FamiliarFormTypes';
import { formatFamiliarData } from './FamiliarFormUtils';

interface UseFamiliarFormReturn extends UseFormReturn<FamiliarFormData> {
  apiError: string | null;
  apiSuccess: string | null;
  loading: boolean;
}

export function useFamiliarForm(initialValues?: Partial<FamiliarFormData>): UseFamiliarFormReturn {
  const { t } = useTranslation();
  const { showNotification } = useNotification();
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FamiliarFormData>({
    resolver: zodResolver(familiarFormSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (data: FamiliarFormData) => {
    try {
      setApiError(null);
      setApiSuccess(null);
      setLoading(true);

      const formattedData = formatFamiliarData(data);
      const token = localStorage.getItem('token');

      const response = await fetch('/api/familiares', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || t('familiar.errors.saveError'));
      }

      setApiSuccess(t('familiar.messages.saveSuccess'));
      showNotification({
        type: 'success',
        message: t('familiar.messages.saveSuccess'),
      });
    } catch (error) {
      console.error('Erro ao salvar familiar:', error);
      setApiError(error instanceof Error ? error.message : t('familiar.errors.saveError'));
      showNotification({
        type: 'error',
        message: error instanceof Error ? error.message : t('familiar.errors.saveError'),
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

/**
 * Arquivo: useVinculoTarefaForm.ts
 * Caminho: src/components/forms/vinculo-tarefa/useVinculoTarefaForm.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Hook personalizado para gerenciar o estado e lógica do formulário de vínculo tarefa.
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { VinculoTarefaFormData, VinculoTarefaFormProps } from './VinculoTarefaFormTypes';
import { vinculoTarefaFormSchema } from './VinculoTarefaFormTypes';
import { formatVinculoTarefaData, validateVinculoTarefaData, getVinculoTarefaDefaultValues } from './VinculoTarefaFormUtils';
import { useNotification } from '@/hooks/useNotification';

export function useVinculoTarefaForm({ initialValues, onSubmit, onCancel }: VinculoTarefaFormProps = {}) {
  const { t } = useTranslation();
  const { showNotification } = useNotification();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<VinculoTarefaFormData>({
    resolver: zodResolver(vinculoTarefaFormSchema),
    defaultValues: initialValues || getVinculoTarefaDefaultValues()
  });

  const handleSubmit = async (data: VinculoTarefaFormData) => {
    try {
      setIsSubmitting(true);
      setApiError(null);

      const formattedData = formatVinculoTarefaData(data);
      const validationErrors = validateVinculoTarefaData(formattedData);

      if (validationErrors.length > 0) {
        setApiError(validationErrors.join('\n'));
        return;
      }

      const response = await fetch('/api/vinculos-tarefa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao salvar vínculo tarefa');
      }

      showNotification({
        type: 'success',
        message: t('vinculo.tarefa.messages.success')
      });

      onSubmit?.(formattedData);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Erro ao salvar vínculo tarefa');
      showNotification({
        type: 'error',
        message: t('vinculo.tarefa.messages.error')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    onCancel?.();
  };

  return {
    form,
    apiError,
    isSubmitting,
    handleSubmit: form.handleSubmit(handleSubmit),
    handleCancel
  };
} 
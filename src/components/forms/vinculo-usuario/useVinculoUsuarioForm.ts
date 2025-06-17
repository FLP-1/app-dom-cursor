/**
 * Arquivo: useVinculoUsuarioForm.ts
 * Caminho: src/components/forms/vinculo-usuario/useVinculoUsuarioForm.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Hook personalizado para gerenciar o estado e lógica do formulário de vínculo usuário.
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { VinculoUsuarioFormData, VinculoUsuarioFormProps } from './VinculoUsuarioFormTypes';
import { vinculoUsuarioFormSchema } from './VinculoUsuarioFormTypes';
import { formatVinculoUsuarioData, validateVinculoUsuarioData, getVinculoUsuarioDefaultValues } from './VinculoUsuarioFormUtils';
import { useNotification } from '@/hooks/useNotification';

export function useVinculoUsuarioForm({ initialValues, onSubmit, onCancel }: VinculoUsuarioFormProps = {}) {
  const { t } = useTranslation();
  const { showNotification } = useNotification();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<VinculoUsuarioFormData>({
    resolver: zodResolver(vinculoUsuarioFormSchema),
    defaultValues: initialValues || getVinculoUsuarioDefaultValues()
  });

  const handleSubmit = async (data: VinculoUsuarioFormData) => {
    try {
      setIsSubmitting(true);
      setApiError(null);

      const formattedData = formatVinculoUsuarioData(data);
      const validationErrors = validateVinculoUsuarioData(formattedData);

      if (validationErrors.length > 0) {
        setApiError(validationErrors.join('\n'));
        return;
      }

      const response = await fetch('/api/vinculos-usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao salvar vínculo usuário');
      }

      showNotification({
        type: 'success',
        message: t('vinculo.usuario.messages.success')
      });

      onSubmit?.(formattedData);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Erro ao salvar vínculo usuário');
      showNotification({
        type: 'error',
        message: t('vinculo.usuario.messages.error')
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
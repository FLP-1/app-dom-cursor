/**
 * Arquivo: useVinculoFamiliarForm.ts
 * Caminho: src/components/forms/vinculo-familiar/useVinculoFamiliarForm.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Hook customizado para gerenciar o estado e lógica do formulário de vínculo familiar.
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { VinculoFamiliarFormData, vinculoFamiliarFormSchema } from './VinculoFamiliarFormTypes';
import { formatVinculoFamiliarData, validateVinculoFamiliarData } from './VinculoFamiliarFormUtils';
import { showNotification } from '@/utils/notifications';

interface UseVinculoFamiliarFormProps {
  initialValues?: Partial<VinculoFamiliarFormData>;
}

export function useVinculoFamiliarForm({ initialValues }: UseVinculoFamiliarFormProps = {}) {
  const { t } = useTranslation();
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<VinculoFamiliarFormData>({
    resolver: zodResolver(vinculoFamiliarFormSchema),
    defaultValues: initialValues || {
      tipo: undefined,
      dataInicio: undefined,
      dataFim: undefined,
      nome: '',
      cpf: '',
      dataNascimento: undefined,
      ativo: true,
      observacoes: ''
    }
  });

  const { control, handleSubmit, formState: { errors }, reset } = methods;

  const onSubmit = async (data: VinculoFamiliarFormData) => {
    try {
      setIsLoading(true);
      setApiError(null);
      setSuccessMessage(null);

      const formattedData = formatVinculoFamiliarData(data);
      const validationErrors = validateVinculoFamiliarData(formattedData);

      if (validationErrors.length > 0) {
        setApiError(validationErrors.join('\n'));
        return;
      }

      const response = await fetch('/api/vinculos-familiar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao salvar vínculo familiar');
      }

      setSuccessMessage(t('vinculoFamiliar.messages.success'));
      reset();
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Erro ao salvar vínculo familiar');
      showNotification('error', t('vinculoFamiliar.messages.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    control,
    handleSubmit,
    formState: { errors },
    apiError,
    successMessage,
    isLoading,
    onSubmit
  };
} 
/**
 * Arquivo: useVinculoPontoForm.ts
 * Caminho: src/components/forms/vinculo-ponto/useVinculoPontoForm.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Hook customizado para gerenciar o estado e lógica do formulário de vínculo ponto.
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { VinculoPontoFormData, vinculoPontoFormSchema } from './VinculoPontoFormTypes';
import { formatVinculoPontoData, validateVinculoPontoData } from './VinculoPontoFormUtils';
import { showNotification } from '@/utils/notifications';

interface UseVinculoPontoFormProps {
  initialValues?: Partial<VinculoPontoFormData>;
}

export function useVinculoPontoForm({ initialValues }: UseVinculoPontoFormProps = {}) {
  const { t } = useTranslation();
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<VinculoPontoFormData>({
    resolver: zodResolver(vinculoPontoFormSchema),
    defaultValues: initialValues || {
      tipo: undefined,
      data: undefined,
      hora: '',
      ativo: true,
      observacoes: ''
    }
  });

  const { control, handleSubmit, formState: { errors }, reset } = methods;

  const onSubmit = async (data: VinculoPontoFormData) => {
    try {
      setIsLoading(true);
      setApiError(null);
      setSuccessMessage(null);

      const formattedData = formatVinculoPontoData(data);
      const validationErrors = validateVinculoPontoData(formattedData);

      if (validationErrors.length > 0) {
        setApiError(validationErrors.join('\n'));
        return;
      }

      const response = await fetch('/api/vinculos-ponto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao salvar vínculo ponto');
      }

      setSuccessMessage(t('vinculoPonto.messages.success'));
      reset();
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Erro ao salvar vínculo ponto');
      showNotification('error', t('vinculoPonto.messages.error'));
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
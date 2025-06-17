/**
 * Arquivo: useVinculoForm.ts
 * Caminho: src/components/forms/vinculo/useVinculoForm.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Hook customizado para gerenciar o estado e lógica do formulário de vínculo.
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { VinculoFormData, vinculoFormSchema } from './VinculoFormTypes';
import { formatVinculoData, validateVinculoData } from './VinculoFormUtils';
import { showNotification } from '@/utils/notifications';

interface UseVinculoFormProps {
  initialValues?: Partial<VinculoFormData>;
}

export function useVinculoForm({ initialValues }: UseVinculoFormProps = {}) {
  const { t } = useTranslation();
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<VinculoFormData>({
    resolver: zodResolver(vinculoFormSchema),
    defaultValues: initialValues || {
      tipo: undefined,
      dataInicio: undefined,
      dataFim: undefined,
      cargo: '',
      departamento: '',
      salario: 0,
      cargaHoraria: 0,
      ativo: true,
      observacoes: ''
    }
  });

  const { control, handleSubmit, formState: { errors }, reset } = methods;

  const onSubmit = async (data: VinculoFormData) => {
    try {
      setIsLoading(true);
      setApiError(null);
      setSuccessMessage(null);

      const formattedData = formatVinculoData(data);
      const validationErrors = validateVinculoData(formattedData);

      if (validationErrors.length > 0) {
        setApiError(validationErrors.join('\n'));
        return;
      }

      const response = await fetch('/api/vinculos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao salvar vínculo');
      }

      setSuccessMessage(t('vinculo.messages.success'));
      reset();
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Erro ao salvar vínculo');
      showNotification('error', t('vinculo.messages.error'));
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
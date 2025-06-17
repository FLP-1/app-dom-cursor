/**
 * Arquivo: useVinculoParceiroForm.ts
 * Caminho: src/components/forms/vinculo-parceiro/useVinculoParceiroForm.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Hook customizado para gerenciar o estado e lógica do formulário de vínculo parceiro.
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { VinculoParceiroFormData, vinculoParceiroFormSchema } from './VinculoParceiroFormTypes';
import { formatVinculoParceiroData, validateVinculoParceiroData } from './VinculoParceiroFormUtils';
import { showNotification } from '@/utils/notifications';

interface UseVinculoParceiroFormProps {
  initialValues?: Partial<VinculoParceiroFormData>;
}

export function useVinculoParceiroForm({ initialValues }: UseVinculoParceiroFormProps = {}) {
  const { t } = useTranslation();
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<VinculoParceiroFormData>({
    resolver: zodResolver(vinculoParceiroFormSchema),
    defaultValues: initialValues || {
      tipo: undefined,
      dataInicio: undefined,
      dataFim: undefined,
      nome: '',
      cnpj: '',
      ativo: true,
      observacoes: ''
    }
  });

  const { control, handleSubmit, formState: { errors }, reset } = methods;

  const onSubmit = async (data: VinculoParceiroFormData) => {
    try {
      setIsLoading(true);
      setApiError(null);
      setSuccessMessage(null);

      const formattedData = formatVinculoParceiroData(data);
      const validationErrors = validateVinculoParceiroData(formattedData);

      if (validationErrors.length > 0) {
        setApiError(validationErrors.join('\n'));
        return;
      }

      const response = await fetch('/api/vinculos-parceiro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao salvar vínculo parceiro');
      }

      setSuccessMessage(t('vinculoParceiro.messages.success'));
      reset();
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Erro ao salvar vínculo parceiro');
      showNotification('error', t('vinculoParceiro.messages.error'));
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
/**
 * Arquivo: useVinculoEmpregadorForm.ts
 * Caminho: src/components/forms/vinculo-empregador/useVinculoEmpregadorForm.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Hook customizado para gerenciar o estado e lógica do formulário de vínculo empregador.
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { VinculoEmpregadorFormData, vinculoEmpregadorFormSchema } from './VinculoEmpregadorFormTypes';
import { formatVinculoEmpregadorData, validateVinculoEmpregadorData } from './VinculoEmpregadorFormUtils';
import { showNotification } from '@/utils/notifications';

interface UseVinculoEmpregadorFormProps {
  initialValues?: Partial<VinculoEmpregadorFormData>;
}

export function useVinculoEmpregadorForm({ initialValues }: UseVinculoEmpregadorFormProps = {}) {
  const { t } = useTranslation();
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<VinculoEmpregadorFormData>({
    resolver: zodResolver(vinculoEmpregadorFormSchema),
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

  const onSubmit = async (data: VinculoEmpregadorFormData) => {
    try {
      setIsLoading(true);
      setApiError(null);
      setSuccessMessage(null);

      const formattedData = formatVinculoEmpregadorData(data);
      const validationErrors = validateVinculoEmpregadorData(formattedData);

      if (validationErrors.length > 0) {
        setApiError(validationErrors.join('\n'));
        return;
      }

      const response = await fetch('/api/vinculos-empregador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao salvar vínculo empregador');
      }

      setSuccessMessage(t('vinculoEmpregador.messages.success'));
      reset();
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Erro ao salvar vínculo empregador');
      showNotification('error', t('vinculoEmpregador.messages.error'));
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
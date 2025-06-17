/**
 * Arquivo: usePontoForm.ts
 * Caminho: src/components/forms/ponto/usePontoForm.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Hook customizado para gerenciar o estado e lógica do formulário de ponto.
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { useNotification } from '@/hooks/useNotification';
import { PontoFormData, pontoFormSchema } from './PontoFormTypes';
import { formatPontoData } from './PontoFormUtils';

interface UsePontoFormProps {
  initialValues?: Partial<PontoFormData>;
}

export function usePontoForm({ initialValues }: UsePontoFormProps = {}) {
  const { t } = useTranslation();
  const { showNotification } = useNotification();
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<PontoFormData>({
    resolver: zodResolver(pontoFormSchema),
    defaultValues: initialValues || {
      data: undefined,
      horaEntrada: '',
      horaSaida: '',
      horaEntradaAlmoco: '',
      horaSaidaAlmoco: '',
      observacoes: ''
    }
  });

  const onSubmit = async (data: PontoFormData) => {
    try {
      setIsLoading(true);
      setApiError(null);
      setSuccessMessage(null);

      const formattedData = formatPontoData(data);

      const response = await fetch('/api/pontos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || t('common.errors.save'));
      }

      setSuccessMessage(t('ponto.messages.success'));
      showNotification(t('ponto.messages.success'), 'success');
    } catch (error) {
      console.error('Erro ao salvar ponto:', error);
      setApiError(error instanceof Error ? error.message : t('common.errors.save'));
      showNotification(t('common.errors.save'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ...methods,
    apiError,
    successMessage,
    isLoading,
    onSubmit: methods.handleSubmit(onSubmit)
  };
} 
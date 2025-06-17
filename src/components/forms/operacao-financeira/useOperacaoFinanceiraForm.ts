/**
 * Arquivo: useOperacaoFinanceiraForm.ts
 * Caminho: src/components/forms/operacao-financeira/useOperacaoFinanceiraForm.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Hook customizado para gerenciar o estado e lógica do formulário de operação financeira.
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { useNotification } from '@/hooks/useNotification';
import { OperacaoFinanceiraFormData, operacaoFinanceiraFormSchema } from './OperacaoFinanceiraFormTypes';
import { formatOperacaoFinanceiraData } from './OperacaoFinanceiraFormUtils';

interface UseOperacaoFinanceiraFormProps {
  initialValues?: Partial<OperacaoFinanceiraFormData>;
}

export function useOperacaoFinanceiraForm({ initialValues }: UseOperacaoFinanceiraFormProps = {}) {
  const { t } = useTranslation();
  const { showNotification } = useNotification();
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<OperacaoFinanceiraFormData>({
    resolver: zodResolver(operacaoFinanceiraFormSchema),
    defaultValues: initialValues || {
      tipo: undefined,
      valor: 0,
      data: undefined,
      descricao: '',
      categoria: '',
      formaPagamento: '',
      observacoes: ''
    }
  });

  const onSubmit = async (data: OperacaoFinanceiraFormData) => {
    try {
      setIsLoading(true);
      setApiError(null);
      setSuccessMessage(null);

      const formattedData = formatOperacaoFinanceiraData(data);

      const response = await fetch('/api/operacoes-financeiras', {
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

      setSuccessMessage(t('operacao.messages.success'));
      showNotification(t('operacao.messages.success'), 'success');
    } catch (error) {
      console.error('Erro ao salvar operação financeira:', error);
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
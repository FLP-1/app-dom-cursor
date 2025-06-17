/**
 * Arquivo: useParceiroForm.ts
 * Caminho: src/components/forms/parceiro/useParceiroForm.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Hook customizado para gerenciar o estado e lógica do formulário de parceiro.
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { useNotification } from '@/hooks/useNotification';
import { ParceiroFormData, parceiroFormSchema } from './ParceiroFormTypes';
import { formatParceiroData } from './ParceiroFormUtils';

interface UseParceiroFormProps {
  initialValues?: Partial<ParceiroFormData>;
}

export function useParceiroForm({ initialValues }: UseParceiroFormProps = {}) {
  const { t } = useTranslation();
  const { showNotification } = useNotification();
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<ParceiroFormData>({
    resolver: zodResolver(parceiroFormSchema),
    defaultValues: initialValues || {
      nome: '',
      cnpj: '',
      tipo: undefined,
      dataInicio: undefined,
      dataFim: undefined,
      endereco: {
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: ''
      },
      observacoes: ''
    }
  });

  const onSubmit = async (data: ParceiroFormData) => {
    try {
      setIsLoading(true);
      setApiError(null);
      setSuccessMessage(null);

      const formattedData = formatParceiroData(data);

      const response = await fetch('/api/parceiros', {
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

      setSuccessMessage(t('parceiro.messages.success'));
      showNotification(t('parceiro.messages.success'), 'success');
    } catch (error) {
      console.error('Erro ao salvar parceiro:', error);
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

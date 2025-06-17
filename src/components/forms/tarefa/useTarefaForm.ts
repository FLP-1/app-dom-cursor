/**
 * Arquivo: useTarefaForm.ts
 * Caminho: src/components/forms/tarefa/useTarefaForm.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Hook customizado para gerenciar o estado e lógica do formulário de tarefa.
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { useNotification } from '@/hooks/useNotification';
import { TarefaFormData, tarefaFormSchema } from './TarefaFormTypes';
import { formatTarefaData } from './TarefaFormUtils';

interface UseTarefaFormProps {
  initialValues?: Partial<TarefaFormData>;
}

export function useTarefaForm({ initialValues }: UseTarefaFormProps = {}) {
  const { t } = useTranslation();
  const { showNotification } = useNotification();
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<TarefaFormData>({
    resolver: zodResolver(tarefaFormSchema),
    defaultValues: initialValues || {
      titulo: '',
      descricao: '',
      status: undefined,
      prioridade: undefined,
      dataInicio: undefined,
      dataFim: undefined,
      responsavel: '',
      observacoes: ''
    }
  });

  const onSubmit = async (data: TarefaFormData) => {
    try {
      setIsLoading(true);
      setApiError(null);
      setSuccessMessage(null);

      const formattedData = formatTarefaData(data);

      const response = await fetch('/api/tarefas', {
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

      setSuccessMessage(t('tarefa.messages.success'));
      showNotification(t('tarefa.messages.success'), 'success');
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
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
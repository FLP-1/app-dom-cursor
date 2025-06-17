/**
 * Arquivo: useEmpregadoDomesticoForm.ts
 * Caminho: src/components/forms/empregado-domestico/useEmpregadoDomesticoForm.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Hook customizado para gerenciar o estado e lógica do formulário de empregado doméstico.
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { useNotification } from '@/hooks/useNotification';
import { EmpregadoDomesticoFormData, empregadoDomesticoFormSchema } from './EmpregadoDomesticoFormTypes';
import { formatEmpregadoDomesticoData } from './EmpregadoDomesticoFormUtils';

interface UseEmpregadoDomesticoFormProps {
  initialValues?: Partial<EmpregadoDomesticoFormData>;
}

export function useEmpregadoDomesticoForm({ initialValues }: UseEmpregadoDomesticoFormProps = {}) {
  const { t } = useTranslation();
  const { showNotification } = useNotification();
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<EmpregadoDomesticoFormData>({
    resolver: zodResolver(empregadoDomesticoFormSchema),
    defaultValues: initialValues || {
      nome: '',
      cpf: '',
      dataNascimento: undefined,
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
      salario: 0,
      cargaHoraria: 0,
      funcao: '',
      observacoes: ''
    }
  });

  const onSubmit = async (data: EmpregadoDomesticoFormData) => {
    try {
      setIsLoading(true);
      setApiError(null);
      setSuccessMessage(null);

      const formattedData = formatEmpregadoDomesticoData(data);

      const response = await fetch('/api/empregados-domesticos', {
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

      setSuccessMessage(t('empregado.messages.success'));
      showNotification(t('empregado.messages.success'), 'success');
    } catch (error) {
      console.error('Erro ao salvar empregado doméstico:', error);
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
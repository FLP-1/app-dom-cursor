/**
 * Arquivo: useEmpregadorForm.ts
 * Caminho: src/components/forms/empregador/useEmpregadorForm.ts
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Hook customizado para lógica, validação, submit e integração com API do formulário de cadastro de empregador.
 */

import { useForm, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useCallback } from 'react';
import { EmpregadorFormValues } from '@/components/forms/empregador/EmpregadorFormTypes';
import { empregadorFormSchema } from '@/components/forms/empregador/EmpregadorFormSchema';
import { mensagens } from '@/i18n/mensagens';
import { validarCNPJ, buscarCEP } from '@/components/forms/empregador/EmpregadorFormUtils';
import { tooltips } from '@/i18n/tooltips';

interface UseEmpregadorFormReturn extends UseFormReturn<EmpregadorFormValues> {
  onSubmit: SubmitHandler<EmpregadorFormValues>;
  apiError: string | null;
  apiSuccess: string | null;
  handleBuscarCEP: (cep: string) => Promise<void>;
  loading: boolean;
}

export function useEmpregadorForm(onSuccess?: () => void): UseEmpregadorFormReturn {
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const methods = useForm<EmpregadorFormValues>({
    resolver: zodResolver(empregadorFormSchema),
    mode: 'onBlur',
    defaultValues: {
      nome: '',
      cnpj: '',
      email: '',
      telefone: '',
      cep: '',
      endereco: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
    },
  });

  const onSubmit: SubmitHandler<EmpregadorFormValues> = useCallback(async (data) => {
    setApiError(null);
    setApiSuccess(null);
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/empregador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json().catch(() => ({}));
      if (!response.ok) {
        setApiError(responseData.message || responseData.error || mensagens.erro_padrao.pt);
        setLoading(false);
        return;
      }
      setApiSuccess(responseData.message || mensagens.sucesso_empregador.pt);
      if (onSuccess) onSuccess();
    } catch (error) {
      setApiError(mensagens.erro_padrao.pt);
    } finally {
      setLoading(false);
    }
  }, [onSuccess]);

  const handleBuscarCEP = useCallback(async (cep: string) => {
    const result = await buscarCEP(cep);
    if (result) {
      methods.setValue('endereco', result.logradouro);
      methods.setValue('bairro', result.bairro);
      methods.setValue('cidade', result.localidade);
      methods.setValue('estado', result.uf);
    }
  }, [methods]);

  return {
    ...methods,
    onSubmit,
    apiError,
    apiSuccess,
    handleBuscarCEP,
    loading,
  };
} 

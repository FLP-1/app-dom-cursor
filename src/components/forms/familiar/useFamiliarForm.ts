/**
 * Arquivo: useFamiliarForm.ts
 * Caminho: src/components/forms/familiar/useFamiliarForm.ts
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Hook customizado para lógica, validação, submit e integração com API do formulário de cadastro de familiar.
 */

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FamiliarFormValues } from '@/components/forms/familiar/FamiliarFormTypes';
import { familiarFormSchema } from '@/components/forms/familiar/FamiliarFormSchema';
import { mensagens } from '@/i18n/mensagens';
import { validarCPF, buscarCEP } from '@/components/forms/familiar/FamiliarFormUtils';

export function useFamiliarForm(onSuccess?: () => void) {
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const methods = useForm<FamiliarFormValues>({
    resolver: zodResolver(familiarFormSchema),
    mode: 'onBlur',
    defaultValues: {
      nome: '',
      cpf: '',
      dataNascimento: '',
      parentesco: '',
      cep: '',
      endereco: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
    },
  });

  const onSubmit: SubmitHandler<FamiliarFormValues> = async (data) => {
    setApiError(null);
    setApiSuccess(null);
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/familiar', {
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
      setApiSuccess(responseData.message || mensagens.sucesso_familiar.pt);
      if (onSuccess) onSuccess();
    } catch (error) {
      setApiError(mensagens.erro_padrao.pt);
    } finally {
      setLoading(false);
    }
  };

  const handleBuscarCEP = async (cep: string) => {
    const result = await buscarCEP(cep);
    if (result) {
      methods.setValue('endereco', result.logradouro);
      methods.setValue('bairro', result.bairro);
      methods.setValue('cidade', result.localidade);
      methods.setValue('estado', result.uf);
    }
  };

  return {
    ...methods,
    onSubmit,
    apiError,
    apiSuccess,
    handleBuscarCEP,
    loading,
  };
} 

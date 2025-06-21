/**
 * Arquivo: useParceiroForm.ts
 * Caminho: src/components/forms/parceiro/useParceiroForm.ts
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Hook customizado para lógica, validação, submit e integração com API do formulário de cadastro de parceiro.
 */

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { ParceiroFormValues } from '@/components/forms/parceiro/ParceiroFormTypes';
import { parceiroFormSchema } from '@/components/forms/parceiro/ParceiroFormSchema';
import { mensagens } from '@/i18n/mensagens';
import { validarCNPJ, buscarCEP } from '@/components/forms/parceiro/ParceiroFormUtils';

export function useParceiroForm(onSuccess?: () => void) {
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const methods = useForm<ParceiroFormValues>({
    resolver: zodResolver(parceiroFormSchema),
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

  const onSubmit: SubmitHandler<ParceiroFormValues> = async (data) => {
    setApiError(null);
    setApiSuccess(null);
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/parceiro', {
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
      setApiSuccess(responseData.message || mensagens.sucesso_parceiro.pt);
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

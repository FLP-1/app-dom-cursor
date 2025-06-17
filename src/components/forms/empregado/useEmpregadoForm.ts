/**
 * Arquivo: useEmpregadoForm.ts
 * Caminho: src/components/forms/empregado/useEmpregadoForm.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Hook customizado para o formulário de cadastro de empregado.
 */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { EmpregadoFormData } from './EmpregadoFormTypes';
import { empregadoFormSchema } from './EmpregadoFormTypes';
import { mensagens } from '@/i18n/mensagens';
import { validarCPF, buscarCEP } from './EmpregadoFormUtils';

export function useEmpregadoForm(onSuccess?: () => void) {
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const methods = useForm<EmpregadoFormData>({
    resolver: zodResolver(empregadoFormSchema),
    mode: 'onBlur',
    defaultValues: {
      nome: '',
      cpf: '',
      dataNascimento: '',
      cargo: '',
      salario: '',
      email: '',
      telefone: '',
      endereco: {
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: ''
      }
    },
  });

  const onSubmit = async (data: EmpregadoFormData) => {
    setApiError(null);
    setApiSuccess(null);
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/empregado', {
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
      setApiSuccess(responseData.message || mensagens.sucesso_empregado.pt);
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
      methods.setValue('endereco.logradouro', result.logradouro);
      methods.setValue('endereco.bairro', result.bairro);
      methods.setValue('endereco.cidade', result.localidade);
      methods.setValue('endereco.uf', result.uf);
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

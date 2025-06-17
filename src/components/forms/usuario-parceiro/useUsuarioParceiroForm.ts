/**
 * Arquivo: useUsuarioParceiroForm.ts
 * Caminho: src/components/forms/usuario-parceiro/useUsuarioParceiroForm.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Hook customizado para gerenciar o estado e lógica do formulário de usuário parceiro.
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { useNotification } from '@/hooks/useNotification';
import { UsuarioParceiroFormData, usuarioParceiroFormSchema } from './UsuarioParceiroFormTypes';
import { formatUsuarioParceiroData } from './UsuarioParceiroFormUtils';

interface UseUsuarioParceiroFormProps {
  initialValues?: Partial<UsuarioParceiroFormData>;
}

export function useUsuarioParceiroForm({ initialValues }: UseUsuarioParceiroFormProps = {}) {
  const { t } = useTranslation();
  const { showNotification } = useNotification();
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<UsuarioParceiroFormData>({
    resolver: zodResolver(usuarioParceiroFormSchema),
    defaultValues: initialValues || {
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      telefone: '',
      tipo: undefined,
      cnpj: '',
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

  const onSubmit = async (data: UsuarioParceiroFormData) => {
    try {
      setIsLoading(true);
      setApiError(null);
      setSuccessMessage(null);

      const formattedData = formatUsuarioParceiroData(data);

      const response = await fetch('/api/usuarios-parceiros', {
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

      setSuccessMessage(t('usuario.messages.success'));
      showNotification(t('usuario.messages.success'), 'success');
    } catch (error) {
      console.error('Erro ao salvar usuário parceiro:', error);
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
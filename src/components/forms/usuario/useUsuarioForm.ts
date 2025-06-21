/**
 * Arquivo: useUsuarioForm.ts
 * Caminho: src/components/forms/usuario/useUsuarioForm.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Hook customizado para gerenciar o estado e lógica do formulário de usuário.
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { UsuarioFormData, usuarioFormSchema } from './UsuarioFormTypes';
import { formatUsuarioData, validateUsuarioData } from './UsuarioFormUtils';
import { showNotification } from '@/hooks/useNotification';

interface UseUsuarioFormProps {
  initialValues?: Partial<UsuarioFormData>;
}

export function useUsuarioForm({ initialValues }: UseUsuarioFormProps = {}) {
  const { t } = useTranslation();
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<UsuarioFormData>({
    resolver: zodResolver(usuarioFormSchema),
    defaultValues: initialValues || {
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      tipo: undefined,
      ativo: true,
      observacoes: ''
    }
  });

  const { control, handleSubmit, formState: { errors }, reset } = methods;

  const onSubmit = async (data: UsuarioFormData) => {
    try {
      setIsLoading(true);
      setApiError(null);
      setSuccessMessage(null);

      const formattedData = formatUsuarioData(data);
      const validationErrors = validateUsuarioData(formattedData);

      if (validationErrors.length > 0) {
        setApiError(validationErrors.join('\n'));
        return;
      }

      const response = await fetch('/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao salvar usuário');
      }

      setSuccessMessage(t('usuario.messages.success'));
      reset();
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Erro ao salvar usuário');
      showNotification('error', t('usuario.messages.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    control,
    handleSubmit,
    formState: { errors },
    apiError,
    successMessage,
    isLoading,
    onSubmit
  };
} 
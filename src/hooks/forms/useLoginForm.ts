/**
 * Arquivo: useLoginForm.ts
 * Caminho: src/hooks/forms/useLoginForm.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Hook customizado para lógica, validação e submit do formulário de login, com integração ao contexto de autenticação.
 */

import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { notificationManager } from '@/services/notification.service';

export interface LoginForm {
  dom_cpf_login: string;
  password: string;
  rememberMe: boolean;
  acceptTerms: boolean;
}

export function useLoginForm(onSuccess?: () => void) {
  const { signIn, loading } = useAuth();
  const methods = useForm<LoginForm>({
    defaultValues: {
      dom_cpf_login: '',
      password: '',
      rememberMe: false,
      acceptTerms: false,
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginForm) => {
    console.log('[Login] onSubmit chamado com:', data);
    if (!data.acceptTerms) {
      notificationManager.error('Você precisa aceitar os termos de uso para continuar');
      return;
    }
    try {
      await signIn(data.dom_cpf_login, data.password, data.rememberMe);
      notificationManager.success('Login realizado com sucesso!');
      console.log('[Login] Login realizado com sucesso!');
      onSuccess?.();
    } catch (err: unknown) {
      console.error('[Login] Erro ao fazer login:', err);
      if (err instanceof Error) {
        notificationManager.error(err.message || 'Erro ao fazer login');
      } else {
        notificationManager.error('Erro ao fazer login');
      }
    }
  };

  return { ...methods, onSubmit, loading };
} 

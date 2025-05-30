import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { notificationService } from '@/services/NotificationService';

export interface LoginForm {
  cpf: string;
  password: string;
  rememberMe: boolean;
  acceptTerms: boolean;
}

export function useLoginForm(onSuccess?: () => void) {
  const { signIn, loading } = useAuth();
  const methods = useForm<LoginForm>({
    defaultValues: {
      cpf: '',
      password: '',
      rememberMe: false,
      acceptTerms: false,
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginForm) => {
    if (!data.acceptTerms) {
      notificationService.error('Você precisa aceitar os termos de uso para continuar');
      return;
    }
    try {
      await signIn(data.cpf, data.password);
      notificationService.success('Login realizado com sucesso!');
      onSuccess?.();
    } catch (err: unknown) {
      if (err instanceof Error) {
        notificationService.error(err.message || 'Erro ao fazer login');
      } else {
        notificationService.error('Erro ao fazer login');
      }
    }
  };

  return { ...methods, onSubmit, loading };
} 
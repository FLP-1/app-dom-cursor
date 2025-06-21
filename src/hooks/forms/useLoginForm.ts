/**
 * Arquivo: useLoginForm.ts
 * Caminho: src/hooks/forms/useLoginForm.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Hook customizado para gerenciar a lógica e o estado do formulário de login.
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

// 1. Schema de Validação com Zod
const loginSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um email válido.' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
  profile: z.enum(['empregador', 'empregado', 'familiar']),
});

// Tipagem inferida do schema
export type LoginFormInputs = z.infer<typeof loginSchema>;

export const useLoginForm = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      profile: 'empregador', // Perfil padrão
    },
  });

  const { handleSubmit, formState } = form;

  // 2. Função de Submit
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      // O endpoint pode variar, mas este é um padrão comum.
      const response = await axios.post('/api/auth/login', data);
      
      enqueueSnackbar('Login realizado com sucesso!', { variant: 'success' });
      
      // 3. Redirecionamento após o sucesso
      router.push('/dashboard'); 

    } catch (error) {
      console.error('Erro no login:', error);
      enqueueSnackbar(error.response?.data?.message || 'Falha no login. Verifique suas credenciais.', { variant: 'error' });
    }
  };

  return {
    form,
    onSubmit: handleSubmit(onSubmit),
    isLoading: formState.isSubmitting,
  };
}; 

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

// Função para validar CPF
const validateCPF = (cpf: string) => {
  const cleanCPF = cpf.replace(/\D/g, '');
  if (cleanCPF.length !== 11 || /^([0-9])\1+$/.test(cleanCPF)) return false;
  
  let sum = 0, rest;
  for (let i = 1; i <= 9; i++) sum += parseInt(cleanCPF.substring(i-1, i)) * (11 - i);
  rest = (sum * 10) % 11;
  if ((rest === 10) || (rest === 11)) rest = 0;
  if (rest !== parseInt(cleanCPF.substring(9, 10))) return false;
  
  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cleanCPF.substring(i-1, i)) * (12 - i);
  rest = (sum * 10) % 11;
  if ((rest === 10) || (rest === 11)) rest = 0;
  if (rest !== parseInt(cleanCPF.substring(10, 11))) return false;
  
  return true;
};

// 1. Schema de Validação com Zod
const loginSchema = z.object({
  cpf: z.string()
    .min(1, { message: 'CPF é obrigatório' })
    .refine((cpf) => validateCPF(cpf), { message: 'CPF inválido' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
});

// Tipagem inferida do schema
export type LoginFormInputs = z.infer<typeof loginSchema>;

export const useLoginForm = ({ mode = 'onChange' }: { mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all' } = {}) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode,
    defaultValues: {
      cpf: '',
      password: '',
    },
  });

  const { handleSubmit, formState } = form;

  // 2. Função de Submit
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      // Remove máscara do CPF antes de enviar
      const cleanCPF = data.cpf.replace(/\D/g, '');
      
      const response = await axios.post('/api/auth/login/employer', {
        ...data,
        cpf: cleanCPF
      });
      
      // Salvar token e dados do usuário
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      enqueueSnackbar('Login realizado com sucesso!', { variant: 'success' });
      
      // 3. Redirecionamento após o sucesso
      router.push('/dashboard'); 

    } catch (error: any) {
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

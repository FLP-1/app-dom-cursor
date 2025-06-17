/**
 * Arquivo: useSenhaForm.ts
 * Caminho: src/hooks/useSenhaForm.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Hook para gerenciamento de formulários de senha (recuperação e redefinição)
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const senhaSchema = z.object({
  email: z.string().email('E-mail inválido'),
  token: z.string().optional(),
  senha: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres').optional(),
  confirmarSenha: z.string().optional(),
}).refine((data) => {
  if (data.senha && data.confirmarSenha) {
    return data.senha === data.confirmarSenha;
  }
  return true;
}, {
  message: 'As senhas não conferem',
  path: ['confirmarSenha'],
});

type SenhaFormData = z.infer<typeof senhaSchema>;

export function useSenhaForm(mode: 'recuperar' | 'redefinir' = 'recuperar') {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SenhaFormData>({
    resolver: zodResolver(senhaSchema),
  });

  const onSubmit = async (data: SenhaFormData) => {
    try {
      const url = mode === 'recuperar' 
        ? '/api/auth/recuperar-senha'
        : '/api/auth/redefinir-senha';
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao processar solicitação');
      }

      return true;
    } catch (error) {
      console.error('Erro:', error);
      return false;
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
} 
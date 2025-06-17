/**
 * Arquivo: UsuarioParceiroFormUtils.ts
 * Caminho: src/components/forms/usuario-parceiro/UsuarioParceiroFormUtils.ts
 * Criado em: 2024-06-07
 * Última atualização: 2024-06-07
 * Descrição: Utilitários para o formulário de usuário parceiro.
 */

import { z } from 'zod';

export const usuarioParceiroSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmarSenha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
}).refine((data) => data.senha === data.confirmarSenha, {
  message: 'As senhas não conferem',
  path: ['confirmarSenha']
});

export type UsuarioParceiroFormData = z.infer<typeof usuarioParceiroSchema>;

export const defaultValues: UsuarioParceiroFormData = {
  nome: '',
  email: '',
  senha: '',
  confirmarSenha: ''
}; 
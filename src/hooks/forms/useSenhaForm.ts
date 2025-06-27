/**
 * Arquivo: useSenhaForm.ts
 * Caminho: src/hooks/forms/useSenhaForm.ts
 * Criado em: 2025-06-25
 * Última atualização: 2025-06-25
 * Descrição: Hook customizado para o formulário de recuperação de senha, com validação de CPF e mensagens centralizadas.
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { authMessages } from '@/i18n/messages/auth.messages';

export interface RecuperarSenhaData {
  cpf: string;
}

function unmaskCPF(cpf: string) {
  return cpf.replace(/\D/g, '');
}

function validateCPF(cpf: string) {
  cpf = unmaskCPF(cpf);
  if (cpf.length !== 11 || /^([0-9])\1+$/.test(cpf)) return false;
  let sum = 0, rest;
  for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
  rest = (sum * 10) % 11;
  if ((rest === 10) || (rest === 11)) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
  rest = (sum * 10) % 11;
  if ((rest === 10) || (rest === 11)) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}

const schema = z.object({
  cpf: z.string()
    .min(1, { message: authMessages.pt.mensagens.cpfObrigatorio })
    .refine((cpf) => validateCPF(cpf), { message: authMessages.pt.erros.cpfInvalido })
});

export function useSenhaForm() {
  return useForm<RecuperarSenhaData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: { cpf: '' }
  });
} 
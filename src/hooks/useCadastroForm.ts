/**
 * Arquivo: useCadastroForm.ts
 * Caminho: src/hooks/useCadastroForm.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useForm } from 'react-hook-form';

interface CadastroFormData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export function useCadastroForm() {
  const form = useForm<CadastroFormData>({
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
    },
    mode: 'onBlur',
  });
  return form;
} 

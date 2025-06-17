/**
 * Arquivo: UsuarioParceiroFormTypes.ts
 * Caminho: src/components/forms/usuario-parceiro/UsuarioParceiroFormTypes.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Tipos e schema de validação para o formulário de usuário parceiro.
 */

import { z } from 'zod';

export const usuarioParceiroFormSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmarSenha: z.string().min(6, 'Confirmação de senha deve ter no mínimo 6 caracteres'),
  telefone: z.string().min(10, 'Telefone inválido'),
  tipo: z.enum(['FORNECEDOR', 'CLIENTE', 'PRESTADOR', 'OUTRO'], {
    required_error: 'Tipo é obrigatório'
  }),
  cnpj: z.string().min(14, 'CNPJ inválido'),
  endereco: z.object({
    cep: z.string().min(8, 'CEP inválido'),
    logradouro: z.string().min(1, 'Logradouro é obrigatório'),
    numero: z.string().min(1, 'Número é obrigatório'),
    complemento: z.string().optional(),
    bairro: z.string().min(1, 'Bairro é obrigatório'),
    cidade: z.string().min(1, 'Cidade é obrigatória'),
    estado: z.string().min(2, 'Estado é obrigatório')
  }),
  observacoes: z.string().optional()
}).refine((data) => data.senha === data.confirmarSenha, {
  message: 'As senhas não conferem',
  path: ['confirmarSenha']
});

export type UsuarioParceiroFormData = z.infer<typeof usuarioParceiroFormSchema>;

export interface UsuarioParceiroFormProps {
  initialValues?: Partial<UsuarioParceiroFormData>;
  onSubmit?: (data: UsuarioParceiroFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
} 
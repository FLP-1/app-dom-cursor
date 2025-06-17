/**
 * Arquivo: UsuarioFormTypes.ts
 * Caminho: src/components/forms/usuario/UsuarioFormTypes.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Tipos e schema de validação para o formulário de usuário.
 */

import { z } from 'zod';

export enum TipoUsuario {
  ADMIN = 'ADMIN',
  GESTOR = 'GESTOR',
  COLABORADOR = 'COLABORADOR'
}

export const usuarioFormSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmarSenha: z.string().min(6, 'Confirmação de senha deve ter no mínimo 6 caracteres'),
  tipo: z.nativeEnum(TipoUsuario, {
    required_error: 'Tipo é obrigatório'
  }),
  ativo: z.boolean().default(true),
  observacoes: z.string().optional()
}).refine((data) => data.senha === data.confirmarSenha, {
  message: 'As senhas não conferem',
  path: ['confirmarSenha']
});

export type UsuarioFormData = z.infer<typeof usuarioFormSchema>;

export interface UsuarioFormProps {
  initialValues?: Partial<UsuarioFormData>;
  onSubmit?: (data: UsuarioFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
} 
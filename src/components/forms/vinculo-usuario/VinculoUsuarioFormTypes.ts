/**
 * Arquivo: VinculoUsuarioFormTypes.ts
 * Caminho: src/components/forms/vinculo-usuario/VinculoUsuarioFormTypes.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Tipos e schema de validação para o formulário de vínculo usuário.
 */

import { z } from 'zod';

export enum TipoVinculoUsuario {
  ADMIN = 'ADMIN',
  GESTOR = 'GESTOR',
  COLABORADOR = 'COLABORADOR',
  VISITANTE = 'VISITANTE'
}

export const vinculoUsuarioFormSchema = z.object({
  tipo: z.nativeEnum(TipoVinculoUsuario, {
    required_error: 'Tipo é obrigatório'
  }),
  dataInicio: z.date({
    required_error: 'Data de início é obrigatória'
  }),
  dataFim: z.date().optional(),
  ativo: z.boolean().default(true),
  observacoes: z.string().optional()
});

export type VinculoUsuarioFormData = z.infer<typeof vinculoUsuarioFormSchema>;

export interface VinculoUsuarioFormProps {
  initialValues?: Partial<VinculoUsuarioFormData>;
  onSubmit?: (data: VinculoUsuarioFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
} 
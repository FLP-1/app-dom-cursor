/**
 * Arquivo: VinculoFamiliarFormTypes.ts
 * Caminho: src/components/forms/vinculo-familiar/VinculoFamiliarFormTypes.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Tipos e schema de validação para o formulário de vínculo familiar.
 */

import { z } from 'zod';

export enum TipoVinculoFamiliar {
  CONJUGE = 'CONJUGE',
  FILHO = 'FILHO',
  PAI = 'PAI',
  MAE = 'MAE',
  OUTRO = 'OUTRO'
}

export const vinculoFamiliarFormSchema = z.object({
  tipo: z.nativeEnum(TipoVinculoFamiliar, {
    required_error: 'Tipo é obrigatório'
  }),
  dataInicio: z.date({
    required_error: 'Data de início é obrigatória'
  }),
  dataFim: z.date().optional(),
  nome: z.string().min(1, 'Nome é obrigatório'),
  cpf: z.string().min(11, 'CPF inválido'),
  dataNascimento: z.date({
    required_error: 'Data de nascimento é obrigatória'
  }),
  ativo: z.boolean().default(true),
  observacoes: z.string().optional()
});

export type VinculoFamiliarFormData = z.infer<typeof vinculoFamiliarFormSchema>;

export interface VinculoFamiliarFormProps {
  initialValues?: Partial<VinculoFamiliarFormData>;
  onSubmit?: (data: VinculoFamiliarFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
} 
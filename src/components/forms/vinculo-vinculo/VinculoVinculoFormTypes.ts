/**
 * Arquivo: VinculoVinculoFormTypes.ts
 * Caminho: src/components/forms/vinculo-vinculo/VinculoVinculoFormTypes.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Tipos e schema de validação para o formulário de vínculo vínculo.
 */

import { z } from 'zod';

export enum TipoVinculoVinculo {
  HIERARQUIA = 'HIERARQUIA',
  DEPENDENCIA = 'DEPENDENCIA',
  RELACIONAMENTO = 'RELACIONAMENTO'
}

export const vinculoVinculoFormSchema = z.object({
  tipo: z.nativeEnum(TipoVinculoVinculo, {
    required_error: 'Tipo é obrigatório'
  }),
  dataInicio: z.date({
    required_error: 'Data de início é obrigatória'
  }),
  dataFim: z.date().optional(),
  ativo: z.boolean().default(true),
  observacoes: z.string().optional()
});

export type VinculoVinculoFormData = z.infer<typeof vinculoVinculoFormSchema>;

export interface VinculoVinculoFormProps {
  initialValues?: Partial<VinculoVinculoFormData>;
  onSubmit?: (data: VinculoVinculoFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
} 
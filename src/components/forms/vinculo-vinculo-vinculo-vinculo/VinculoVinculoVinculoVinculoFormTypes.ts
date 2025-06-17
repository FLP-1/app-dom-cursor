/**
 * Arquivo: VinculoVinculoVinculoVinculoFormTypes.ts
 * Caminho: src/components/forms/vinculo-vinculo-vinculo-vinculo/VinculoVinculoVinculoVinculoFormTypes.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Tipos e schema de validação para o formulário de vínculo vínculo vínculo vínculo.
 */

import { z } from 'zod';

export enum TipoVinculoVinculoVinculoVinculo {
  HIERARQUIA = 'HIERARQUIA',
  DEPENDENCIA = 'DEPENDENCIA',
  RELACIONAMENTO = 'RELACIONAMENTO'
}

export const vinculoVinculoVinculoVinculoFormSchema = z.object({
  tipo: z.nativeEnum(TipoVinculoVinculoVinculoVinculo, {
    required_error: 'Tipo é obrigatório'
  }),
  dataInicio: z.date({
    required_error: 'Data de início é obrigatória'
  }),
  dataFim: z.date().optional(),
  ativo: z.boolean().default(true),
  observacoes: z.string().optional()
});

export type VinculoVinculoVinculoVinculoFormData = z.infer<typeof vinculoVinculoVinculoVinculoFormSchema>;

export interface VinculoVinculoVinculoVinculoFormProps {
  initialValues?: Partial<VinculoVinculoVinculoVinculoFormData>;
  onSubmit?: (data: VinculoVinculoVinculoVinculoFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
} 
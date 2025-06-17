/**
 * Arquivo: VinculoTarefaFormTypes.ts
 * Caminho: src/components/forms/vinculo-tarefa/VinculoTarefaFormTypes.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Tipos e schema de validação para o formulário de vínculo tarefa.
 */

import { z } from 'zod';

export enum TipoVinculoTarefa {
  RESPONSAVEL = 'RESPONSAVEL',
  PARTICIPANTE = 'PARTICIPANTE',
  OBSERVADOR = 'OBSERVADOR'
}

export const vinculoTarefaFormSchema = z.object({
  tipo: z.nativeEnum(TipoVinculoTarefa, {
    required_error: 'Tipo é obrigatório'
  }),
  dataInicio: z.date({
    required_error: 'Data de início é obrigatória'
  }),
  dataFim: z.date().optional(),
  ativo: z.boolean().default(true),
  observacoes: z.string().optional()
});

export type VinculoTarefaFormData = z.infer<typeof vinculoTarefaFormSchema>;

export interface VinculoTarefaFormProps {
  initialValues?: Partial<VinculoTarefaFormData>;
  onSubmit?: (data: VinculoTarefaFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
} 
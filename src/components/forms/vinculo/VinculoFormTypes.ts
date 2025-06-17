/**
 * Arquivo: VinculoFormTypes.ts
 * Caminho: src/components/forms/vinculo/VinculoFormTypes.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Tipos e schema de validação para o formulário de vínculo.
 */

import { z } from 'zod';

export enum TipoVinculo {
  CLT = 'CLT',
  PJ = 'PJ',
  ESTAGIO = 'ESTAGIO',
  TEMPORARIO = 'TEMPORARIO'
}

export const vinculoFormSchema = z.object({
  tipo: z.nativeEnum(TipoVinculo, {
    required_error: 'Tipo é obrigatório'
  }),
  dataInicio: z.date({
    required_error: 'Data de início é obrigatória'
  }),
  dataFim: z.date().optional(),
  cargo: z.string().min(1, 'Cargo é obrigatório'),
  departamento: z.string().min(1, 'Departamento é obrigatório'),
  salario: z.number().min(0, 'Salário deve ser maior ou igual a zero'),
  cargaHoraria: z.number().min(0, 'Carga horária deve ser maior ou igual a zero'),
  ativo: z.boolean().default(true),
  observacoes: z.string().optional()
});

export type VinculoFormData = z.infer<typeof vinculoFormSchema>;

export interface VinculoFormProps {
  initialValues?: Partial<VinculoFormData>;
  onSubmit?: (data: VinculoFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
} 
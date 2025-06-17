/**
 * Arquivo: VinculoEmpregadorFormTypes.ts
 * Caminho: src/components/forms/vinculo-empregador/VinculoEmpregadorFormTypes.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Tipos e schema de validação para o formulário de vínculo empregador.
 */

import { z } from 'zod';

export enum TipoVinculoEmpregador {
  MATRIZ = 'MATRIZ',
  FILIAL = 'FILIAL',
  CONTRATANTE = 'CONTRATANTE'
}

export const vinculoEmpregadorFormSchema = z.object({
  tipo: z.nativeEnum(TipoVinculoEmpregador, {
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

export type VinculoEmpregadorFormData = z.infer<typeof vinculoEmpregadorFormSchema>;

export interface VinculoEmpregadorFormProps {
  initialValues?: Partial<VinculoEmpregadorFormData>;
  onSubmit?: (data: VinculoEmpregadorFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
} 
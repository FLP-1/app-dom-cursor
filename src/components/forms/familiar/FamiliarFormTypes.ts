/**
 * Arquivo: FamiliarFormTypes.ts
 * Caminho: src/components/forms/familiar/FamiliarFormTypes.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Tipos e schema de validação para o formulário de familiar.
 */

import { z } from 'zod';

export enum TipoFamiliar {
  CONJUGE = 'CONJUGE',
  FILHO = 'FILHO',
  PAI = 'PAI',
  MAE = 'MAE',
  OUTRO = 'OUTRO',
}

export const familiarFormSchema = z.object({
  nome: z.string({
    required_error: 'O nome é obrigatório',
  }).min(3, 'O nome deve ter no mínimo 3 caracteres').max(100, 'O nome deve ter no máximo 100 caracteres'),
  cpf: z.string({
    required_error: 'O CPF é obrigatório',
  }).min(11, 'CPF inválido').max(11, 'CPF inválido'),
  dataNascimento: z.string({
    required_error: 'A data de nascimento é obrigatória',
  }).min(1, 'A data de nascimento é obrigatória'),
  tipo: z.nativeEnum(TipoFamiliar, {
    required_error: 'O tipo é obrigatório',
  }),
  dataInicio: z.string({
    required_error: 'A data de início é obrigatória',
  }).min(1, 'A data de início é obrigatória'),
  dataFim: z.string().optional(),
  endereco: z.object({
    cep: z.string({
      required_error: 'O CEP é obrigatório',
    }).min(8, 'CEP inválido').max(8, 'CEP inválido'),
    logradouro: z.string({
      required_error: 'O logradouro é obrigatório',
    }).min(3, 'O logradouro deve ter no mínimo 3 caracteres'),
    numero: z.string({
      required_error: 'O número é obrigatório',
    }).min(1, 'O número é obrigatório'),
    complemento: z.string().optional(),
    bairro: z.string({
      required_error: 'O bairro é obrigatório',
    }).min(3, 'O bairro deve ter no mínimo 3 caracteres'),
    cidade: z.string({
      required_error: 'A cidade é obrigatória',
    }).min(3, 'A cidade deve ter no mínimo 3 caracteres'),
    estado: z.string({
      required_error: 'O estado é obrigatório',
    }).min(2, 'Estado inválido').max(2, 'Estado inválido'),
  }),
  observacoes: z.string().max(1000, 'As observações devem ter no máximo 1000 caracteres').optional(),
});

export type FamiliarFormData = z.infer<typeof familiarFormSchema>;

export interface FamiliarFormProps {
  initialValues?: Partial<FamiliarFormData>;
  onSubmit?: (data: FamiliarFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
} 

/**
 * Arquivo: ParceiroFormTypes.ts
 * Caminho: src/components/forms/parceiro/ParceiroFormTypes.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Tipos e schema de validação para o formulário de parceiro.
 */

import { z } from 'zod';

export enum TipoParceiro {
  FORNECEDOR = 'FORNECEDOR',
  CLIENTE = 'CLIENTE',
  PRESTADOR = 'PRESTADOR',
  OUTRO = 'OUTRO',
}

export const parceiroFormSchema = z.object({
  nome: z.string({
    required_error: 'O nome é obrigatório',
  }).min(3, 'O nome deve ter no mínimo 3 caracteres').max(100, 'O nome deve ter no máximo 100 caracteres'),
  cnpj: z.string({
    required_error: 'O CNPJ é obrigatório',
  }).min(14, 'CNPJ inválido').max(14, 'CNPJ inválido'),
  tipo: z.nativeEnum(TipoParceiro, {
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

export type ParceiroFormData = z.infer<typeof parceiroFormSchema>;

export interface ParceiroFormProps {
  initialValues?: Partial<ParceiroFormData>;
  onSubmit?: (data: ParceiroFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
} 

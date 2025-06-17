/**
 * Arquivo: VinculoParceiroFormTypes.ts
 * Caminho: src/components/forms/vinculo-parceiro/VinculoParceiroFormTypes.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Tipos e schema de validação para o formulário de vínculo parceiro.
 */

import { z } from 'zod';

export enum TipoVinculoParceiro {
  FORNECEDOR = 'FORNECEDOR',
  CLIENTE = 'CLIENTE',
  PRESTADOR = 'PRESTADOR',
  OUTRO = 'OUTRO'
}

export const vinculoParceiroFormSchema = z.object({
  tipo: z.nativeEnum(TipoVinculoParceiro, {
    required_error: 'Tipo é obrigatório'
  }),
  dataInicio: z.date({
    required_error: 'Data de início é obrigatória'
  }),
  dataFim: z.date().optional(),
  nome: z.string().min(1, 'Nome é obrigatório'),
  cnpj: z.string().min(14, 'CNPJ inválido'),
  ativo: z.boolean().default(true),
  observacoes: z.string().optional()
});

export type VinculoParceiroFormData = z.infer<typeof vinculoParceiroFormSchema>;

export interface VinculoParceiroFormProps {
  initialValues?: Partial<VinculoParceiroFormData>;
  onSubmit?: (data: VinculoParceiroFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
} 
/**
 * Arquivo: OperacaoFinanceiraFormTypes.ts
 * Caminho: src/components/forms/operacao-financeira/OperacaoFinanceiraFormTypes.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Tipos e schema de validação para o formulário de operação financeira.
 */

import { z } from 'zod';

export enum TipoOperacaoFinanceira {
  RECEITA = 'RECEITA',
  DESPESA = 'DESPESA'
}

export const operacaoFinanceiraFormSchema = z.object({
  tipo: z.nativeEnum(TipoOperacaoFinanceira, {
    required_error: 'Tipo é obrigatório'
  }),
  valor: z.number().min(0.01, 'Valor deve ser maior que zero'),
  data: z.date({
    required_error: 'Data é obrigatória'
  }),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  categoria: z.string().min(1, 'Categoria é obrigatória'),
  formaPagamento: z.string().min(1, 'Forma de pagamento é obrigatória'),
  observacoes: z.string().optional()
});

export type OperacaoFinanceiraFormData = z.infer<typeof operacaoFinanceiraFormSchema>;

export interface OperacaoFinanceiraFormProps {
  initialValues?: Partial<OperacaoFinanceiraFormData>;
  onSubmit?: (data: OperacaoFinanceiraFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
} 
/**
 * Arquivo: PontoFormTypes.ts
 * Caminho: src/components/forms/ponto/PontoFormTypes.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Tipos e schema de validação para o formulário de ponto.
 */

import { z } from 'zod';

export const pontoFormSchema = z.object({
  data: z.date({
    required_error: 'Data é obrigatória'
  }),
  horaEntrada: z.string().min(1, 'Hora de entrada é obrigatória'),
  horaSaida: z.string().min(1, 'Hora de saída é obrigatória'),
  horaEntradaAlmoco: z.string().optional(),
  horaSaidaAlmoco: z.string().optional(),
  observacoes: z.string().optional()
});

export type PontoFormData = z.infer<typeof pontoFormSchema>;

export interface PontoFormProps {
  initialValues?: Partial<PontoFormData>;
  onSubmit?: (data: PontoFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
} 
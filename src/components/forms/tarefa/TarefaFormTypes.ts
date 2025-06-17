/**
 * Arquivo: TarefaFormTypes.ts
 * Caminho: src/components/forms/tarefa/TarefaFormTypes.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Tipos e schema de validação para o formulário de tarefa.
 */

import { z } from 'zod';

export enum StatusTarefa {
  PENDENTE = 'PENDENTE',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDA = 'CONCLUIDA',
  CANCELADA = 'CANCELADA'
}

export enum PrioridadeTarefa {
  BAIXA = 'BAIXA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA'
}

export const tarefaFormSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  status: z.nativeEnum(StatusTarefa, {
    required_error: 'Status é obrigatório'
  }),
  prioridade: z.nativeEnum(PrioridadeTarefa, {
    required_error: 'Prioridade é obrigatória'
  }),
  dataInicio: z.date({
    required_error: 'Data de início é obrigatória'
  }),
  dataFim: z.date().optional(),
  responsavel: z.string().min(1, 'Responsável é obrigatório'),
  observacoes: z.string().optional()
});

export type TarefaFormData = z.infer<typeof tarefaFormSchema>;

export interface TarefaFormProps {
  initialValues?: Partial<TarefaFormData>;
  onSubmit?: (data: TarefaFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
} 
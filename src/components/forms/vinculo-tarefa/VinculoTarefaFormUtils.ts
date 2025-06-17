/**
 * Arquivo: VinculoTarefaFormUtils.ts
 * Caminho: src/components/forms/vinculo-tarefa/VinculoTarefaFormUtils.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Funções utilitárias para o formulário de vínculo tarefa.
 */

import { VinculoTarefaFormData } from './VinculoTarefaFormTypes';

export function formatVinculoTarefaData(data: VinculoTarefaFormData): VinculoTarefaFormData {
  return {
    ...data,
    observacoes: data.observacoes?.trim()
  };
}

export function validateVinculoTarefaData(data: VinculoTarefaFormData): string[] {
  const errors: string[] = [];

  if (!data.tipo) {
    errors.push('Tipo é obrigatório');
  }

  if (!data.dataInicio) {
    errors.push('Data de início é obrigatória');
  }

  if (data.dataFim && data.dataFim < data.dataInicio) {
    errors.push('Data de fim deve ser posterior à data de início');
  }

  return errors;
}

export function getVinculoTarefaDefaultValues(): VinculoTarefaFormData {
  return {
    tipo: undefined,
    dataInicio: undefined,
    dataFim: undefined,
    ativo: true,
    observacoes: ''
  };
} 
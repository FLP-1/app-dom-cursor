/**
 * Arquivo: TarefaFormUtils.ts
 * Caminho: src/components/forms/tarefa/TarefaFormUtils.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Funções utilitárias para o formulário de tarefa.
 */

import { TarefaFormData } from './TarefaFormTypes';

export function formatTarefaData(data: TarefaFormData): TarefaFormData {
  return {
    ...data,
    titulo: data.titulo.trim(),
    descricao: data.descricao.trim(),
    responsavel: data.responsavel.trim(),
    observacoes: data.observacoes?.trim()
  };
}

export function validateTarefaData(data: TarefaFormData): string[] {
  const errors: string[] = [];

  if (!data.titulo) {
    errors.push('Título é obrigatório');
  }

  if (!data.descricao) {
    errors.push('Descrição é obrigatória');
  }

  if (!data.status) {
    errors.push('Status é obrigatório');
  }

  if (!data.prioridade) {
    errors.push('Prioridade é obrigatória');
  }

  if (!data.dataInicio) {
    errors.push('Data de início é obrigatória');
  }

  if (data.dataFim && data.dataFim < data.dataInicio) {
    errors.push('Data de fim deve ser posterior à data de início');
  }

  if (!data.responsavel) {
    errors.push('Responsável é obrigatório');
  }

  return errors;
}

export function getTarefaDefaultValues(): TarefaFormData {
  return {
    titulo: '',
    descricao: '',
    status: undefined,
    prioridade: undefined,
    dataInicio: undefined,
    dataFim: undefined,
    responsavel: '',
    observacoes: ''
  };
} 
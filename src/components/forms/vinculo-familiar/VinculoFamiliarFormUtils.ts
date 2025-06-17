/**
 * Arquivo: VinculoFamiliarFormUtils.ts
 * Caminho: src/components/forms/vinculo-familiar/VinculoFamiliarFormUtils.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Funções utilitárias para o formulário de vínculo familiar.
 */

import { VinculoFamiliarFormData } from './VinculoFamiliarFormTypes';

export function formatVinculoFamiliarData(data: VinculoFamiliarFormData): VinculoFamiliarFormData {
  return {
    ...data,
    nome: data.nome.trim(),
    cpf: data.cpf.replace(/\D/g, ''),
    observacoes: data.observacoes?.trim()
  };
}

export function validateVinculoFamiliarData(data: VinculoFamiliarFormData): string[] {
  const errors: string[] = [];

  if (!data.tipo) {
    errors.push('Tipo é obrigatório');
  }

  if (!data.dataInicio) {
    errors.push('Data de início é obrigatória');
  }

  if (!data.nome) {
    errors.push('Nome é obrigatório');
  }

  if (!data.cpf) {
    errors.push('CPF é obrigatório');
  } else if (data.cpf.length !== 11) {
    errors.push('CPF inválido');
  }

  if (!data.dataNascimento) {
    errors.push('Data de nascimento é obrigatória');
  }

  if (data.dataFim && data.dataFim < data.dataInicio) {
    errors.push('Data de fim deve ser posterior à data de início');
  }

  return errors;
}

export function getVinculoFamiliarDefaultValues(): VinculoFamiliarFormData {
  return {
    tipo: undefined,
    dataInicio: undefined,
    dataFim: undefined,
    nome: '',
    cpf: '',
    dataNascimento: undefined,
    ativo: true,
    observacoes: ''
  };
} 
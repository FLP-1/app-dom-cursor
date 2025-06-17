/**
 * Arquivo: VinculoFormUtils.ts
 * Caminho: src/components/forms/vinculo/VinculoFormUtils.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Funções utilitárias para o formulário de vínculo.
 */

import { VinculoFormData } from './VinculoFormTypes';

export function formatVinculoData(data: VinculoFormData): VinculoFormData {
  return {
    ...data,
    cargo: data.cargo.trim(),
    departamento: data.departamento.trim(),
    observacoes: data.observacoes?.trim()
  };
}

export function validateVinculoData(data: VinculoFormData): string[] {
  const errors: string[] = [];

  if (!data.tipo) {
    errors.push('Tipo é obrigatório');
  }

  if (!data.dataInicio) {
    errors.push('Data de início é obrigatória');
  }

  if (!data.cargo) {
    errors.push('Cargo é obrigatório');
  }

  if (!data.departamento) {
    errors.push('Departamento é obrigatório');
  }

  if (data.salario < 0) {
    errors.push('Salário deve ser maior ou igual a zero');
  }

  if (data.cargaHoraria < 0) {
    errors.push('Carga horária deve ser maior ou igual a zero');
  }

  if (data.dataFim && data.dataFim < data.dataInicio) {
    errors.push('Data de fim deve ser posterior à data de início');
  }

  return errors;
}

export function getVinculoDefaultValues(): VinculoFormData {
  return {
    tipo: undefined,
    dataInicio: undefined,
    dataFim: undefined,
    cargo: '',
    departamento: '',
    salario: 0,
    cargaHoraria: 0,
    ativo: true,
    observacoes: ''
  };
} 
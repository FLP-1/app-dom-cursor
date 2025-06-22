/**
 * Arquivo: VinculoFormUtils.ts
 * Caminho: src/components/forms/vinculo/VinculoFormUtils.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-01-27
 * Descrição: Funções utilitárias para o formulário de vínculo.
 */

import { VinculoFormData } from './VinculoFormTypes';
import { vinculoMessages } from '@/i18n/messages/vinculo.messages';

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
    errors.push(vinculoMessages.validation.tipo.required);
  }

  if (!data.dataInicio) {
    errors.push(vinculoMessages.validation.dataInicio.required);
  }

  if (!data.cargo) {
    errors.push(vinculoMessages.validation.cargo.required);
  }

  if (!data.departamento) {
    errors.push(vinculoMessages.validation.departamento.required);
  }

  if (data.salario < 0) {
    errors.push(vinculoMessages.validation.salario.min);
  }

  if (data.cargaHoraria < 0) {
    errors.push(vinculoMessages.validation.cargaHoraria.min);
  }

  if (data.dataFim && data.dataFim < data.dataInicio) {
    errors.push(vinculoMessages.validation.dataFim.invalid);
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
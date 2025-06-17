/**
 * Arquivo: VinculoVinculoFormUtils.ts
 * Caminho: src/components/forms/vinculo-vinculo/VinculoVinculoFormUtils.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Funções utilitárias para o formulário de vínculo vínculo.
 */

import { VinculoVinculoFormData } from './VinculoVinculoFormTypes';

export function formatVinculoVinculoData(data: VinculoVinculoFormData): VinculoVinculoFormData {
  return {
    ...data,
    observacoes: data.observacoes?.trim()
  };
}

export function validateVinculoVinculoData(data: VinculoVinculoFormData): string[] {
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

export function getVinculoVinculoDefaultValues(): VinculoVinculoFormData {
  return {
    tipo: undefined,
    dataInicio: undefined,
    dataFim: undefined,
    ativo: true,
    observacoes: ''
  };
} 
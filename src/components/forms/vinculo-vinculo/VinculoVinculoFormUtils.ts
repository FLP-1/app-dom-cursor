/**
 * Arquivo: VinculoVinculoFormUtils.ts
 * Caminho: src/components/forms/vinculo-vinculo/VinculoVinculoFormUtils.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-01-27
 * Descrição: Funções utilitárias para o formulário de vínculo vínculo.
 */

import { VinculoVinculoFormData } from './VinculoVinculoFormTypes';
import { vinculoMessages } from '@/i18n/messages/vinculo.messages';

export function formatVinculoVinculoData(data: VinculoVinculoFormData): VinculoVinculoFormData {
  return {
    ...data,
    observacoes: data.observacoes?.trim()
  };
}

export function validateVinculoVinculoData(data: VinculoVinculoFormData): string[] {
  const errors: string[] = [];

  if (!data.tipo) {
    errors.push(vinculoMessages.validation.tipo.required);
  }

  if (!data.dataInicio) {
    errors.push(vinculoMessages.validation.dataInicio.required);
  }

  if (data.dataFim && data.dataFim < data.dataInicio) {
    errors.push(vinculoMessages.validation.dataFim.invalid);
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
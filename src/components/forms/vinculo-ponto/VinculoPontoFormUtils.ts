/**
 * Arquivo: VinculoPontoFormUtils.ts
 * Caminho: src/components/forms/vinculo-ponto/VinculoPontoFormUtils.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Funções utilitárias para o formulário de vínculo ponto.
 */

import { VinculoPontoFormData } from './VinculoPontoFormTypes';

export function formatVinculoPontoData(data: VinculoPontoFormData): VinculoPontoFormData {
  return {
    ...data,
    hora: data.hora.trim(),
    observacoes: data.observacoes?.trim()
  };
}

export function validateVinculoPontoData(data: VinculoPontoFormData): string[] {
  const errors: string[] = [];

  if (!data.tipo) {
    errors.push('Tipo é obrigatório');
  }

  if (!data.data) {
    errors.push('Data é obrigatória');
  }

  if (!data.hora) {
    errors.push('Hora é obrigatória');
  } else if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(data.hora)) {
    errors.push('Hora inválida');
  }

  return errors;
}

export function getVinculoPontoDefaultValues(): VinculoPontoFormData {
  return {
    tipo: undefined,
    data: undefined,
    hora: '',
    ativo: true,
    observacoes: ''
  };
} 
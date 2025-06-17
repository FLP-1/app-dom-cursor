/**
 * Arquivo: VinculoUsuarioFormUtils.ts
 * Caminho: src/components/forms/vinculo-usuario/VinculoUsuarioFormUtils.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Funções utilitárias para o formulário de vínculo usuário.
 */

import { VinculoUsuarioFormData } from './VinculoUsuarioFormTypes';

export function formatVinculoUsuarioData(data: VinculoUsuarioFormData): VinculoUsuarioFormData {
  return {
    ...data,
    observacoes: data.observacoes?.trim()
  };
}

export function validateVinculoUsuarioData(data: VinculoUsuarioFormData): string[] {
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

export function getVinculoUsuarioDefaultValues(): VinculoUsuarioFormData {
  return {
    tipo: undefined,
    dataInicio: undefined,
    dataFim: undefined,
    ativo: true,
    observacoes: ''
  };
} 
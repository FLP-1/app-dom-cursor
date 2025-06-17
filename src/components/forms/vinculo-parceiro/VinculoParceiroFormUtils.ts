/**
 * Arquivo: VinculoParceiroFormUtils.ts
 * Caminho: src/components/forms/vinculo-parceiro/VinculoParceiroFormUtils.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Funções utilitárias para o formulário de vínculo parceiro.
 */

import { VinculoParceiroFormData } from './VinculoParceiroFormTypes';

export function formatVinculoParceiroData(data: VinculoParceiroFormData): VinculoParceiroFormData {
  return {
    ...data,
    nome: data.nome.trim(),
    cnpj: data.cnpj.replace(/\D/g, ''),
    observacoes: data.observacoes?.trim()
  };
}

export function validateVinculoParceiroData(data: VinculoParceiroFormData): string[] {
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

  if (!data.cnpj) {
    errors.push('CNPJ é obrigatório');
  } else if (data.cnpj.length !== 14) {
    errors.push('CNPJ inválido');
  }

  if (data.dataFim && data.dataFim < data.dataInicio) {
    errors.push('Data de fim deve ser posterior à data de início');
  }

  return errors;
}

export function getVinculoParceiroDefaultValues(): VinculoParceiroFormData {
  return {
    tipo: undefined,
    dataInicio: undefined,
    dataFim: undefined,
    nome: '',
    cnpj: '',
    ativo: true,
    observacoes: ''
  };
} 
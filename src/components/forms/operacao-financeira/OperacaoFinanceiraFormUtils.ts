/**
 * Arquivo: OperacaoFinanceiraFormUtils.ts
 * Caminho: src/components/forms/operacao-financeira/OperacaoFinanceiraFormUtils.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Funções utilitárias para o formulário de operação financeira.
 */

import { OperacaoFinanceiraFormData } from './OperacaoFinanceiraFormTypes';

export function formatOperacaoFinanceiraData(data: OperacaoFinanceiraFormData): OperacaoFinanceiraFormData {
  return {
    ...data,
    descricao: data.descricao.trim(),
    categoria: data.categoria.trim(),
    formaPagamento: data.formaPagamento.trim(),
    observacoes: data.observacoes?.trim()
  };
}

export function validateOperacaoFinanceiraData(data: OperacaoFinanceiraFormData): string[] {
  const errors: string[] = [];

  if (!data.tipo) {
    errors.push('Tipo é obrigatório');
  }

  if (!data.valor || data.valor <= 0) {
    errors.push('Valor deve ser maior que zero');
  }

  if (!data.data) {
    errors.push('Data é obrigatória');
  }

  if (!data.descricao) {
    errors.push('Descrição é obrigatória');
  }

  if (!data.categoria) {
    errors.push('Categoria é obrigatória');
  }

  if (!data.formaPagamento) {
    errors.push('Forma de pagamento é obrigatória');
  }

  return errors;
}

export function getOperacaoFinanceiraDefaultValues(): OperacaoFinanceiraFormData {
  return {
    tipo: undefined,
    valor: 0,
    data: undefined,
    descricao: '',
    categoria: '',
    formaPagamento: '',
    observacoes: ''
  };
} 
/**
 * Arquivo: DocumentFormUtils.ts
 * Caminho: src/components/forms/documentos/DocumentFormUtils.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Funções utilitárias para o formulário de documentos.
 */

import { DocumentFormData } from './DocumentFormTypes';

export const formatDocumentData = (data: DocumentFormData): DocumentFormData => {
  return {
    ...data,
    nome: data.nome.trim(),
    url: data.url.trim(),
  };
};

export const validateDocumentData = (data: DocumentFormData): string[] => {
  const errors: string[] = [];

  if (!data.nome) {
    errors.push('O nome do documento é obrigatório');
  } else if (data.nome.length < 3) {
    errors.push('O nome deve ter no mínimo 3 caracteres');
  } else if (data.nome.length > 100) {
    errors.push('O nome deve ter no máximo 100 caracteres');
  }

  if (!data.tipo) {
    errors.push('O tipo do documento é obrigatório');
  }

  if (!data.url) {
    errors.push('A URL do documento é obrigatória');
  } else if (!isValidUrl(data.url)) {
    errors.push('URL inválida');
  }

  return errors;
};

export const getDocumentDefaultValues = (): DocumentFormData => {
  return {
    nome: '',
    tipo: undefined as any,
    url: '',
    dataValidade: '',
    isPublic: false,
  };
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}; 
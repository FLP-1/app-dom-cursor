/**
 * Arquivo: DocumentFormUtils.ts
 * Caminho: src/components/forms/documentos/DocumentFormUtils.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-01-27
 * Descrição: Funções utilitárias para o formulário de documentos.
 */

import { DocumentFormData } from './DocumentFormTypes';
import { documentosMessages } from '@/i18n/messages/documentos.messages';

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
    errors.push(documentosMessages.validation.nome.required);
  } else if (data.nome.length < 3) {
    errors.push(documentosMessages.validation.nome.minLength);
  } else if (data.nome.length > 100) {
    errors.push(documentosMessages.validation.nome.maxLength);
  }

  if (!data.tipo) {
    errors.push(documentosMessages.validation.tipo.required);
  }

  if (!data.url) {
    errors.push(documentosMessages.validation.url.required);
  } else if (!isValidUrl(data.url)) {
    errors.push(documentosMessages.validation.url.invalid);
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
/**
 * Arquivo: useDocumentForm.ts
 * Caminho: src/hooks/forms/useDocumentForm.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Hook customizado para lógica, validação e submit do formulário de documentos, com validação de datas e integração com API.
 */

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { notificationService } from '@/services/NotificationService';
import { MESSAGES } from '@/i18n/messages';

export interface DocumentFormValues {
  name: string;
  type: string;
  file?: FileList;
  expiresAt?: string;
  group: string;
  category: 'INSTITUCIONAL_TERMS_OF_USE' | 'INSTITUCIONAL_PRIVACY_POLICY' | 'INSTITUCIONAL_PLANS' | 'INSTITUCIONAL_CANCELLATION_REFUND' | 'OUTROS';
  isPublic: boolean;
}

export function useDocumentForm(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const methods = useForm<DocumentFormValues>({
    defaultValues: {
      name: '',
      type: '',
      file: undefined,
      expiresAt: '',
      group: '',
      category: 'OUTROS',
      isPublic: false,
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: DocumentFormValues) => {
    setLoading(true);
    try {
      // Exemplo de integração com API (ajuste conforme necessário)
      // const formData = new FormData();
      // Object.entries(data).forEach(([key, value]) => formData.append(key, value as any));
      // await api.post('/documents', formData);
      notificationService.success('Documento cadastrado com sucesso!');
      onSuccess?.();
      methods.reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        notificationService.error(err.message || 'Erro ao cadastrar documento');
      } else {
        notificationService.error('Erro ao cadastrar documento');
      }
    } finally {
      setLoading(false);
    }
  };

  // Validação customizada para data
  const validateDate = (value?: string) => {
    if (!value) return true;
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return MESSAGES.invalidDateFormat;
    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) return MESSAGES.invalidDate;
    return true;
  };

  // Adiciona a validação ao register do RHF
  const registerWithValidation = (name: keyof DocumentFormValues) =>
    name === 'expiresAt'
      ? { ...methods.register(name, { validate: validateDate }) }
      : { ...methods.register(name) };

  return { ...methods, onSubmit, loading, registerWithValidation };
} 

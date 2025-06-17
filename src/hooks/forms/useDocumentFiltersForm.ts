/**
 * Arquivo: useDocumentFiltersForm.ts
 * Caminho: src/hooks/forms/useDocumentFiltersForm.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Hook customizado para lógica, validação e submit do formulário de filtros de documentos, com validação de datas.
 */

import { useForm } from 'react-hook-form';
import { MESSAGES } from '@/i18n/messages';

export interface DocumentFiltersFormValues {
  search?: string;
  type: string;
  status: string;
  expiresAt: string;
  group: string;
  category: 'INSTITUCIONAL_TERMS_OF_USE' | 'INSTITUCIONAL_PRIVACY_POLICY' | 'INSTITUCIONAL_PLANS' | 'INSTITUCIONAL_CANCELLATION_REFUND' | 'OUTROS' | 'Todos';
}

export function useDocumentFiltersForm(onFilter?: (values: DocumentFiltersFormValues) => void) {
  const methods = useForm<DocumentFiltersFormValues>({
    defaultValues: {
      search: '',
      type: 'Todos',
      status: 'Todos',
      expiresAt: '',
      group: 'Todos',
      category: 'Todos',
    },
    mode: 'onChange',
  });

  // Validação customizada para data
  const validateDate = (value: string) => {
    if (!value) return true;
    // Regex para dd/mm/aaaa
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return MESSAGES.invalidDateFormat;
    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) return MESSAGES.invalidDate;
    return true;
  };

  // Adiciona a validação ao register do RHF
  const registerWithValidation = (name: keyof DocumentFiltersFormValues) =>
    name === 'expiresAt'
      ? { ...methods.register(name, { validate: validateDate }) }
      : { ...methods.register(name) };

  const onSubmit = (data: DocumentFiltersFormValues) => {
    onFilter?.(data);
  };

  return { ...methods, onSubmit, registerWithValidation };
} 

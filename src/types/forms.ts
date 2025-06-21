/**
 * Arquivo: forms.ts
 * Caminho: src/types/forms.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Tipos de formulários
 */

import type { Control, FieldValues } from 'react-hook-form';

// Justificativa: integração com react-hook-form, tipagem dinâmica dos campos
export interface FormControl {
  control: Control<FieldValues>;
}

export interface FormData {
  [key: string]: string | number | boolean | Date | null | undefined;
}

export interface FormSubmitHandler {
  (data: FormData): Promise<void>;
}

export interface FormError {
  message: string;
  code?: string;
  details?: unknown;
}

export interface FormValidationError {
  field: string;
  message: string;
  type: string;
}

// Justificativa: integração com react-hook-form, tipagem dinâmica dos campos
export interface FormProps {
  control: Control<FieldValues>;
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

export interface FormSelectProps extends FormProps {
  options: Array<{
    value: string | number;
    label: string;
  }>;
}

export interface FormDatePickerProps extends FormProps {
  format?: string;
}

export interface FormMaskInputProps extends FormProps {
  mask: string;
}

export interface FormFileUploadProps extends FormProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
}

export interface FormImageUploadProps extends FormProps {
  maxSize?: number;
  aspectRatio?: number;
}

export interface FormRichTextProps extends FormProps {
  toolbar?: boolean;
  minHeight?: number;
}

export interface FormPhoneInputProps extends FormProps {
  defaultCountry?: string;
}

export interface FormCepInputProps extends FormProps {
  onCepChange?: (cep: string) => void;
} 

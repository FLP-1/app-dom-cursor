/**
 * Arquivo: FormPhoneInput.tsx
 * Caminho: src/components/FormPhoneInput.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Componente de input de telefone com máscara
 */

import { Control, FieldValues } from 'react-hook-form';
import { FormInput } from './common/forms/FormInput';
import { authMessages } from '@/i18n/messages/auth.messages';

interface FormPhoneInputProps<T extends FieldValues = FieldValues> {
  name: string;
  label: string;
  control: Control<T>;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  error?: string;
  placeholder?: string;
}

export const FormPhoneInput = <T extends FieldValues = FieldValues>({
  name,
  label,
  control,
  disabled,
  required,
  helperText,
  error,
  placeholder
}: FormPhoneInputProps<T>) => {
  // Usar mensagens em português por padrão
  const messages = authMessages.pt;

  return (
    <FormInput
      name={name}
      label={label}
      control={control}
      mask="phone"
      disabled={disabled}
      required={required}
      helperText={helperText}
      error={!!error}
      placeholder={placeholder || messages.placeholders.telefone}
    />
  );
}; 

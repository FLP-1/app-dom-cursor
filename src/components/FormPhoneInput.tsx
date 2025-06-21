/**
 * Arquivo: FormPhoneInput.tsx
 * Caminho: src/components/FormPhoneInput.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { Control, FieldValues } from 'react-hook-form';
import { FormInput } from './common/forms/FormInput';

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
      placeholder={placeholder}
    />
  );
}; 

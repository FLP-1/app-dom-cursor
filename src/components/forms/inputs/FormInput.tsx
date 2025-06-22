/**
 * Arquivo: FormInput.tsx
 * Caminho: src/components/forms/inputs/FormInput.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-01-27
 * Descrição: Componente de input de formulário integrado com react-hook-form e Material UI, com suporte a validação e acessibilidade
 */

import React, { useId } from 'react';
import { TextField, TextFieldProps, SxProps, Theme } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import HelperText from '@/components/common/HelperText';
import { authMessages } from '@/i18n/messages/auth.messages';

export interface FormInputProps<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  sx?: SxProps<Theme>;
  required?: boolean;
  id?: string;
}

const FormInput = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  helperText,
  error,
  sx,
  required,
  id,
  ...props
}: FormInputProps<T>) => {
  // Usar mensagens em português por padrão
  const messages = authMessages.pt;
  
  const generatedId = useId();
  const inputId = id || `${name}-input-${generatedId}`;
  
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <>
          <TextField
            {...field}
            {...props}
            id={inputId}
            label={label}
            aria-label={label ? undefined : messages.tooltips.campoObrigatorio}
            placeholder={placeholder}
            error={!!fieldError || error}
            required={required}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: fieldError || error ? 'error.main' : 'divider'
                },
                '&:hover fieldset': {
                  borderColor: fieldError || error ? 'error.main' : 'primary.main'
                },
                '&.Mui-focused fieldset': {
                  borderColor: fieldError || error ? 'error.main' : 'primary.main'
                }
              },
              ...sx
            }}
          />
          <HelperText
            text={fieldError?.message || helperText}
            error={!!fieldError || error}
          />
        </>
      )}
    />
  );
};

export default FormInput;

export { FormInput }; 

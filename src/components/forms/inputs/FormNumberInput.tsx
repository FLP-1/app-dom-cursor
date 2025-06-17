/**
 * Arquivo: FormNumberInput.tsx
 * Caminho: src/components/forms/inputs/FormNumberInput.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2024-06-07
 * Descrição: Componente de input numérico integrado com react-hook-form e Material UI, com suporte a validação e acessibilidade.
 */

import React, { useId } from 'react';
import { TextField, SxProps, Theme } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import HelperText from '@/components/common/HelperText';

export interface FormNumberInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  helperText?: string;
  error?: boolean;
  sx?: SxProps<Theme>;
  id?: string;
}

const FormNumberInput = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  min,
  max,
  step = 1,
  helperText,
  error,
  sx,
  id,
}: FormNumberInputProps<T>) => {
  const generatedId = useId();
  const inputId = id || `${name}-numberinput-${generatedId}`;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <>
          <TextField
            {...field}
            id={inputId}
            type="number"
            label={label}
            aria-label={label ? undefined : name}
            placeholder={placeholder}
            inputProps={{
              min,
              max,
              step,
            }}
            error={!!fieldError || error}
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
              '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
                opacity: 1
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

export default FormNumberInput; 

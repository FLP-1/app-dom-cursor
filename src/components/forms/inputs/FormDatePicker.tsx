/**
 * Arquivo: FormDatePicker.tsx
 * Caminho: src/components/forms/inputs/FormDatePicker.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2024-06-07
 * Descrição: Componente de seleção de data integrado com react-hook-form e Material UI, com suporte a validação e acessibilidade.
 */

import React, { useId } from 'react';
import { SxProps, Theme } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import HelperText from '@/components/common/HelperText';

export interface FormDatePickerProps<T extends FieldValues> {
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

const FormDatePicker = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  helperText,
  error,
  sx,
  required,
  id,
}: FormDatePickerProps<T>) => {
  const generatedId = useId();
  const inputId = id || `${name}-datepicker-${generatedId}`;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <>
          <DatePicker
            {...field}
            label={label}
            slotProps={{
              textField: {
                id: inputId,
                label: label,
                'aria-label': label ? undefined : name,
                fullWidth: true,
                placeholder,
                error: !!fieldError || error,
                required,
                sx: {
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
                }
              }
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

export default FormDatePicker; 

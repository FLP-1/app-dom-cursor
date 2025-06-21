/**
 * Arquivo: FormTextArea.tsx
 * Caminho: src/components/form/FormTextArea.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente de área de texto integrado com react-hook-form e Material UI, com suporte a validação e acessibilidade
 */

import React from 'react';
import { TextField, SxProps, Theme } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import HelperText from '@/components/common/HelperText';

export interface FormTextAreaProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  rows?: number;
  maxRows?: number;
  minRows?: number;
  helperText?: string;
  error?: boolean;
  sx?: SxProps<Theme>;
}

const FormTextArea = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  rows = 4,
  maxRows,
  minRows,
  helperText,
  error,
  sx,
}: FormTextAreaProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <>
          <TextField
            {...field}
            multiline
            rows={rows}
            maxRows={maxRows}
            minRows={minRows}
            label={label}
            placeholder={placeholder}
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
              '& .MuiInputBase-input': {
                lineHeight: 1.5
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

export { FormTextArea }; 

/**
 * Arquivo: CheckboxField.tsx
 * Caminho: src/components/forms/inputs/CheckboxField.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Componente de checkbox integrado com react-hook-form e Material UI
 */

import React from 'react';
import { FormControlLabel, Checkbox, FormHelperText, SxProps, Theme } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { authMessages } from '@/i18n/messages/auth.messages';

export interface CheckboxFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  helperText?: string;
  error?: boolean;
  sx?: SxProps<Theme>;
  required?: boolean;
  disabled?: boolean;
}

const CheckboxField = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  error,
  sx,
  required,
  disabled,
}: CheckboxFieldProps<T>) => {
  // Usar mensagens em português por padrão
  const messages = authMessages.pt;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <>
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={!!field.value}
                disabled={disabled}
                aria-label={messages.tooltips.marcarDesmarcar}
                sx={{
                  '&.Mui-checked': {
                    color: 'primary.main',
                  },
                  '&.Mui-disabled': {
                    color: 'action.disabled',
                  },
                  ...sx
                }}
              />
            }
            label={label}
            sx={{
              alignItems: 'flex-start',
              margin: 0,
              '& .MuiFormControlLabel-label': {
                fontSize: '0.875rem',
                lineHeight: 1.4,
                color: fieldError || error ? 'error.main' : 'text.primary',
              }
            }}
          />
          {(fieldError?.message || helperText) && (
            <FormHelperText 
              error={!!fieldError || error}
              sx={{ mt: 0.5, ml: 0 }}
            >
              {fieldError?.message || helperText}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
};

export default CheckboxField;

export { CheckboxField }; 
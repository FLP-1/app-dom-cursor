/**
 * Arquivo: FormDateTimePicker.tsx
 * Caminho: src/components/form/FormDateTimePicker.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-01-27
 * Descrição: Componente de seleção de data e horário integrado com react-hook-form e Material UI, com suporte a validação e acessibilidade
 */

import React from 'react';
import { TextField, SxProps, Theme } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import HelperText from '@/components/common/HelperText';
import { authMessages } from '@/i18n/messages/auth.messages';

export interface FormDateTimePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  sx?: SxProps<Theme>;
}

const FormDateTimePicker = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  helperText,
  error,
  sx,
}: FormDateTimePickerProps<T>) => {
  // Usar mensagens em português por padrão
  const messages = authMessages.pt;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <>
          <DateTimePicker
            {...field}
            label={label}
            slotProps={{
              textField: {
                fullWidth: true,
                placeholder: placeholder || messages.placeholders.dataHora,
                error: !!fieldError || error,
                'aria-label': messages.tooltips.selecionarDataHora,
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

export default FormDateTimePicker; 

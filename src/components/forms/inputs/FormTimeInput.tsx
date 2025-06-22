/**
 * Arquivo: FormTimeInput.tsx
 * Caminho: src/components/form/FormTimeInput.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-01-27
 * Descrição: Componente de input de horário integrado com react-hook-form e Material UI, com suporte a validação e acessibilidade
 */

import React from 'react';
import { TextField, SxProps, Theme } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import HelperText from '@/components/common/HelperText';
import { authMessages } from '@/i18n/messages/auth.messages';

export interface FormTimeInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  sx?: SxProps<Theme>;
}

const FormTimeInput = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  helperText,
  error,
  sx,
}: FormTimeInputProps<T>) => {
  // Usar mensagens em português por padrão
  const messages = authMessages.pt;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <>
          <TextField
            {...field}
            type="time"
            label={label}
            placeholder={placeholder || messages.placeholders.horario}
            error={!!fieldError || error}
            fullWidth
            aria-label={messages.tooltips.campoHorario}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
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

export default FormTimeInput; 

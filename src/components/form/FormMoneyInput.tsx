/**
 * Arquivo: FormMoneyInput.tsx
 * Caminho: src/components/form/FormMoneyInput.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { TextField } from '@mui/material';
import { Controller, Control } from 'react-hook-form';

interface FormMoneyInputProps {
  name: string;
  label: string;
  control: Control<unknown>;
  error?: string;
}

export const FormMoneyInput: React.FC<FormMoneyInputProps> = ({ name, label, control, error }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        label={label}
        error={!!error}
        helperText={error}
        fullWidth
        inputProps={{ inputMode: 'decimal', pattern: '[0-9,.]*', 'aria-label': label }}
      />
    )}
  />
); 

/**
 * Arquivo: FormMaskInput.tsx
 * Caminho: src/components/form/FormMaskInput.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { TextField } from '@mui/material';
import { Controller, Control } from 'react-hook-form';

interface FormMaskInputProps {
  name: string;
  label: string;
  control: Control<unknown>;
  error?: string;
}

export const FormMaskInput: React.FC<FormMaskInputProps> = ({ name, label, control, error }) => (
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
        inputProps={{ 'aria-label': label }}
      />
    )}
  />
); 

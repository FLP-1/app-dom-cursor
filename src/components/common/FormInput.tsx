/**
 * Arquivo: FormInput.tsx
 * Caminho: src/components/common/FormInput.tsx
 * Criado em: 2025-06-02
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

interface FormInputProps {
  name: string;
  label: string;
  // Justificativa: integração com react-hook-form, tipagem dinâmica dos campos
  control: Control<unknown>;
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({ name, label, control, type = 'text' }) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        label={label}
        type={type}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
        fullWidth
        margin="normal"
        variant="outlined"
        inputProps={{ 'aria-label': label }}
      />
    )}
  />
);

export { FormInput }; 

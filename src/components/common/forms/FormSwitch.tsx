/**
 * Arquivo: FormSwitch.tsx
 * Caminho: src/components/common/forms/FormSwitch.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { Controller } from 'react-hook-form';
import { Switch, FormControlLabel } from '@mui/material';
import { FormControl } from '@/types/forms';

interface FormSwitchProps extends FormControl {
  name: string;
  label: string;
  disabled?: boolean;
}

export function FormSwitch({ control, name, label, disabled }: FormSwitchProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Switch
              {...field}
              checked={field.value}
              disabled={disabled}
            />
          }
          label={label}
        />
      )}
    />
  );
} 

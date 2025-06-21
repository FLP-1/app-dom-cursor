/**
 * Arquivo: FormSwitch.tsx
 * Caminho: src/components/form/FormSwitch.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { FormControlLabel, Switch, FormHelperText } from '@mui/material';
import { Controller, Control } from 'react-hook-form';

// Justificativa: integração com react-hook-form, tipagem dinâmica dos campos
interface FormSwitchProps {
  name: string;
  label: string;
  control: Control<unknown>;
  error?: string;
}

export const FormSwitch: React.FC<FormSwitchProps> = ({ name, label, control, error }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <>
        <FormControlLabel
          control={<Switch {...field} checked={!!field.value} />}
          label={label}
        />
        {error && <FormHelperText error>{error}</FormHelperText>}
      </>
    )}
  />
); 

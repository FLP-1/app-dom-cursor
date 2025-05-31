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
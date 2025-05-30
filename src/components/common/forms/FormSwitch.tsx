import React from 'react';
import { Controller } from 'react-hook-form';
import { Switch, FormControlLabel } from '@mui/material';

interface FormSwitchProps {
  name: string;
  label: string;
  control: any;
  sx?: object;
}

export const FormSwitch: React.FC<FormSwitchProps> = ({ name, label, control, sx }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormControlLabel
        control={
          <Switch
            {...field}
            checked={!!field.value}
            color="primary"
            inputProps={{ 'aria-label': label }}
            sx={sx}
          />
        }
        label={label}
      />
    )}
  />
); 
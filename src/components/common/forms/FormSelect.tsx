import React from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';
import Select from '../Select';
import HelperText from '../HelperText';
import Box from '@mui/material/Box';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps<T extends FieldValues = FieldValues> {
  name: string;
  label?: string;
  options: Option[];
  control: Control<T>;
  required?: boolean;
  disabled?: boolean;
}

export const FormSelect = <T extends FieldValues = FieldValues>({
  name,
  label,
  options,
  control,
  required = false,
  disabled = false,
}: FormSelectProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? 'Campo obrigatório' : false }}
      render={({ field, fieldState }) => (
        <Box sx={{ mb: 2 }}>
          <Select
            {...field}
            label={label}
            options={options}
            id={name}
            aria-label={label}
            disabled={disabled}
          />
          {fieldState.error && (
            <HelperText error>{fieldState.error.message}</HelperText>
          )}
        </Box>
      )}
    />
  );
}; 
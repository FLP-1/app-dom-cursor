/**
 * Arquivo: FormInput.tsx
 * Caminho: src/components/common/forms/FormInput.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { TextField, TextFieldProps, Tooltip } from '@mui/material';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { masks } from '@/utils/masks';

interface FormInputProps<T extends FieldValues = FieldValues> extends Omit<TextFieldProps, 'name'> {
  name: Path<T>;
  mask?: keyof typeof masks;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: (value: unknown) => boolean | string;
  };
  control: Control<T>;
  tooltip?: string;
}

export const FormInput = <T extends FieldValues = FieldValues>({
  name,
  mask,
  validation,
  control,
  tooltip,
  ...props
}: FormInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      render={({ field, fieldState }) => {
        const input = (
          <TextField
            {...field}
            {...props}
            error={!!fieldState.error}
            helperText={fieldState.error?.message as string}
            aria-invalid={!!fieldState.error}
            aria-describedby={`${name}-error`}
            onChange={(e) => {
              const value = mask ? masks[mask](e.target.value) : e.target.value;
              field.onChange(value);
            }}
            fullWidth
          />
        );
        return tooltip ? (
          <Tooltip title={tooltip} enterTouchDelay={0} arrow>
            <span>{input}</span>
          </Tooltip>
        ) : input;
      }}
    />
  );
}; 

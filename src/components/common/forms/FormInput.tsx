import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
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
}

export const FormInput = <T extends FieldValues = FieldValues>({
  name,
  mask,
  validation,
  control,
  ...props
}: FormInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      render={({ field, fieldState }) => (
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
      )}
    />
  );
}; 
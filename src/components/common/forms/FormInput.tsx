import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { Controller, Control, FieldValues } from 'react-hook-form';
import InputMask from 'react-input-mask';

interface FormInputProps<T extends FieldValues = FieldValues> extends Omit<TextFieldProps, 'name'> {
  name: string;
  mask?: string;
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
      render={({ field, fieldState }) =>
        mask ? (
          <InputMask
            mask={mask}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            disabled={props.disabled}
          >
            {(inputProps: Record<string, unknown>) => (
              <TextField
                {...inputProps}
                {...props}
                error={!!fieldState.error}
                helperText={fieldState.error?.message as string}
                aria-invalid={!!fieldState.error}
                aria-describedby={`${name}-error`}
              />
            )}
          </InputMask>
        ) : (
          <TextField
            {...field}
            {...props}
            error={!!fieldState.error}
            helperText={fieldState.error?.message as string}
            aria-invalid={!!fieldState.error}
            aria-describedby={`${name}-error`}
          />
        )
      }
    />
  );
}; 
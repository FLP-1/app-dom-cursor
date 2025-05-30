import React, { useState } from 'react';
import { TextField, TextFieldProps, InputAdornment, IconButton } from '@mui/material';
import { Controller, Control, FieldValues } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface PasswordInputProps extends Omit<TextFieldProps, 'name'> {
  name: string;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: (value: unknown) => boolean | string;
  };
  iconSize?: number;
  control: Control<FieldValues>;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  validation,
  iconSize = 20,
  control,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...props}
          type={showPassword ? 'text' : 'password'}
          error={!!fieldState.error}
          helperText={fieldState.error?.message as string}
          aria-invalid={!!fieldState.error}
          aria-describedby={`${name}-error`}
          InputProps={{
            ...(props.InputProps || {}),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  onClick={() => setShowPassword((show) => !show)}
                  edge="end"
                  tabIndex={-1}
                >
                  {showPassword ? <VisibilityOff sx={{ fontSize: iconSize }} /> : <Visibility sx={{ fontSize: iconSize }} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}; 
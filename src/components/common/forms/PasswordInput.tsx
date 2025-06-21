/**
 * Arquivo: PasswordInput.tsx
 * Caminho: src/components/common/forms/PasswordInput.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React, { useState } from 'react';
import { TextField, TextFieldProps, InputAdornment, IconButton, Tooltip } from '@mui/material';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface PasswordInputProps<T extends FieldValues = FieldValues> extends Omit<TextFieldProps, 'name'> {
  name: Path<T>;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: (value: unknown) => boolean | string;
  };
  iconSize?: number;
  control: Control<T>;
  tooltip?: string;
}

export const PasswordInput = <T extends FieldValues = FieldValues>({
  name,
  validation,
  iconSize = 20,
  control,
  tooltip,
  ...props
}: PasswordInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

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

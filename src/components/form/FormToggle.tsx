/**
 * Arquivo: FormToggle.tsx
 * Caminho: src/components/form/FormToggle.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente de toggle integrado com react-hook-form e Material UI, com suporte a validação e acessibilidade
 */

import React from 'react';
import { FormControlLabel, Switch, SxProps, Theme } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import HelperText from '@/components/common/HelperText';

export interface FormToggleProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  helperText?: string;
  error?: boolean;
  sx?: SxProps<Theme>;
}

const FormToggle = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  error,
  sx,
}: FormToggleProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <>
          <FormControlLabel
            control={
              <Switch
                {...field}
                checked={field.value}
                sx={{
                  '& .MuiSwitch-switchBase': {
                    '&.Mui-checked': {
                      color: fieldError || error ? 'error.main' : 'primary.main',
                      '& + .MuiSwitch-track': {
                        backgroundColor: fieldError || error ? 'error.main' : 'primary.main',
                      },
                    },
                  },
                  '& .MuiSwitch-track': {
                    backgroundColor: fieldError || error ? 'error.main' : 'action.disabled',
                  },
                }}
              />
            }
            label={label}
            sx={{
              margin: 0,
              ...sx
            }}
          />
          <HelperText
            text={fieldError?.message || helperText}
            error={!!fieldError || error}
          />
        </>
      )}
    />
  );
};

export default FormToggle; 

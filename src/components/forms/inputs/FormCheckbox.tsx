/**
 * Arquivo: FormCheckbox.tsx
 * Caminho: src/components/form/FormCheckbox.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente de checkbox integrado com react-hook-form e Material UI, com suporte a validação e acessibilidade
 */

import React from 'react';
import { FormControlLabel, Checkbox, SxProps, Theme } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import HelperText from '@/components/common/HelperText';

export interface FormCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  helperText?: string;
  error?: boolean;
  sx?: SxProps<Theme>;
}

const FormCheckbox = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  error,
  sx,
}: FormCheckboxProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <>
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={field.value}
                sx={{
                  '&.Mui-checked': {
                    color: fieldError || error ? 'error.main' : 'primary.main'
                  }
                }}
              />
            }
            label={label}
            sx={{
              '& .MuiFormControlLabel-label': {
                color: fieldError || error ? 'error.main' : 'text.primary'
              },
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

export default FormCheckbox;

export { FormCheckbox }; 

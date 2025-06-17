/**
 * Arquivo: FormAutocomplete.tsx
 * Caminho: src/components/form/FormAutocomplete.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente de autocomplete integrado com react-hook-form e Material UI, com suporte a validação e acessibilidade
 */

import React from 'react';
import { Autocomplete, TextField, SxProps, Theme } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import HelperText from '@/components/common/HelperText';

export interface AutocompleteOption {
  value: string;
  label: string;
}

export interface FormAutocompleteProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  options: AutocompleteOption[];
  helperText?: string;
  error?: boolean;
  sx?: SxProps<Theme>;
}

const FormAutocomplete = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  options,
  helperText,
  error,
  sx,
}: FormAutocompleteProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <>
          <Autocomplete
            {...field}
            options={options}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                error={!!fieldError || error}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: fieldError || error ? 'error.main' : 'divider'
                    },
                    '&:hover fieldset': {
                      borderColor: fieldError || error ? 'error.main' : 'primary.main'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: fieldError || error ? 'error.main' : 'primary.main'
                    }
                  },
                  ...sx
                }}
              />
            )}
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

export default FormAutocomplete; 

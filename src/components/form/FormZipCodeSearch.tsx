/**
 * Arquivo: FormZipCodeSearch.tsx
 * Caminho: src/components/form/FormZipCodeSearch.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente de busca de CEP integrado com react-hook-form e Material UI, com suporte a validação e acessibilidade
 */

import React from 'react';
import { TextField, IconButton, Box, SxProps, Theme } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import HelperText from '@/components/common/HelperText';
import SearchIcon from '@mui/icons-material/Search';
import { mask } from '@/utils/mask';

export interface FormZipCodeSearchProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  onSearch: (zipCode: string) => void;
  sx?: SxProps<Theme>;
}

const FormZipCodeSearch = <T extends FieldValues>({
  name,
  control,
  label = 'CEP',
  placeholder = '00000-000',
  helperText,
  error,
  onSearch,
  sx,
}: FormZipCodeSearchProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'flex-start',
              ...sx
            }}
          >
            <TextField
              {...field}
              label={label}
              placeholder={placeholder}
              error={!!fieldError || error}
              fullWidth
              onChange={(e) => {
                const value = mask.cep(e.target.value);
                field.onChange(value);
              }}
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
                }
              }}
            />
            <IconButton
              onClick={() => onSearch(field.value)}
              color="primary"
              sx={{
                mt: 1,
                '&:hover': {
                  backgroundColor: 'primary.light',
                }
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
          <HelperText
            text={fieldError?.message || helperText}
            error={!!fieldError || error}
          />
        </>
      )}
    />
  );
};

export default FormZipCodeSearch; 

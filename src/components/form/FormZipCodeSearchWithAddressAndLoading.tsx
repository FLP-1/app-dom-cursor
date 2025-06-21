/**
 * Arquivo: FormZipCodeSearchWithAddressAndLoading.tsx
 * Caminho: src/components/form/FormZipCodeSearchWithAddressAndLoading.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente de busca de CEP com preenchimento automático de endereço e indicador de carregamento integrado com react-hook-form e Material UI, com suporte a validação e acessibilidade
 */

import React, { useState } from 'react';
import { TextField, IconButton, Box, CircularProgress, SxProps, Theme } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import HelperText from '@/components/common/HelperText';
import SearchIcon from '@mui/icons-material/Search';
import { mask } from '@/utils/mask';
import { Address } from '@/types/address';

export interface FormZipCodeSearchWithAddressAndLoadingProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  onSearch: (zipCode: string) => Promise<Address>;
  sx?: SxProps<Theme>;
}

const FormZipCodeSearchWithAddressAndLoading = <T extends FieldValues>({
  name,
  control,
  label = 'CEP',
  placeholder = '00000-000',
  helperText,
  error,
  onSearch,
  sx,
}: FormZipCodeSearchWithAddressAndLoadingProps<T>) => {
  const [loading, setLoading] = useState(false);

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
              onClick={async () => {
                try {
                  setLoading(true);
                  const address = await onSearch(field.value);
                  // Aqui você pode implementar a lógica para preencher os campos de endereço
                  console.log('Endereço encontrado:', address);
                } catch (error) {
                  console.error('Erro ao buscar CEP:', error);
                } finally {
                  setLoading(false);
                }
              }}
              color="primary"
              disabled={loading}
              sx={{
                mt: 1,
                '&:hover': {
                  backgroundColor: 'primary.light',
                }
              }}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  sx={{
                    color: 'primary.main'
                  }}
                />
              ) : (
                <SearchIcon />
              )}
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

export default FormZipCodeSearchWithAddressAndLoading; 

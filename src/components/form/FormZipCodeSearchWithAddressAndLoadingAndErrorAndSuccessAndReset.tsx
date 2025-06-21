/**
 * Arquivo: FormZipCodeSearchWithAddressAndLoadingAndErrorAndSuccessAndReset.tsx
 * Caminho: src/components/form/FormZipCodeSearchWithAddressAndLoadingAndErrorAndSuccessAndReset.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente de busca de CEP com preenchimento automático de endereço, indicador de carregamento, tratamento de erros, feedback de sucesso e botão de reset integrado com react-hook-form e Material UI, com suporte a validação e acessibilidade
 */

import React, { useState } from 'react';
import { TextField, IconButton, Box, CircularProgress, SxProps, Theme } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import HelperText from '@/components/common/HelperText';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ClearIcon from '@mui/icons-material/Clear';
import { mask } from '@/utils/mask';
import { Address } from '@/types/address';

export interface FormZipCodeSearchWithAddressAndLoadingAndErrorAndSuccessAndResetProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  onSearch: (zipCode: string) => Promise<Address>;
  onError?: (error: Error) => void;
  onSuccess?: (address: Address) => void;
  onReset?: () => void;
  sx?: SxProps<Theme>;
}

const FormZipCodeSearchWithAddressAndLoadingAndErrorAndSuccessAndReset = <T extends FieldValues>({
  name,
  control,
  label = 'CEP',
  placeholder = '00000-000',
  helperText,
  error,
  onSearch,
  onError,
  onSuccess,
  onReset,
  sx,
}: FormZipCodeSearchWithAddressAndLoadingAndErrorAndSuccessAndResetProps<T>) => {
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleReset = () => {
    setSearchError(null);
    setSuccess(false);
    onReset?.();
  };

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
              error={!!fieldError || error || !!searchError}
              fullWidth
              onChange={(e) => {
                const value = mask.cep(e.target.value);
                field.onChange(value);
                setSearchError(null);
                setSuccess(false);
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: fieldError || error || searchError ? 'error.main' : success ? 'success.main' : 'divider'
                  },
                  '&:hover fieldset': {
                    borderColor: fieldError || error || searchError ? 'error.main' : success ? 'success.main' : 'primary.main'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: fieldError || error || searchError ? 'error.main' : success ? 'success.main' : 'primary.main'
                  }
                }
              }}
            />
            <Box
              sx={{
                display: 'flex',
                gap: 0.5,
                mt: 1
              }}
            >
              <IconButton
                onClick={async () => {
                  try {
                    setLoading(true);
                    setSearchError(null);
                    setSuccess(false);
                    const address = await onSearch(field.value);
                    setSuccess(true);
                    onSuccess?.(address);
                    // Aqui você pode implementar a lógica para preencher os campos de endereço
                    console.log('Endereço encontrado:', address);
                  } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar CEP';
                    setSearchError(errorMessage);
                    onError?.(error instanceof Error ? error : new Error(errorMessage));
                  } finally {
                    setLoading(false);
                  }
                }}
                color={success ? 'success' : 'primary'}
                disabled={loading}
                sx={{
                  '&:hover': {
                    backgroundColor: success ? 'success.light' : 'primary.light',
                  }
                }}
              >
                {loading ? (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: success ? 'success.main' : 'primary.main'
                    }}
                  />
                ) : success ? (
                  <CheckCircleIcon />
                ) : (
                  <SearchIcon />
                )}
              </IconButton>
              {(success || searchError) && (
                <IconButton
                  onClick={handleReset}
                  color="error"
                  sx={{
                    '&:hover': {
                      backgroundColor: 'error.light',
                    }
                  }}
                >
                  <ClearIcon />
                </IconButton>
              )}
            </Box>
          </Box>
          <HelperText
            text={fieldError?.message || searchError || helperText}
            error={!!fieldError || error || !!searchError}
          />
        </>
      )}
    />
  );
};

export default FormZipCodeSearchWithAddressAndLoadingAndErrorAndSuccessAndReset; 

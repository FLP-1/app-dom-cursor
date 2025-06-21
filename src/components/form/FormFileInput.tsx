/**
 * Arquivo: FormFileInput.tsx
 * Caminho: src/components/form/FormFileInput.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente de input de arquivo integrado com react-hook-form e Material UI, com suporte a validação e acessibilidade
 */

import React from 'react';
import { Button, Box, Typography, SxProps, Theme } from '@mui/material';
import { Upload as UploadIcon } from '@mui/icons-material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import HelperText from '@/components/common/HelperText';

export interface FormFileInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  accept?: string;
  multiple?: boolean;
  helperText?: string;
  error?: boolean;
  sx?: SxProps<Theme>;
}

const FormFileInput = <T extends FieldValues>({
  name,
  control,
  label = 'Selecionar arquivo',
  accept,
  multiple = false,
  helperText,
  error,
  sx,
}: FormFileInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...field }, fieldState: { error: fieldError } }) => (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              ...sx
            }}
          >
            <input
              {...field}
              type="file"
              accept={accept}
              multiple={multiple}
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  onChange(multiple ? Array.from(files) : files[0]);
                }
              }}
              hidden
              id={`${name}-input`}
            />
            <label htmlFor={`${name}-input`}>
              <Button
                component="span"
                variant="outlined"
                startIcon={<UploadIcon />}
                sx={{
                  borderColor: fieldError || error ? 'error.main' : 'primary.main',
                  color: fieldError || error ? 'error.main' : 'primary.main',
                  '&:hover': {
                    borderColor: fieldError || error ? 'error.dark' : 'primary.dark',
                    bgcolor: fieldError || error ? 'error.light' : 'primary.light'
                  }
                }}
              >
                {label}
              </Button>
            </label>
            {value && (
              <Typography variant="body2" color="text.secondary">
                {multiple
                  ? `${(value as File[]).length} arquivo(s) selecionado(s)`
                  : (value as File).name}
              </Typography>
            )}
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

export default FormFileInput; 

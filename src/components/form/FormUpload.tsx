/**
 * Arquivo: FormUpload.tsx
 * Caminho: src/components/form/FormUpload.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente de upload de arquivos integrado com react-hook-form e Material UI, com suporte a validação e acessibilidade
 */

import React from 'react';
import { Box, Button, Typography, SxProps, Theme } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import HelperText from '@/components/common/HelperText';
import UploadIcon from '@mui/icons-material/Upload';

export interface FormUploadProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  accept?: string;
  multiple?: boolean;
  helperText?: string;
  error?: boolean;
  sx?: SxProps<Theme>;
}

const FormUpload = <T extends FieldValues>({
  name,
  control,
  label = 'Upload',
  accept,
  multiple = false,
  helperText,
  error,
  sx,
}: FormUploadProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field }, fieldState: { error: fieldError } }) => (
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
                variant="outlined"
                component="span"
                startIcon={<UploadIcon />}
                sx={{
                  borderColor: fieldError || error ? 'error.main' : 'primary.main',
                  color: fieldError || error ? 'error.main' : 'primary.main',
                  '&:hover': {
                    borderColor: fieldError || error ? 'error.dark' : 'primary.dark',
                    backgroundColor: fieldError || error ? 'error.light' : 'primary.light',
                  },
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

export default FormUpload; 

/**
 * Arquivo: FormImageUpload.tsx
 * Caminho: src/components/form/FormImageUpload.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente de upload de imagem integrado com react-hook-form e Material UI, com suporte a preview e acessibilidade
 */

import React, { useState } from 'react';
import { Box, Button, Typography, SxProps, Theme } from '@mui/material';
import { Upload as UploadIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import HelperText from '@/components/common/HelperText';

export interface FormImageUploadProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  accept?: string;
  maxSize?: number; // em bytes
  helperText?: string;
  error?: boolean;
  sx?: SxProps<Theme>;
}

const FormImageUpload = <T extends FieldValues>({
  name,
  control,
  label = 'Selecionar imagem',
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB
  helperText,
  error,
  sx,
}: FormImageUploadProps<T>) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (file: File | null, onChange: (value: File | null) => void) => {
    if (file) {
      if (file.size > maxSize) {
        onChange(null);
        setPreview(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(file);
    } else {
      setPreview(null);
      onChange(null);
    }
  };

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
              gap: 2,
              ...sx
            }}
          >
            <input
              {...field}
              type="file"
              accept={accept}
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                handleFileChange(file, onChange);
              }}
              hidden
              id={`${name}-input`}
            />
            {preview ? (
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 300,
                  height: 200,
                  borderRadius: 1,
                  overflow: 'hidden'
                }}
              >
                <Box
                  component="img"
                  src={preview}
                  alt="Preview"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleFileChange(null, onChange)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8
                  }}
                >
                  Remover
                </Button>
              </Box>
            ) : (
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
            )}
            {value && (
              <Typography variant="body2" color="text.secondary">
                {(value as File).name}
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

export default FormImageUpload; 

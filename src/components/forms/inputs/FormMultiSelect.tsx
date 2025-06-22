/**
 * Arquivo: FormMultiSelect.tsx
 * Caminho: src/components/form/FormMultiSelect.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-01-27
 * Descrição: Componente de seleção múltipla integrado com react-hook-form e Material UI, com suporte a validação e acessibilidade
 */

import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, Chip, SxProps, Theme, Box } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import HelperText from '@/components/common/HelperText';
import { authMessages } from '@/i18n/messages/auth.messages';

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface FormMultiSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  options: MultiSelectOption[];
  helperText?: string;
  error?: boolean;
  sx?: SxProps<Theme>;
}

const FormMultiSelect = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  options,
  helperText,
  error,
  sx,
}: FormMultiSelectProps<T>) => {
  // Usar mensagens em português por padrão
  const messages = authMessages.pt;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <>
          <FormControl fullWidth error={!!fieldError || error}>
            {label && <InputLabel id={`${name}-label`}>{label}</InputLabel>}
            <Select
              {...field}
              multiple
              labelId={`${name}-label`}
              label={label}
              placeholder={placeholder || messages.placeholders.selecionarMultiplo}
              aria-label={messages.tooltips.selecaoMultipla}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as string[]).map((value) => {
                    const option = options.find((opt) => opt.value === value);
                    return (
                      <Chip
                        key={value}
                        label={option?.label}
                        sx={{
                          bgcolor: fieldError || error ? 'error.light' : 'primary.light',
                          color: fieldError || error ? 'error.contrastText' : 'primary.contrastText'
                        }}
                      />
                    );
                  })}
                </Box>
              )}
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
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <HelperText
            text={fieldError?.message || helperText}
            error={!!fieldError || error}
          />
        </>
      )}
    />
  );
};

export default FormMultiSelect; 

/**
 * Arquivo: Select.tsx
 * Caminho: src/components/common/Select.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente de seleção baseado no TextField do Material UI com suporte a opções customizadas, estados de erro e acessibilidade
 */

import React from 'react';
import { TextField, MenuItem, SxProps, Theme } from '@mui/material';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  sx?: SxProps<Theme>;
  'aria-label'?: string;
  'aria-required'?: boolean;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  name,
  id,
  required = false,
  disabled = false,
  error = false,
  helperText,
  placeholder,
  sx,
  'aria-label': ariaLabel,
  'aria-required': ariaRequired,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedby,
}) => {
  return (
    <TextField
      select
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      required={required}
      disabled={disabled}
      error={error}
      helperText={helperText}
      placeholder={placeholder}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: error ? 'error.main' : 'divider'
          },
          '&:hover fieldset': {
            borderColor: error ? 'error.main' : 'primary.main'
          },
          '&.Mui-focused fieldset': {
            borderColor: error ? 'error.main' : 'primary.main'
          }
        },
        '& .MuiSelect-select': {
          py: 1.5
        },
        ...sx
      }}
      inputProps={{
        'aria-label': ariaLabel,
        'aria-required': ariaRequired,
        'aria-invalid': ariaInvalid,
        'aria-describedby': ariaDescribedby
      }}
    >
      {options.map((opt) => (
        <MenuItem 
          key={opt.value} 
          value={opt.value}
          sx={{
            py: 1,
            '&:hover': {
              bgcolor: 'action.hover'
            },
            '&.Mui-selected': {
              bgcolor: 'action.selected',
              '&:hover': {
                bgcolor: 'action.selected'
              }
            }
          }}
        >
          {opt.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Select; 

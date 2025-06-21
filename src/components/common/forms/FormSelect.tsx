/**
 * Arquivo: FormSelect.tsx
 * Caminho: src/components/common/forms/FormSelect.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente de formulário para campos de seleção (select) com integração ao React Hook Form.
 * Suporta tooltips, validação e estados de erro.
 */

import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import Select from '../Select';
import HelperText from '../HelperText';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label?: string;
  options: Option[];
  control: Control<T>;
  required?: boolean;
  disabled?: boolean;
  tooltip?: string;
  placeholder?: string;
  error?: string;
}

export const FormSelect = <T extends FieldValues = FieldValues>({
  name,
  label,
  options,
  control,
  required = false,
  disabled = false,
  tooltip,
  placeholder,
  error,
}: FormSelectProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? 'Campo obrigatório' : false }}
      render={({ field, fieldState }) => (
        <Box 
          sx={{ 
            mb: 2,
            width: '100%'
          }}
        >
          {tooltip ? (
            <Tooltip 
              title={tooltip} 
              enterTouchDelay={0} 
              arrow
              placement="top"
            >
              <span>
                <Select
                  {...field}
                  value={field.value ?? ''}
                  label={label}
                  options={options}
                  id={name}
                  aria-label={label}
                  aria-required={required}
                  aria-invalid={!!fieldState.error}
                  aria-describedby={`${name}-error`}
                  disabled={disabled}
                  placeholder={placeholder}
                  error={!!fieldState.error || !!error}
                />
              </span>
            </Tooltip>
          ) : (
            <Select
              {...field}
              value={field.value ?? ''}
              label={label}
              options={options}
              id={name}
              aria-label={label}
              aria-required={required}
              aria-invalid={!!fieldState.error}
              aria-describedby={`${name}-error`}
              disabled={disabled}
              placeholder={placeholder}
              error={!!fieldState.error || !!error}
            />
          )}
          {(fieldState.error || error) && (
            <HelperText 
              error 
              id={`${name}-error`}
            >
              {fieldState.error?.message || error}
            </HelperText>
          )}
        </Box>
      )}
    />
  );
}; 

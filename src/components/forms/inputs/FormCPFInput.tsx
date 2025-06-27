/**
 * Arquivo: FormCPFInput.tsx
 * Caminho: src/components/forms/inputs/FormCPFInput.tsx
 * Criado em: 2025-06-25
 * Última atualização: 2025-01-27
 * Descrição: Campo de CPF reutilizável com máscara, validação de dígito verificador e integração com React Hook Form.
 */

import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { Person } from '@mui/icons-material';
import CPFMask from './CPFMask';

export interface FormCPFInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

function unmaskCPF(cpf: string) {
  return cpf.replace(/\D/g, '');
}

function validateCPF(cpf: string) {
  cpf = unmaskCPF(cpf);
  if (cpf.length !== 11 || /^([0-9])\1+$/.test(cpf)) return false;
  let sum = 0, rest;
  for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
  rest = (sum * 10) % 11;
  if ((rest === 10) || (rest === 11)) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
  rest = (sum * 10) % 11;
  if ((rest === 10) || (rest === 11)) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}

export function FormCPFInput<T extends FieldValues>({ 
  name, 
  control, 
  label = 'CPF', 
  required, 
  disabled,
  error,
  helperText
}: FormCPFInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? 'CPF é obrigatório' : false,
        validate: (value) => validateCPF(value) || 'CPF inválido'
      }}
      render={({ field, fieldState }) => (
        <TextField
          fullWidth
          label={label}
          variant="outlined"
          margin="normal"
          disabled={disabled}
          error={error || !!fieldState.error}
          helperText={helperText || fieldState.error?.message || ''}
          InputProps={{
            inputComponent: CPFMask as any,
            startAdornment: (
              <InputAdornment position="start">
                <Person color="primary" />
              </InputAdornment>
            ),
            sx: { borderRadius: 2 }
          }}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
            value: field.value || '',
            onAccept: (value: string) => field.onChange(value),
            onBlur: field.onBlur
          }}
        />
      )}
    />
  );
}

export default FormCPFInput; 
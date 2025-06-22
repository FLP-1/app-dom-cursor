/**
 * Arquivo: FormMoneyInput.tsx
 * Caminho: src/components/form/FormMoneyInput.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Componente de input de valor monetário
 */

import React from 'react';
import { TextField } from '@mui/material';
import { Controller, Control } from 'react-hook-form';
import { authMessages } from '@/i18n/messages/auth.messages';

interface FormMoneyInputProps {
  name: string;
  label: string;
  control: Control<unknown>;
  error?: string;
}

export const FormMoneyInput: React.FC<FormMoneyInputProps> = ({ name, label, control, error }) => {
  // Usar mensagens em português por padrão
  const messages = authMessages.pt;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          error={!!error}
          helperText={error}
          fullWidth
          placeholder={messages.placeholders.valor}
          inputProps={{ 
            inputMode: 'decimal', 
            pattern: '[0-9,.]*', 
            'aria-label': messages.tooltips.campoValor 
          }}
        />
      )}
    />
  );
}; 

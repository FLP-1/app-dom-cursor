/**
 * Arquivo: FormSwitch.tsx
 * Caminho: src/components/form/FormSwitch.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Componente de switch integrado com react-hook-form
 */

import React from 'react';
import { FormControlLabel, Switch, FormHelperText } from '@mui/material';
import { Controller, Control } from 'react-hook-form';
import { authMessages } from '@/i18n/messages/auth.messages';

// Justificativa: integração com react-hook-form, tipagem dinâmica dos campos
interface FormSwitchProps {
  name: string;
  label: string;
  control: Control<unknown>;
  error?: string;
}

export const FormSwitch: React.FC<FormSwitchProps> = ({ name, label, control, error }) => {
  // Usar mensagens em português por padrão
  const messages = authMessages.pt;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <FormControlLabel
            control={
              <Switch 
                {...field} 
                checked={!!field.value} 
                aria-label={messages.tooltips.alternarOpcao}
              />
            }
            label={label}
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
        </>
      )}
    />
  );
}; 

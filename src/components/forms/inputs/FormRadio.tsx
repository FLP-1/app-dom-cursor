/**
 * Arquivo: FormRadio.tsx
 * Caminho: src/components/form/FormRadio.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-01-27
 * Descrição: Componente de radio button integrado com react-hook-form e Material UI, com suporte a validação e acessibilidade
 */

import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, SxProps, Theme } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import HelperText from '@/components/common/HelperText';
import { authMessages } from '@/i18n/messages/auth.messages';

export interface RadioOption {
  value: string;
  label: string;
}

export interface FormRadioProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: RadioOption[];
  helperText?: string;
  error?: boolean;
  sx?: SxProps<Theme>;
}

const FormRadio = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  helperText,
  error,
  sx,
}: FormRadioProps<T>) => {
  // Usar mensagens em português por padrão
  const messages = authMessages.pt;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <FormControl
          component="fieldset"
          error={!!fieldError || error}
          sx={{
            width: '100%',
            '& .MuiFormLabel-root': {
              color: fieldError || error ? 'error.main' : 'text.primary'
            },
            ...sx
          }}
        >
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup
            {...field}
            row
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={
                  <Radio
                    aria-label={messages.tooltips.selecionarOpcao}
                    sx={{
                      '&.Mui-checked': {
                        color: fieldError || error ? 'error.main' : 'primary.main'
                      }
                    }}
                  />
                }
                label={option.label}
              />
            ))}
          </RadioGroup>
          <HelperText
            text={fieldError?.message || helperText}
            error={!!fieldError || error}
          />
        </FormControl>
      )}
    />
  );
};

export default FormRadio; 

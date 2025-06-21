/**
 * Arquivo: FormMaskedInput.tsx
 * Caminho: src/components/form/FormMaskedInput.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente de input com máscara integrado com react-hook-form e Material UI, com suporte a validação e acessibilidade
 */

import React from 'react';
import { TextField, SxProps, Theme } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import HelperText from '@/components/common/HelperText';

interface MaskedInputProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask: string;
}

const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ onChange, name, mask, ...props }, ref) => {
    return (
      <IMaskInput
        {...props}
        mask={mask}
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: string) => onChange({ target: { name, value } })}
        overwrite
      />
    );
  }
);

MaskedInput.displayName = 'MaskedInput';

export interface FormMaskedInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  mask: string;
  helperText?: string;
  error?: boolean;
  sx?: SxProps<Theme>;
}

const FormMaskedInput = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  mask,
  helperText,
  error,
  sx,
}: FormMaskedInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <>
          <TextField
            {...field}
            label={label}
            placeholder={placeholder}
            error={!!fieldError || error}
            fullWidth
            InputProps={{
              inputComponent: MaskedInput as any,
              inputProps: {
                mask,
              },
            }}
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
          />
          <HelperText
            text={fieldError?.message || helperText}
            error={!!fieldError || error}
          />
        </>
      )}
    />
  );
};

export default FormMaskedInput; 

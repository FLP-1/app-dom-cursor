/**
 * Arquivo: FormImageUpload.tsx
 * Caminho: src/components/forms/inputs/FormImageUpload.tsx
 * Criado em: 2024-06-07
 * Última atualização: 2024-06-07
 * Descrição: Componente de upload de imagens com Material UI.
 */

import { Button, TextField, TextFieldProps } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { ChangeEvent } from 'react';

interface FormImageUploadProps<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  accept?: string;
  multiple?: boolean;
}

export function FormImageUpload<T extends FieldValues>({
  name,
  control,
  label,
  accept = 'image/*',
  multiple,
  ...props
}: FormImageUploadProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          {...props}
          type="file"
          label={label}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files) {
              onChange(multiple ? files : files[0]);
            }
          }}
          error={!!error}
          helperText={error?.message}
          inputProps={{
            accept,
            multiple,
          }}
        />
      )}
    />
  );
} 

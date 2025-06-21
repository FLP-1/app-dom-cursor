/**
 * Arquivo: FormInput.tsx
 * Caminho: src/components/forms/inputs/FormInput.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente reutilizável de input para formulários, com suporte a validação, tooltips e acessibilidade.
 */

import { TextField, TextFieldProps } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Tooltip } from '@mui/material';

interface FormInputProps<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
  tooltip?: string;
}

export function FormInput<T extends FieldValues>({
  name,
  control,
  tooltip,
  ...props
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Tooltip title={tooltip || ''} arrow>
          <span>
            <TextField
              {...field}
              {...props}
              error={!!error}
              helperText={error?.message}
              fullWidth
              variant="outlined"
              size="small"
            />
          </span>
        </Tooltip>
      )}
    />
  );
} 

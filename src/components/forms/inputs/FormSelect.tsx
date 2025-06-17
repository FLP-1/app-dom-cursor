/**
 * Arquivo: FormSelect.tsx
 * Caminho: src/components/form/FormSelect.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-14
 * Descrição: Componente de select reutilizável integrado com react-hook-form e Material UI
 */

import { TextFieldProps, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface FormSelectProps<T extends FieldValues> extends Omit<TextFieldProps, 'name' | 'select'> {
  name: Path<T>;
  control: Control<T>;
  options: Array<{
    value: string | number;
    label: string;
  }>;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export const FormSelect = <T extends FieldValues>({ 
  name, 
  control, 
  options,
  label,
  placeholder = 'Selecione...',
  required,
  ...props 
}: FormSelectProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl 
          fullWidth 
          error={!!error}
          required={required}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'primary.main'
              }
            }
          }}
        >
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            {...field}
            labelId={`${name}-label`}
            id={`${name}-select`}
            label={label}
            aria-labelledby={`${name}-label`}
            aria-describedby={error ? `${name}-error` : undefined}
            value={field.value ?? ''}
            inputProps={{
              ...(props.inputProps || {}),
              'aria-label': label,
              id: `${name}-select`
            }}
            sx={{
              '& .MuiSelect-select': {
                py: 1.5
              }
            }}
          >
            {!options.some(option => option.value === '') && (
              <MenuItem value="" disabled>
                {placeholder}
              </MenuItem>
            )}
            {options.map((option) => (
              <MenuItem 
                key={option.value} 
                value={option.value}
                sx={{
                  py: 1
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && (
            <FormHelperText id={`${name}-error`}>
              {error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}; 

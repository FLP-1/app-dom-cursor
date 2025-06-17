/**
 * Arquivo: FormTimePicker.tsx
 * Caminho: src/components/forms/inputs/FormTimePicker.tsx
 * Criado em: 2024-06-07
 * Última atualização: 2024-06-07
 * Descrição: Componente de seleção de horário com Material UI.
 */

import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface FormTimePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
}

export function FormTimePicker<T extends FieldValues>({
  name,
  control,
  label,
}: FormTimePickerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TimePicker
          label={label}
          value={value}
          onChange={onChange}
          slotProps={{
            textField: {
              error: !!error,
              helperText: error?.message,
            },
          }}
        />
      )}
    />
  );
} 

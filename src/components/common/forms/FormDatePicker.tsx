import React from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBR from 'date-fns/locale/pt-BR';

interface FormDatePickerProps {
  name: string;
  label: string;
  control: Control<FieldValues>;
  required?: boolean;
  disabled?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const FormDatePicker: React.FC<FormDatePickerProps> = ({
  name,
  label,
  control,
  required = false,
  disabled = false,
  inputProps,
}) => {
  const theme = useTheme();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <DatePicker
            value={field.value || null}
            onChange={field.onChange}
            disabled={disabled}
            slotProps={{
              textField: {
                ...field,
                label,
                required,
                error: !!fieldState.error,
                helperText: fieldState.error?.message,
                fullWidth: true,
                inputProps: {
                  ...inputProps,
                  'aria-label': label,
                  style: { ...inputProps?.style, background: theme.palette.background.paper },
                },
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}; 
import { Control } from 'react-hook-form';
import { Box, Typography, TextField } from '@mui/material';
import { IMaskInput } from 'react-imask';
import { forwardRef } from 'react';

interface FormPhoneInputProps {
  name: string;
  label: string;
  control: Control;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  error?: string;
  placeholder?: string;
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const PhoneMask = forwardRef<HTMLElement, CustomProps>(
  function PhoneMask(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(00) 00000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

export function FormPhoneInput({
  name,
  label,
  control,
  value,
  onChange,
  disabled = false,
  required = false,
  helperText,
  error,
  placeholder,
}: FormPhoneInputProps) {
  return (
    <Box>
      <Typography
        component="label"
        htmlFor={name}
        variant="body2"
        color="textPrimary"
        sx={{ mb: 1, display: 'block' }}
      >
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </Typography>

      <TextField
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        error={!!error}
        fullWidth
        InputProps={{
          inputComponent: PhoneMask as any,
        }}
        inputProps={{
          'aria-label': label,
        }}
      />

      {helperText && !error && (
        <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
          {helperText}
        </Typography>
      )}

      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
          {error}
        </Typography>
      )}
    </Box>
  );
} 
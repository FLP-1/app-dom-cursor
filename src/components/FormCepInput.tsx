import { Control } from 'react-hook-form';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import { IMaskInput } from 'react-imask';
import { forwardRef } from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';
import { useNotification } from '@/hooks/useNotification';

interface FormCepInputProps {
  name: string;
  label: string;
  control: Control;
  value: string;
  onChange: (value: string) => void;
  onSearch?: (cep: string) => Promise<void>;
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

const CepMask = forwardRef<HTMLElement, CustomProps>(
  function CepMask(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="00000-000"
        definitions={{
          '#': /[1-9]/,
        }}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

export function FormCepInput({
  name,
  label,
  control,
  value,
  onChange,
  onSearch,
  disabled = false,
  required = false,
  helperText,
  error,
  placeholder,
}: FormCepInputProps) {
  const { t } = useTranslation();
  const { showNotification } = useNotification();

  const handleSearch = async () => {
    if (!onSearch) return;

    try {
      await onSearch(value);
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      showNotification({
        type: 'error',
        message: t('cepInput.errors.searchError')
      });
    }
  };

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

      <Box sx={{ display: 'flex', gap: 1 }}>
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
            inputComponent: CepMask as any,
            endAdornment: onSearch && (
              <IconButton
                onClick={handleSearch}
                disabled={disabled || !value || value.length < 8}
                edge="end"
                aria-label={t('cepInput.searchButton')}
              >
                <SearchIcon />
              </IconButton>
            ),
          }}
          inputProps={{
            'aria-label': label,
          }}
        />
      </Box>

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
/**
 * Arquivo: S5013Form.tsx
 * Caminho: src/components/forms/esocial/S5013Form.tsx
 * Criado em: 2025-06-05
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { Box, Button, TextField, Tooltip, Typography, Alert } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useS5013Form } from '@/hooks/esocial/useS5013Form';
import { forms } from '@/i18n/forms';
import { tooltips } from '@/i18n/tooltips';

export function S5013Form() {
  const { control, handleSubmit, onSubmit, success, error, formState } = useS5013Form();

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
      <Typography variant="h6" mb={2}>{forms.S5013.title}</Typography>

      <Controller
        name="campoExemplo"
        control={control}
        render={({ field, fieldState }) => (
          <Tooltip title={tooltips.s5013_campoExemplo?.pt || ''} arrow>
            <TextField
              {...field}
              label={forms.S5013.fields.campoExemplo}
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              inputProps={{ 'aria-label': forms.S5013.fields.campoExemplo, 'data-testid': 'campoExemplo' }}
            />
          </Tooltip>
        )}
      />

      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={formState.isSubmitting}
        data-testid="submit-btn"
      >
        {forms.S5013.submit}
      </Button>
    </Box>
  );
} 

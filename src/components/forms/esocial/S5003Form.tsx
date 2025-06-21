/**
 * Arquivo: S5003Form.tsx
 * Caminho: src/components/forms/esocial/S5003Form.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Formulário do evento S-5003 do eSocial, com campos validados e integração ao hook customizado.
 */

import { Box, Button, Grid, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useS5003Form } from '@/hooks/esocial/useS5003Form';
import { useTranslation } from 'react-i18next';

interface S5003FormProps {
  initialData?: Partial<Parameters<typeof useS5003Form>[0]>;
}

export const S5003Form = ({ initialData }: S5003FormProps) => {
  const { t } = useTranslation();
  const { methods, onSubmit } = useS5003Form(initialData);
  const { control, formState: { errors, isSubmitting } } = methods;

  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 2 }}>
      <Grid container spacing={2} columns={12}>
        <Grid gridColumn={{ xs: 'span 12' }}>
          <Controller
            name="campoExemplo"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('forms.s5003.campoExemplo.label')}
                placeholder={t('forms.s5003.campoExemplo.placeholder')}
                error={!!errors.campoExemplo}
                helperText={errors.campoExemplo ? t(errors.campoExemplo.message as string) : ''}
                fullWidth
                required
                inputProps={{ 'aria-label': t('forms.s5003.campoExemplo.label') }}
              />
            )}
          />
        </Grid>
        <Grid gridColumn={{ xs: 'span 12' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            fullWidth
            aria-label={t('forms.actions.submit')}
          >
            {t('forms.actions.submit')}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}; 

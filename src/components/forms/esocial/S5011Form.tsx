/**
 * Arquivo: S5011Form.tsx
 * Caminho: src/components/forms/esocial/S5011Form.tsx
 * Criado em: 2025-06-05
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { Box, Button, Grid, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useS5011Form } from '@/hooks/esocial/useS5011Form';
import { useTranslation } from 'react-i18next';

interface S5011FormProps {
  initialData?: Partial<Parameters<typeof useS5011Form>[0]>;
}

export const S5011Form = ({ initialData }: S5011FormProps) => {
  const { t } = useTranslation();
  const { methods, onSubmit } = useS5011Form(initialData);
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
                label={t('forms.s5011.campoExemplo.label')}
                placeholder={t('forms.s5011.campoExemplo.placeholder')}
                error={!!errors.campoExemplo}
                helperText={errors.campoExemplo ? t(errors.campoExemplo.message as string) : ''}
                fullWidth
                required
                inputProps={{ 'aria-label': t('forms.s5011.campoExemplo.label') }}
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

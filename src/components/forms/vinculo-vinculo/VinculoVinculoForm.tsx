/**
 * Arquivo: VinculoVinculoForm.tsx
 * Caminho: src/components/forms/vinculo-vinculo/VinculoVinculoForm.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Componente principal do formulário de vínculo vínculo.
 */

import { Box, Button, Card, CardContent, CardHeader, Divider, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { VinculoVinculoFormProps } from './VinculoVinculoFormTypes';
import { VinculoVinculoFormFields } from './VinculoVinculoFormFields';
import { useVinculoVinculoForm } from './useVinculoVinculoForm';

export function VinculoVinculoForm(props: VinculoVinculoFormProps) {
  const { t } = useTranslation();
  const { form, apiError, isSubmitting, handleSubmit, handleCancel } = useVinculoVinculoForm(props);

  return (
    <Card>
      <CardHeader
        title={t('vinculo.vinculo.title')}
        subheader={t('vinculo.vinculo.subtitle')}
      />
      <Divider />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <VinculoVinculoFormFields
            control={form.control}
            errors={form.formState.errors}
          />

          {apiError && (
            <Box sx={{ mt: 2, color: 'error.main' }}>
              {apiError}
            </Box>
          )}

          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {t('common.actions.save')}
            </Button>
            <Button
              variant="outlined"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              {t('common.actions.cancel')}
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
} 

/**
 * Arquivo: VinculoUsuarioForm.tsx
 * Caminho: src/components/forms/vinculo-usuario/VinculoUsuarioForm.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Componente principal do formulário de vínculo usuário.
 */

import { Box, Button, Card, CardContent, CardHeader, Divider, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { VinculoUsuarioFormProps } from './VinculoUsuarioFormTypes';
import { VinculoUsuarioFormFields } from './VinculoUsuarioFormFields';
import { useVinculoUsuarioForm } from './useVinculoUsuarioForm';

export function VinculoUsuarioForm(props: VinculoUsuarioFormProps) {
  const { t } = useTranslation();
  const { form, apiError, isSubmitting, handleSubmit, handleCancel } = useVinculoUsuarioForm(props);

  return (
    <Card>
      <CardHeader
        title={t('vinculo.usuario.title')}
        subheader={t('vinculo.usuario.subtitle')}
      />
      <Divider />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <VinculoUsuarioFormFields
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

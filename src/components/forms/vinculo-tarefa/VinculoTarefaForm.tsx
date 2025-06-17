/**
 * Arquivo: VinculoTarefaForm.tsx
 * Caminho: src/components/forms/vinculo-tarefa/VinculoTarefaForm.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Componente principal do formulário de vínculo tarefa.
 */

import { Box, Button, Card, CardContent, CardHeader, Divider, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { VinculoTarefaFormProps } from './VinculoTarefaFormTypes';
import { VinculoTarefaFormFields } from './VinculoTarefaFormFields';
import { useVinculoTarefaForm } from './useVinculoTarefaForm';

export function VinculoTarefaForm(props: VinculoTarefaFormProps) {
  const { t } = useTranslation();
  const { form, apiError, isSubmitting, handleSubmit, handleCancel } = useVinculoTarefaForm(props);

  return (
    <Card>
      <CardHeader
        title={t('vinculo.tarefa.title')}
        subheader={t('vinculo.tarefa.subtitle')}
      />
      <Divider />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <VinculoTarefaFormFields
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

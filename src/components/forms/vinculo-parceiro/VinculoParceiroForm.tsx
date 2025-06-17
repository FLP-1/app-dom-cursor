/**
 * Arquivo: VinculoParceiroForm.tsx
 * Caminho: src/components/forms/vinculo-parceiro/VinculoParceiroForm.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Componente principal do formulário de vínculo parceiro.
 */

import { Stack, Button, Alert } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { LoadingButton } from '@mui/lab';
import { VinculoParceiroFormProps } from './VinculoParceiroFormTypes';
import { useVinculoParceiroForm } from './useVinculoParceiroForm';
import { VinculoParceiroFormFields } from './VinculoParceiroFormFields';

export function VinculoParceiroForm({
  initialValues,
  onSubmit,
  onCancel,
  loading: externalLoading
}: VinculoParceiroFormProps) {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    apiError,
    successMessage,
    isLoading: internalLoading,
    onSubmit: handleFormSubmit
  } = useVinculoParceiroForm({ initialValues });

  const isLoading = externalLoading || internalLoading;

  return (
    <form onSubmit={handleSubmit(onSubmit || handleFormSubmit)}>
      <Stack spacing={3}>
        {apiError && (
          <Alert severity="error" onClose={() => setApiError(null)}>
            {apiError}
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" onClose={() => setSuccessMessage(null)}>
            {successMessage}
          </Alert>
        )}

        <VinculoParceiroFormFields control={control} errors={errors} />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {onCancel && (
            <Button
              variant="outlined"
              onClick={onCancel}
              disabled={isLoading}
            >
              {t('common.actions.cancel')}
            </Button>
          )}

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isLoading}
            disabled={isLoading}
          >
            {t('common.actions.save')}
          </LoadingButton>
        </Stack>
      </Stack>
    </form>
  );
} 

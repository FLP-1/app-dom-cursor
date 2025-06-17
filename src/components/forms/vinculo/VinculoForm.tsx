/**
 * Arquivo: VinculoForm.tsx
 * Caminho: src/components/forms/vinculo/VinculoForm.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Componente principal do formulário de vínculo.
 */

import { Stack, Button, Alert } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { LoadingButton } from '@mui/lab';
import { VinculoFormProps } from './VinculoFormTypes';
import { useVinculoForm } from './useVinculoForm';
import { VinculoFormFields } from './VinculoFormFields';

export function VinculoForm({
  initialValues,
  onSubmit,
  onCancel,
  loading: externalLoading
}: VinculoFormProps) {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    apiError,
    successMessage,
    isLoading: internalLoading,
    onSubmit: handleFormSubmit
  } = useVinculoForm({ initialValues });

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

        <VinculoFormFields control={control} errors={errors} />

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

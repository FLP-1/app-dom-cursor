/**
 * Arquivo: VinculoEmpregadorForm.tsx
 * Caminho: src/components/forms/vinculo-empregador/VinculoEmpregadorForm.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Componente principal do formulário de vínculo empregador.
 */

import { Stack, Button, Alert } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { LoadingButton } from '@mui/lab';
import { VinculoEmpregadorFormProps } from './VinculoEmpregadorFormTypes';
import { useVinculoEmpregadorForm } from './useVinculoEmpregadorForm';
import { VinculoEmpregadorFormFields } from './VinculoEmpregadorFormFields';

export function VinculoEmpregadorForm({
  initialValues,
  onSubmit,
  onCancel,
  loading: externalLoading
}: VinculoEmpregadorFormProps) {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    apiError,
    successMessage,
    isLoading: internalLoading,
    onSubmit: handleFormSubmit
  } = useVinculoEmpregadorForm({ initialValues });

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

        <VinculoEmpregadorFormFields control={control} errors={errors} />

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

/**
 * Arquivo: FamiliarForm.tsx
 * Caminho: src/components/forms/familiar/FamiliarForm.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Componente principal do formulário de familiar.
 */

import { Alert, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { LoadingButton } from '@mui/lab';
import { FamiliarFormData } from './FamiliarFormTypes';
import { FamiliarFormFields } from './FamiliarFormFields';
import { useFamiliarForm } from './useFamiliarForm';

interface FamiliarFormProps {
  initialValues?: Partial<FamiliarFormData>;
  onSubmit?: (data: FamiliarFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export function FamiliarForm({
  initialValues,
  onSubmit,
  onCancel,
  loading: externalLoading,
}: FamiliarFormProps) {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    apiError,
    apiSuccess,
    loading: internalLoading,
  } = useFamiliarForm(initialValues);

  const loading = externalLoading || internalLoading;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {apiError && (
          <Alert severity="error" onClose={() => {}}>
            {apiError}
          </Alert>
        )}

        {apiSuccess && (
          <Alert severity="success" onClose={() => {}}>
            {apiSuccess}
          </Alert>
        )}

        <FamiliarFormFields control={control} errors={errors} />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {onCancel && (
            <LoadingButton
              variant="outlined"
              onClick={onCancel}
              disabled={loading}
            >
              {t('common.buttons.cancel')}
            </LoadingButton>
          )}
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            disabled={loading}
          >
            {t('common.buttons.save')}
          </LoadingButton>
        </Stack>
      </Stack>
    </form>
  );
} 

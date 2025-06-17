/**
 * Arquivo: EmpregadoDomesticoForm.tsx
 * Caminho: src/components/forms/empregado-domestico/EmpregadoDomesticoForm.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Componente principal do formulário de empregado doméstico.
 */

import { Alert, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { LoadingButton } from '@mui/lab';
import { EmpregadoDomesticoFormData } from './EmpregadoDomesticoFormTypes';
import { EmpregadoDomesticoFormFields } from './EmpregadoDomesticoFormFields';
import { useEmpregadoDomesticoForm } from './useEmpregadoDomesticoForm';

interface EmpregadoDomesticoFormProps {
  initialValues?: Partial<EmpregadoDomesticoFormData>;
  onSubmit?: (data: EmpregadoDomesticoFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export function EmpregadoDomesticoForm({
  initialValues,
  onSubmit,
  onCancel,
  loading: externalLoading,
}: EmpregadoDomesticoFormProps) {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    apiError,
    apiSuccess,
    loading: internalLoading,
  } = useEmpregadoDomesticoForm(initialValues);

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

        <EmpregadoDomesticoFormFields control={control} errors={errors} />

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

/**
 * Arquivo: DocumentForm.tsx
 * Caminho: src/components/forms/documentos/DocumentForm.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Componente principal do formulário de documentos.
 */

import { Alert, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { LoadingButton } from '@mui/lab';
import { DocumentFormData } from './DocumentFormTypes';
import { DocumentFormFields } from './DocumentFormFields';
import { useDocumentForm } from './useDocumentForm';

interface DocumentFormProps {
  initialValues?: Partial<DocumentFormData>;
  onSubmit?: (data: DocumentFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export function DocumentForm({
  initialValues,
  onSubmit,
  onCancel,
  loading: externalLoading,
}: DocumentFormProps) {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    apiError,
    apiSuccess,
    loading: internalLoading,
  } = useDocumentForm(initialValues);

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

        <DocumentFormFields control={control} errors={errors} />

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

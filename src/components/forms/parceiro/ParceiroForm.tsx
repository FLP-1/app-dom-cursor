/**
 * Arquivo: ParceiroForm.tsx
 * Caminho: src/components/forms/parceiro/ParceiroForm.tsx
 * Criado em: 2024-06-07
 * Última atualização: 2024-06-07
 * Descrição: Componente principal do formulário de parceiro.
 */

import { Stack, Button, Alert, Box } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { ParceiroFormProps } from './ParceiroFormTypes';
import { useParceiroForm } from './useParceiroForm';
import { ParceiroFormFields } from './ParceiroFormFields';

export function ParceiroForm({
  initialValues,
  onSubmit,
  onCancel,
  loading: externalLoading
}: ParceiroFormProps) {
  const { t } = useTranslation();
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    isLoading: internalLoading,
    onSubmit: handleFormSubmit
  } = useParceiroForm({ initialValues });

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

        <ParceiroFormFields control={control} errors={errors} />

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

/**
 * Arquivo: PontoForm.tsx
 * Caminho: src/components/forms/ponto/PontoForm.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-01-27
 * Descrição: Componente principal do formulário de ponto.
 */

import { Stack, Button, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PontoFormProps } from './PontoFormTypes';
import { usePontoForm } from './usePontoForm';
import { PontoFormFields } from './PontoFormFields';
import { pontoMessages } from '@/i18n/messages/ponto.messages';

export function PontoForm({
  initialValues,
  onSubmit,
  onCancel,
  loading: externalLoading
}: PontoFormProps) {
  const messages = pontoMessages.pt;
  const {
    control,
    handleSubmit,
    formState: { errors },
    apiError,
    successMessage,
    isLoading: internalLoading,
    onSubmit: handleFormSubmit
  } = usePontoForm({ initialValues });

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

        <PontoFormFields control={control} errors={errors} />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {onCancel && (
            <Button
              variant="outlined"
              onClick={onCancel}
              disabled={isLoading}
            >
              {messages.botoes.cancelar}
            </Button>
          )}

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isLoading}
            disabled={isLoading}
          >
            {messages.botoes.salvar}
          </LoadingButton>
        </Stack>
      </Stack>
    </form>
  );
} 

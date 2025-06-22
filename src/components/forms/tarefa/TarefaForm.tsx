/**
 * Arquivo: TarefaForm.tsx
 * Caminho: src/components/forms/tarefa/TarefaForm.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-01-27
 * Descrição: Componente principal do formulário de tarefa.
 */

import { Stack, Button, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { TarefaFormProps } from './TarefaFormTypes';
import { useTarefaForm } from './useTarefaForm';
import { TarefaFormFields } from './TarefaFormFields';
import { tarefaMessages } from '@/i18n/messages/tarefa.messages';

export function TarefaForm({
  initialValues,
  onSubmit,
  onCancel,
  loading: externalLoading
}: TarefaFormProps) {
  const messages = tarefaMessages.pt;
  const {
    control,
    handleSubmit,
    formState: { errors },
    apiError,
    successMessage,
    isLoading: internalLoading,
    onSubmit: handleFormSubmit
  } = useTarefaForm({ initialValues });

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

        <TarefaFormFields control={control} errors={errors} />

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

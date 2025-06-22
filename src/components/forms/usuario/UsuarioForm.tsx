/**
 * Arquivo: UsuarioForm.tsx
 * Caminho: src/components/forms/usuario/UsuarioForm.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-01-27
 * Descrição: Componente principal do formulário de usuário.
 */

import { Stack, Button, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { UsuarioFormProps } from './UsuarioFormTypes';
import { useUsuarioForm } from './useUsuarioForm';
import { UsuarioFormFields } from './UsuarioFormFields';
import { usuarioMessages } from '@/i18n/messages/usuario.messages';

export function UsuarioForm({
  initialValues,
  onSubmit,
  onCancel,
  loading: externalLoading
}: UsuarioFormProps) {
  const messages = usuarioMessages.pt;
  const {
    control,
    handleSubmit,
    formState: { errors },
    apiError,
    successMessage,
    isLoading: internalLoading,
    onSubmit: handleFormSubmit
  } = useUsuarioForm({ initialValues });

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

        <UsuarioFormFields control={control} errors={errors} />

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

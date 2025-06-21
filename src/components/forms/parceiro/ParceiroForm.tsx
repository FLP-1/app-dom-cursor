/**
 * Arquivo: ParceiroForm.tsx
 * Caminho: src/components/forms/parceiro/ParceiroForm.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente principal do formulário de cadastro de parceiro, acessível, responsivo, integrado ao hook customizado e mensagens centralizadas.
 */

import { Button, Alert, Stack } from '@mui/material';
import { ParceiroFormFields } from '@/components/forms/parceiro/ParceiroFormFields';
import { useParceiroForm } from '@/components/forms/parceiro/useParceiroForm';
import { useCallback } from 'react';
import { LoadingButton } from '@mui/lab';

export function ParceiroForm({ onSuccess }: { onSuccess?: () => void }) {
  const { control, handleSubmit, onSubmit, apiError, apiSuccess, loading } = useParceiroForm(onSuccess);

  const handleFormSubmit = useCallback(handleSubmit(onSubmit), [handleSubmit, onSubmit]);

  return (
    <form onSubmit={handleFormSubmit} aria-label="Formulário de cadastro de parceiro">
      <Stack spacing={2}>
        <ParceiroFormFields control={control} />
        {apiError && <Alert severity="error">{apiError}</Alert>}
        {apiSuccess && <Alert severity="success">{apiSuccess}</Alert>}
        <LoadingButton type="submit" variant="contained" color="primary" loading={loading}>
          Salvar
        </LoadingButton>
      </Stack>
    </form>
  );
} 

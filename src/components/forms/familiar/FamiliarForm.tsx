/**
 * Arquivo: FamiliarForm.tsx
 * Caminho: src/components/forms/familiar/FamiliarForm.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente principal do formulário de cadastro de familiar, acessível, responsivo, integrado ao hook customizado e mensagens centralizadas.
 */

import { Button, Alert, Stack } from '@mui/material';
import { FamiliarFormFields } from '@/components/forms/familiar/FamiliarFormFields';
import { useFamiliarForm } from '@/components/forms/familiar/useFamiliarForm';
import { useCallback } from 'react';
import { LoadingButton } from '@mui/lab';

export function FamiliarForm({ onSuccess }: { onSuccess?: () => void }) {
  const { control, handleSubmit, onSubmit, apiError, apiSuccess, loading } = useFamiliarForm(onSuccess);

  const handleFormSubmit = useCallback(handleSubmit(onSubmit), [handleSubmit, onSubmit]);

  return (
    <form onSubmit={handleFormSubmit} aria-label="Formulário de cadastro de familiar">
      <Stack spacing={2}>
        <FamiliarFormFields control={control} />
        {apiError && <Alert severity="error">{apiError}</Alert>}
        {apiSuccess && <Alert severity="success">{apiSuccess}</Alert>}
        <LoadingButton type="submit" variant="contained" color="primary" loading={loading}>
          Salvar
        </LoadingButton>
      </Stack>
    </form>
  );
} 

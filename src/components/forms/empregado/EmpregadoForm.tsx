/**
 * Arquivo: EmpregadoForm.tsx
 * Caminho: src/components/forms/empregado/EmpregadoForm.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente principal do formulário de cadastro de empregado, acessível, responsivo, integrado ao hook customizado e mensagens centralizadas.
 */

import { Button, Alert, Stack } from '@mui/material';
import { EmpregadoFormFields } from '@/components/forms/empregado/EmpregadoFormFields';
import { useEmpregadoForm } from '@/components/forms/empregado/useEmpregadoForm';
import { useCallback } from 'react';
import { LoadingButton } from '@mui/lab';

export function EmpregadoForm({ onSuccess }: { onSuccess?: () => void }) {
  const { control, handleSubmit, onSubmit, apiError, apiSuccess, loading } = useEmpregadoForm(onSuccess);

  const handleFormSubmit = useCallback(handleSubmit(onSubmit), [handleSubmit, onSubmit]);

  return (
    <form onSubmit={handleFormSubmit} aria-label="Formulário de cadastro de empregado">
      <Stack spacing={2}>
        <EmpregadoFormFields control={control} />
        {apiError && <Alert severity="error">{apiError}</Alert>}
        {apiSuccess && <Alert severity="success">{apiSuccess}</Alert>}
        <LoadingButton type="submit" variant="contained" color="primary" loading={loading}>
          Salvar
        </LoadingButton>
      </Stack>
    </form>
  );
} 

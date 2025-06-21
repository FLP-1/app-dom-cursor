/**
 * Arquivo: EmpregadorForm.tsx
 * Caminho: src/components/forms/empregador/EmpregadorForm.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente principal do formulário de cadastro de empregador, acessível, responsivo, integrado ao hook customizado e mensagens centralizadas.
 */

import { Alert, Stack } from '@mui/material';
import { EmpregadorFormFields } from '@/components/forms/empregador/EmpregadorFormFields';
import { useEmpregadorForm } from '@/components/forms/empregador/useEmpregadorForm';
import { useCallback } from 'react';
import { LoadingButton } from '@mui/lab';
import { EmpregadorFormValues } from '@/components/forms/empregador/EmpregadorFormTypes';
import { tooltips } from '@/i18n/tooltips';

interface EmpregadorFormProps {
  onSuccess?: () => void;
}

export function EmpregadorForm({ onSuccess }: EmpregadorFormProps) {
  const { control, handleSubmit, onSubmit, apiError, apiSuccess, loading } = useEmpregadorForm(onSuccess);

  const handleFormSubmit = useCallback(handleSubmit(onSubmit), [handleSubmit, onSubmit]);

  return (
    <form onSubmit={handleFormSubmit} aria-label={tooltips.forms.empregador.title.pt}>
      <Stack spacing={2}>
        <EmpregadorFormFields<EmpregadorFormValues> control={control} />
        {apiError && <Alert severity="error">{apiError}</Alert>}
        {apiSuccess && <Alert severity="success">{apiSuccess}</Alert>}
        <LoadingButton 
          type="submit" 
          variant="contained" 
          color="primary" 
          loading={loading}
          aria-label={tooltips.forms.empregador.submit.pt}
        >
          {tooltips.forms.empregador.submit.pt}
        </LoadingButton>
      </Stack>
    </form>
  );
} 

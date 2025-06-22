/**
 * Arquivo: EmpregadoForm.tsx
 * Caminho: src/components/forms/empregado/EmpregadoForm.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Formulário de cadastro de empregado.
 */
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Paper, Typography } from '@mui/material';
import { useNotification } from '@/hooks/useNotification';
import { EmpregadoFormData, EmpregadoFormProps, empregadoFormSchema } from './EmpregadoFormTypes';
import { EmpregadoFormFields } from './EmpregadoFormFields';
import { formatEmpregadoData, getEmpregadoDefaultValues } from './EmpregadoFormUtils';
import { empregadoMessages } from '@/i18n/messages/empregado.messages';

export const EmpregadoForm: React.FC<EmpregadoFormProps> = ({ initialData, onSubmit }) => {
  const { showNotification } = useNotification();
  const messages = empregadoMessages.pt;

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<EmpregadoFormData>({
    resolver: zodResolver(empregadoFormSchema),
    defaultValues: {
      ...getEmpregadoDefaultValues(),
      ...initialData
    }
  });

  const handleFormSubmit = async (data: EmpregadoFormData) => {
    try {
      const formattedData = formatEmpregadoData(data);
      await onSubmit(formattedData);
      showNotification(messages.mensagens.cadastroSucesso, 'success');
    } catch (error) {
      showNotification(messages.erros.cadastroErro, 'error');
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {messages.titulos.cadastroEmpregado}
      </Typography>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <EmpregadoFormFields control={control} />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          {messages.botoes.salvar}
        </Button>
      </form>
    </Paper>
  );
}; 

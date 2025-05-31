import { Box, Button, Grid, Paper, Step, StepLabel, Stepper, Typography, Alert } from '@mui/material';
import { useEmpregadorForm } from '../../hooks/useEmpregadorForm';
import { FormInput } from '../form/FormInput';
import { FormSelect } from '../form/FormSelect';
import { FormDatePicker } from '../form/FormDatePicker';
import { FormMaskInput } from '../form/FormMaskInput';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useNotification } from '../../hooks/useNotification';
import { FormData } from '@/types/forms';

interface EmpregadorData extends FormData {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  endereco: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
}

const steps = [
  'Dados Básicos',
  'Dados Complementares'
];

export function EmpregadorForm() {
  const { form, onSubmit } = useEmpregadorForm();
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (data: EmpregadorData) => {
    try {
      await onSubmit(data);
      showNotification({
        type: 'success',
        message: 'Empregador cadastrado com sucesso!'
      });
      router.push('/empregadores');
    } catch (error) {
      showNotification({
        type: 'error',
        message: 'Erro ao cadastrar empregador'
      });
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mb: 2 }}>
                Os dados cadastrais do empregador devem ser atualizados diretamente na base do CPF da Receita Federal.
              </Alert>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormMaskInput
                control={form.control}
                name="cpf"
                label="CPF"
                mask="999.999.999-99"
                required
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                control={form.control}
                name="nomeCompleto"
                label="Nome Completo"
                required
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormDatePicker
                control={form.control}
                name="dataNascimento"
                label="Data de Nascimento"
                required
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormSelect
                control={form.control}
                name="sexo"
                label="Sexo"
                options={[
                  { value: 'M', label: 'Masculino' },
                  { value: 'F', label: 'Feminino' }
                ]}
                required
                disabled
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mb: 2 }}>
                Preencha apenas os dados complementares que podem ser alterados no eSocial.
              </Alert>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormSelect
                control={form.control}
                name="tipoEmpregador"
                label="Tipo de Empregador"
                options={[
                  { value: '1', label: 'Empregador Doméstico' },
                  { value: '22', label: 'Segurado Especial' }
                ]}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                control={form.control}
                name="caepf"
                label="CAEPF (apenas para Segurado Especial)"
                disabled={form.watch('tipoEmpregador') !== '22'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormMaskInput
                control={form.control}
                name="telefone"
                label="Telefone"
                mask="(99) 99999-9999"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                control={form.control}
                name="email"
                label="Email"
                type="email"
              />
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {renderStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          {activeStep > 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Voltar
            </Button>
          )}
          {activeStep < steps.length - 1 ? (
            <Button variant="contained" onClick={handleNext}>
              Próximo
            </Button>
          ) : (
            <Button variant="contained" type="submit">
              Salvar
            </Button>
          )}
        </Box>
      </form>
    </Paper>
  );
} 
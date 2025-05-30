import { Box, Button, Grid, Typography, Alert, Chip } from '@mui/material';
import { FormInput } from '../common/FormInput';
import { FormSelect } from '../common/FormSelect';
import { FormDatePicker } from '../common/FormDatePicker';
import { FormCheckbox } from '../common/FormCheckbox';
import { useEmpregadorForm } from '../../hooks/useEmpregadorForm';
import { PreviewESocial } from './PreviewESocial';
import { useState } from 'react';
import { CheckCircle, Error, Warning } from '@mui/icons-material';

export function FormEmpregador() {
  const { 
    form, 
    onSubmit, 
    consultarDadosCPF, 
    dadosCPF, 
    previewESocial,
    validarCampoEmail,
    validarCampoTelefone,
    validacaoCampos
  } = useEmpregadorForm();
  const [error, setError] = useState<string | null>(null);

  const handleCPFChange = async (cpf: string) => {
    try {
      setError(null);
      if (cpf.replace(/\D/g, '').length === 11) {
        await consultarDadosCPF(cpf);
      }
    } catch (error) {
      setError('Erro ao consultar CPF. Por favor, tente novamente.');
    }
  };

  const handleEmailChange = async (email: string) => {
    try {
      setError(null);
      if (email && email.includes('@')) {
        await validarCampoEmail(email);
      }
    } catch (error) {
      setError('Erro ao validar email. Por favor, tente novamente.');
    }
  };

  const handleTelefoneChange = async (telefone: string) => {
    try {
      setError(null);
      if (telefone.replace(/\D/g, '').length === 11) {
        await validarCampoTelefone(telefone);
      }
    } catch (error) {
      setError('Erro ao validar telefone. Por favor, tente novamente.');
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      setError(null);
      await onSubmit(data);
    } catch (error) {
      setError('Erro ao cadastrar empregador. Por favor, tente novamente.');
    }
  };

  const renderStatusValidacao = (campo: 'email' | 'telefone') => {
    const validacao = validacaoCampos[campo];
    if (!validacao) return null;

    return (
      <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        {validacao.validado ? (
          <Chip
            icon={<CheckCircle />}
            label="Validado"
            color="success"
            size="small"
          />
        ) : (
          <Chip
            icon={<Warning />}
            label="Não validado"
            color="warning"
            size="small"
          />
        )}
        {validacao.mensagem && (
          <Typography variant="caption" color="text.secondary">
            {validacao.mensagem}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <Box component="form" onSubmit={form.handleSubmit(handleSubmit)}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Typography variant="h6" gutterBottom>
        Dados Básicos
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormInput
            name="cpf"
            label="CPF"
            control={form.control}
            onChange={(e) => handleCPFChange(e.target.value)}
            disabled={!!dadosCPF}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormInput
            name="nomeCompleto"
            label="Nome Completo"
            control={form.control}
            disabled={!!dadosCPF}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormDatePicker
            name="dataNascimento"
            label="Data de Nascimento"
            control={form.control}
            disabled={!!dadosCPF}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormSelect
            name="sexo"
            label="Sexo"
            control={form.control}
            options={[
              { value: 'M', label: 'Masculino' },
              { value: 'F', label: 'Feminino' },
            ]}
            disabled={!!dadosCPF}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
        Dados Complementares
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormSelect
            name="tipoEmpregador"
            label="Tipo de Empregador"
            control={form.control}
            options={[
              { value: '1', label: 'Empregador Doméstico' },
              { value: '22', label: 'Segurado Especial' },
            ]}
          />
        </Grid>
        {form.watch('tipoEmpregador') === '22' && (
          <Grid item xs={12} md={6}>
            <FormInput
              name="caepf"
              label="CAEPF"
              control={form.control}
              placeholder="Digite o CAEPF (14 dígitos)"
            />
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <FormInput
            name="telefone"
            label="Telefone"
            control={form.control}
            placeholder="(00) 00000-0000"
            onChange={(e) => handleTelefoneChange(e.target.value)}
          />
          {renderStatusValidacao('telefone')}
        </Grid>
        <Grid item xs={12} md={6}>
          <FormInput
            name="email"
            label="Email"
            control={form.control}
            type="email"
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          {renderStatusValidacao('email')}
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
        Preferências de Comunicação
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormCheckbox
            name="aceitaComunicacoes"
            label="Aceito receber comunicações sobre serviços e novidades"
            control={form.control}
          />
        </Grid>
        <Grid item xs={12}>
          <FormCheckbox
            name="aceitaTermos"
            label="Li e aceito os termos de uso e política de privacidade"
            control={form.control}
          />
        </Grid>
      </Grid>

      {previewESocial && <PreviewESocial preview={previewESocial} />}

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={!form.formState.isValid || 
            (form.watch('email') && !validacaoCampos.email?.validado) ||
            (form.watch('telefone') && !validacaoCampos.telefone?.validado)}
        >
          Cadastrar Empregador
        </Button>
      </Box>
    </Box>
  );
} 
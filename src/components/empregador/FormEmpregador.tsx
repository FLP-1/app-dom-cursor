/**
 * Arquivo: FormEmpregador.tsx
 * Caminho: src/components/empregador/FormEmpregador.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Formulário de cadastro de empregador com validação de campos
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Grid, Typography, Alert, Chip, Button } from '@mui/material';
import { CheckCircle, Warning } from '@mui/icons-material';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import { FormDatePicker } from '@/components/forms/inputs/FormDatePicker';
import { CheckboxField } from '@/components/forms/inputs/CheckboxField';
import { PreviewESocial } from './PreviewESocial';
import { validarCampoEmail, validarCampoTelefone } from '@/pages/validacao-campos';
import { authMessages } from '@/i18n/messages/auth.messages';

interface FormData {
  cpf: string;
  nomeCompleto: string;
  dataNascimento: string;
  sexo: string;
  tipoEmpregador: string;
  caepf?: string;
  telefone: string;
  email: string;
  aceitaComunicacoes: boolean;
  aceitaTermos: boolean;
}

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

interface FormEmpregadorProps {
  onSubmit: (data: EmpregadorData) => Promise<void>;
  dadosCPF?: any;
  previewESocial?: any;
}

export function FormEmpregador({ onSubmit, dadosCPF, previewESocial }: FormEmpregadorProps) {
  // Usar mensagens em português por padrão
  const messages = authMessages.pt;
  
  const [error, setError] = useState<string | null>(null);
  const [validacaoCampos, setValidacaoCampos] = useState<{
    email?: { validado: boolean; mensagem?: string };
    telefone?: { validado: boolean; mensagem?: string };
  }>({});

  const form = useForm<FormData>({
    defaultValues: {
      cpf: '',
      nomeCompleto: '',
      dataNascimento: '',
      sexo: '',
      tipoEmpregador: '',
      caepf: '',
      telefone: '',
      email: '',
      aceitaComunicacoes: false,
      aceitaTermos: false,
    },
  });

  const handleCPFChange = async (cpf: string) => {
    // Lógica de validação de CPF
  };

  const handleEmailChange = async (email: string) => {
    try {
      setError(null);
      if (email && email.includes('@')) {
        await validarCampoEmail(email);
      }
    } catch (error) {
      setError(messages.erros.validarEmail);
    }
  };

  const handleTelefoneChange = async (telefone: string) => {
    try {
      setError(null);
      if (telefone.replace(/\D/g, '').length === 11) {
        await validarCampoTelefone(telefone);
      }
    } catch (error) {
      setError(messages.erros.validarTelefone);
    }
  };

  const handleSubmit = async (data: EmpregadorData) => {
    try {
      setError(null);
      await onSubmit(data);
    } catch (error) {
      console.error('Erro ao salvar empregador:', error);
      setError(messages.erros.cadastrarEmpregador);
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
            label={messages.labels.validado}
            color="success"
            size="small"
          />
        ) : (
          <Chip
            icon={<Warning />}
            label={messages.labels.naoValidado}
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
        {messages.labels.dadosBasicos}
      </Typography>
      <Grid container spacing={2}>
        <Grid>
          <FormInput
            name="cpf"
            label={messages.labels.cpf}
            control={form.control}
            onChange={(e) => handleCPFChange(e.target.value)}
            disabled={!!dadosCPF}
          />
        </Grid>
        <Grid>
          <FormInput
            name="nomeCompleto"
            label={messages.labels.nome}
            control={form.control}
            disabled={!!dadosCPF}
          />
        </Grid>
        <Grid>
          <FormDatePicker
            name="dataNascimento"
            label={messages.labels.dataNascimento}
            control={form.control}
            disabled={!!dadosCPF}
          />
        </Grid>
        <Grid>
          <FormSelect
            name="sexo"
            label={messages.labels.sexo}
            control={form.control}
            options={[
              { value: 'M', label: messages.labels.masculino },
              { value: 'F', label: messages.labels.feminino },
            ]}
            disabled={!!dadosCPF}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
        {messages.labels.dadosComplementares}
      </Typography>
      <Grid container spacing={2}>
        <Grid>
          <FormSelect
            name="tipoEmpregador"
            label={messages.labels.tipoEmpregador}
            control={form.control}
            options={[
              { value: '1', label: messages.labels.empregadorDomestico },
              { value: '22', label: messages.labels.seguradoEspecial },
            ]}
          />
        </Grid>
        {form.watch('tipoEmpregador') === '22' && (
          <Grid>
            <FormInput
              name="caepf"
              label={messages.labels.caepf}
              control={form.control}
              placeholder={messages.placeholders.caepf}
            />
          </Grid>
        )}
        <Grid>
          <FormInput
            name="telefone"
            label={messages.labels.telefone}
            control={form.control}
            placeholder={messages.placeholders.telefone}
            onChange={(e) => handleTelefoneChange(e.target.value)}
          />
          {renderStatusValidacao('telefone')}
        </Grid>
        <Grid>
          <FormInput
            name="email"
            label={messages.labels.email}
            control={form.control}
            type="email"
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          {renderStatusValidacao('email')}
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
        {messages.labels.preferenciasComunicacao}
      </Typography>
      <Grid container spacing={2}>
        <Grid>
          <CheckboxField
            name="aceitaComunicacoes"
            control={form.control}
            label={messages.labels.aceitaComunicacoes}
          />
        </Grid>
        <Grid>
          <CheckboxField
            name="aceitaTermos"
            control={form.control}
            label={messages.labels.aceitaTermos}
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
          {messages.labels.cadastrarEmpregador}
        </Button>
      </Box>
    </Box>
  );
} 

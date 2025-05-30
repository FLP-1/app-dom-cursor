import { Box, Paper, Typography, Button, Grid, Alert } from '@mui/material';
import { FormInput } from '../components/common/FormInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { validarEmail, validarTelefone } from '../services/validacao';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { CheckCircle, Warning } from '@mui/icons-material';
import { Chip } from '@mui/material';

interface ValidacaoCamposFormData {
  email: string;
  telefone: string;
}

const schema = yup.object().shape({
  email: yup.string()
    .required('Email é obrigatório')
    .email('Email inválido')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email inválido'),
  telefone: yup.string()
    .required('Telefone é obrigatório')
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido'),
});

export default function ValidacaoCampos() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [validacaoEmail, setValidacaoEmail] = useState<any>(null);
  const [validacaoTelefone, setValidacaoTelefone] = useState<any>(null);

  const form = useForm<ValidacaoCamposFormData>({
    resolver: yupResolver(schema),
  });

  const handleEmailChange = async (email: string) => {
    try {
      setError(null);
      if (email && email.includes('@')) {
        const resultado = await validarEmail(email);
        setValidacaoEmail(resultado);
      }
    } catch (error) {
      setError('Erro ao validar email. Por favor, tente novamente.');
    }
  };

  const handleTelefoneChange = async (telefone: string) => {
    try {
      setError(null);
      if (telefone.replace(/\D/g, '').length === 11) {
        const resultado = await validarTelefone(telefone);
        setValidacaoTelefone(resultado);
      }
    } catch (error) {
      setError('Erro ao validar telefone. Por favor, tente novamente.');
    }
  };

  const onSubmit = async (data: ValidacaoCamposFormData) => {
    try {
      setError(null);

      // Validar email
      const resultadoEmail = await validarEmail(data.email);
      setValidacaoEmail(resultadoEmail);

      // Validar telefone
      const resultadoTelefone = await validarTelefone(data.telefone);
      setValidacaoTelefone(resultadoTelefone);

      // Se ambos estiverem validados, salvar no cookie e redirecionar
      if (resultadoEmail.validado && resultadoTelefone.validado) {
        document.cookie = `validacao_campos=${JSON.stringify({
          email: resultadoEmail,
          telefone: resultadoTelefone,
        })}; path=/`;
        
        router.push('/dashboard');
      } else {
        setError('Por favor, valide todos os campos antes de continuar.');
      }
    } catch (error) {
      setError('Erro ao validar campos. Por favor, tente novamente.');
    }
  };

  const renderStatusValidacao = (campo: 'email' | 'telefone') => {
    const validacao = campo === 'email' ? validacaoEmail : validacaoTelefone;
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
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Validação de Campos
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Para acessar as funcionalidades do sistema, é necessário validar seu email e telefone.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={form.handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormInput
                name="email"
                label="Email"
                control={form.control}
                type="email"
                onChange={(e) => handleEmailChange(e.target.value)}
              />
              {renderStatusValidacao('email')}
            </Grid>
            <Grid item xs={12}>
              <FormInput
                name="telefone"
                label="Telefone"
                control={form.control}
                placeholder="(00) 00000-0000"
                onChange={(e) => handleTelefoneChange(e.target.value)}
              />
              {renderStatusValidacao('telefone')}
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={!form.formState.isValid}
            >
              Validar Campos
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
} 
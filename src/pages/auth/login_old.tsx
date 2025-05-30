import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, Typography, Paper, CircularProgress, Link } from '@mui/material';
import { FormInput } from '../../components/common';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../hooks';

interface LoginForm {
  cpf: string;
  password: string;
}

function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/[\D]/g, '');
  if (cpf.length !== 11 || /^([0-9])\1+$/.test(cpf)) return false;
  let sum = 0, rest;
  for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}

const LoginPage: React.FC = () => {
  const { signIn, loading } = useAuth();
  const { error, success } = useNotification();
  const { control, handleSubmit, formState: { errors }, setError } = useForm<LoginForm>({
    defaultValues: { cpf: '', password: '' },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await signIn(data.cpf, data.password);
      success('Login realizado com sucesso!');
    } catch (err: unknown) {
      if (err instanceof Error) {
        error(err.message || 'Erro ao fazer login');
      } else {
        error('Erro ao fazer login');
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f6fa">
      <Paper elevation={3} sx={{ p: 4, minWidth: 340, maxWidth: 400 }}>
        <Typography variant="h5" mb={2} fontWeight={700} align="center">
          Acesso ao Sistema
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="cpf"
            control={control}
            rules={{
              required: 'CPF é obrigatório',
              validate: (value) => validateCPF(value) || 'CPF inválido',
            }}
            render={({ field }) => (
              <FormInput
                {...field}
                label="CPF"
                mask="999.999.999-99"
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
                autoComplete="username"
                inputProps={{ maxLength: 14 }}
                fullWidth
                margin="normal"
                required
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Senha é obrigatória', minLength: { value: 6, message: 'Mínimo 6 caracteres' } }}
            render={({ field }) => (
              <FormInput
                {...field}
                label="Senha"
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                autoComplete="current-password"
                fullWidth
                margin="normal"
                required
              />
            )}
          />
          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              size="large"
              sx={{ fontWeight: 600 }}
              aria-label="Entrar"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
            </Button>
          </Box>
          <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
            <Link href="/auth/register" sx={{ textDecoration: 'none' }}>
              Criar conta
            </Link>
            <Link href="/auth/forgot-password" sx={{ textDecoration: 'none' }}>
              Esqueceu a senha?
            </Link>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage; 
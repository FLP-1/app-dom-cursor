import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, Typography, Paper, CircularProgress, Link } from '@mui/material';
import { FormInput } from '../../components/common';
import { useNotification } from '../../hooks';
import { useRouter } from 'next/router';

interface RegisterForm {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
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

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone: string): boolean {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length >= 10 && cleanPhone.length <= 11;
}

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const { error, success } = useNotification();
  const [loading, setLoading] = React.useState(false);

  const { control, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>({
    defaultValues: {
      name: '',
      cpf: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data: RegisterForm) => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          cpf: data.cpf.replace(/\D/g, ''),
          email: data.email,
          phone: data.phone.replace(/\D/g, ''),
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Erro ao realizar cadastro');
      }

      success('Cadastro realizado com sucesso! Redirecionando para login...');
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        error(err.message || 'Erro ao realizar cadastro');
      } else {
        error('Erro ao realizar cadastro');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f6fa">
      <Paper elevation={3} sx={{ p: 4, minWidth: 340, maxWidth: 500 }}>
        <Typography variant="h5" mb={2} fontWeight={700} align="center">
          Criar Conta
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Nome é obrigatório' }}
            render={({ field }) => (
              <FormInput
                {...field}
                label="Nome Completo"
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
                margin="normal"
                required
              />
            )}
          />
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
                fullWidth
                margin="normal"
                required
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'E-mail é obrigatório',
              validate: (value) => validateEmail(value) || 'E-mail inválido',
            }}
            render={({ field }) => (
              <FormInput
                {...field}
                label="E-mail"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
                margin="normal"
                required
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            rules={{
              required: 'Telefone é obrigatório',
              validate: (value) => validatePhone(value) || 'Telefone inválido',
            }}
            render={({ field }) => (
              <FormInput
                {...field}
                label="Telefone"
                mask="(99) 99999-9999"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                fullWidth
                margin="normal"
                required
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Senha é obrigatória',
              minLength: { value: 6, message: 'Mínimo 6 caracteres' },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Senha deve conter letras maiúsculas, minúsculas e números',
              },
            }}
            render={({ field }) => (
              <FormInput
                {...field}
                label="Senha"
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
                margin="normal"
                required
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: 'Confirmação de senha é obrigatória',
              validate: (value) => value === password || 'As senhas não conferem',
            }}
            render={({ field }) => (
              <FormInput
                {...field}
                label="Confirmar Senha"
                type="password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
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
              aria-label="Cadastrar"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Cadastrar'}
            </Button>
          </Box>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Já tem uma conta?{' '}
              <Link href="/auth/login" sx={{ textDecoration: 'none' }}>
                Faça login
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterPage; 
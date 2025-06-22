/**
 * Arquivo: forgot-password.tsx
 * Caminho: src/pages/auth/forgot-password.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-01-27
 * Descrição: Página de recuperação de senha, com validação de CPF e e-mail, e integração com API.
 */

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, Typography, Paper, CircularProgress, Link } from '@mui/material';
import { FormInput } from '@/components/common';
import { useNotification } from '@/hooks';
import { useRouter } from 'next/router';
import { useMessages } from '@/hooks/useMessages';

interface ForgotPasswordForm {
  cpf: string;
  email: string;
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

const ForgotPasswordPage: React.FC = () => {
  const { messages } = useMessages();
  const router = useRouter();
  const { error, success } = useNotification();
  const [loading, setLoading] = React.useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<ForgotPasswordForm>({
    defaultValues: {
      cpf: '',
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cpf: data.cpf.replace(/\D/g, ''),
          email: data.email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || messages.auth.forgotPassword.errors.recoveryError);
      }

      success(messages.auth.forgotPassword.success.instructionsSent);
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        error(err.message || messages.auth.forgotPassword.errors.recoveryError);
      } else {
        error(messages.auth.forgotPassword.errors.recoveryError);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f6fa">
      <Paper elevation={3} sx={{ p: 4, minWidth: 340, maxWidth: 400 }}>
        <Typography variant="h5" mb={2} fontWeight={700} align="center">
          {messages.auth.forgotPassword.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3} align="center">
          {messages.auth.forgotPassword.subtitle}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="cpf"
            control={control}
            rules={{
              required: messages.auth.forgotPassword.errors.required,
              validate: (value) => validateCPF(value) || messages.auth.forgotPassword.errors.invalidCPF,
            }}
            render={({ field }) => (
              <FormInput
                {...field}
                label={messages.auth.forgotPassword.fields.cpf}
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
              required: messages.auth.forgotPassword.errors.required,
              validate: (value) => validateEmail(value) || messages.auth.forgotPassword.errors.invalidEmail,
            }}
            render={({ field }) => (
              <FormInput
                {...field}
                label={messages.auth.forgotPassword.fields.email}
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
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
              aria-label={messages.auth.forgotPassword.buttons.recover}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : messages.auth.forgotPassword.buttons.recover}
            </Button>
          </Box>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              {messages.auth.forgotPassword.links.rememberPassword}{' '}
              <Link href="/auth/login" sx={{ textDecoration: 'none' }}>
                {messages.auth.forgotPassword.links.backToLogin}
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default ForgotPasswordPage; 

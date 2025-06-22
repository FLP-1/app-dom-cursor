/**
 * Arquivo: reset-password.tsx
 * Caminho: src/pages/auth/reset-password.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-01-27
 * Descrição: Página de redefinição de senha, com validação de senha forte e integração com API.
 */

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Box, Button, Typography, Paper, CircularProgress, Link } from '@mui/material';
import { FormInput } from '@/components/common';
import { useNotification } from '@/hooks';
import { useMessages } from '@/hooks/useMessages';

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

const ResetPasswordPage: React.FC = () => {
  const { messages } = useMessages();
  const router = useRouter();
  const { token } = router.query;
  const { error, success } = useNotification();
  const [loading, setLoading] = React.useState(false);

  const { control, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordForm>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!token) {
      error('Token de redefinição de senha inválido');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || messages.auth.resetPassword.errors.resetError);
      }

      success(messages.auth.resetPassword.success.passwordReset);
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        error(err.message || messages.auth.resetPassword.errors.resetError);
      } else {
        error(messages.auth.resetPassword.errors.resetError);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f6fa">
        <Paper elevation={3} sx={{ p: 4, minWidth: 340, maxWidth: 400 }}>
          <Typography variant="h5" mb={2} fontWeight={700} align="center">
            Link Inválido
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3} align="center">
            O link de redefinição de senha é inválido ou expirou.
          </Typography>
          <Box mt={2} textAlign="center">
            <Link href="/auth/forgot-password" sx={{ textDecoration: 'none' }}>
              Solicitar novo link
            </Link>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f6fa">
      <Paper elevation={3} sx={{ p: 4, minWidth: 340, maxWidth: 400 }}>
        <Typography variant="h5" mb={2} fontWeight={700} align="center">
          {messages.auth.resetPassword.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3} align="center">
          {messages.auth.resetPassword.subtitle}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="password"
            control={control}
            rules={{
              required: messages.auth.resetPassword.errors.required,
              minLength: { value: 6, message: 'Mínimo 6 caracteres' },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Senha deve conter letras maiúsculas, minúsculas e números',
              },
            }}
            render={({ field }) => (
              <FormInput
                {...field}
                label={messages.auth.resetPassword.fields.newPassword}
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
              required: messages.auth.resetPassword.errors.required,
              validate: (value) => value === password || messages.auth.resetPassword.errors.passwordMismatch,
            }}
            render={({ field }) => (
              <FormInput
                {...field}
                label={messages.auth.resetPassword.fields.confirmPassword}
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
              aria-label={messages.auth.resetPassword.buttons.reset}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : messages.auth.resetPassword.buttons.reset}
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

export default ResetPasswordPage; 

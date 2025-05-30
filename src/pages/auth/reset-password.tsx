import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Box, Button, Typography, Paper, CircularProgress, Link } from '@mui/material';
import { FormInput } from '../../components/common';
import { useNotification } from '../../hooks';

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

const ResetPasswordPage: React.FC = () => {
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
        throw new Error(result.message || 'Erro ao redefinir senha');
      }

      success('Senha redefinida com sucesso! Redirecionando para login...');
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        error(err.message || 'Erro ao redefinir senha');
      } else {
        error('Erro ao redefinir senha');
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
          Redefinir Senha
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3} align="center">
          Digite sua nova senha abaixo.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                label="Nova Senha"
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
                label="Confirmar Nova Senha"
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
              aria-label="Redefinir Senha"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Redefinir Senha'}
            </Button>
          </Box>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Lembrou sua senha?{' '}
              <Link href="/auth/login" sx={{ textDecoration: 'none' }}>
                Voltar para o login
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default ResetPasswordPage; 
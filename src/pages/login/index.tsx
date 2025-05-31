import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useLoginForm } from '../../hooks/useLoginForm';
import { useNotification } from '../../hooks/useNotification';
import { PageHeader } from '../../components/common/PageHeader';
import { FormData } from '@/types/forms';

interface LoginData extends FormData {
  email: string;
  senha: string;
}

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { showNotification } = useNotification();
  const { control, handleSubmit, formState: { errors } } = useLoginForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginData) => {
    try {
      setIsLoading(true);
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        showNotification({
          type: 'error',
          message: t('login.messages.erroLogin')
        });
        return;
      }

      router.push('/dashboard');
    } catch {
      showNotification({
        type: 'error',
        message: t('login.messages.erroLogin')
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title={t('Login')}
      />

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ maxWidth: 400, width: '100%' }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t('login.titulo')}
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                label={t('login.email.label')}
                type="email"
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...control('email')}
              />

              <TextField
                fullWidth
                label={t('login.senha.label')}
                type="password"
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...control('password')}
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={isLoading}
                sx={{ mt: 3 }}
              >
                {t('login.entrar')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
} 
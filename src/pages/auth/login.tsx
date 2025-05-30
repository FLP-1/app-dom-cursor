import React from 'react';
import { Box, Button, Typography, Paper, CircularProgress, Link } from '@mui/material';
import { FormInput } from '@/components/common/forms/FormInput';
import { PasswordInput } from '@/components/common/forms/PasswordInput';
import { useLoginForm } from '@/hooks/forms/useLoginForm';
import { useTranslation } from 'react-i18next';
import NextLink from 'next/link';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { control, handleSubmit, onSubmit, loading } = useLoginForm();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          {t('auth.login.title')}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormInput
              name="cpf"
              label={t('auth.login.cpf')}
              control={control}
              required
              autoComplete="cpf"
              mask="cpf"
            />

            <PasswordInput
              name="password"
              label={t('auth.login.password')}
              control={control}
              required
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : t('auth.login.submit')}
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Link
                component={NextLink}
                href="/auth/forgot-password"
                variant="body2"
                color="primary"
              >
                {t('auth.login.forgotPassword')}
              </Link>
            </Box>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                {t('auth.login.noAccount')}{' '}
                <Link
                  component={NextLink}
                  href="/auth/register"
                  color="primary"
                >
                  {t('auth.login.register')}
                </Link>
              </Typography>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage; 
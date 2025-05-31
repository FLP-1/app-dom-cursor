import React, { useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function SplashPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard');
    } else if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#f7f8fa',
      }}
    >
      <Typography variant="h4" color="text.secondary" gutterBottom>
        {t('splash.titulo')}
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        {t('splash.descricao')}
      </Typography>

      <CircularProgress sx={{ mt: 3 }} />
    </Box>
  );
} 
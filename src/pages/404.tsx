import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { PageHeader } from '../components/common/PageHeader';

export default function NotFoundPage() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title={t('Página não encontrada')}
      />

      <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <Typography variant="h1" color="text.secondary" gutterBottom>
          404
        </Typography>

        <Typography variant="h5" color="text.secondary" gutterBottom>
          {t('404.titulo')}
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          {t('404.descricao')}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/')}
          sx={{ mt: 3 }}
        >
          {t('404.voltar')}
        </Button>
      </Box>
    </Box>
  );
} 
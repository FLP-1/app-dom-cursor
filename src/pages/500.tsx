/**
 * Arquivo: 500.tsx
 * Caminho: src/pages/500.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de erro 500
 */

import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function ServerError() {
  const { t } = useTranslation('common');

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          gap: 2
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          500
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {t('errors.serverError')}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {t('errors.serverErrorDescription')}
        </Typography>
        <Button
          component={Link}
          href="/"
          variant="contained"
          color="primary"
          size="large"
        >
          {t('common.backToHome')}
        </Button>
      </Box>
    </Container>
  );
} 

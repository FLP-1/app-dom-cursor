/**
 * Arquivo: _error.tsx
 * Caminho: src/pages/_error.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de erro
 */

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { PageHeader } from '@/components/common/PageHeader';
import { NextPage } from 'next';

interface ErrorProps {
  statusCode?: number;
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title={t('Erro')}
      />

      <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <Typography variant="h1" color="text.secondary" gutterBottom>
          {statusCode}
        </Typography>

        <Typography variant="h5" color="text.secondary" gutterBottom>
          {t('error.titulo')}
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          {t('error.descricao')}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/')}
          sx={{ mt: 3 }}
        >
          {t('error.voltar')}
        </Button>
      </Box>
    </Box>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error; 

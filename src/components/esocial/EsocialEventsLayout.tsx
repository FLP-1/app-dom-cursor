import React from 'react';
import { Box } from '@mui/material';
import { PageHeader } from '../common/PageHeader';
import { useTranslation } from 'react-i18next';

export function EsocialEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title={t('Eventos do eSocial')}
      />
      {children}
    </Box>
  );
} 
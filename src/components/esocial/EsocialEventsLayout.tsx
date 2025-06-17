/**
 * Arquivo: EsocialEventsLayout.tsx
 * Caminho: src/components/esocial/EsocialEventsLayout.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { Box } from '@mui/material';
import { PageHeader } from '@/components/common/PageHeader';
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

/**
 * Arquivo: index.tsx
 * Caminho: src/pages/configuracoes/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de configurações administrativas, acessível apenas para administradores autenticados.
 */

import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { ConfiguracoesAdmin } from '@/components/configuracoes';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { Box } from '@mui/material';

export default function ConfiguracoesPage() {
  const { t } = useTranslation();
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>{t('comum.carregando')}</div>;
  }

  if (!isAuthenticated || !user || user.role !== 'admin') {
    return <Box sx={{ p: 4, color: 'error.main' }}>{t('configuracoes.acessoNegado')}</Box>;
  }

  return (
    <Layout>
      <ConfiguracoesAdmin />
    </Layout>
  );
} 

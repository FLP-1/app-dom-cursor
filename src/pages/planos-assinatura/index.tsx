/**
 * Arquivo: index.tsx
 * Caminho: src/pages/planos-assinatura/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de listagem de planos de assinatura
 */

import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { PageHeader } from '@/components/common/PageHeader';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';

export default function PlanosAssinaturaPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const planos = [
    {
      id: 'mensal',
      titulo: t('planosAssinatura.mensal.titulo'),
      descricao: t('planosAssinatura.mensal.descricao'),
      preco: t('planosAssinatura.mensal.preco'),
      recursos: [
        t('planosAssinatura.mensal.recursos.1'),
        t('planosAssinatura.mensal.recursos.2'),
        t('planosAssinatura.mensal.recursos.3'),
      ],
    },
    {
      id: 'trimestral',
      titulo: t('planosAssinatura.trimestral.titulo'),
      descricao: t('planosAssinatura.trimestral.descricao'),
      preco: t('planosAssinatura.trimestral.preco'),
      recursos: [
        t('planosAssinatura.trimestral.recursos.1'),
        t('planosAssinatura.trimestral.recursos.2'),
        t('planosAssinatura.trimestral.recursos.3'),
        t('planosAssinatura.trimestral.recursos.4'),
      ],
    },
    {
      id: 'anual',
      titulo: t('planosAssinatura.anual.titulo'),
      descricao: t('planosAssinatura.anual.descricao'),
      preco: t('planosAssinatura.anual.preco'),
      recursos: [
        t('planosAssinatura.anual.recursos.1'),
        t('planosAssinatura.anual.recursos.2'),
        t('planosAssinatura.anual.recursos.3'),
        t('planosAssinatura.anual.recursos.4'),
        t('planosAssinatura.anual.recursos.5'),
      ],
    },
  ];

  function handleAssinar(planoId: string) {
    if (isAuthenticated) {
      router.push(`/cadastro?plano=${planoId}`);
    } else {
      router.push('/auth/login');
    }
  }

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <PageHeader
          title={t('Planos de Assinatura')}
        />

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" color="text.secondary" gutterBottom align="center">
            {t('planosAssinatura.titulo')}
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph align="center">
            {t('planosAssinatura.descricao')}
          </Typography>

          <Grid container spacing={3} sx={{ mt: 2 }} columns={12}>
            {planos.map((plano) => (
              <Grid key={plano.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      {plano.titulo}
                    </Typography>

                    <Typography variant="h4" color="primary" gutterBottom>
                      {plano.preco}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" paragraph>
                      {plano.descricao}
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                      {plano.recursos.map((recurso, index) => (
                        <Typography key={index} variant="body2" color="text.secondary" paragraph>
                          • {recurso}
                        </Typography>
                      ))}
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => handleAssinar(plano.id)}
                      sx={{ mt: 2 }}
                    >
                      {t('planosAssinatura.assinar')}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
} 

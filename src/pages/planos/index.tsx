/**
 * Arquivo: index.tsx
 * Caminho: src/pages/planos/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de listagem de planos
 */

import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { PageHeader } from '@/components/common/PageHeader';
import { Layout } from '@/components/layout/Layout';

export default function PlanosPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const planos = [
    {
      id: 'basico',
      titulo: t('planos.basico.titulo'),
      descricao: t('planos.basico.descricao'),
      preco: t('planos.basico.preco'),
      recursos: [
        t('planos.basico.recursos.1'),
        t('planos.basico.recursos.2'),
        t('planos.basico.recursos.3'),
      ],
    },
    {
      id: 'pro',
      titulo: t('planos.pro.titulo'),
      descricao: t('planos.pro.descricao'),
      preco: t('planos.pro.preco'),
      recursos: [
        t('planos.pro.recursos.1'),
        t('planos.pro.recursos.2'),
        t('planos.pro.recursos.3'),
        t('planos.pro.recursos.4'),
      ],
    },
    {
      id: 'enterprise',
      titulo: t('planos.enterprise.titulo'),
      descricao: t('planos.enterprise.descricao'),
      preco: t('planos.enterprise.preco'),
      recursos: [
        t('planos.enterprise.recursos.1'),
        t('planos.enterprise.recursos.2'),
        t('planos.enterprise.recursos.3'),
        t('planos.enterprise.recursos.4'),
        t('planos.enterprise.recursos.5'),
      ],
    },
  ];

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <PageHeader
          title={t('Planos')}
        />

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" color="text.secondary" gutterBottom align="center">
            {t('planos.titulo')}
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph align="center">
            {t('planos.descricao')}
          </Typography>

          <Grid container spacing={3} sx={{ mt: 2 }} columns={12}>
            {planos.map((plano) => (
              <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }} key={plano.id}>
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
                      onClick={() => router.push(`/cadastro?plano=${plano.id}`)}
                      sx={{ mt: 2 }}
                    >
                      {t('planos.assinar')}
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

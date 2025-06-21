/**
 * Arquivo: [id].tsx
 * Caminho: src/pages/planos/[id].tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de detalhes de plano
 */

import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { PageHeader } from '@/components/common/PageHeader';

export default function PlanoDetalhesPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;

  const plano = {
    id,
    titulo: t(`planos.${id}.titulo`),
    descricao: t(`planos.${id}.descricao`),
    preco: t(`planos.${id}.preco`),
    recursos: [
      t(`planos.${id}.recursos.1`),
      t(`planos.${id}.recursos.2`),
      t(`planos.${id}.recursos.3`),
      t(`planos.${id}.recursos.4`),
      t(`planos.${id}.recursos.5`),
    ],
  };

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title={t('Detalhes do Plano')}
      />

      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {plano.titulo}
            </Typography>

            <Typography variant="h4" color="primary" gutterBottom>
              {plano.preco}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {plano.descricao}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t('planos.recursos')}
            </Typography>

            <Box sx={{ mt: 2 }}>
              {plano.recursos.map((recurso, index) => (
                <Typography key={index} variant="body1" color="text.secondary" paragraph>
                  • {recurso}
                </Typography>
              ))}
            </Box>

            <Grid container columns={12}>
              <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }} sx={{ mt: 3 }}>
                <Grid gridColumn="span 12">
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={() => router.push('/planos')}
                  >
                    {t('planos.voltar')}
                  </Button>
                </Grid>
                <Grid gridColumn="span 12">
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => router.push(`/cadastro?plano=${id}`)}
                  >
                    {t('planos.assinar')}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
} 
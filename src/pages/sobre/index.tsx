import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../../components/common/PageHeader';

export default function SobrePage() {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title={t('Sobre')}
      />

      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {t('sobre.titulo')}
                </Typography>
                <Typography variant="body1" paragraph>
                  {t('sobre.descricao')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {t('sobre.versao')}
                </Typography>
                <Typography variant="body1">
                  <strong>{t('sobre.versaoAtual')}:</strong> 1.0.0
                </Typography>
                <Typography variant="body1">
                  <strong>{t('sobre.dataLancamento')}:</strong> {formatDateBR('2024-03-20')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {t('sobre.desenvolvedores')}
                </Typography>
                <Typography variant="body1" paragraph>
                  {t('sobre.desenvolvedoresDescricao')}
                </Typography>
                <Typography variant="body1">
                  <strong>{t('sobre.contato')}:</strong> contato@dom.com.br
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {t('sobre.licenca')}
                </Typography>
                <Typography variant="body1" paragraph>
                  {t('sobre.licencaDescricao')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
} 
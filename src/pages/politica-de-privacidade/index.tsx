import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../../components/common/PageHeader';

export default function PoliticaDePrivacidadePage() {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title={t('Política de Privacidade')}
      />

      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {t('politicaDePrivacidade.titulo')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('politicaDePrivacidade.descricao')}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t('politicaDePrivacidade.coleta.titulo')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('politicaDePrivacidade.coleta.descricao')}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t('politicaDePrivacidade.uso.titulo')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('politicaDePrivacidade.uso.descricao')}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t('politicaDePrivacidade.compartilhamento.titulo')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('politicaDePrivacidade.compartilhamento.descricao')}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t('politicaDePrivacidade.seguranca.titulo')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('politicaDePrivacidade.seguranca.descricao')}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t('politicaDePrivacidade.cookies.titulo')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('politicaDePrivacidade.cookies.descricao')}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t('politicaDePrivacidade.direitos.titulo')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('politicaDePrivacidade.direitos.descricao')}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t('politicaDePrivacidade.alteracoes.titulo')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('politicaDePrivacidade.alteracoes.descricao')}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t('politicaDePrivacidade.contato.titulo')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('politicaDePrivacidade.contato.descricao')}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
} 
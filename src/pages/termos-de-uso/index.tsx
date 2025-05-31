import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../../components/common/PageHeader';

export default function TermosDeUsoPage() {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title={t('Termos de Uso')}
      />

      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {t('termosDeUso.titulo')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('termosDeUso.descricao')}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t('termosDeUso.aceitacao.titulo')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('termosDeUso.aceitacao.descricao')}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t('termosDeUso.uso.titulo')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('termosDeUso.uso.descricao')}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t('termosDeUso.privacidade.titulo')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('termosDeUso.privacidade.descricao')}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t('termosDeUso.responsabilidades.titulo')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('termosDeUso.responsabilidades.descricao')}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t('termosDeUso.alteracoes.titulo')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('termosDeUso.alteracoes.descricao')}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t('termosDeUso.contato.titulo')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('termosDeUso.contato.descricao')}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
} 
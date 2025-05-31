import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../../components/common/PageHeader';

export default function PoliticaDeCancelamentoReembolsoPage() {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title={t('Política de Cancelamento e Reembolso')}
      />

      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {t('politicaDeCancelamentoReembolso.titulo')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('politicaDeCancelamentoReembolso.descricao')}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t('politicaDeCancelamentoReembolso.cancelamento.titulo')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('politicaDeCancelamentoReembolso.cancelamento.descricao')}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t('politicaDeCancelamentoReembolso.reembolso.titulo')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('politicaDeCancelamentoReembolso.reembolso.descricao')}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t('politicaDeCancelamentoReembolso.prazos.titulo')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('politicaDeCancelamentoReembolso.prazos.descricao')}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t('politicaDeCancelamentoReembolso.procedimentos.titulo')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('politicaDeCancelamentoReembolso.procedimentos.descricao')}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t('politicaDeCancelamentoReembolso.excecoes.titulo')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('politicaDeCancelamentoReembolso.excecoes.descricao')}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t('politicaDeCancelamentoReembolso.contato.titulo')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('politicaDeCancelamentoReembolso.contato.descricao')}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
} 
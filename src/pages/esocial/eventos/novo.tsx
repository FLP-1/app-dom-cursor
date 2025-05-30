import { useEsocialEventForm } from '../../../hooks/forms/useEsocialEventForm';
import { EsocialEventForm } from '../../../components/EsocialEventForm';
import { Box, Alert, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { EsocialEvent } from '../../../types/esocial-event';

export default function NovoEventoEsocialPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const form = useEsocialEventForm({});

  const handleSubmit = async (data: Partial<EsocialEvent>) => {
    await form.onSubmit(data);
    setSuccess(true);
    setTimeout(() => router.push('/esocial/eventos'), 1500);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" mb={2}>{t('Novo Evento do eSocial')}</Typography>
      {success && <Alert severity="success" sx={{ mb: 2 }}>{t('Evento criado com sucesso!')}</Alert>}
      <EsocialEventForm
        control={form.control}
        tipos={form.tipos}
        loading={form.loading}
        error={form.error}
        isEdit={false}
        onSubmit={form.handleSubmit(handleSubmit)}
      />
    </Box>
  );
} 
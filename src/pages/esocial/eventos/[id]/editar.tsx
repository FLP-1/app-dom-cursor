import { useRouter } from 'next/router';
import { useEsocialEventForm } from '../../../hooks/forms/useEsocialEventForm';
import { EsocialEventForm } from '../../../components/EsocialEventForm';
import { Box, Alert, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { EsocialEvent } from '../../../types/esocial-event';

export default function EditarEventoEsocialPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [success, setSuccess] = useState(false);
  const form = useEsocialEventForm({ id });

  const handleSubmit = async (data: Partial<EsocialEvent>) => {
    await form.onSubmit(data);
    setSuccess(true);
    setTimeout(() => router.push('/esocial/eventos'), 1500);
  };

  useEffect(() => {
    if (!id) router.push('/esocial/eventos');
  }, [id, router]);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" mb={2}>{t('Editar Evento do eSocial')}</Typography>
      {success && <Alert severity="success" sx={{ mb: 2 }}>{t('Evento atualizado com sucesso!')}</Alert>}
      <EsocialEventForm
        control={form.control}
        tipos={form.tipos}
        loading={form.loading}
        error={form.error}
        isEdit={true}
        onSubmit={form.handleSubmit(handleSubmit)}
      />
    </Box>
  );
} 
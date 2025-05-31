import { useTranslation } from 'react-i18next';
import { Container, Paper, Typography } from '@mui/material';
import { S1202Form } from '@/components/esocial/events/S1202Form';
import { useS1202Form } from '@/hooks/esocial/useS1202Form';
import { FormProvider } from 'react-hook-form';
import { useEsocialApi } from '@/hooks/useEsocialApi';
import { useRouter } from 'next/router';
import { EsocialEventsLayout } from '@/components/esocial/EsocialEventsLayout';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

export default function EditS1202Page() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const { getEvent } = useEsocialApi();
  const { methods, onSubmit } = useS1202Form();
  const { enqueueSnackbar } = useSnackbar();

  // Carregar dados do evento
  useEffect(() => {
    if (!id) return;

    const loadEvent = async () => {
      try {
        const data = await getEvent('S-1202', id as string);
        methods.reset(data);
      } catch (error) {
        enqueueSnackbar(t('messages.error.load'), { variant: 'error' });
      }
    };

    loadEvent();
  }, [id, methods, getEvent, t, enqueueSnackbar]);

  return (
    <EsocialEventsLayout>
      <Container maxWidth="lg">
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            {t('esocial.S1202.title')}
          </Typography>

          <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
              <S1202Form control={methods.control} />
            </form>
          </FormProvider>
        </Paper>
      </Container>
    </EsocialEventsLayout>
  );
} 
import { Box, Button, Container, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useEsocialS2250Form } from '@/hooks/useEsocialS2250Form';
import { S2250Form } from '@/components/esocial/events/S2250Form';
import { LoadingButton } from '@mui/lab';
import { ArrowBack } from '@mui/icons-material';
import Link from 'next/link';
import { useEsocialEvent } from '@/hooks/useEsocialEvent';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EsocialS2250EditPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { control, onSubmit, loading, reset } = useEsocialS2250Form();
  const { getEvent, loading: loadingEvent } = useEsocialEvent();

  useEffect(() => {
    const carregarEvento = async () => {
      if (router.query.id) {
        const evento = await getEvent(router.query.id as string);
        if (evento) {
          reset({
            payload: evento.payload
          });
        }
      }
    };

    carregarEvento();
  }, [router.query.id, getEvent, reset]);

  if (loadingEvent) {
    return (
      <Container maxWidth="lg">
        <Typography>{t('common:carregando')}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Link href="/esocial/eventos" passHref>
          <Button
            startIcon={<ArrowBack />}
            sx={{ mb: 2 }}
          >
            {t('common:voltar')}
          </Button>
        </Link>

        <Typography variant="h4" component="h1" gutterBottom>
          {t('esocial:events.S2250.tituloEdicao')}
        </Typography>
      </Box>

      <Box component="form" onSubmit={onSubmit} noValidate>
        <S2250Form control={control} />

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Link href="/esocial/eventos" passHref>
            <Button>
              {t('common:cancelar')}
            </Button>
          </Link>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
          >
            {t('common:salvar')}
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
} 
/**
 * Arquivo: edit.tsx
 * Caminho: src/pages/esocial/eventos/s-1000/[id]/edit.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de edição de evento S-1000
 */

import { useTranslation } from 'react-i18next';
import { Container, Paper, Typography } from '@mui/material';
import { S1000Form } from '@/components/esocial/events/S1000Form';
import { useS1000Form } from '@/hooks/esocial/useS1000Form';
import { useEsocialApi } from '@/hooks/useEsocialApi';
import { useRouter } from 'next/router';
import { EsocialEventsLayout } from '@/components/esocial/EsocialEventsLayout';
import { useSnackbar } from 'notistack';

export default function EditS1000Page() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const { getEvent } = useEsocialApi();
  const { methods, onSubmit } = useS1000Form();
  const { enqueueSnackbar } = useSnackbar();

  // Carregar dados do evento
  React.useEffect(() => {
    if (!id) return;

    const loadEvent = async () => {
      try {
        const data = await getEvent('S-1000', id as string);
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
            {t('esocial.S1000.title')}
          </Typography>

          <form onSubmit={onSubmit}>
            <S1000Form control={methods.control} />
          </form>
        </Paper>
      </Container>
    </EsocialEventsLayout>
  );
} 
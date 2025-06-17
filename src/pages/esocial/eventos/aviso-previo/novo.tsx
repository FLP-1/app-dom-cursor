/**
 * Arquivo: novo.tsx
 * Caminho: src/pages/esocial/eventos/aviso-previo/novo.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de novo aviso prévio
 */

import { Box, Button, Container, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useEsocialS2250Form } from '@/hooks/useEsocialS2250Form';
import { S2250Form } from '@/components/esocial/events/S2250Form';
import { LoadingButton } from '@mui/lab';
import { ArrowBack } from '@mui/icons-material';
import Link from 'next/link';

export default function EsocialS2250FormPage() {
  const { t } = useTranslation();
  const { control, onSubmit, loading } = useEsocialS2250Form();

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
          {t('esocial:events.S2250.titulo')}
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

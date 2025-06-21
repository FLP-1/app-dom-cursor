/**
 * Arquivo: create.tsx
 * Caminho: src/pages/esocial/eventos/s-1202/create.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de criação de evento S-1202
 */

import { useTranslation } from 'react-i18next';
import { Container, Paper, Typography } from '@mui/material';
import { S1202Form } from '@/components/esocial/events/S1202Form';
import { useS1202Form } from '@/hooks/esocial/useS1202Form';
import { EsocialEventsLayout } from '@/components/esocial/EsocialEventsLayout';

export default function CreateS1202Page() {
  const { t } = useTranslation();
  const { methods, onSubmit } = useS1202Form();

  return (
    <EsocialEventsLayout>
      <Container maxWidth="lg">
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            {t('esocial.S1202.title')}
          </Typography>

          <form onSubmit={onSubmit}>
            <S1202Form control={methods.control} />
          </form>
        </Paper>
      </Container>
    </EsocialEventsLayout>
  );
} 

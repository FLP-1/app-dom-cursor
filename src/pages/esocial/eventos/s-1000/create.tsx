/**
 * Arquivo: create.tsx
 * Caminho: src/pages/esocial/eventos/s-1000/create.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de criação de evento S-1000
 */

import { useTranslation } from 'react-i18next';
import { Container, Paper, Typography } from '@mui/material';
import { S1000Form } from '@/components/esocial/events/S1000Form';
import { useS1000Form } from '@/hooks/esocial/useS1000Form';
import { EsocialEventsLayout } from '@/components/esocial/EsocialEventsLayout';

export default function CreateS1000Page() {
  const { t } = useTranslation();
  const { methods, onSubmit } = useS1000Form();

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

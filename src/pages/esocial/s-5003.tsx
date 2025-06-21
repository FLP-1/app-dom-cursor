/**
 * Arquivo: s-5003.tsx
 * Caminho: src/pages/esocial/s-5003.tsx
 * Criado em: 2025-06-05
 * Última atualização: 2025-06-13
 * Descrição: Página de criação de evento S-5003
 */

import { Container, Typography, Paper } from '@mui/material';
import { S5003Form } from '@/components/forms/esocial/S5003Form';
import { useTranslation } from 'react-i18next';

export default function S5003Page() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h5" component="h1" gutterBottom>
          {t('forms.s5003.title', 'Evento S-5003')}
        </Typography>
        <S5003Form />
      </Paper>
    </Container>
  );
} 

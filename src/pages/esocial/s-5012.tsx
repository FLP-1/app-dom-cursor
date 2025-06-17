/**
 * Arquivo: s-5012.tsx
 * Caminho: src/pages/esocial/s-5012.tsx
 * Criado em: 2025-06-05
 * Última atualização: 2025-06-13
 * Descrição: Página de criação de evento S-5012
 */

import { Container, Typography, Paper } from '@mui/material';
import { S5012Form } from '@/components/forms/esocial/S5012Form';
import { useTranslation } from 'react-i18next';

export default function S5012Page() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h5" component="h1" gutterBottom>
          {t('forms.s5012.title', 'Evento S-5012')}
        </Typography>
        <S5012Form />
      </Paper>
    </Container>
  );
} 

/**
 * Arquivo: s-5011.tsx
 * Caminho: src/pages/esocial/s-5011.tsx
 * Criado em: 2025-06-05
 * Última atualização: 2025-06-13
 * Descrição: Página de criação de evento S-5011
 */

import { Container, Typography, Paper } from '@mui/material';
import { S5011Form } from '@/components/forms/esocial/S5011Form';
import { useTranslation } from 'react-i18next';

export default function S5011Page() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h5" component="h1" gutterBottom>
          {t('forms.s5011.title', 'Evento S-5011')}
        </Typography>
        <S5011Form />
      </Paper>
    </Container>
  );
} 

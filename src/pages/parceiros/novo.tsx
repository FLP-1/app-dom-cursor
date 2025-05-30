import React from 'react';
import { useParceiroForm } from '../../hooks/forms/useParceiroForm';
import { ParceiroForm } from '../../components/ParceiroForm';
import { Box, Typography, Paper, Button } from '@mui/material';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function NovoParceiroPage() {
  const { t } = useTranslation();
  const form = useParceiroForm();

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">{t('Novo Parceiro')}</Typography>
          <Link href="/parceiros" passHref legacyBehavior>
            <Button variant="outlined" color="secondary">{t('Voltar para lista')}</Button>
          </Link>
        </Box>
        <ParceiroForm
          control={form.control}
          loading={form.loading}
          error={form.error}
          success={form.success}
          onSubmit={form.onSubmit}
        />
      </Paper>
    </Box>
  );
}

// Sugestão de testes automatizados:
// - Deve cadastrar parceiro com dados válidos
// - Deve exibir mensagens de erro e sucesso
// - Deve garantir acessibilidade e responsividade
// - Deve navegar corretamente ao clicar em "Voltar para lista" 
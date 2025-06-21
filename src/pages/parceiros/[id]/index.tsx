/**
 * Arquivo: index.tsx
 * Caminho: src/pages/parceiros/[id]/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de detalhes de parceiro
 */

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, CircularProgress, Alert, Button, Divider } from '@mui/material';
import { Parceiro } from '@/types/parceiro';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { parceiroService } from '@/services/parceiro.service';

export default function DetalhesParceiroPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [loading, setLoading] = useState(true);
  const [parceiro, setParceiro] = useState<Parceiro | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    parceiroService.getById(id)
      .then(setParceiro)
      .catch(() => setError(t('Erro ao carregar parceiro.')))
      .finally(() => setLoading(false));
  }, [id, t]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !parceiro) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Alert severity="error">{error || t('Parceiro não encontrado.')}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">{t('Detalhes do Parceiro')}</Typography>
          <Link href={`/parceiros/[id]/editar`.replace('[id]', parceiro.id)} passHref legacyBehavior>
            <Button variant="outlined" color="primary">{t('Editar')}</Button>
          </Link>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2} columns={12}>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Nome')}</Typography>
            <Typography>{parceiro.nome}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('CNPJ')}</Typography>
            <Typography>{parceiro.cnpj}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('E-mail')}</Typography>
            <Typography>{parceiro.email}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Telefone')}</Typography>
            <Typography>{parceiro.telefone}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Responsável')}</Typography>
            <Typography>{parceiro.responsavel}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Observação')}</Typography>
            <Typography>{parceiro.observacao || '-'}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 6' }}>
            <Typography variant="subtitle2">{t('Endereço')}</Typography>
            <Typography>{parceiro.endereco}, {parceiro.numero} {parceiro.complemento ? `- ${parceiro.complemento}` : ''}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
            <Typography variant="subtitle2">{t('Bairro')}</Typography>
            <Typography>{parceiro.bairro}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
            <Typography variant="subtitle2">{t('Município')}</Typography>
            <Typography>{parceiro.municipio} - {parceiro.uf}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
            <Typography variant="subtitle2">{t('CEP')}</Typography>
            <Typography>{parceiro.cep}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Link href="/parceiros" passHref legacyBehavior>
            <Button variant="outlined" color="secondary">{t('Voltar para lista')}</Button>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}

// Sugestão de testes automatizados (Jest + React Testing Library):
// - Deve exibir todos os campos do parceiro corretamente
// - Deve exibir mensagem de erro se o parceiro não for encontrado
// - Deve garantir acessibilidade (labels, aria, etc)
// - Deve garantir responsividade em diferentes tamanhos de tela
// - Deve navegar corretamente ao clicar em "Editar" e "Voltar para lista" 
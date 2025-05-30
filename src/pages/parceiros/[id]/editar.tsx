import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, Button } from '@mui/material';
import { Parceiro } from '../../../types/parceiro';
import { useParceiroForm } from '../../../hooks/forms/useParceiroForm';
import { ParceiroForm } from '../../../components/ParceiroForm';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { parceiroService } from '../../../services/parceiro.service';

export default function EditarParceiroPage() {
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

  const form = useParceiroForm(parceiro || undefined);

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
        <Typography color="error">{error || t('Parceiro não encontrado.')}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">{t('Editar Parceiro')}</Typography>
          <Link href={`/parceiros/[id]`.replace('[id]', parceiro.id)} passHref legacyBehavior>
            <Button variant="outlined" color="secondary">{t('Voltar para detalhes')}</Button>
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
// - Deve carregar dados do parceiro para edição
// - Deve validar e atualizar parceiro com dados válidos
// - Deve exibir mensagens de erro e sucesso
// - Deve garantir acessibilidade e responsividade
// - Deve navegar corretamente ao clicar em "Voltar para detalhes" 
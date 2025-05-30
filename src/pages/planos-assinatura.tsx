import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { Box, Button, Card, CardContent, CardActions, Typography, Grid, CircularProgress } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import { usePlanos } from '@/hooks/usePlanos';
import { LogService, TipoLog, CategoriaLog } from '@/services/log.service';

export default function PlanosAssinatura() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const { planos, loading, error } = usePlanos();
  const [loadingAssinatura, setLoadingAssinatura] = useState<string | null>(null);

  const handleAssinar = async (planoId: string) => {
    if (!user) {
      enqueueSnackbar('Você precisa estar logado para assinar um plano', { variant: 'warning' });
      return;
    }

    setLoadingAssinatura(planoId);
    try {
      const response = await fetch('/api/assinatura', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planoId,
          usuarioId: user.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar assinatura');
      }

      // Registra log
      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.PAGAMENTO,
        mensagem: 'Redirecionando para checkout',
        detalhes: { 
          planoId,
          planoUsuarioId: data.planoUsuarioId
        }
      });

      // Redireciona para o checkout do Stripe
      window.location.href = data.checkoutUrl;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PAGAMENTO,
        mensagem: 'Erro ao iniciar assinatura',
        detalhes: { error, planoId }
      });
      enqueueSnackbar('Erro ao iniciar assinatura. Tente novamente.', { variant: 'error' });
    } finally {
      setLoadingAssinatura(null);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography color="error">Erro ao carregar planos. Tente novamente.</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Planos de Assinatura
      </Typography>
      <Grid container spacing={3}>
        {planos.map((plano) => (
          <Grid item xs={12} sm={6} md={4} key={plano.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {plano.nome}
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom>
                  R$ {plano.valor.toFixed(2)}
                  <Typography component="span" variant="subtitle1">
                    /mês
                  </Typography>
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  {plano.descricao}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  • {plano.quantidadeEventos} eventos por mês
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  • Suporte {plano.nivelSuporte}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => handleAssinar(plano.id)}
                  disabled={loadingAssinatura === plano.id}
                >
                  {loadingAssinatura === plano.id ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Assinar Agora'
                  )}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, TextField, Alert, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { PageHeader } from '../../../components/common/PageHeader';
import { useCheckoutForm } from '../../../hooks/useCheckoutForm';

export default function CheckoutPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const { control, handleSubmit, formState: { errors } } = useCheckoutForm();
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const plano = {
    id,
    titulo: t(`planos.${id}.titulo`),
    preco: t(`planos.${id}.preco`),
  };

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, planoId: id }),
      });

      if (!response.ok) {
        throw new Error('Erro ao processar pagamento');
      }

      setSnackbar({ open: true, message: t('checkout.messages.sucesso'), severity: 'success' });
      router.push('/dashboard');
    } catch (error) {
      setSnackbar({ open: true, message: t('checkout.messages.erro'), severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title={t('Checkout')}
      />

      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {t('checkout.dadosPagamento')}
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    fullWidth
                    label={t('checkout.nome.label')}
                    margin="normal"
                    error={!!errors.nome}
                    helperText={errors.nome?.message}
                    {...control('nome')}
                  />

                  <TextField
                    fullWidth
                    label={t('checkout.numeroCartao.label')}
                    margin="normal"
                    error={!!errors.numeroCartao}
                    helperText={errors.numeroCartao?.message}
                    {...control('numeroCartao')}
                  />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label={t('checkout.validade.label')}
                        margin="normal"
                        error={!!errors.validade}
                        helperText={errors.validade?.message}
                        {...control('validade')}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label={t('checkout.cvv.label')}
                        margin="normal"
                        error={!!errors.cvv}
                        helperText={errors.cvv?.message}
                        {...control('cvv')}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isLoading}
                    sx={{ mt: 3 }}
                  >
                    {t('checkout.pagar')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {t('checkout.resumo')}
                </Typography>

                <Typography variant="body1" color="text.secondary" paragraph>
                  {plano.titulo}
                </Typography>

                <Typography variant="h5" color="primary" gutterBottom>
                  {plano.preco}
                </Typography>

                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={() => router.push(`/planos/${id}`)}
                  sx={{ mt: 2 }}
                >
                  {t('checkout.voltar')}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 
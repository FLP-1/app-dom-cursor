/**
 * Arquivo: novo.tsx
 * Caminho: src/pages/alerts/novo.tsx
 * Criado em: 2025-06-03
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, Typography, Snackbar, Alert, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { AlertService } from '@/services/alert.service';
import { FormInput } from '@/components/common/forms/FormInput';
import { FormSelect } from '@/components/common/forms/FormSelect';
import { tooltips } from '@/i18n/tooltips';

const tipos = [
  { value: 'AVISO', label: 'AVISO' },
  { value: 'MOTIVACIONAL', label: 'MOTIVACIONAL' },
  { value: 'LEMBRETE', label: 'LEMBRETE' },
  { value: 'VENCIMENTO', label: 'VENCIMENTO' },
];
const severidades = [
  { value: 'baixa', label: 'Baixa' },
  { value: 'média', label: 'Média' },
  { value: 'severa', label: 'Severa' },
  { value: 'urgente', label: 'Urgente' },
];

interface NovoAlertaForm {
  type: string;
  message: string;
  severity: string;
  channels: string;
}

const NovoAlerta: React.FC = () => {
  const { control, handleSubmit } = useForm<NovoAlertaForm>({
    defaultValues: { type: tipos[0].value, message: '', severity: severidades[0].value, channels: '' },
  });
  const [snackbar, setSnackbar] = React.useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const router = useRouter();

  const onSubmit = async (data: NovoAlertaForm) => {
    try {
      const result = await AlertService.addAlert({
        type: data.type,
        message: data.message,
        severity: data.severity,
        channels: data.channels.split(',').map((c) => c.trim()),
        criteria: {},
        preferences: {},
      });
      if (result) {
        setSnackbar({ open: true, message: 'Alerta criado com sucesso!', severity: 'success' });
        setTimeout(() => router.push('/alerts'), 1200);
      } else {
        setSnackbar({ open: true, message: 'Erro ao criar alerta.', severity: 'error' });
      }
    } catch {
      setSnackbar({ open: true, message: 'Erro ao criar alerta.', severity: 'error' });
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>Criar novo alerta</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} columns={12}>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
            <FormSelect
              name="type"
              label="Tipo"
              options={tipos}
              control={control}
              required
              tooltip={tooltips.tipoAlerta.pt}
            />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
            <FormSelect
              name="severity"
              label="Severidade"
              options={severidades}
              control={control}
              required
              tooltip={tooltips.severidadeAlerta?.pt}
            />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12' }}>
            <FormInput
              name="message"
              label="Mensagem"
              control={control}
              required
              multiline
              minRows={2}
              tooltip={tooltips.descricaoAlerta.pt}
            />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12' }}>
            <FormInput
              name="channels"
              label="Canais (separados por vírgula)"
              control={control}
              required
              helperText="Ex: email, sms, whatsapp"
              tooltip={tooltips.canaisAlerta?.pt}
            />
          </Grid>
        </Grid>
        <Box mt={3} display="flex" gap={2}>
          <Button type="submit" variant="contained" color="primary">Criar</Button>
          <Button variant="outlined" onClick={() => router.push('/alerts')}>Cancelar</Button>
        </Box>
      </form>
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
};

export default NovoAlerta; 

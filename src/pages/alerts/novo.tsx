/**
 * Arquivo: novo.tsx
 * Caminho: src/pages/alerts/novo.tsx
 * Criado em: 2025-06-03
 * Última atualização: 2025-01-27
 * Descrição: Página para criação de novos alertas
 */

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, Typography, Snackbar, Alert, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { AlertService } from '@/services/alert.service';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import { useMessages } from '@/hooks/useMessages';
import { alertasMessages } from '@/i18n/messages/alertas.messages';

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
  const { messages } = useMessages(alertasMessages);
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
        setSnackbar({ open: true, message: messages.form.success, severity: 'success' });
        setTimeout(() => router.push('/alerts'), 1200);
      } else {
        setSnackbar({ open: true, message: messages.form.error, severity: 'error' });
      }
    } catch {
      setSnackbar({ open: true, message: messages.form.error, severity: 'error' });
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>{messages.form.title}</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} columns={12}>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
            <FormSelect
              name="type"
              label={messages.form.fields.tipo.label}
              options={tipos}
              control={control}
              required
              tooltip={messages.form.fields.tipo.tooltip}
            />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
            <FormSelect
              name="severity"
              label={messages.form.fields.severidade.label}
              options={severidades}
              control={control}
              required
              tooltip={messages.form.fields.severidade.tooltip}
            />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12' }}>
            <FormInput
              name="message"
              label={messages.form.fields.mensagem.label}
              control={control}
              required
              multiline
              minRows={2}
              tooltip={messages.form.fields.mensagem.tooltip}
            />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12' }}>
            <FormInput
              name="channels"
              label={messages.form.fields.canais.label}
              control={control}
              required
              helperText={messages.form.fields.canais.helperText}
              tooltip={messages.form.fields.canais.tooltip}
            />
          </Grid>
        </Grid>
        <Box mt={3} display="flex" gap={2}>
          <Button type="submit" variant="contained" color="primary">
            {messages.form.buttons.create}
          </Button>
          <Button variant="outlined" onClick={() => router.push('/alerts')}>
            {messages.form.buttons.cancel}
          </Button>
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

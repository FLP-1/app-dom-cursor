import React from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Switch, FormControlLabel } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNotification } from '@/hooks/useNotification';
import { useRouter } from 'next/router';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBR from 'date-fns/locale/pt-BR';

const configuracaoSchema = z.object({
  horaInicio: z.date(),
  horaFim: z.date(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  raioMetros: z.number().min(100).max(1000).optional(),
  ativo: z.boolean()
});

type ConfiguracaoForm = z.infer<typeof configuracaoSchema>;

export default function ConfiguracaoPonto() {
  const { error, success } = useNotification();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const { control, handleSubmit, watch } = useForm<ConfiguracaoForm>({
    resolver: zodResolver(configuracaoSchema),
    defaultValues: {
      horaInicio: new Date(2024, 0, 1, 8, 0), // 08:00
      horaFim: new Date(2024, 0, 1, 18, 0),   // 18:00
      ativo: true
    }
  });

  const ativo = watch('ativo');

  const onSubmit = async (data: ConfiguracaoForm) => {
    try {
      setLoading(true);
      const response = await fetch('/api/ponto/configuracao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar configuração');
      }

      success('Configuração salva com sucesso!');
      router.push('/ponto/registrar');
    } catch (err) {
      error('Erro ao salvar configuração. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Configuração do Ponto
      </Typography>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
              <Box sx={{ mb: 3 }}>
                <Controller
                  name="horaInicio"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      label="Horário de Início"
                      value={field.value}
                      onChange={field.onChange}
                      disabled={!ativo}
                    />
                  )}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Controller
                  name="horaFim"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      label="Horário de Término"
                      value={field.value}
                      onChange={field.onChange}
                      disabled={!ativo}
                    />
                  )}
                />
              </Box>
            </LocalizationProvider>

            <Box sx={{ mb: 3 }}>
              <Controller
                name="ativo"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    }
                    label="Ativar registro de ponto"
                  />
                )}
              />
            </Box>

            {ativo && (
              <>
                <Typography variant="h6" gutterBottom>
                  Configuração de Localização
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Controller
                    name="latitude"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Latitude"
                        type="number"
                        fullWidth
                        disabled={!ativo}
                      />
                    )}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Controller
                    name="longitude"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Longitude"
                        type="number"
                        fullWidth
                        disabled={!ativo}
                      />
                    )}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Controller
                    name="raioMetros"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Raio Permitido (metros)"
                        type="number"
                        fullWidth
                        disabled={!ativo}
                        helperText="Distância máxima permitida do ponto de referência (100-1000m)"
                      />
                    )}
                  />
                </Box>
              </>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar Configuração'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
} 
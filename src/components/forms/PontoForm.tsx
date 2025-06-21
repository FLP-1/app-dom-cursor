/**
 * Arquivo: PontoForm.tsx
 * Caminho: src/components/forms/PontoForm.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Formulário para registro de ponto, incluindo tipos de registro, ocorrências, upload e validação.
 */

import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, TextField, MenuItem, Tooltip, Checkbox, FormControlLabel, Card, CardContent, Typography, Alert } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { RegistroPontoFormData, TipoRegistroPonto } from '@/types/ponto';
import { tooltips } from '@/i18n/tooltips';
import { useTranslation } from 'react-i18next';
import { CheckboxField } from '@/components/common/forms/CheckboxField';
// import { DocumentUpload } from '@/components/form/DocumentUpload'; // Supondo componente de upload já existente

export interface PontoFormProps {
  initialValues?: Partial<RegistroPontoFormData>;
  onSubmit: (data: Partial<RegistroPontoFormData> & { file?: File | null }) => void;
  onCancel?: () => void;
  loading?: boolean;
  horasDia?: string;
  horasSemana?: string;
  horasMes?: string;
  alertas?: string[];
}

const tiposRegistro = [
  { value: 'ENTRADA', label: 'Entrada (início dos trabalhos)' },
  { value: 'SAIDA', label: 'Saída (fim dos trabalhos)' },
  { value: 'INICIO_INTERVALO', label: 'Início do intervalo (almoço)' },
  { value: 'FIM_INTERVALO', label: 'Retorno do intervalo (almoço)' },
  { value: 'ENTRADA_EXTRA', label: 'Entrada de hora extra' },
  { value: 'SAIDA_EXTRA', label: 'Saída de hora extra' },
];

const ocorrencias = [
  { value: '', label: 'Nenhuma' },
  { value: 'atraso', label: 'Atraso' },
  { value: 'falta', label: 'Falta' },
  { value: 'justificativa', label: 'Justificativa' },
  // Adicione mais conforme necessário
];

const PontoForm: React.FC<PontoFormProps> = ({ initialValues = {}, onSubmit, onCancel, loading, horasDia, horasSemana, horasMes, alertas }) => {
  const { t } = useTranslation();
  const { control, handleSubmit, setValue } = useForm<Partial<RegistroPontoFormData>>({
    defaultValues: {
      tipo: initialValues.tipo || 'ENTRADA',
      observacao: initialValues.observacao || '',
      empregadoDomesticoId: initialValues.empregadoDomesticoId || '',
      esocialEventId: initialValues.esocialEventId || '',
      ocorrencia: '',
      aprovado: false,
    },
  });
  const [file, setFile] = useState<File | null>(null);
  const [geo, setGeo] = useState<{ lat?: number; lng?: number }>({});
  const [wifi, setWifi] = useState<{ ssid?: string; bssid?: string; signal?: number }>({});
  const [serverTime, setServerTime] = useState<string>('');

  // Buscar horário do backend ao abrir o form
  useEffect(() => {
    // Exemplo: api.get('/servertime').then(r => setServerTime(r.data.time))
    setServerTime(new Date().toLocaleString()); // Simulação
  }, []);

  // Capturar geolocalização
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setGeo({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
    // TODO: Capturar rede Wi-Fi (restrito em browsers, possível em apps mobile)
    setWifi({ ssid: '', bssid: '', signal: undefined });
  }, []);

  return (
    <Box component="form" onSubmit={handleSubmit((data) => onSubmit({ ...data, file }))} sx={{ mt: 2 }}>
      <Grid container spacing={2} columns={12}>
        {/* Alertas */}
        {alertas && alertas.length > 0 && (
          <Grid gridColumn={{ xs: 'span 12' }}>
            {alertas.map((msg, idx) => (
              <Alert key={idx} severity="warning" sx={{ mb: 1 }}>{msg}</Alert>
            ))}
          </Grid>
        )}
        {/* Cards de horas */}
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">{t('Horas trabalhadas hoje')}</Typography>
              <Typography variant="h6">{horasDia || '--:--'}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">{t('Horas semanais')}</Typography>
              <Typography variant="h6">{horasSemana || '--:--'}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">{t('Horas mensais')}</Typography>
              <Typography variant="h6">{horasMes || '--:--'}</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Tipo de registro */}
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Tooltip title={t('Selecione o tipo de registro de ponto')}>
            <span>
              <Controller
                name="tipo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label={t('Tipo de registro')}
                    fullWidth
                    aria-label="Tipo de registro de ponto"
                  >
                    {tiposRegistro.map((tipo) => (
                      <MenuItem key={tipo.value} value={tipo.value}>{tipo.label}</MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </span>
          </Tooltip>
        </Grid>
        {/* Ocorrência */}
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Tooltip title={t('Selecione uma ocorrência, se houver')}>
            <span>
              <Controller
                name="ocorrencia"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label={t('Ocorrência')}
                    fullWidth
                    aria-label="Ocorrência do ponto"
                  >
                    {ocorrencias.map((o) => (
                      <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </span>
          </Tooltip>
        </Grid>
        {/* Observação */}
        <Grid gridColumn={{ xs: 'span 12' }}>
          <Tooltip title={t('Observações adicionais sobre o registro de ponto')}>
            <span>
              <Controller
                name="observacao"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('Observação')}
                    fullWidth
                    multiline
                    minRows={2}
                    aria-label="Observação do ponto"
                  />
                )}
              />
            </span>
          </Tooltip>
        </Grid>
        {/* Upload de arquivo */}
        <Grid gridColumn={{ xs: 'span 12' }}>
          <Tooltip title={t('Anexe um documento, se necessário (atestados, justificativas, etc.)')}>
            <span>
              <Box sx={{ mt: 1 }}>
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={e => setFile(e.target.files?.[0] || null)}
                  aria-label="Upload de documento do ponto"
                />
              </Box>
            </span>
          </Tooltip>
        </Grid>
        {/* Checkbox aprovação */}
        <Grid gridColumn={{ xs: 'span 12' }}>
          <Tooltip title={t('Aprovação do empregador para este registro de ponto')}>
            <span>
              <CheckboxField<Partial<RegistroPontoFormData>>
                name="aprovado"
                control={control}
                label={t('Aprovado pelo empregador')}
                aria-label="Aprovação do empregador"
              />
            </span>
          </Tooltip>
        </Grid>
        {/* Horário, geolocalização, wifi (readonly) */}
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
          <TextField
            label={t('Horário do registro (servidor)')}
            value={serverTime}
            fullWidth
            InputProps={{ readOnly: true }}
            aria-label="Horário do registro"
            sx={{ mt: 2 }}
          />
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
          <TextField
            label={t('Geolocalização')}
            value={geo.lat && geo.lng ? `${geo.lat.toFixed(5)}, ${geo.lng.toFixed(5)}` : '--'}
            fullWidth
            InputProps={{ readOnly: true }}
            aria-label="Geolocalização do registro"
            sx={{ mt: 2 }}
          />
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
          <TextField
            label={t('Rede Wi-Fi')}
            value={wifi.ssid ? `${wifi.ssid} (${wifi.signal || ''})` : '--'}
            fullWidth
            InputProps={{ readOnly: true }}
            aria-label="Rede Wi-Fi do registro"
            sx={{ mt: 2 }}
          />
        </Grid>
        {/* Botões */}
        <Grid gridColumn={{ xs: 'span 12' }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          {onCancel && (
            <Button onClick={onCancel} color="secondary" variant="outlined" aria-label="Cancelar" disabled={loading}>
              {t('Cancelar')}
            </Button>
          )}
          <Button type="submit" color="primary" variant="contained" aria-label="Registrar ponto" disabled={loading}>
            {t('Registrar ponto')}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PontoForm; 

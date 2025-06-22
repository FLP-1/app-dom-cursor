/**
 * Arquivo: AlertFilters.tsx
 * Caminho: src/components/alerts/AlertFilters.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Componente de filtros de alertas com mensagens centralizadas
 */

import React from 'react';
import { Grid, TextField, MenuItem, Tooltip, InputAdornment } from '@mui/material';
import { Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { tooltips } from '@/i18n/tooltips';
import { interfaceMessages } from '@/i18n/messages/interface.messages';
import { useLanguage } from '@/hooks/useLanguage';

interface AlertFiltersProps {
  control: any; // Use o tipo correto do react-hook-form se disponível
  tipos?: string[];
}

const severidades = [
  { value: '', label: 'Todas' },
  { value: 'baixa', label: 'Baixa' },
  { value: 'média', label: 'Média' },
  { value: 'severa', label: 'Severa' },
  { value: 'urgente', label: 'Urgente' },
];

export const AlertFilters: React.FC<AlertFiltersProps> = ({ control, tipos }) => {
  const { language } = useLanguage();
  const messages = interfaceMessages[language].common;

  return (
    <Grid container columns={12} spacing={2} alignItems="center">
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 2', md: 'span 2', lg: 'span 2', xl: 'span 2' }}>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Tooltip title={tooltips.tipoAlerta[language]} arrow>
              <span>
                <TextField select label={messages.type} fullWidth size="small" {...field}>
                  <MenuItem value="">{messages.all}</MenuItem>
                  {tipos?.map((tipo) => (
                    <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                  ))}
                </TextField>
              </span>
            </Tooltip>
          )}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 2', md: 'span 2', lg: 'span 2', xl: 'span 2' }}>
        <Controller
          name="severity"
          control={control}
          render={({ field }) => (
            <Tooltip title={tooltips.severidadeAlerta[language]} arrow>
              <span>
                <TextField select label={messages.severity} fullWidth size="small" {...field}>
                  {severidades.map((s) => (
                    <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
                  ))}
                </TextField>
              </span>
            </Tooltip>
          )}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 2', md: 'span 2', lg: 'span 2', xl: 'span 2' }}>
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <Tooltip title={tooltips.alertaDataInicial[language]} arrow>
              <span>
                <DatePicker
                  label={messages.initialDate}
                  inputFormat="dd/MM/yyyy"
                  {...field}
                  slotProps={{ textField: { fullWidth: true, size: 'small' } }}
                />
              </span>
            </Tooltip>
          )}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 2', md: 'span 2', lg: 'span 2', xl: 'span 2' }}>
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <Tooltip title={tooltips.alertaDataFinal[language]} arrow>
              <span>
                <DatePicker
                  label={messages.finalDate}
                  inputFormat="dd/MM/yyyy"
                  {...field}
                  slotProps={{ textField: { fullWidth: true, size: 'small' } }}
                />
              </span>
            </Tooltip>
          )}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4', md: 'span 4', lg: 'span 4', xl: 'span 4' }}>
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <Tooltip title={tooltips.descricaoAlerta[language]} arrow>
              <span>
                <TextField label={messages.message} fullWidth size="medium" {...field} />
              </span>
            </Tooltip>
          )}
        />
      </Grid>
    </Grid>
  );
}; 

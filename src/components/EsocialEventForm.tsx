/**
 * Arquivo: EsocialEventForm.tsx
 * Caminho: src/components/EsocialEventForm.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { Box, Grid, Button, Typography, Alert, CircularProgress } from '@mui/material';
import { FormInput } from '@/components/common/forms/FormInput';
import { FormSelect } from '@/components/common/forms/FormSelect';
import { useTranslation } from 'react-i18next';
import { EsocialEventStatus, EsocialEventType, EsocialEvent } from '@/types/esocial-event';
import { Control } from 'react-hook-form';

interface EsocialEventFormProps {
  control: Control<Partial<EsocialEvent>>;
  tipos: EsocialEventType[];
  loading: boolean;
  error: string | null;
  isEdit: boolean;
  onSubmit: () => void;
  registerWithValidation?: (name: keyof Partial<EsocialEvent>) => Record<string, unknown>;
}

const statusOptions = [
  { value: 'PENDING', label: 'Pendente' },
  { value: 'SENT', label: 'Enviado' },
  { value: 'PROCESSED', label: 'Processado' },
  { value: 'REJECTED', label: 'Rejeitado' },
];

const EsocialEventForm: React.FC<EsocialEventFormProps> = ({ control, tipos, loading, error, isEdit, onSubmit, registerWithValidation }) => {
  const { t } = useTranslation();

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ p: 2 }}>
      <Typography variant="h5" mb={2}>{isEdit ? t('Editar Evento do eSocial') : t('Novo Evento do eSocial')}</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{t(error)}</Alert>}
      <Grid container spacing={2} columns={12}>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 2' }}>
          <FormInput name="codigo" label={t('Código')} control={control} fullWidth inputProps={{ 'aria-label': t('Código') }} />
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
          <FormInput name="descricao" label={t('Descrição')} control={control} fullWidth inputProps={{ 'aria-label': t('Descrição') }} />
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
          <FormSelect name="tipoId" label={t('Tipo de Evento')} control={control} options={tipos.map(tipo => ({ value: tipo.id, label: `${tipo.codigo} - ${tipo.descricao}` }))} fullWidth inputProps={{ 'aria-label': t('Tipo de Evento') }} />
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
          <FormSelect name="status" label={t('Status')} control={control} options={statusOptions} fullWidth inputProps={{ 'aria-label': t('Status') }} />
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 6' }}>
          <FormInput name="xmlPayload" label={t('XML do Evento')} control={control} fullWidth multiline minRows={3} inputProps={{ 'aria-label': t('XML do Evento') }} />
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
          <FormInput name="empregadorId" label={t('Empregador')} control={control} fullWidth inputProps={{ 'aria-label': t('Empregador') }} />
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
          <FormInput name="usuarioId" label={t('Usuário')} control={control} fullWidth inputProps={{ 'aria-label': t('Usuário') }} />
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
          <FormInput name="dataEnvio" label={t('Data de Envio')} type="date" control={control} fullWidth inputProps={{ 'aria-label': t('Data de Envio') }} {...(registerWithValidation ? registerWithValidation('dataEnvio') : {})} />
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
          <FormInput name="dataRetorno" label={t('Data de Retorno')} type="date" control={control} fullWidth inputProps={{ 'aria-label': t('Data de Retorno') }} {...(registerWithValidation ? registerWithValidation('dataRetorno') : {})} />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>{isEdit ? t('Salvar Alterações') : t('Criar Evento')}</Button>
        {loading && <CircularProgress size={24} />}
      </Box>
    </Box>
  );
};

export default EsocialEventForm; 

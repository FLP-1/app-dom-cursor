import React from 'react';
import { Grid, Button, Box, Typography, Tooltip } from '@mui/material';
import { FormInput } from './common/forms/FormInput';
import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { ParceiroFormValues } from '../hooks/forms/useParceiroForm';

interface ParceiroFormProps {
  control: Control<ParceiroFormValues>;
  loading: boolean;
  error: string | null;
  success: string | null;
  onSubmit: () => void;
}

export const ParceiroForm: React.FC<ParceiroFormProps> = ({ control, loading, error, success, onSubmit }) => {
  const { t } = useTranslation();
  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>{t('Cadastro de Parceiro')}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Tooltip title={t('Nome do parceiro ou empresa.')}> <div><FormInput name="name" label={t('Nome')} control={control} required inputProps={{ 'aria-label': t('Nome do parceiro') }} /></div> </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title={t('CNPJ do parceiro.')}> <div><FormInput name="cnpj" label={t('CNPJ')} control={control} required inputProps={{ 'aria-label': t('CNPJ do parceiro') }} /></div> </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title={t('E-mail de contato do parceiro.')}> <div><FormInput name="email" label={t('E-mail')} control={control} required inputProps={{ 'aria-label': t('E-mail do parceiro') }} /></div> </Tooltip>
        </Grid>
      </Grid>
      <Box mt={3} display="flex" gap={2}>
        <Button type="submit" variant="contained" color="primary" disabled={loading} aria-label={t('Salvar')}>
          {loading ? t('Salvando...') : t('Salvar')}
        </Button>
        {error && <Typography color="error">{t(error)}</Typography>}
        {success && <Typography color="primary">{t(success)}</Typography>}
      </Box>
    </Box>
  );
};

// Sugestão de testes automatizados:
// - Deve validar todos os campos obrigatórios
// - Deve exibir mensagens de erro e sucesso internacionalizáveis
// - Deve garantir acessibilidade e responsividade
// - Deve chamar o onSubmit corretamente 
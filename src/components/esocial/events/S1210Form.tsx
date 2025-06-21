/**
 * Arquivo: S1210Form.tsx
 * Caminho: src/components/esocial/events/S1210Form.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { Grid } from '@mui/material';
import { FormInput, FormDatePicker, FormSelect, FormMoneyInput, FormTextArea } from '@/components/form';

interface S1210FormProps {
  control: Control;
}

export const S1210Form = ({ control }: S1210FormProps) => {
  const { t } = useTranslation('esocial');

  const tiposRendimento = Object.entries(t('tiposRendimento', { returnObjects: true })).map(([value, label]) => ({
    value,
    label
  }));

  return (
    <Grid container spacing={2} columns={12}>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          name="cpf"
          label={t('campos.cpf')}
          control={control}
          required
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          name="dataPagamento"
          label={t('campos.dataPagamento')}
          control={control}
          required
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          name="tipoRendimento"
          label={t('campos.tipoRendimento')}
          control={control}
          options={tiposRendimento}
          required
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormMoneyInput
          name="valorBruto"
          label={t('campos.valorBruto')}
          control={control}
          required
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormMoneyInput
          name="valorINSS"
          label={t('campos.valorINSS')}
          control={control}
          required
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormMoneyInput
          name="valorIRRF"
          label={t('campos.valorIRRF')}
          control={control}
          required
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormMoneyInput
          name="valorFGTS"
          label={t('campos.valorFGTS')}
          control={control}
          required
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormMoneyInput
          name="valorLiquido"
          label={t('campos.valorLiquido')}
          control={control}
          required
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormTextArea
          name="observacao"
          label={t('campos.observacao')}
          control={control}
          minRows={2}
        />
      </Grid>
    </Grid>
  );
}; 

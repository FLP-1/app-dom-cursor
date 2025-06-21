/**
 * Arquivo: S2400Form.tsx
 * Caminho: src/components/esocial/events/S2400Form.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { Grid } from '@mui/material';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormDatePicker } from '@/components/forms/inputs/FormDatePicker';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import { FormMoneyInput } from '@/components/forms/inputs/FormMoneyInput';
import { FormTextArea } from '@/components/forms/inputs/FormTextArea';

// Justificativa: integração com react-hook-form, tipagem dinâmica dos campos
interface S2400FormProps {
  control: Control<unknown>;
}

export const S2400Form = ({ control }: S2400FormProps) => {
  const { t } = useTranslation('esocial');

  const tiposBeneficio = Object.entries(t('campos.S2400.tiposBeneficio', { returnObjects: true })).map(([value, label]) => ({
    value,
    label
  }));

  return (
    <Grid container spacing={3} columns={12}>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          name="cpf"
          control={control}
          label={t('campos.S2400.cpf')}
          required
          fullWidth
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          name="dataInicioBeneficio"
          control={control}
          label={t('campos.S2400.dataInicioBeneficio')}
          required
          fullWidth
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          name="tipoBeneficio"
          control={control}
          label={t('campos.S2400.tipoBeneficio')}
          options={tiposBeneficio}
          required
          fullWidth
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormMoneyInput
          name="valorBeneficio"
          control={control}
          label={t('campos.S2400.valorBeneficio')}
          required
          fullWidth
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          name="dataFimBeneficio"
          control={control}
          label={t('campos.S2400.dataFimBeneficio')}
          fullWidth
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          name="motivoFimBeneficio"
          control={control}
          label={t('campos.S2400.motivoFimBeneficio')}
          fullWidth
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormTextArea
          name="observacao"
          control={control}
          label={t('campos.S2400.observacao')}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}; 

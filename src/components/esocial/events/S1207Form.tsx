import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { Grid } from '@mui/material';
import { FormInput, FormDatePicker, FormSelect, FormMoneyInput, FormTextArea } from '@/components/form';

interface S1207FormProps {
  control: Control;
}

export const S1207Form = ({ control }: S1207FormProps) => {
  const { t } = useTranslation('esocial');

  const tiposBeneficio = Object.entries(t('tiposBeneficio', { returnObjects: true })).map(([value, label]) => ({
    value,
    label
  }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <FormInput
          name="cpf"
          label={t('campos.cpf')}
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormDatePicker
          name="dataInicioBeneficio"
          label={t('campos.dataInicioBeneficio')}
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormSelect
          name="tipoBeneficio"
          label={t('campos.tipoBeneficio')}
          control={control}
          options={tiposBeneficio}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormMoneyInput
          name="valorBeneficio"
          label={t('campos.valorBeneficio')}
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormDatePicker
          name="dataFimBeneficio"
          label={t('campos.dataFimBeneficio')}
          control={control}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormInput
          name="motivoFimBeneficio"
          label={t('campos.motivoFimBeneficio')}
          control={control}
        />
      </Grid>
      <Grid item xs={12}>
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
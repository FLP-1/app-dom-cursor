import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { Grid } from '@mui/material';
import { FormInput } from '@/components/form/FormInput';
import { FormDatePicker } from '@/components/form/FormDatePicker';
import { FormSelect } from '@/components/form/FormSelect';
import { FormMoneyInput } from '@/components/form/FormMoneyInput';
import { FormTextArea } from '@/components/form/FormTextArea';

interface S2400FormProps {
  control: Control<any>;
}

export const S2400Form = ({ control }: S2400FormProps) => {
  const { t } = useTranslation('esocial');

  const tiposBeneficio = Object.entries(t('campos.S2400.tiposBeneficio', { returnObjects: true })).map(([value, label]) => ({
    value,
    label
  }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <FormInput
          name="cpf"
          control={control}
          label={t('campos.S2400.cpf')}
          required
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormDatePicker
          name="dataInicioBeneficio"
          control={control}
          label={t('campos.S2400.dataInicioBeneficio')}
          required
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          name="tipoBeneficio"
          control={control}
          label={t('campos.S2400.tipoBeneficio')}
          options={tiposBeneficio}
          required
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormMoneyInput
          name="valorBeneficio"
          control={control}
          label={t('campos.S2400.valorBeneficio')}
          required
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormDatePicker
          name="dataFimBeneficio"
          control={control}
          label={t('campos.S2400.dataFimBeneficio')}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          name="motivoFimBeneficio"
          control={control}
          label={t('campos.S2400.motivoFimBeneficio')}
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
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
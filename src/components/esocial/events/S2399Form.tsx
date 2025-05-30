import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { Grid } from '@mui/material';
import { FormInput, FormDatePicker, FormSelect, FormTextArea } from '@/components/form';

interface S2399FormProps {
  control: Control;
}

export const S2399Form = ({ control }: S2399FormProps) => {
  const { t } = useTranslation('esocial');

  const motivosDesligamento = Object.entries(t('motivosDesligamento', { returnObjects: true })).map(([value, label]) => ({
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
          name="dataDesligamento"
          label={t('campos.dataDesligamento')}
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormSelect
          name="motivoDesligamento"
          label={t('campos.motivoDesligamento')}
          control={control}
          options={motivosDesligamento}
          required
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
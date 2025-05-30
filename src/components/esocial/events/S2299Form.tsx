import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { FormInput, FormDatePicker } from '@/components/form';
import { Grid } from '@mui/material';

interface S2299FormProps {
  control: Control;
}

export const S2299Form = ({ control }: S2299FormProps) => {
  const { t } = useTranslation('esocial');

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <FormInput
          name="cpf"
          label={t('events.S2299.cpf')}
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormDatePicker
          name="dataDesligamento"
          label={t('events.S2299.dataDesligamento')}
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          name="motivoDesligamento"
          label={t('events.S2299.motivoDesligamento')}
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          name="observacao"
          label={t('events.S2299.observacao')}
          control={control}
          multiline
          rows={4}
        />
      </Grid>
    </Grid>
  );
}; 
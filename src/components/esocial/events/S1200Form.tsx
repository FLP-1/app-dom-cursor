import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { Grid } from '@mui/material';
import { FormInput, FormDatePicker, FormMoneyInput, FormTextArea } from '@/components/form';

interface S1200FormProps {
  control: Control;
}

export const S1200Form = ({ control }: S1200FormProps) => {
  const { t } = useTranslation('esocial');

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
          name="competencia"
          label={t('campos.competencia')}
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormMoneyInput
          name="valorTotal"
          label={t('campos.valorTotal')}
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormMoneyInput
          name="valorBaseINSS"
          label={t('campos.valorBaseINSS')}
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormMoneyInput
          name="valorBaseIRRF"
          label={t('campos.valorBaseIRRF')}
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormMoneyInput
          name="valorBaseFGTS"
          label={t('campos.valorBaseFGTS')}
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormMoneyInput
          name="valorFGTS"
          label={t('campos.valorFGTS')}
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormMoneyInput
          name="valorINSS"
          label={t('campos.valorINSS')}
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormMoneyInput
          name="valorIRRF"
          label={t('campos.valorIRRF')}
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormMoneyInput
          name="valorOutrasEntidades"
          label={t('campos.valorOutrasEntidades')}
          control={control}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormMoneyInput
          name="valorOutrasDeducoes"
          label={t('campos.valorOutrasDeducoes')}
          control={control}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormMoneyInput
          name="valorLiquido"
          label={t('campos.valorLiquido')}
          control={control}
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
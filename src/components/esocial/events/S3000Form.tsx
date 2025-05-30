import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { Grid } from '@mui/material';
import { FormInput, FormDatePicker, FormSelect, FormTextArea } from '@/components/form';
import { TipoEventoEsocial } from '@/types/esocial';

interface S3000FormProps {
  control: Control;
}

export const S3000Form = ({ control }: S3000FormProps) => {
  const { t } = useTranslation('esocial');

  const tiposEvento = Object.values(TipoEventoEsocial).map(tipo => ({
    value: tipo,
    label: t(`eventos.${tipo}`)
  }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <FormSelect
          name="tipoEventoExcluido"
          label={t('campos.tipoEventoExcluido')}
          control={control}
          options={tiposEvento}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormInput
          name="protocoloEventoExcluido"
          label={t('campos.protocoloEventoExcluido')}
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormDatePicker
          name="dataExclusao"
          label={t('campos.dataExclusao')}
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormTextArea
          name="justificativa"
          label={t('campos.justificativa')}
          control={control}
          required
          minRows={3}
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
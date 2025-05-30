import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { Grid } from '@mui/material';
import { FormInput, FormDatePicker, FormSelect, FormMoneyInput, FormTextArea } from '@/components/form';

interface S2300FormProps {
  control: Control;
}

export const S2300Form = ({ control }: S2300FormProps) => {
  const { t } = useTranslation('esocial');

  const tiposTrabalhador = Object.entries(t('tiposTrabalhador', { returnObjects: true })).map(([value, label]) => ({
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
        <FormInput
          name="nome"
          label={t('campos.nome')}
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormDatePicker
          name="dataNascimento"
          label={t('campos.dataNascimento')}
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormSelect
          name="sexo"
          label={t('campos.sexo')}
          control={control}
          options={[
            { value: 'M', label: 'Masculino' },
            { value: 'F', label: 'Feminino' }
          ]}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormInput
          name="pis"
          label={t('campos.pis')}
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormDatePicker
          name="dataInicio"
          label={t('campos.dataInicio')}
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormDatePicker
          name="dataFim"
          label={t('campos.dataFim')}
          control={control}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormSelect
          name="tipoTrabalhador"
          label={t('campos.tipoTrabalhador')}
          control={control}
          options={tiposTrabalhador}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormInput
          name="cargo"
          label={t('campos.cargo')}
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormMoneyInput
          name="valorHora"
          label={t('campos.valorHora')}
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormInput
          name="cargaHoraria"
          label={t('campos.cargaHoraria')}
          type="number"
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
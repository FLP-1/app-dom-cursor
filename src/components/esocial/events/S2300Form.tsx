/**
 * Arquivo: S2300Form.tsx
 * Caminho: src/components/esocial/events/S2300Form.tsx
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
import { tooltips } from '@/i18n/tooltips';

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
    <Grid container spacing={3} columns={12}>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          name="cpf"
          label={t('campos.cpf')}
          control={control}
          required
          tooltip={tooltips.s2300_cpf[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          name="nome"
          label={t('campos.nome')}
          control={control}
          required
          tooltip={tooltips.s2300_nome[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          name="dataNascimento"
          label={t('campos.dataNascimento')}
          control={control}
          required
          tooltip={tooltips.s2300_dataNascimento[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          name="sexo"
          label={t('campos.sexo')}
          control={control}
          options={[
            { value: 'M', label: 'Masculino' },
            { value: 'F', label: 'Feminino' }
          ]}
          required
          tooltip={tooltips.s2300_sexo[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          name="pis"
          label={t('campos.pis')}
          control={control}
          required
          tooltip={tooltips.s2300_pis[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          name="dataInicio"
          label={t('campos.dataInicio')}
          control={control}
          required
          tooltip={tooltips.s2300_dataInicio[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          name="dataFim"
          label={t('campos.dataFim')}
          control={control}
          tooltip={tooltips.s2300_dataFim[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          name="tipoTrabalhador"
          label={t('campos.tipoTrabalhador')}
          control={control}
          options={tiposTrabalhador}
          required
          tooltip={tooltips.s2300_tipoTrabalhador[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          name="cargo"
          label={t('campos.cargo')}
          control={control}
          required
          tooltip={tooltips.s2300_cargo[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormMoneyInput
          name="valorHora"
          label={t('campos.valorHora')}
          control={control}
          required
          tooltip={tooltips.s2300_valorHora[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          name="cargaHoraria"
          label={t('campos.cargaHoraria')}
          type="number"
          control={control}
          required
          tooltip={tooltips.s2300_cargaHoraria[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormTextArea
          name="observacao"
          label={t('campos.observacao')}
          control={control}
          minRows={2}
          tooltip={tooltips.s2300_observacao[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
    </Grid>
  );
}; 

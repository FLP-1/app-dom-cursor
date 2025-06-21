/**
 * Arquivo: S2399Form.tsx
 * Caminho: src/components/esocial/events/S2399Form.tsx
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
    <Grid container spacing={3} columns={12}>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          name="cpf"
          label={t('campos.cpf')}
          control={control}
          required
          tooltip={tooltips.s2399_cpf[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          name="dataDesligamento"
          label={t('campos.dataDesligamento')}
          control={control}
          required
          tooltip={tooltips.s2399_dataDesligamento[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          name="motivoDesligamento"
          label={t('campos.motivoDesligamento')}
          control={control}
          options={motivosDesligamento}
          required
          tooltip={tooltips.s2399_motivoDesligamento[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormTextArea
          name="observacao"
          label={t('campos.observacao')}
          control={control}
          minRows={2}
          tooltip={tooltips.s2399_observacao[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
    </Grid>
  );
}; 

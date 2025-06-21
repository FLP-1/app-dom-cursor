/**
 * Arquivo: S2299Form.tsx
 * Caminho: src/components/esocial/events/S2299Form.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormDatePicker } from '@/components/forms/inputs/FormDatePicker';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import { FormMoneyInput } from '@/components/forms/inputs/FormMoneyInput';
import { FormTextArea } from '@/components/forms/inputs/FormTextArea';
import { Grid } from '@mui/material';
import { tooltips } from '@/i18n/tooltips';

interface S2299FormProps {
  control: Control;
}

export const S2299Form = ({ control }: S2299FormProps) => {
  const { t } = useTranslation('esocial');

  return (
    <Grid container spacing={3} columns={12}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="cpf"
          label={t('events.S2299.cpf')}
          control={control}
          required
          tooltip={tooltips.s2299_cpf[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataDesligamento"
          label={t('events.S2299.dataDesligamento')}
          control={control}
          required
          tooltip={tooltips.s2299_dataDesligamento[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="motivoDesligamento"
          label={t('events.S2299.motivoDesligamento')}
          control={control}
          required
          tooltip={tooltips.s2299_motivoDesligamento[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="observacao"
          label={t('events.S2299.observacao')}
          control={control}
          multiline
          rows={4}
          tooltip={tooltips.s2299_observacao[locale]}
        />
      </Grid>
    </Grid>
  );
}; 

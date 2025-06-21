/**
 * Arquivo: S2235Form.tsx
 * Caminho: src/components/esocial/events/S2235Form.tsx
 * Criado em: 2025-06-04
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormDatePicker } from '@/components/forms/inputs/FormDatePicker';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import { useTranslation } from 'next-i18next';
import { tooltips } from '@/constants/tooltips';

interface S2235FormProps {
  control: Control<unknown>;
}

export const S2235Form = ({ control }: S2235FormProps) => {
  const { t } = useTranslation();

  // Exemplo de opções fictícias para tipo de afastamento
  const tiposAfastamento = [
    { value: '1', label: t('esocial:events.S2235.tipoAfastamento.licenca') },
    { value: '2', label: t('esocial:events.S2235.tipoAfastamento.doenca') },
    { value: '3', label: t('esocial:events.S2235.tipoAfastamento.acidente') },
  ];

  return (
    <Grid container spacing={3} columns={12}>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.cpf"
          label={t('esocial:events.S2235.cpf')}
          mask="999.999.999-99"
          tooltip={tooltips.s2235_cpf[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          control={control}
          name="payload.dataEvento"
          label={t('esocial:events.S2235.dataEvento')}
          tooltip={tooltips.s2235_dataEvento[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.tipoAfastamento"
          label={t('esocial:events.S2235.tipoAfastamento')}
          options={tiposAfastamento}
          tooltip={tooltips.s2235_tipoAfastamento[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.motivo"
          label={t('esocial:events.S2235.motivo')}
          tooltip={tooltips.s2235_motivo[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          control={control}
          name="payload.observacao"
          label={t('esocial:events.S2235.observacao')}
          multiline
          rows={4}
          tooltip={tooltips.s2235_observacao[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
    </Grid>
  );
}; 

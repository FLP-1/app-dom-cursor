/**
 * Arquivo: S1200Form.tsx
 * Caminho: src/components/esocial/events/S1200Form.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { Grid } from '@mui/material';
import { FormInput, FormDatePicker, FormMoneyInput, FormTextArea } from '@/components/form';
import { tooltips } from '@/utils/tooltips';

interface S1200FormProps {
  control: Control;
}

export const S1200Form = ({ control }: S1200FormProps) => {
  const { t, i18n } = useTranslation('esocial');
  const locale = i18n.language;

  return (
    <Grid container spacing={2} columns={12}>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          name="cpf"
          label={t('campos.cpf')}
          control={control}
          required
          tooltip={tooltips.s1200_cpf[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          name="competencia"
          label={t('campos.competencia')}
          control={control}
          required
          tooltip={tooltips.s1200_competencia[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormMoneyInput
          name="valorTotal"
          label={t('campos.valorTotal')}
          control={control}
          required
          tooltip={tooltips.s1200_valorTotal[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormMoneyInput
          name="valorBaseINSS"
          label={t('campos.valorBaseINSS')}
          control={control}
          required
          tooltip={tooltips.s1200_valorBaseINSS[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormMoneyInput
          name="valorBaseIRRF"
          label={t('campos.valorBaseIRRF')}
          control={control}
          required
          tooltip={tooltips.s1200_valorBaseIRRF[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormMoneyInput
          name="valorBaseFGTS"
          label={t('campos.valorBaseFGTS')}
          control={control}
          required
          tooltip={tooltips.s1200_valorBaseFGTS[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormMoneyInput
          name="valorFGTS"
          label={t('campos.valorFGTS')}
          control={control}
          required
          tooltip={tooltips.s1200_valorFGTS[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormMoneyInput
          name="valorINSS"
          label={t('campos.valorINSS')}
          control={control}
          required
          tooltip={tooltips.s1200_valorINSS[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormMoneyInput
          name="valorIRRF"
          label={t('campos.valorIRRF')}
          control={control}
          required
          tooltip={tooltips.s1200_valorIRRF[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormMoneyInput
          name="valorOutrasEntidades"
          label={t('campos.valorOutrasEntidades')}
          control={control}
          tooltip={tooltips.s1200_valorOutrasEntidades[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormMoneyInput
          name="valorOutrasDeducoes"
          label={t('campos.valorOutrasDeducoes')}
          control={control}
          tooltip={tooltips.s1200_valorOutrasDeducoes[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormMoneyInput
          name="valorLiquido"
          label={t('campos.valorLiquido')}
          control={control}
          required
          tooltip={tooltips.s1200_valorLiquido[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormTextArea
          name="observacoes"
          label={t('campos.observacoes')}
          control={control}
          tooltip={tooltips.s1200_observacoes[locale]}
        />
      </Grid>
    </Grid>
  );
}; 

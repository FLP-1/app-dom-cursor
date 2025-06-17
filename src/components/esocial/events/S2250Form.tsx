/**
 * Arquivo: S2250Form.tsx
 * Caminho: src/components/esocial/events/S2250Form.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { Grid, Typography } from '@mui/material';
import { Control } from 'react-hook-form';
import { FormInput } from '@/components/form/FormInput';
import { FormDatePicker } from '@/components/form/FormDatePicker';
import { FormSelect } from '@/components/form/FormSelect';
import { useTranslation } from 'next-i18next';
import { useEsocialTabela } from '@/hooks/useEsocialTabela';
import { useEffect, useState } from 'react';
import type { PaisItem, MotivoAvisoItem } from '@/types/esocial';
import { tooltips } from '@/constants/tooltips';

// Justificativa: integração com react-hook-form, tipagem dinâmica dos campos
interface S2250FormProps {
  control: Control<unknown>;
}

export const S2250Form = ({ control }: S2250FormProps) => {
  const { t } = useTranslation();
  const { getTabela } = useEsocialTabela();
  // Justificativa: tipo depende de dados dinâmicos da API
  const [motivosAviso, setMotivosAviso] = useState<MotivoAvisoItem[]>([]);

  useEffect(() => {
    const carregarTabelas = async () => {
      const [motivos] = await Promise.all([
        getTabela('25') // Motivos de Aviso Prévio
      ]);

      if (motivos) setMotivosAviso(motivos.itens);
    };

    carregarTabelas();
  }, [getTabela]);

  return (
    <Grid container spacing={3} columns={12}>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.cpf"
          label={t('esocial:events.S2250.cpf')}
          mask="999.999.999-99"
          tooltip={tooltips.s2250_cpf[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          control={control}
          name="payload.dataAviso"
          label={t('esocial:events.S2250.dataAviso')}
          tooltip={tooltips.s2250_dataAviso[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          control={control}
          name="payload.dataInicioAviso"
          label={t('esocial:events.S2250.dataInicioAviso')}
          tooltip={tooltips.s2250_dataInicioAviso[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          control={control}
          name="payload.dataFimAviso"
          label={t('esocial:events.S2250.dataFimAviso')}
          tooltip={tooltips.s2250_dataFimAviso[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.tipoAviso"
          label={t('esocial:events.S2250.tipoAviso')}
          options={[
            { value: '1', label: t('esocial:events.S2250.tipoAviso.trabalhador') },
            { value: '2', label: t('esocial:events.S2250.tipoAviso.empregador') }
          ]}
          tooltip={tooltips.s2250_tipoAviso[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.codigoMotivoAviso"
          label={t('esocial:events.S2250.codigoMotivoAviso')}
          options={motivosAviso.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
          tooltip={tooltips.s2250_codigoMotivoAviso[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.motivoAviso"
          label={t('esocial:events.S2250.motivoAviso')}
          tooltip={tooltips.s2250_motivoAviso[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          control={control}
          name="payload.dataDesligamento"
          label={t('esocial:events.S2250.dataDesligamento')}
          tooltip={tooltips.s2250_dataDesligamento[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2250.indenizacao')}
        </Typography>
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.indenizacao.valor"
          label={t('esocial:events.S2250.indenizacao.valor')}
          type="number"
          inputProps={{
            step: '0.01',
            min: '0',
            max: '999999.99'
          }}
          tooltip={tooltips.s2250_indenizacao_valor[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          control={control}
          name="payload.indenizacao.dataPagamento"
          label={t('esocial:events.S2250.indenizacao.dataPagamento')}
          tooltip={tooltips.s2250_indenizacao_dataPagamento[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          control={control}
          name="payload.observacao"
          label={t('esocial:events.S2250.observacao')}
          multiline
          rows={4}
          tooltip={tooltips.s2250_observacao[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
    </Grid>
  );
}; 

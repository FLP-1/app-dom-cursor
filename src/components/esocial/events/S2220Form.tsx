/**
 * Arquivo: S2220Form.tsx
 * Caminho: src/components/esocial/events/S2220Form.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { Grid, Typography } from '@mui/material';
import { Control } from 'react-hook-form';
import { FormInput } from '@/components/form/FormInput';
import { FormDatePicker } from '@/components/common/forms/FormDatePicker';
import { FormSelect } from '@/components/form/FormSelect';
import { useTranslation } from 'next-i18next';
import { useEsocialTabela } from '@/hooks/useEsocialTabela';
import { useEffect, useState } from 'react';
import type { PaisItem, TipoExameItem } from '@/types/esocial';
import { tooltips } from '@/constants/tooltips';

// Justificativa: integração com react-hook-form, tipagem dinâmica dos campos
interface S2220FormProps {
  control: Control<unknown>;
}

export const S2220Form = ({ control }: S2220FormProps) => {
  const { t } = useTranslation();
  const { getTabela } = useEsocialTabela();
  // Justificativa: tipo depende de dados dinâmicos da API
  const [tiposExame, setTiposExame] = useState<TipoExameItem[]>([]);
  // Justificativa: tipo depende de dados dinâmicos da API
  const [tiposLocal, setTiposLocal] = useState<{ codigo: string; descricao: string }[]>([]);
  // Justificativa: tipo depende de dados dinâmicos da API
  const [restricoes, setRestricoes] = useState<{ codigo: string; descricao: string }[]>([]);
  // Justificativa: tipo depende de dados dinâmicos da API
  const [paises, setPaises] = useState<PaisItem[]>([]);

  useEffect(() => {
    const carregarTabelas = async () => {
      const [exames, locais, restricoesData, paisesData] = await Promise.all([
        getTabela('18'), // Tipos de Exame
        getTabela('15'), // Tipos de Local
        getTabela('19'), // Restrições
        getTabela('6')   // Países
      ]);

      if (exames) setTiposExame(exames.itens);
      if (locais) setTiposLocal(locais.itens);
      if (restricoesData) setRestricoes(restricoesData.itens);
      if (paisesData) setPaises(paisesData.itens);
    };

    carregarTabelas();
  }, [getTabela]);

  return (
    <Grid container spacing={3} columns={12}>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.cpf"
          label={t('esocial:events.S2220.cpf')}
          mask="999.999.999-99"
          tooltip={tooltips.s2220_cpf[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          control={control}
          name="payload.dataExame"
          label={t('esocial:events.S2220.dataExame')}
          tooltip={tooltips.s2220_dataExame[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.tipoExame"
          label={t('esocial:events.S2220.tipoExame')}
          options={tiposExame.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
          tooltip={tooltips.s2220_tipoExame[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.resultadoExame"
          label={t('esocial:events.S2220.resultadoExame')}
          options={[
            { value: 'A', label: t('esocial:events.S2220.resultadoExame.apto') },
            { value: 'I', label: t('esocial:events.S2220.resultadoExame.inapto') },
            { value: 'R', label: t('esocial:events.S2220.resultadoExame.restrito') }
          ]}
          tooltip={tooltips.s2220_resultadoExame[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2220.medico')}
        </Typography>
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.medico.nome"
          label={t('esocial:events.S2220.medico.nome')}
          tooltip={tooltips.s2220_medico_nome[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 3' }}>
        <FormInput
          control={control}
          name="payload.medico.crm"
          label={t('esocial:events.S2220.medico.crm')}
          tooltip={tooltips.s2220_medico_crm[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 3' }}>
        <FormSelect
          control={control}
          name="payload.medico.uf"
          label={t('esocial:events.S2220.medico.uf')}
          options={paises.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
          tooltip={tooltips.s2220_medico_uf[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2220.localExame')}
        </Typography>
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.localExame.tipo"
          label={t('esocial:events.S2220.localExame.tipo')}
          options={tiposLocal.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
          tooltip={tooltips.s2220_localExame_tipo[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.localExame.nome"
          label={t('esocial:events.S2220.localExame.nome')}
          tooltip={tooltips.s2220_localExame_nome[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.localExame.endereco"
          label={t('esocial:events.S2220.localExame.endereco')}
          tooltip={tooltips.s2220_localExame_endereco[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.localExame.cep"
          label={t('esocial:events.S2220.localExame.cep')}
          mask="99999-999"
          tooltip={tooltips.s2220_localExame_cep[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.localExame.municipio"
          label={t('esocial:events.S2220.localExame.municipio')}
          tooltip={tooltips.s2220_localExame_municipio[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.localExame.uf"
          label={t('esocial:events.S2220.localExame.uf')}
          options={paises.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
          tooltip={tooltips.s2220_localExame_uf[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2220.aso')}
        </Typography>
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.aso.numero"
          label={t('esocial:events.S2220.aso.numero')}
          tooltip={tooltips.s2220_aso_numero[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          control={control}
          name="payload.aso.dataEmissao"
          label={t('esocial:events.S2220.aso.dataEmissao')}
          tooltip={tooltips.s2220_aso_dataEmissao[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2220.restricoes')}
        </Typography>
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.restricoes.codigo"
          label={t('esocial:events.S2220.restricoes.codigo')}
          options={restricoes.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
          tooltip={tooltips.s2220_restricoes_codigo[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.restricoes.descricao"
          label={t('esocial:events.S2220.restricoes.descricao')}
          tooltip={tooltips.s2220_restricoes_descricao[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 12' }}>
        <FormInput
          control={control}
          name="payload.observacao"
          label={t('esocial:events.S2220.observacao')}
          multiline
          rows={4}
          tooltip={tooltips.s2220_observacao[t('i18n:lang') as 'pt' | 'en']}
        />
      </Grid>
    </Grid>
  );
}; 

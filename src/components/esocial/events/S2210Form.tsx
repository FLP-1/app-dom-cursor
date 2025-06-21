/**
 * Arquivo: S2210Form.tsx
 * Caminho: src/components/esocial/events/S2210Form.tsx
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
import type { PaisItem, ParteAtingidaItem } from '@/types/esocial';

// Justificativa: integração com react-hook-form, tipagem dinâmica dos campos
interface S2210FormProps {
  control: Control<unknown>;
}

export const S2210Form = ({ control }: S2210FormProps) => {
  const { t } = useTranslation();
  const { getTabela } = useEsocialTabela();
  // Justificativa: tipo depende de dados dinâmicos da API
  const [tiposAcidente, setTiposAcidente] = useState<{ codigo: string; descricao: string }[]>([]);
  // Justificativa: tipo depende de dados dinâmicos da API
  const [tiposLocal, setTiposLocal] = useState<{ codigo: string; descricao: string }[]>([]);
  // Justificativa: tipo depende de dados dinâmicos da API
  const [partesAtingidas, setPartesAtingidas] = useState<ParteAtingidaItem[]>([]);
  // Justificativa: tipo depende de dados dinâmicos da API
  const [agentesCausadores, setAgentesCausadores] = useState<{ codigo: string; descricao: string }[]>([]);
  // Justificativa: tipo depende de dados dinâmicos da API
  const [paises, setPaises] = useState<PaisItem[]>([]);

  useEffect(() => {
    const carregarTabelas = async () => {
      const [acidentes, locais, partes, agentes, paisesData] = await Promise.all([
        getTabela('14'), // Tipos de Acidente
        getTabela('15'), // Tipos de Local
        getTabela('16'), // Partes Atingidas
        getTabela('17'), // Agentes Causadores
        getTabela('6')   // Países
      ]);

      if (acidentes) setTiposAcidente(acidentes.itens);
      if (locais) setTiposLocal(locais.itens);
      if (partes) setPartesAtingidas(partes.itens);
      if (agentes) setAgentesCausadores(agentes.itens);
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
          label={t('esocial:events.S2210.cpf')}
          mask="999.999.999-99"
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          control={control}
          name="payload.dataAcidente"
          label={t('esocial:events.S2210.dataAcidente')}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.horaAcidente"
          label={t('esocial:events.S2210.horaAcidente')}
          mask="99:99"
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.tipoAcidente"
          label={t('esocial:events.S2210.tipoAcidente')}
          options={tiposAcidente.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2210.localAcidente')}
        </Typography>
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.localAcidente.tipo"
          label={t('esocial:events.S2210.localAcidente.tipo')}
          options={tiposLocal.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.localAcidente.endereco"
          label={t('esocial:events.S2210.localAcidente.endereco')}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.localAcidente.cep"
          label={t('esocial:events.S2210.localAcidente.cep')}
          mask="99999-999"
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.localAcidente.municipio"
          label={t('esocial:events.S2210.localAcidente.municipio')}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.localAcidente.uf"
          label={t('esocial:events.S2210.localAcidente.uf')}
          options={paises.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2210.parteAtingida')}
        </Typography>
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.parteAtingida.codigo"
          label={t('esocial:events.S2210.parteAtingida.codigo')}
          options={partesAtingidas.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.parteAtingida.lateralidade"
          label={t('esocial:events.S2210.parteAtingida.lateralidade')}
          options={[
            { value: 'E', label: t('esocial:events.S2210.parteAtingida.lateralidade.esquerda') },
            { value: 'D', label: t('esocial:events.S2210.parteAtingida.lateralidade.direita') },
            { value: 'A', label: t('esocial:events.S2210.parteAtingida.lateralidade.ambos') }
          ]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2210.agenteCausador')}
        </Typography>
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.agenteCausador.codigo"
          label={t('esocial:events.S2210.agenteCausador.codigo')}
          options={agentesCausadores.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2210.atestadoMedico')}
        </Typography>
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.atestadoMedico.numero"
          label={t('esocial:events.S2210.atestadoMedico.numero')}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          control={control}
          name="payload.atestadoMedico.dataEmissao"
          label={t('esocial:events.S2210.atestadoMedico.dataEmissao')}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          control={control}
          name="payload.atestadoMedico.dataAfastamento"
          label={t('esocial:events.S2210.atestadoMedico.dataAfastamento')}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.atestadoMedico.diasAfastamento"
          label={t('esocial:events.S2210.atestadoMedico.diasAfastamento')}
          type="number"
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 12' }}>
        <FormInput
          control={control}
          name="payload.observacao"
          label={t('esocial:events.S2210.observacao')}
          multiline
          rows={4}
        />
      </Grid>
    </Grid>
  );
}; 

/**
 * Arquivo: S2206Form.tsx
 * Caminho: src/components/esocial/events/S2206Form.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormDatePicker } from '@/components/forms/inputs/FormDatePicker';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import { useTranslation } from 'next-i18next';
import { useEsocialTabela } from '@/hooks/useEsocialTabela';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import type { PaisItem } from '@/types/esocial';
import { tooltips } from '@/i18n/tooltips';

// Justificativa: integração com react-hook-form, tipagem dinâmica dos campos
interface S2206FormProps {
  control: Control<unknown>;
}

export const S2206Form = ({ control }: S2206FormProps) => {
  const { t } = useTranslation();
  const { getTabela } = useEsocialTabela();
  // Justificativa: tipo depende de dados dinâmicos da API
  const [tiposAlteracao, setTiposAlteracao] = useState<{ codigo: string; descricao: string }[]>([]);
  // Justificativa: tipo depende de dados dinâmicos da API
  const [tiposJornada, setTiposJornada] = useState<{ codigo: string; descricao: string }[]>([]);
  // Justificativa: tipo depende de dados dinâmicos da API
  const [tiposLocalTrabalho, setTiposLocalTrabalho] = useState<{ codigo: string; descricao: string }[]>([]);
  // Justificativa: tipo depende de dados dinâmicos da API
  const [paises, setPaises] = useState<PaisItem[]>([]);

  useEffect(() => {
    const carregarTabelas = async () => {
      const [alteracoes, jornadas, locais, paisesData] = await Promise.all([
        getTabela('9'), // Tipos de Ocorrência
        getTabela('12'), // Tipos de Jornada
        getTabela('13'), // Tipos de Local de Trabalho
        getTabela('6')  // Países
      ]);

      if (alteracoes) setTiposAlteracao(alteracoes.itens);
      if (jornadas) setTiposJornada(jornadas.itens);
      if (locais) setTiposLocalTrabalho(locais.itens);
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
          label={t('esocial:events.S2206.cpf')}
          mask="999.999.999-99"
          tooltip={tooltips.s2206_cpf[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          control={control}
          name="payload.dataAlteracao"
          label={t('esocial:events.S2206.dataAlteracao')}
          tooltip={tooltips.s2206_dataAlteracao[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.tipoAlteracao"
          label={t('esocial:events.S2206.tipoAlteracao')}
          options={tiposAlteracao.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
          tooltip={tooltips.s2206_tipoAlteracao[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.motivoAlteracao"
          label={t('esocial:events.S2206.motivoAlteracao')}
          multiline
          rows={4}
          tooltip={tooltips.s2206_motivoAlteracao[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.cargo"
          label={t('esocial:events.S2206.cargo')}
          tooltip={tooltips.s2206_cargo[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.salario"
          label={t('esocial:events.S2206.salario')}
          type="number"
          InputProps={{
            startAdornment: 'R$',
          }}
          tooltip={tooltips.s2206_salario[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2206.jornadaTrabalho')}
        </Typography>
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.jornadaTrabalho.tipo"
          label={t('esocial:events.S2206.jornadaTrabalho.tipo')}
          options={tiposJornada.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
          tooltip={tooltips.s2206_jornadaTrabalho_tipo[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.jornadaTrabalho.cargaHoraria"
          label={t('esocial:events.S2206.jornadaTrabalho.cargaHoraria')}
          type="number"
          tooltip={tooltips.s2206_jornadaTrabalho_cargaHoraria[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.jornadaTrabalho.horarioInicio"
          label={t('esocial:events.S2206.jornadaTrabalho.horarioInicio')}
          mask="99:99"
          tooltip={tooltips.s2206_jornadaTrabalho_horarioInicio[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.jornadaTrabalho.horarioFim"
          label={t('esocial:events.S2206.jornadaTrabalho.horarioFim')}
          mask="99:99"
          tooltip={tooltips.s2206_jornadaTrabalho_horarioFim[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2206.localTrabalho')}
        </Typography>
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.localTrabalho.tipo"
          label={t('esocial:events.S2206.localTrabalho.tipo')}
          options={tiposLocalTrabalho.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
          tooltip={tooltips.s2206_localTrabalho_tipo[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.localTrabalho.endereco"
          label={t('esocial:events.S2206.localTrabalho.endereco')}
          tooltip={tooltips.s2206_localTrabalho_endereco[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.localTrabalho.cep"
          label={t('esocial:events.S2206.localTrabalho.cep')}
          mask="99999-999"
          tooltip={tooltips.s2206_localTrabalho_cep[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.localTrabalho.municipio"
          label={t('esocial:events.S2206.localTrabalho.municipio')}
          tooltip={tooltips.s2206_localTrabalho_municipio[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.localTrabalho.uf"
          label={t('esocial:events.S2206.localTrabalho.uf')}
          options={paises.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
          tooltip={tooltips.s2206_localTrabalho_uf[locale]}
        />
      </Grid>
    </Grid>
  );
}; 

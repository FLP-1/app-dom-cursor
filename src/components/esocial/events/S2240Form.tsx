/**
 * Arquivo: S2240Form.tsx
 * Caminho: src/components/esocial/events/S2240Form.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { Grid, Typography, Button } from '@mui/material';
import { Control, useFieldArray } from 'react-hook-form';
import { FormInput } from '@/components/form/FormInput';
import { FormDatePicker } from '@/components/common/forms/FormDatePicker';
import { FormSelect } from '@/components/form/FormSelect';
import { useTranslation } from 'next-i18next';
import { useEsocialTabela } from '@/hooks/useEsocialTabela';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import type { PaisItem, AgenteRiscoItem, EpiItem } from '@/types/esocial';
import { tooltips } from '@/i18n/tooltips';

// Justificativa: integração com react-hook-form, tipagem dinâmica dos campos
interface S2240FormProps {
  control: Control<unknown>;
}

export const S2240Form = ({ control }: S2240FormProps) => {
  const { t } = useTranslation();
  const { getTabela } = useEsocialTabela();
  // Justificativa: tipo depende de dados dinâmicos da API
  const [tiposCondicao, setTiposCondicao] = useState<{ codigo: string; descricao: string }[]>([]);
  // Justificativa: tipo depende de dados dinâmicos da API
  const [tiposLocal, setTiposLocal] = useState<{ codigo: string; descricao: string }[]>([]);
  // Justificativa: tipo depende de dados dinâmicos da API
  const [paises, setPaises] = useState<PaisItem[]>([]);

  const { fields: agenteRiscoFields, append: appendAgenteRisco, remove: removeAgenteRisco } = useFieldArray({
    control,
    name: 'payload.agenteRisco'
  });

  const { fields: epiFields, append: appendEpi, remove: removeEpi } = useFieldArray({
    control,
    name: 'payload.epi'
  });

  const [agentesRisco, setAgentesRisco] = useState<AgenteRiscoItem[]>([]);
  const [epis, setEpis] = useState<EpiItem[]>([]);

  useEffect(() => {
    const carregarTabelas = async () => {
      const [condicoes, locais, agentes, episData, paisesData] = await Promise.all([
        getTabela('22'), // Tipos de Condição
        getTabela('15'), // Tipos de Local
        getTabela('23'), // Agentes de Risco
        getTabela('24'), // EPIs
        getTabela('6')   // Países
      ]);

      if (condicoes) setTiposCondicao(condicoes.itens);
      if (locais) setTiposLocal(locais.itens);
      if (agentes) setAgentesRisco(agentes.itens);
      if (episData) setEpis(episData.itens);
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
          label={t('esocial:events.S2240.cpf')}
          mask="999.999.999-99"
          tooltip={tooltips.s2240_cpf[locale]}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          control={control}
          name="payload.dataInicioCondicao"
          label={t('esocial:events.S2240.dataInicioCondicao')}
          tooltip={tooltips.s2240_dataInicioCondicao[locale]}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          control={control}
          name="payload.dataFimCondicao"
          label={t('esocial:events.S2240.dataFimCondicao')}
          tooltip={tooltips.s2240_dataFimCondicao[locale]}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.tipoCondicao"
          label={t('esocial:events.S2240.tipoCondicao')}
          options={tiposCondicao.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
          tooltip={tooltips.s2240_tipoCondicao[locale]}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.codigoCondicao"
          label={t('esocial:events.S2240.codigoCondicao')}
          tooltip={tooltips.s2240_codigoCondicao[locale]}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2240.localCondicao')}
        </Typography>
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.localCondicao.tipo"
          label={t('esocial:events.S2240.localCondicao.tipo')}
          options={tiposLocal.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
          tooltip={tooltips.s2240_localCondicao_tipo[locale]}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.localCondicao.nome"
          label={t('esocial:events.S2240.localCondicao.nome')}
          tooltip={tooltips.s2240_localCondicao_nome[locale]}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.localCondicao.endereco"
          label={t('esocial:events.S2240.localCondicao.endereco')}
          tooltip={tooltips.s2240_localCondicao_endereco[locale]}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.localCondicao.cep"
          label={t('esocial:events.S2240.localCondicao.cep')}
          mask="99999-999"
          tooltip={tooltips.s2240_localCondicao_cep[locale]}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.localCondicao.municipio"
          label={t('esocial:events.S2240.localCondicao.municipio')}
          tooltip={tooltips.s2240_localCondicao_municipio[locale]}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.localCondicao.uf"
          label={t('esocial:events.S2240.localCondicao.uf')}
          options={paises.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
          tooltip={tooltips.s2240_localCondicao_uf[locale]}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2240.agenteRisco')}
        </Typography>
      </Grid>

      {agenteRiscoFields.map((field, index) => (
        <Grid gridColumn={{ xs: 'span 12', key: field.id }}>
          <Grid container spacing={2} alignItems="center">
            <Grid gridColumn={{ xs: 'span 12', md: 'span 3' }}>
              <FormSelect
                control={control}
                name={`payload.agenteRisco.${index}.codigo`}
                label={t('esocial:events.S2240.agenteRisco.codigo')}
                options={agentesRisco.map(item => ({
                  value: item.codigo,
                  label: item.descricao
                }))}
                tooltip={tooltips.s2240_agenteRisco_codigo[locale]}
              />
            </Grid>

            <Grid gridColumn={{ xs: 'span 12', md: 'span 3' }}>
              <FormInput
                control={control}
                name={`payload.agenteRisco.${index}.intensidade`}
                label={t('esocial:events.S2240.agenteRisco.intensidade')}
                tooltip={tooltips.s2240_agenteRisco_intensidade[locale]}
              />
            </Grid>

            <Grid gridColumn={{ xs: 'span 12', md: 'span 3' }}>
              <FormInput
                control={control}
                name={`payload.agenteRisco.${index}.unidade`}
                label={t('esocial:events.S2240.agenteRisco.unidade')}
                tooltip={tooltips.s2240_agenteRisco_unidade[locale]}
              />
            </Grid>

            <Grid gridColumn={{ xs: 'span 12', md: 'span 2' }}>
              <FormDatePicker
                control={control}
                name={`payload.agenteRisco.${index}.dataMedicao`}
                label={t('esocial:events.S2240.agenteRisco.dataMedicao')}
                tooltip={tooltips.s2240_agenteRisco_dataMedicao[locale]}
              />
            </Grid>

            <Grid gridColumn={{ xs: 'span 12', md: 'span 1' }}>
              <Button
                color="error"
                onClick={() => removeAgenteRisco(index)}
                startIcon={<DeleteIcon />}
              />
            </Grid>
          </Grid>
        </Grid>
      ))}

      <Grid gridColumn={{ xs: 'span 12' }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => appendAgenteRisco({
            codigo: '',
            intensidade: '',
            unidade: '',
            dataMedicao: new Date()
          })}
        >
          {t('esocial:events.S2240.agenteRisco.adicionar')}
        </Button>
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2240.epi')}
        </Typography>
      </Grid>

      {epiFields.map((field, index) => (
        <Grid gridColumn={{ xs: 'span 12', key: field.id }}>
          <Grid container spacing={2} alignItems="center">
            <Grid gridColumn={{ xs: 'span 12', md: 'span 3' }}>
              <FormSelect
                control={control}
                name={`payload.epi.${index}.codigo`}
                label={t('esocial:events.S2240.epi.codigo')}
                options={epis.map(item => ({
                  value: item.codigo,
                  label: item.descricao
                }))}
                tooltip={tooltips.s2240_epi_codigo[locale]}
              />
            </Grid>

            <Grid gridColumn={{ xs: 'span 12', md: 'span 3' }}>
              <FormInput
                control={control}
                name={`payload.epi.${index}.ca`}
                label={t('esocial:events.S2240.epi.ca')}
                tooltip={tooltips.s2240_epi_ca[locale]}
              />
            </Grid>

            <Grid gridColumn={{ xs: 'span 12', md: 'span 5' }}>
              <FormDatePicker
                control={control}
                name={`payload.epi.${index}.dataValidade`}
                label={t('esocial:events.S2240.epi.dataValidade')}
                tooltip={tooltips.s2240_epi_dataValidade[locale]}
              />
            </Grid>

            <Grid gridColumn={{ xs: 'span 12', md: 'span 1' }}>
              <Button
                color="error"
                onClick={() => removeEpi(index)}
                startIcon={<DeleteIcon />}
              />
            </Grid>
          </Grid>
        </Grid>
      ))}

      <Grid gridColumn={{ xs: 'span 12' }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => appendEpi({
            codigo: '',
            ca: '',
            dataValidade: new Date()
          })}
        >
          {t('esocial:events.S2240.epi.adicionar')}
        </Button>
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          control={control}
          name="payload.observacao"
          label={t('esocial:events.S2240.observacao')}
          multiline
          rows={4}
          tooltip={tooltips.s2240_observacao[locale]}
        />
      </Grid>
    </Grid>
  );
}; 

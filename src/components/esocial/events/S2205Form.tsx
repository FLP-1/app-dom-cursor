/**
 * Arquivo: S2205Form.tsx
 * Caminho: src/components/esocial/events/S2205Form.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';
import { FormInput } from '@/components/form/FormInput';
import { FormDatePicker } from '@/components/form/FormDatePicker';
import { FormSelect } from '@/components/form/FormSelect';
import { useTranslation } from 'next-i18next';
import { useEsocialTabela } from '@/hooks/useEsocialTabela';
import { useEffect, useState } from 'react';
import type { CategoriaTrabalhadorItem, TipoInscricaoItem, PaisItem } from '@/types/esocial';
import { tooltips } from '@/i18n/tooltips';

// Justificativa: integração com react-hook-form, tipagem dinâmica dos campos
interface S2205FormProps {
  control: Control<unknown>;
}

export const S2205Form = ({ control }: S2205FormProps) => {
  const { t } = useTranslation();
  const { getTabela } = useEsocialTabela();
  // Justificativa: tipo depende de dados dinâmicos da API
  const [categoriasTrabalhador, setCategoriasTrabalhador] = useState<CategoriaTrabalhadorItem[]>([]);
  // Justificativa: tipo depende de dados dinâmicos da API
  const [tiposInscricao, setTiposInscricao] = useState<TipoInscricaoItem[]>([]);
  // Justificativa: tipo depende de dados dinâmicos da API
  const [paises, setPaises] = useState<PaisItem[]>([]);

  useEffect(() => {
    const carregarTabelas = async () => {
      const [categorias, inscricoes, paisesData] = await Promise.all([
        getTabela('1'), // Categorias de Trabalhadores
        getTabela('5'), // Tipos de Inscrição
        getTabela('6')  // Países
      ]);

      if (categorias) setCategoriasTrabalhador(categorias.itens);
      if (inscricoes) setTiposInscricao(inscricoes.itens);
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
          label={t('esocial:events.S2205.cpf')}
          mask="999.999.999-99"
          tooltip={tooltips.s2205_cpf[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.nome"
          label={t('esocial:events.S2205.nome')}
          tooltip={tooltips.s2205_nome[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          control={control}
          name="payload.dataNascimento"
          label={t('esocial:events.S2205.dataNascimento')}
          tooltip={tooltips.s2205_dataNascimento[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.categoriaTrabalhador"
          label={t('esocial:events.S2205.categoriaTrabalhador')}
          options={categoriasTrabalhador.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
          tooltip={tooltips.s2205_categoriaTrabalhador[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.pis"
          label={t('esocial:events.S2205.pis')}
          mask="999.99999.99-9"
          tooltip={tooltips.s2205_pis[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.carteiraTrabalho"
          label={t('esocial:events.S2205.carteiraTrabalho')}
          tooltip={tooltips.s2205_carteiraTrabalho[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.serieCarteiraTrabalho"
          label={t('esocial:events.S2205.serieCarteiraTrabalho')}
          tooltip={tooltips.s2205_serieCarteiraTrabalho[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.ufCarteiraTrabalho"
          label={t('esocial:events.S2205.ufCarteiraTrabalho')}
          options={paises.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
          tooltip={tooltips.s2205_ufCarteiraTrabalho[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          control={control}
          name="payload.tipoInscricao"
          label={t('esocial:events.S2205.tipoInscricao')}
          options={tiposInscricao.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
          tooltip={tooltips.s2205_tipoInscricao[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.cargo"
          label={t('esocial:events.S2205.cargo')}
          tooltip={tooltips.s2205_cargo[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.salario"
          label={t('esocial:events.S2205.salario')}
          type="number"
          InputProps={{
            startAdornment: 'R$',
          }}
          tooltip={tooltips.s2205_salario[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          control={control}
          name="payload.dataAlteracao"
          label={t('esocial:events.S2205.dataAlteracao')}
          tooltip={tooltips.s2205_dataAlteracao[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          control={control}
          name="payload.motivoAlteracao"
          label={t('esocial:events.S2205.motivoAlteracao')}
          multiline
          rows={4}
          tooltip={tooltips.s2205_motivoAlteracao[locale]}
        />
      </Grid>
    </Grid>
  );
}; 

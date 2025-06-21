/**
 * Arquivo: S2230Form.tsx
 * Caminho: src/components/esocial/events/S2230Form.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { Grid, Typography, FormControlLabel } from '@mui/material';
import { Control } from 'react-hook-form';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormDatePicker } from '@/components/forms/inputs/FormDatePicker';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import { useTranslation } from 'next-i18next';
import { useEsocialTabela } from '@/hooks/useEsocialTabela';
import { useEffect, useState } from 'react';
import type { PaisItem, MotivoAfastamentoItem, CidItem } from '@/types/esocial';
import { tooltips } from '@/i18n/tooltips';
import { FormCheckbox } from '@/components/forms/inputs/FormCheckbox';

// Justificativa: integração com react-hook-form, tipagem dinâmica dos campos
interface S2230FormProps {
  control: Control<unknown>;
}

export const S2230Form = ({ control }: S2230FormProps) => {
  const { t } = useTranslation();
  const { getTabela } = useEsocialTabela();
  // Justificativa: tipo depende de dados dinâmicos da API
  const [motivosAfastamento, setMotivosAfastamento] = useState<MotivoAfastamentoItem[]>([]);
  // Justificativa: tipo depende de dados dinâmicos da API
  const [cids, setCids] = useState<CidItem[]>([]);
  // Justificativa: tipo depende de dados dinâmicos da API
  const [paises, setPaises] = useState<PaisItem[]>([]);

  useEffect(() => {
    const carregarTabelas = async () => {
      const [motivos, cidsData, paisesData] = await Promise.all([
        getTabela('20'), // Motivos de Afastamento
        getTabela('21'), // CIDs
        getTabela('6')   // Países
      ]);

      if (motivos) setMotivosAfastamento(motivos.itens);
      if (cidsData) setCids(cidsData.itens);
      if (paisesData) setPaises(paisesData.itens);
    };

    carregarTabelas();
  }, [getTabela]);

  return (
    <Grid container spacing={3}>
      <Grid columns={{ xs: 12, md: 6 }}>
        <FormInput
          control={control}
          name="payload.cpf"
          label={t('esocial:events.S2230.cpf')}
          mask="999.999.999-99"
          tooltip={tooltips.s2230_cpf[locale]}
        />
      </Grid>

      <Grid columns={{ xs: 12, md: 6 }}>
        <FormDatePicker
          control={control}
          name="payload.dataInicioAfastamento"
          label={t('esocial:events.S2230.dataInicioAfastamento')}
          tooltip={tooltips.s2230_dataInicioAfastamento[locale]}
        />
      </Grid>

      <Grid columns={{ xs: 12, md: 6 }}>
        <FormDatePicker
          control={control}
          name="payload.dataFimAfastamento"
          label={t('esocial:events.S2230.dataFimAfastamento')}
          tooltip={tooltips.s2230_dataFimAfastamento[locale]}
        />
      </Grid>

      <Grid columns={{ xs: 12, md: 6 }}>
        <FormSelect
          control={control}
          name="payload.codigoMotivoAfastamento"
          label={t('esocial:events.S2230.codigoMotivoAfastamento')}
          tooltip={tooltips.s2230_codigoMotivoAfastamento[locale]}
          options={motivosAfastamento.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>

      <Grid columns={{ xs: 12, md: 6 }}>
        <FormInput
          control={control}
          name="payload.motivoAfastamento"
          label={t('esocial:events.S2230.motivoAfastamento')}
          tooltip={tooltips.s2230_motivoAfastamento[locale]}
        />
      </Grid>

      <Grid columns={{ xs: 12 }}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2230.cid')}
        </Typography>
      </Grid>

      <Grid columns={{ xs: 12, md: 6 }}>
        <FormSelect
          control={control}
          name="payload.cid.codigo"
          label={t('esocial:events.S2230.cid.codigo')}
          tooltip={tooltips.s2230_cid_codigo[locale]}
          options={cids.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>

      <Grid columns={{ xs: 12, md: 6 }}>
        <FormInput
          control={control}
          name="payload.cid.descricao"
          label={t('esocial:events.S2230.cid.descricao')}
          tooltip={tooltips.s2230_cid_descricao[locale]}
        />
      </Grid>

      <Grid columns={{ xs: 12 }}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2230.atestadoMedico')}
        </Typography>
      </Grid>

      <Grid columns={{ xs: 12, md: 6 }}>
        <FormInput
          control={control}
          name="payload.atestadoMedico.numero"
          label={t('esocial:events.S2230.atestadoMedico.numero')}
          tooltip={tooltips.s2230_atestadoMedico_numero[locale]}
        />
      </Grid>

      <Grid columns={{ xs: 12, md: 6 }}>
        <FormDatePicker
          control={control}
          name="payload.atestadoMedico.dataEmissao"
          label={t('esocial:events.S2230.atestadoMedico.dataEmissao')}
          tooltip={tooltips.s2230_atestadoMedico_dataEmissao[locale]}
        />
      </Grid>

      <Grid columns={{ xs: 12, md: 6 }}>
        <FormInput
          control={control}
          name="payload.atestadoMedico.medico.nome"
          label={t('esocial:events.S2230.atestadoMedico.medico.nome')}
          tooltip={tooltips.s2230_atestadoMedico_medico_nome[locale]}
        />
      </Grid>

      <Grid columns={{ xs: 12, md: 3 }}>
        <FormInput
          control={control}
          name="payload.atestadoMedico.medico.crm"
          label={t('esocial:events.S2230.atestadoMedico.medico.crm')}
          tooltip={tooltips.s2230_atestadoMedico_medico_crm[locale]}
        />
      </Grid>

      <Grid columns={{ xs: 12, md: 3 }}>
        <FormSelect
          control={control}
          name="payload.atestadoMedico.medico.uf"
          label={t('esocial:events.S2230.atestadoMedico.medico.uf')}
          tooltip={tooltips.s2230_atestadoMedico_medico_uf[locale]}
          options={paises.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>

      <Grid columns={{ xs: 12 }}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2230.acidenteTrabalho')}
        </Typography>
      </Grid>

      <Grid columns={{ xs: 12 }}>
        <FormControlLabel
          control={
            <FormCheckbox
              name="payload.acidenteTrabalho.ocorreu"
              control={control}
              checked={!!field.value}
              onChange={field.onChange}
              color="primary"
            />
          }
          label={t('esocial:events.S2230.acidenteTrabalho.ocorreu')}
          tooltip={tooltips.s2230_acidenteTrabalho_ocorreu[locale]}
        />
      </Grid>

      <Grid columns={{ xs: 12, md: 6 }}>
        <FormInput
          control={control}
          name="payload.acidenteTrabalho.numeroCat"
          label={t('esocial:events.S2230.acidenteTrabalho.numeroCat')}
          tooltip={tooltips.s2230_acidenteTrabalho_numeroCat[locale]}
        />
      </Grid>

      <Grid columns={{ xs: 12, md: 6 }}>
        <FormDatePicker
          control={control}
          name="payload.acidenteTrabalho.dataAcidente"
          label={t('esocial:events.S2230.acidenteTrabalho.dataAcidente')}
          tooltip={tooltips.s2230_acidenteTrabalho_dataAcidente[locale]}
        />
      </Grid>

      <Grid columns={{ xs: 12, md: 6 }}>
        <FormDatePicker
          control={control}
          name="payload.acidenteTrabalho.dataEmissaoCat"
          label={t('esocial:events.S2230.acidenteTrabalho.dataEmissaoCat')}
        />
      </Grid>

      <Grid columns={{ xs: 12 }}>
        <FormInput
          control={control}
          name="payload.observacao"
          label={t('esocial:events.S2230.observacao')}
          multiline
          rows={4}
        />
      </Grid>
    </Grid>
  );
}; 

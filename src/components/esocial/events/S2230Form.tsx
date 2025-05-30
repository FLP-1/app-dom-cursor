import { Grid, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { Control } from 'react-hook-form';
import { FormInput } from '@/components/form/FormInput';
import { FormDatePicker } from '@/components/form/FormDatePicker';
import { FormSelect } from '@/components/form/FormSelect';
import { useTranslation } from 'next-i18next';
import { useEsocialTabela } from '@/hooks/useEsocialTabela';
import { useEffect, useState } from 'react';

interface S2230FormProps {
  control: Control<any>;
}

export const S2230Form = ({ control }: S2230FormProps) => {
  const { t } = useTranslation();
  const { getTabela } = useEsocialTabela();
  const [motivosAfastamento, setMotivosAfastamento] = useState<any[]>([]);
  const [cids, setCids] = useState<any[]>([]);
  const [paises, setPaises] = useState<any[]>([]);

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
      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.cpf"
          label={t('esocial:events.S2230.cpf')}
          mask="999.999.999-99"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormDatePicker
          control={control}
          name="payload.dataInicioAfastamento"
          label={t('esocial:events.S2230.dataInicioAfastamento')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormDatePicker
          control={control}
          name="payload.dataFimAfastamento"
          label={t('esocial:events.S2230.dataFimAfastamento')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          control={control}
          name="payload.codigoMotivoAfastamento"
          label={t('esocial:events.S2230.codigoMotivoAfastamento')}
          options={motivosAfastamento.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.motivoAfastamento"
          label={t('esocial:events.S2230.motivoAfastamento')}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2230.cid')}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          control={control}
          name="payload.cid.codigo"
          label={t('esocial:events.S2230.cid.codigo')}
          options={cids.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.cid.descricao"
          label={t('esocial:events.S2230.cid.descricao')}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2230.atestadoMedico')}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.atestadoMedico.numero"
          label={t('esocial:events.S2230.atestadoMedico.numero')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormDatePicker
          control={control}
          name="payload.atestadoMedico.dataEmissao"
          label={t('esocial:events.S2230.atestadoMedico.dataEmissao')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.atestadoMedico.medico.nome"
          label={t('esocial:events.S2230.atestadoMedico.medico.nome')}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <FormInput
          control={control}
          name="payload.atestadoMedico.medico.crm"
          label={t('esocial:events.S2230.atestadoMedico.medico.crm')}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <FormSelect
          control={control}
          name="payload.atestadoMedico.medico.uf"
          label={t('esocial:events.S2230.atestadoMedico.medico.uf')}
          options={paises.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2230.acidenteTrabalho')}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              name="payload.acidenteTrabalho.ocorreu"
              control={control}
            />
          }
          label={t('esocial:events.S2230.acidenteTrabalho.ocorreu')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.acidenteTrabalho.numeroCat"
          label={t('esocial:events.S2230.acidenteTrabalho.numeroCat')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormDatePicker
          control={control}
          name="payload.acidenteTrabalho.dataAcidente"
          label={t('esocial:events.S2230.acidenteTrabalho.dataAcidente')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormDatePicker
          control={control}
          name="payload.acidenteTrabalho.dataEmissaoCat"
          label={t('esocial:events.S2230.acidenteTrabalho.dataEmissaoCat')}
        />
      </Grid>

      <Grid item xs={12}>
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
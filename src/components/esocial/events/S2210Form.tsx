import { Grid, Typography } from '@mui/material';
import { Control } from 'react-hook-form';
import { FormInput } from '@/components/form/FormInput';
import { FormDatePicker } from '@/components/form/FormDatePicker';
import { FormSelect } from '@/components/form/FormSelect';
import { useTranslation } from 'next-i18next';
import { useEsocialTabela } from '@/hooks/useEsocialTabela';
import { useEffect, useState } from 'react';

interface S2210FormProps {
  control: Control<any>;
}

export const S2210Form = ({ control }: S2210FormProps) => {
  const { t } = useTranslation();
  const { getTabela } = useEsocialTabela();
  const [tiposAcidente, setTiposAcidente] = useState<any[]>([]);
  const [tiposLocal, setTiposLocal] = useState<any[]>([]);
  const [partesAtingidas, setPartesAtingidas] = useState<any[]>([]);
  const [agentesCausadores, setAgentesCausadores] = useState<any[]>([]);
  const [paises, setPaises] = useState<any[]>([]);

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
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.cpf"
          label={t('esocial:events.S2210.cpf')}
          mask="999.999.999-99"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormDatePicker
          control={control}
          name="payload.dataAcidente"
          label={t('esocial:events.S2210.dataAcidente')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.horaAcidente"
          label={t('esocial:events.S2210.horaAcidente')}
          mask="99:99"
        />
      </Grid>

      <Grid item xs={12} md={6}>
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

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2210.localAcidente')}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
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

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.localAcidente.endereco"
          label={t('esocial:events.S2210.localAcidente.endereco')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.localAcidente.cep"
          label={t('esocial:events.S2210.localAcidente.cep')}
          mask="99999-999"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.localAcidente.municipio"
          label={t('esocial:events.S2210.localAcidente.municipio')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
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

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2210.parteAtingida')}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
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

      <Grid item xs={12} md={6}>
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

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2210.agenteCausador')}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
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

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2210.atestadoMedico')}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.atestadoMedico.numero"
          label={t('esocial:events.S2210.atestadoMedico.numero')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormDatePicker
          control={control}
          name="payload.atestadoMedico.dataEmissao"
          label={t('esocial:events.S2210.atestadoMedico.dataEmissao')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormDatePicker
          control={control}
          name="payload.atestadoMedico.dataAfastamento"
          label={t('esocial:events.S2210.atestadoMedico.dataAfastamento')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.atestadoMedico.diasAfastamento"
          label={t('esocial:events.S2210.atestadoMedico.diasAfastamento')}
          type="number"
        />
      </Grid>

      <Grid item xs={12}>
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
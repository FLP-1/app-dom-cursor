import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';
import { FormInput } from '@/components/form/FormInput';
import { FormDatePicker } from '@/components/form/FormDatePicker';
import { FormSelect } from '@/components/form/FormSelect';
import { useTranslation } from 'next-i18next';
import { useEsocialTabela } from '@/hooks/useEsocialTabela';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

interface S2206FormProps {
  control: Control<any>;
}

export const S2206Form = ({ control }: S2206FormProps) => {
  const { t } = useTranslation();
  const { getTabela } = useEsocialTabela();
  const [tiposAlteracao, setTiposAlteracao] = useState<any[]>([]);
  const [tiposJornada, setTiposJornada] = useState<any[]>([]);
  const [tiposLocalTrabalho, setTiposLocalTrabalho] = useState<any[]>([]);
  const [paises, setPaises] = useState<any[]>([]);

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
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.cpf"
          label={t('esocial:events.S2206.cpf')}
          mask="999.999.999-99"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormDatePicker
          control={control}
          name="payload.dataAlteracao"
          label={t('esocial:events.S2206.dataAlteracao')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          control={control}
          name="payload.tipoAlteracao"
          label={t('esocial:events.S2206.tipoAlteracao')}
          options={tiposAlteracao.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.motivoAlteracao"
          label={t('esocial:events.S2206.motivoAlteracao')}
          multiline
          rows={4}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.cargo"
          label={t('esocial:events.S2206.cargo')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.salario"
          label={t('esocial:events.S2206.salario')}
          type="number"
          InputProps={{
            startAdornment: 'R$',
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2206.jornadaTrabalho')}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          control={control}
          name="payload.jornadaTrabalho.tipo"
          label={t('esocial:events.S2206.jornadaTrabalho.tipo')}
          options={tiposJornada.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.jornadaTrabalho.cargaHoraria"
          label={t('esocial:events.S2206.jornadaTrabalho.cargaHoraria')}
          type="number"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.jornadaTrabalho.horarioInicio"
          label={t('esocial:events.S2206.jornadaTrabalho.horarioInicio')}
          mask="99:99"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.jornadaTrabalho.horarioFim"
          label={t('esocial:events.S2206.jornadaTrabalho.horarioFim')}
          mask="99:99"
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2206.localTrabalho')}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          control={control}
          name="payload.localTrabalho.tipo"
          label={t('esocial:events.S2206.localTrabalho.tipo')}
          options={tiposLocalTrabalho.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.localTrabalho.endereco"
          label={t('esocial:events.S2206.localTrabalho.endereco')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.localTrabalho.cep"
          label={t('esocial:events.S2206.localTrabalho.cep')}
          mask="99999-999"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.localTrabalho.municipio"
          label={t('esocial:events.S2206.localTrabalho.municipio')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          control={control}
          name="payload.localTrabalho.uf"
          label={t('esocial:events.S2206.localTrabalho.uf')}
          options={paises.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>
    </Grid>
  );
}; 
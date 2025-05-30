import { Grid, Typography, Button } from '@mui/material';
import { Control, useFieldArray } from 'react-hook-form';
import { FormInput } from '@/components/form/FormInput';
import { FormDatePicker } from '@/components/form/FormDatePicker';
import { FormSelect } from '@/components/form/FormSelect';
import { useTranslation } from 'next-i18next';
import { useEsocialTabela } from '@/hooks/useEsocialTabela';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface S2240FormProps {
  control: Control<any>;
}

export const S2240Form = ({ control }: S2240FormProps) => {
  const { t } = useTranslation();
  const { getTabela } = useEsocialTabela();
  const [tiposCondicao, setTiposCondicao] = useState<any[]>([]);
  const [tiposLocal, setTiposLocal] = useState<any[]>([]);
  const [agentesRisco, setAgentesRisco] = useState<any[]>([]);
  const [epis, setEpis] = useState<any[]>([]);
  const [paises, setPaises] = useState<any[]>([]);

  const { fields: agenteRiscoFields, append: appendAgenteRisco, remove: removeAgenteRisco } = useFieldArray({
    control,
    name: 'payload.agenteRisco'
  });

  const { fields: epiFields, append: appendEpi, remove: removeEpi } = useFieldArray({
    control,
    name: 'payload.epi'
  });

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
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.cpf"
          label={t('esocial:events.S2240.cpf')}
          mask="999.999.999-99"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormDatePicker
          control={control}
          name="payload.dataInicioCondicao"
          label={t('esocial:events.S2240.dataInicioCondicao')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormDatePicker
          control={control}
          name="payload.dataFimCondicao"
          label={t('esocial:events.S2240.dataFimCondicao')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          control={control}
          name="payload.tipoCondicao"
          label={t('esocial:events.S2240.tipoCondicao')}
          options={tiposCondicao.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.codigoCondicao"
          label={t('esocial:events.S2240.codigoCondicao')}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2240.localCondicao')}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          control={control}
          name="payload.localCondicao.tipo"
          label={t('esocial:events.S2240.localCondicao.tipo')}
          options={tiposLocal.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.localCondicao.nome"
          label={t('esocial:events.S2240.localCondicao.nome')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.localCondicao.endereco"
          label={t('esocial:events.S2240.localCondicao.endereco')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.localCondicao.cep"
          label={t('esocial:events.S2240.localCondicao.cep')}
          mask="99999-999"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.localCondicao.municipio"
          label={t('esocial:events.S2240.localCondicao.municipio')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          control={control}
          name="payload.localCondicao.uf"
          label={t('esocial:events.S2240.localCondicao.uf')}
          options={paises.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2240.agenteRisco')}
        </Typography>
      </Grid>

      {agenteRiscoFields.map((field, index) => (
        <Grid item xs={12} key={field.id}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormSelect
                control={control}
                name={`payload.agenteRisco.${index}.codigo`}
                label={t('esocial:events.S2240.agenteRisco.codigo')}
                options={agentesRisco.map(item => ({
                  value: item.codigo,
                  label: item.descricao
                }))}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <FormInput
                control={control}
                name={`payload.agenteRisco.${index}.intensidade`}
                label={t('esocial:events.S2240.agenteRisco.intensidade')}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <FormInput
                control={control}
                name={`payload.agenteRisco.${index}.unidade`}
                label={t('esocial:events.S2240.agenteRisco.unidade')}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <FormDatePicker
                control={control}
                name={`payload.agenteRisco.${index}.dataMedicao`}
                label={t('esocial:events.S2240.agenteRisco.dataMedicao')}
              />
            </Grid>

            <Grid item xs={12} md={1}>
              <Button
                color="error"
                onClick={() => removeAgenteRisco(index)}
                startIcon={<DeleteIcon />}
              />
            </Grid>
          </Grid>
        </Grid>
      ))}

      <Grid item xs={12}>
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

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2240.epi')}
        </Typography>
      </Grid>

      {epiFields.map((field, index) => (
        <Grid item xs={12} key={field.id}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormSelect
                control={control}
                name={`payload.epi.${index}.codigo`}
                label={t('esocial:events.S2240.epi.codigo')}
                options={epis.map(item => ({
                  value: item.codigo,
                  label: item.descricao
                }))}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <FormInput
                control={control}
                name={`payload.epi.${index}.ca`}
                label={t('esocial:events.S2240.epi.ca')}
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <FormDatePicker
                control={control}
                name={`payload.epi.${index}.dataValidade`}
                label={t('esocial:events.S2240.epi.dataValidade')}
              />
            </Grid>

            <Grid item xs={12} md={1}>
              <Button
                color="error"
                onClick={() => removeEpi(index)}
                startIcon={<DeleteIcon />}
              />
            </Grid>
          </Grid>
        </Grid>
      ))}

      <Grid item xs={12}>
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

      <Grid item xs={12}>
        <FormInput
          control={control}
          name="payload.observacao"
          label={t('esocial:events.S2240.observacao')}
          multiline
          rows={4}
        />
      </Grid>
    </Grid>
  );
}; 
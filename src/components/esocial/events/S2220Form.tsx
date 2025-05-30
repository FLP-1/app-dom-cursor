import { Grid, Typography } from '@mui/material';
import { Control } from 'react-hook-form';
import { FormInput } from '@/components/form/FormInput';
import { FormDatePicker } from '@/components/form/FormDatePicker';
import { FormSelect } from '@/components/form/FormSelect';
import { useTranslation } from 'next-i18next';
import { useEsocialTabela } from '@/hooks/useEsocialTabela';
import { useEffect, useState } from 'react';

interface S2220FormProps {
  control: Control<any>;
}

export const S2220Form = ({ control }: S2220FormProps) => {
  const { t } = useTranslation();
  const { getTabela } = useEsocialTabela();
  const [tiposExame, setTiposExame] = useState<any[]>([]);
  const [tiposLocal, setTiposLocal] = useState<any[]>([]);
  const [restricoes, setRestricoes] = useState<any[]>([]);
  const [paises, setPaises] = useState<any[]>([]);

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
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.cpf"
          label={t('esocial:events.S2220.cpf')}
          mask="999.999.999-99"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormDatePicker
          control={control}
          name="payload.dataExame"
          label={t('esocial:events.S2220.dataExame')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          control={control}
          name="payload.tipoExame"
          label={t('esocial:events.S2220.tipoExame')}
          options={tiposExame.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          control={control}
          name="payload.resultadoExame"
          label={t('esocial:events.S2220.resultadoExame')}
          options={[
            { value: 'A', label: t('esocial:events.S2220.resultadoExame.apto') },
            { value: 'I', label: t('esocial:events.S2220.resultadoExame.inapto') },
            { value: 'R', label: t('esocial:events.S2220.resultadoExame.restrito') }
          ]}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2220.medico')}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.medico.nome"
          label={t('esocial:events.S2220.medico.nome')}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <FormInput
          control={control}
          name="payload.medico.crm"
          label={t('esocial:events.S2220.medico.crm')}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <FormSelect
          control={control}
          name="payload.medico.uf"
          label={t('esocial:events.S2220.medico.uf')}
          options={paises.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2220.localExame')}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          control={control}
          name="payload.localExame.tipo"
          label={t('esocial:events.S2220.localExame.tipo')}
          options={tiposLocal.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.localExame.nome"
          label={t('esocial:events.S2220.localExame.nome')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.localExame.endereco"
          label={t('esocial:events.S2220.localExame.endereco')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.localExame.cep"
          label={t('esocial:events.S2220.localExame.cep')}
          mask="99999-999"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.localExame.municipio"
          label={t('esocial:events.S2220.localExame.municipio')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          control={control}
          name="payload.localExame.uf"
          label={t('esocial:events.S2220.localExame.uf')}
          options={paises.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2220.aso')}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.aso.numero"
          label={t('esocial:events.S2220.aso.numero')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormDatePicker
          control={control}
          name="payload.aso.dataEmissao"
          label={t('esocial:events.S2220.aso.dataEmissao')}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2220.restricoes')}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          control={control}
          name="payload.restricoes.codigo"
          label={t('esocial:events.S2220.restricoes.codigo')}
          options={restricoes.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.restricoes.descricao"
          label={t('esocial:events.S2220.restricoes.descricao')}
        />
      </Grid>

      <Grid item xs={12}>
        <FormInput
          control={control}
          name="payload.observacao"
          label={t('esocial:events.S2220.observacao')}
          multiline
          rows={4}
        />
      </Grid>
    </Grid>
  );
}; 
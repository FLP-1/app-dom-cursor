import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';
import { FormInput } from '@/components/form/FormInput';
import { FormDatePicker } from '@/components/form/FormDatePicker';
import { FormSelect } from '@/components/form/FormSelect';
import { useTranslation } from 'next-i18next';
import { useEsocialTabela } from '@/hooks/useEsocialTabela';
import { useEffect, useState } from 'react';

interface S2200FormProps {
  control: Control<any>;
}

export const S2200Form = ({ control }: S2200FormProps) => {
  const { t } = useTranslation();
  const { getTabela } = useEsocialTabela();
  const [categoriasTrabalhador, setCategoriasTrabalhador] = useState<any[]>([]);
  const [tiposInscricao, setTiposInscricao] = useState<any[]>([]);
  const [paises, setPaises] = useState<any[]>([]);

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
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.cpf"
          label={t('esocial:events.S2200.cpf')}
          mask="999.999.999-99"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.nome"
          label={t('esocial:events.S2200.nome')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormDatePicker
          control={control}
          name="payload.dataNascimento"
          label={t('esocial:events.S2200.dataNascimento')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          control={control}
          name="payload.categoriaTrabalhador"
          label={t('esocial:events.S2200.categoriaTrabalhador')}
          options={categoriasTrabalhador.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.pis"
          label={t('esocial:events.S2200.pis')}
          mask="999.99999.99-9"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.carteiraTrabalho"
          label={t('esocial:events.S2200.carteiraTrabalho')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.serieCarteiraTrabalho"
          label={t('esocial:events.S2200.serieCarteiraTrabalho')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          control={control}
          name="payload.ufCarteiraTrabalho"
          label={t('esocial:events.S2200.ufCarteiraTrabalho')}
          options={paises.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormDatePicker
          control={control}
          name="payload.dataAdmissao"
          label={t('esocial:events.S2200.dataAdmissao')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          control={control}
          name="payload.tipoInscricao"
          label={t('esocial:events.S2200.tipoInscricao')}
          options={tiposInscricao.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.cargo"
          label={t('esocial:events.S2200.cargo')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.salario"
          label={t('esocial:events.S2200.salario')}
          type="number"
          InputProps={{
            startAdornment: 'R$',
          }}
        />
      </Grid>
    </Grid>
  );
}; 
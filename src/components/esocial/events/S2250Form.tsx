import { Grid, Typography } from '@mui/material';
import { Control } from 'react-hook-form';
import { FormInput } from '@/components/form/FormInput';
import { FormDatePicker } from '@/components/form/FormDatePicker';
import { FormSelect } from '@/components/form/FormSelect';
import { useTranslation } from 'next-i18next';
import { useEsocialTabela } from '@/hooks/useEsocialTabela';
import { useEffect, useState } from 'react';

interface S2250FormProps {
  control: Control<any>;
}

export const S2250Form = ({ control }: S2250FormProps) => {
  const { t } = useTranslation();
  const { getTabela } = useEsocialTabela();
  const [motivosAviso, setMotivosAviso] = useState<any[]>([]);

  useEffect(() => {
    const carregarTabelas = async () => {
      const [motivos] = await Promise.all([
        getTabela('25') // Motivos de Aviso Prévio
      ]);

      if (motivos) setMotivosAviso(motivos.itens);
    };

    carregarTabelas();
  }, [getTabela]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.cpf"
          label={t('esocial:events.S2250.cpf')}
          mask="999.999.999-99"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormDatePicker
          control={control}
          name="payload.dataAviso"
          label={t('esocial:events.S2250.dataAviso')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormDatePicker
          control={control}
          name="payload.dataInicioAviso"
          label={t('esocial:events.S2250.dataInicioAviso')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormDatePicker
          control={control}
          name="payload.dataFimAviso"
          label={t('esocial:events.S2250.dataFimAviso')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          control={control}
          name="payload.tipoAviso"
          label={t('esocial:events.S2250.tipoAviso')}
          options={[
            { value: '1', label: t('esocial:events.S2250.tipoAviso.trabalhador') },
            { value: '2', label: t('esocial:events.S2250.tipoAviso.empregador') }
          ]}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          control={control}
          name="payload.codigoMotivoAviso"
          label={t('esocial:events.S2250.codigoMotivoAviso')}
          options={motivosAviso.map(item => ({
            value: item.codigo,
            label: item.descricao
          }))}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.motivoAviso"
          label={t('esocial:events.S2250.motivoAviso')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormDatePicker
          control={control}
          name="payload.dataDesligamento"
          label={t('esocial:events.S2250.dataDesligamento')}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('esocial:events.S2250.indenizacao')}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          control={control}
          name="payload.indenizacao.valor"
          label={t('esocial:events.S2250.indenizacao.valor')}
          type="number"
          inputProps={{
            step: '0.01',
            min: '0',
            max: '999999.99'
          }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormDatePicker
          control={control}
          name="payload.indenizacao.dataPagamento"
          label={t('esocial:events.S2250.indenizacao.dataPagamento')}
        />
      </Grid>

      <Grid item xs={12}>
        <FormInput
          control={control}
          name="payload.observacao"
          label={t('esocial:events.S2250.observacao')}
          multiline
          rows={4}
        />
      </Grid>
    </Grid>
  );
}; 
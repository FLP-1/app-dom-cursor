import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { FormDatePicker } from '@/components/form/FormDatePicker';
import { FormSelect } from '@/components/form/FormSelect';
import { FormInput } from '@/components/form/FormInput';
import { TipoEventoEsocial } from '@/types/esocial';
import { useTranslation } from 'next-i18next';
import { Control } from 'react-hook-form';
import { S2200Form } from './events/S2200Form';
import { S2205Form } from './events/S2205Form';
import { S2206Form } from './events/S2206Form';
import { S2210Form } from './events/S2210Form';
import { S2230Form } from './events/S2230Form';
import { S2240Form } from './events/S2240Form';
import { S2250Form } from './events/S2250Form';
import { S2299Form } from './events/S2299Form';
import { S2400Form } from './events/S2400Form';
import { S3000Form } from './events/S3000Form';
import { S1200Form } from './events/S1200Form';
import { S1210Form } from './events/S1210Form';
import { S2300Form } from './events/S2300Form';
import { S2399Form } from './events/S2399Form';
import { S1207Form } from './events/S1207Form';
import { useEsocialTabela } from '@/hooks/useEsocialTabela';
import { useEffect, useState } from 'react';
import { S2220Form } from './events/S2220Form';
import { S5001Form } from './events/S5001Form';
import { S5002Form } from './events/S5002Form';
import { S5003Form } from './events/S5003Form';
import { S5011Form } from './events/S5011Form';
import { S5012Form } from './events/S5012Form';
import { S5013Form } from './events/S5013Form';
import { TipoEvento } from '@/types/esocial';

interface EsocialEventFormProps {
  control: Control<any>;
  onSubmit: () => void;
  isSubmitting: boolean;
  errors: Record<string, any>;
  tipo: TipoEventoEsocial;
}

export const EsocialEventForm = ({
  control,
  onSubmit,
  isSubmitting,
  errors,
  tipo,
}: EsocialEventFormProps) => {
  const { t } = useTranslation();
  const { getTabela } = useEsocialTabela();
  const [tiposEvento, setTiposEvento] = useState<TipoEvento[]>([]);

  useEffect(() => {
    const carregarTiposEvento = async () => {
      const tabela = await getTabela('10');
      if (tabela?.itens) {
        setTiposEvento(tabela.itens as TipoEvento[]);
      }
    };

    carregarTiposEvento();
  }, [getTabela]);

  const renderEventForm = () => {
    switch (tipo) {
      case TipoEventoEsocial.S2200:
        return <S2200Form control={control} />;
      case TipoEventoEsocial.S2205:
        return <S2205Form control={control} />;
      case TipoEventoEsocial.S2206:
        return <S2206Form control={control} />;
      case TipoEventoEsocial.S2210:
        return <S2210Form control={control} />;
      case TipoEventoEsocial.S2230:
        return <S2230Form control={control} />;
      case TipoEventoEsocial.S2240:
        return <S2240Form control={control} />;
      case TipoEventoEsocial.S2250:
        return <S2250Form control={control} />;
      case TipoEventoEsocial.S2299:
        return <S2299Form control={control} />;
      case TipoEventoEsocial.S2400:
        return <S2400Form control={control} />;
      case TipoEventoEsocial.S3000:
        return <S3000Form control={control} />;
      case TipoEventoEsocial.S1200:
        return <S1200Form control={control} />;
      case TipoEventoEsocial.S1210:
        return <S1210Form control={control} />;
      case TipoEventoEsocial.S2300:
        return <S2300Form control={control} />;
      case TipoEventoEsocial.S2399:
        return <S2399Form control={control} />;
      case TipoEventoEsocial.S1207:
        return <S1207Form control={control} />;
      case TipoEventoEsocial.S2220:
        return <S2220Form control={control} />;
      case TipoEventoEsocial.S5001:
        return <S5001Form control={control} />;
      case TipoEventoEsocial.S5002:
        return <S5002Form control={control} />;
      case TipoEventoEsocial.S5003:
        return <S5003Form control={control} />;
      case TipoEventoEsocial.S5011:
        return <S5011Form control={control} />;
      case TipoEventoEsocial.S5012:
        return <S5012Form control={control} />;
      case TipoEventoEsocial.S5013:
        return <S5013Form control={control} />;
      default:
        return null;
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              {t('esocial:event.form.title')}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormSelect
              control={control}
              name="tipo"
              label={t('esocial:event.form.type')}
              options={tiposEvento.map(item => ({
                value: item.codigo,
                label: item.descricao
              }))}
              error={errors.tipo?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormDatePicker
              control={control}
              name="dataEvento"
              label={t('esocial:event.form.date')}
              error={errors.dataEvento?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <FormInput
              control={control}
              name="empregadoDomesticoId"
              label={t('esocial:event.form.employee')}
              error={errors.empregadoDomesticoId?.message}
            />
          </Grid>

          {renderEventForm()}

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => window.history.back()}
                disabled={isSubmitting}
              >
                {t('common:buttons.cancel')}
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
              >
                {t('common:buttons.save')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}; 
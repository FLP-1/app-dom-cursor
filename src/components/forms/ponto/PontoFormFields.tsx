/**
 * Arquivo: PontoFormFields.tsx
 * Caminho: src/components/forms/ponto/PontoFormFields.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Campos reutilizáveis para o formulário de ponto.
 */

import { Grid } from '@mui/material';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormDatePicker } from '@/components/forms/inputs/FormDatePicker';
import { FormTimePicker } from '@/components/forms/inputs/FormTimePicker';
import { PontoFormData } from './PontoFormTypes';

interface PontoFormFieldsProps {
  control: Control<PontoFormData>;
  errors?: FieldErrors<PontoFormData>;
}

export function PontoFormFields({ control, errors }: PontoFormFieldsProps) {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="data"
          label={t('ponto.fields.data')}
          control={control}
          required
          error={errors?.data?.message}
          tooltip={t('ponto.tooltips.data')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormTimePicker
          name="horaEntrada"
          label={t('ponto.fields.horaEntrada')}
          control={control}
          required
          error={errors?.horaEntrada?.message}
          tooltip={t('ponto.tooltips.horaEntrada')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormTimePicker
          name="horaSaida"
          label={t('ponto.fields.horaSaida')}
          control={control}
          required
          error={errors?.horaSaida?.message}
          tooltip={t('ponto.tooltips.horaSaida')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormTimePicker
          name="horaEntradaAlmoco"
          label={t('ponto.fields.horaEntradaAlmoco')}
          control={control}
          error={errors?.horaEntradaAlmoco?.message}
          tooltip={t('ponto.tooltips.horaEntradaAlmoco')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormTimePicker
          name="horaSaidaAlmoco"
          label={t('ponto.fields.horaSaidaAlmoco')}
          control={control}
          error={errors?.horaSaidaAlmoco?.message}
          tooltip={t('ponto.tooltips.horaSaidaAlmoco')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="observacoes"
          label={t('ponto.fields.observacoes')}
          control={control}
          multiline
          rows={4}
          error={errors?.observacoes?.message}
          tooltip={t('ponto.tooltips.observacoes')}
        />
      </Grid>
    </Grid>
  );
} 

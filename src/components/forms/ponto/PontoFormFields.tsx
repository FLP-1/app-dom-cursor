/**
 * Arquivo: PontoFormFields.tsx
 * Caminho: src/components/forms/ponto/PontoFormFields.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-01-27
 * Descrição: Campos reutilizáveis para o formulário de ponto.
 */

import { Grid } from '@mui/material';
import { Control, FieldErrors } from 'react-hook-form';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormDatePicker } from '@/components/forms/inputs/FormDatePicker';
import { FormTimePicker } from '@/components/forms/inputs/FormTimePicker';
import { PontoFormData } from './PontoFormTypes';
import { pontoMessages } from '@/i18n/messages/ponto.messages';

interface PontoFormFieldsProps {
  control: Control<PontoFormData>;
  errors?: FieldErrors<PontoFormData>;
}

export function PontoFormFields({ control, errors }: PontoFormFieldsProps) {
  const messages = pontoMessages.pt;

  return (
    <Grid container spacing={2}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="data"
          label={messages.labels.data}
          control={control}
          required
          error={errors?.data?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormTimePicker
          name="horaEntrada"
          label={messages.labels.horaEntrada}
          control={control}
          required
          error={errors?.horaEntrada?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormTimePicker
          name="horaSaida"
          label={messages.labels.horaSaida}
          control={control}
          required
          error={errors?.horaSaida?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormTimePicker
          name="horaEntradaAlmoco"
          label={messages.labels.horaEntradaAlmoco}
          control={control}
          error={errors?.horaEntradaAlmoco?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormTimePicker
          name="horaSaidaAlmoco"
          label={messages.labels.horaSaidaAlmoco}
          control={control}
          error={errors?.horaSaidaAlmoco?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="observacoes"
          label={messages.labels.observacoes}
          control={control}
          multiline
          rows={4}
          error={errors?.observacoes?.message}
        />
      </Grid>
    </Grid>
  );
} 

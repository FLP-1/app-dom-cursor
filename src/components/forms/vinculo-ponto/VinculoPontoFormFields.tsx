/**
 * Arquivo: VinculoPontoFormFields.tsx
 * Caminho: src/components/forms/vinculo-ponto/VinculoPontoFormFields.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-14
 * Descrição: Campos reutilizáveis do formulário de vínculo ponto.
 */

import { Grid, MenuItem } from '@mui/material';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import { FormDatePicker } from '@/components/forms/inputs/FormDatePicker';
import { FormCheckbox } from '@/components/forms/FormCheckbox';
import { VinculoPontoFormData, TipoVinculoPonto } from './VinculoPontoFormTypes';

interface VinculoPontoFormFieldsProps {
  control: Control<VinculoPontoFormData>;
  errors?: FieldErrors<VinculoPontoFormData>;
}

export function VinculoPontoFormFields({ control, errors }: VinculoPontoFormFieldsProps) {
  const { t } = useTranslation();

  return (
    <Grid container columns={12} spacing={2}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormSelect
          name="tipo"
          control={control}
          label={t('vinculoPonto.fields.tipo')}
          required
          error={errors?.tipo?.message}
          tooltip={t('vinculoPonto.tooltips.tipo')}
        >
          {Object.values(TipoVinculoPonto).map((tipo) => (
            <MenuItem key={tipo} value={tipo}>
              {t(`vinculoPonto.tipo.${tipo.toLowerCase()}`)}
            </MenuItem>
          ))}
        </FormSelect>
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="data"
          control={control}
          label={t('vinculoPonto.fields.data')}
          required
          error={errors?.data?.message}
          tooltip={t('vinculoPonto.tooltips.data')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="hora"
          control={control}
          label={t('vinculoPonto.fields.hora')}
          required
          error={errors?.hora?.message}
          tooltip={t('vinculoPonto.tooltips.hora')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormCheckbox
          name="ativo"
          control={control}
          label={t('vinculoPonto.fields.ativo')}
          tooltip={t('vinculoPonto.tooltips.ativo')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="observacoes"
          control={control}
          label={t('vinculoPonto.fields.observacoes')}
          multiline
          rows={4}
          error={errors?.observacoes?.message}
          tooltip={t('vinculoPonto.tooltips.observacoes')}
        />
      </Grid>
    </Grid>
  );
} 

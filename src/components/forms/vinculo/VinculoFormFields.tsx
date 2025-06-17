/**
 * Arquivo: VinculoFormFields.tsx
 * Caminho: src/components/forms/vinculo/VinculoFormFields.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-14
 * Descrição: Campos reutilizáveis do formulário de vínculo.
 */

import { Grid, MenuItem } from '@mui/material';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import { FormDatePicker } from '@/components/forms/inputs/FormDatePicker';
import { FormCheckbox } from '@/components/forms/FormCheckbox';
import { VinculoFormData, TipoVinculo } from './VinculoFormTypes';

interface VinculoFormFieldsProps {
  control: Control<VinculoFormData>;
  errors?: FieldErrors<VinculoFormData>;
}

export function VinculoFormFields({ control, errors }: VinculoFormFieldsProps) {
  const { t } = useTranslation();

  return (
    <Grid container columns={12} spacing={2}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormSelect
          name="tipo"
          control={control}
          label={t('vinculo.fields.tipo')}
          required
          error={errors?.tipo?.message}
          tooltip={t('vinculo.tooltips.tipo')}
        >
          {Object.values(TipoVinculo).map((tipo) => (
            <MenuItem key={tipo} value={tipo}>
              {t(`vinculo.tipo.${tipo.toLowerCase()}`)}
            </MenuItem>
          ))}
        </FormSelect>
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataInicio"
          control={control}
          label={t('vinculo.fields.dataInicio')}
          required
          error={errors?.dataInicio?.message}
          tooltip={t('vinculo.tooltips.dataInicio')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataFim"
          control={control}
          label={t('vinculo.fields.dataFim')}
          error={errors?.dataFim?.message}
          tooltip={t('vinculo.tooltips.dataFim')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="cargo"
          control={control}
          label={t('vinculo.fields.cargo')}
          required
          error={errors?.cargo?.message}
          tooltip={t('vinculo.tooltips.cargo')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="departamento"
          control={control}
          label={t('vinculo.fields.departamento')}
          required
          error={errors?.departamento?.message}
          tooltip={t('vinculo.tooltips.departamento')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="salario"
          control={control}
          label={t('vinculo.fields.salario')}
          type="number"
          required
          error={errors?.salario?.message}
          tooltip={t('vinculo.tooltips.salario')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="cargaHoraria"
          control={control}
          label={t('vinculo.fields.cargaHoraria')}
          type="number"
          required
          error={errors?.cargaHoraria?.message}
          tooltip={t('vinculo.tooltips.cargaHoraria')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormCheckbox
          name="ativo"
          control={control}
          label={t('vinculo.fields.ativo')}
          tooltip={t('vinculo.tooltips.ativo')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="observacoes"
          control={control}
          label={t('vinculo.fields.observacoes')}
          multiline
          rows={4}
          error={errors?.observacoes?.message}
          tooltip={t('vinculo.tooltips.observacoes')}
        />
      </Grid>
    </Grid>
  );
} 

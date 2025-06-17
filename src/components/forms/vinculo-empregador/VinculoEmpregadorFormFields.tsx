/**
 * Arquivo: VinculoEmpregadorFormFields.tsx
 * Caminho: src/components/forms/vinculo-empregador/VinculoEmpregadorFormFields.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-14
 * Descrição: Campos reutilizáveis do formulário de vínculo empregador.
 */

import { Grid, MenuItem } from '@mui/material';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import { FormDatePicker } from '@/components/forms/inputs/FormDatePicker';
import { FormCheckbox } from '@/components/forms/FormCheckbox';
import { VinculoEmpregadorFormData, TipoVinculoEmpregador } from './VinculoEmpregadorFormTypes';

interface VinculoEmpregadorFormFieldsProps {
  control: Control<VinculoEmpregadorFormData>;
  errors?: FieldErrors<VinculoEmpregadorFormData>;
}

export function VinculoEmpregadorFormFields({ control, errors }: VinculoEmpregadorFormFieldsProps) {
  const { t } = useTranslation();

  return (
    <Grid container columns={12} spacing={2}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormSelect
          name="tipo"
          control={control}
          label={t('vinculoEmpregador.fields.tipo')}
          required
          error={errors?.tipo?.message}
          tooltip={t('vinculoEmpregador.tooltips.tipo')}
        >
          {Object.values(TipoVinculoEmpregador).map((tipo) => (
            <MenuItem key={tipo} value={tipo}>
              {t(`vinculoEmpregador.tipo.${tipo.toLowerCase()}`)}
            </MenuItem>
          ))}
        </FormSelect>
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataInicio"
          control={control}
          label={t('vinculoEmpregador.fields.dataInicio')}
          required
          error={errors?.dataInicio?.message}
          tooltip={t('vinculoEmpregador.tooltips.dataInicio')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataFim"
          control={control}
          label={t('vinculoEmpregador.fields.dataFim')}
          error={errors?.dataFim?.message}
          tooltip={t('vinculoEmpregador.tooltips.dataFim')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="cargo"
          control={control}
          label={t('vinculoEmpregador.fields.cargo')}
          required
          error={errors?.cargo?.message}
          tooltip={t('vinculoEmpregador.tooltips.cargo')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="departamento"
          control={control}
          label={t('vinculoEmpregador.fields.departamento')}
          required
          error={errors?.departamento?.message}
          tooltip={t('vinculoEmpregador.tooltips.departamento')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="salario"
          control={control}
          label={t('vinculoEmpregador.fields.salario')}
          type="number"
          required
          error={errors?.salario?.message}
          tooltip={t('vinculoEmpregador.tooltips.salario')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="cargaHoraria"
          control={control}
          label={t('vinculoEmpregador.fields.cargaHoraria')}
          type="number"
          required
          error={errors?.cargaHoraria?.message}
          tooltip={t('vinculoEmpregador.tooltips.cargaHoraria')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormCheckbox
          name="ativo"
          control={control}
          label={t('vinculoEmpregador.fields.ativo')}
          tooltip={t('vinculoEmpregador.tooltips.ativo')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="observacoes"
          control={control}
          label={t('vinculoEmpregador.fields.observacoes')}
          multiline
          rows={4}
          error={errors?.observacoes?.message}
          tooltip={t('vinculoEmpregador.tooltips.observacoes')}
        />
      </Grid>
    </Grid>
  );
} 

/**
 * Arquivo: VinculoFamiliarFormFields.tsx
 * Caminho: src/components/forms/vinculo-familiar/VinculoFamiliarFormFields.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-14
 * Descrição: Campos reutilizáveis do formulário de vínculo familiar.
 */

import { Grid, MenuItem } from '@mui/material';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import { FormDatePicker } from '@/components/forms/inputs/FormDatePicker';
import { FormCheckbox } from '@/components/forms/FormCheckbox';
import { VinculoFamiliarFormData, TipoVinculoFamiliar } from './VinculoFamiliarFormTypes';

interface VinculoFamiliarFormFieldsProps {
  control: Control<VinculoFamiliarFormData>;
  errors?: FieldErrors<VinculoFamiliarFormData>;
}

export function VinculoFamiliarFormFields({ control, errors }: VinculoFamiliarFormFieldsProps) {
  const { t } = useTranslation();

  return (
    <Grid container columns={12} spacing={2}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormSelect
          name="tipo"
          control={control}
          label={t('vinculoFamiliar.fields.tipo')}
          required
          error={errors?.tipo?.message}
          tooltip={t('vinculoFamiliar.tooltips.tipo')}
        >
          {Object.values(TipoVinculoFamiliar).map((tipo) => (
            <MenuItem key={tipo} value={tipo}>
              {t(`vinculoFamiliar.tipo.${tipo.toLowerCase()}`)}
            </MenuItem>
          ))}
        </FormSelect>
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataInicio"
          control={control}
          label={t('vinculoFamiliar.fields.dataInicio')}
          required
          error={errors?.dataInicio?.message}
          tooltip={t('vinculoFamiliar.tooltips.dataInicio')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataFim"
          control={control}
          label={t('vinculoFamiliar.fields.dataFim')}
          error={errors?.dataFim?.message}
          tooltip={t('vinculoFamiliar.tooltips.dataFim')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="nome"
          control={control}
          label={t('vinculoFamiliar.fields.nome')}
          required
          error={errors?.nome?.message}
          tooltip={t('vinculoFamiliar.tooltips.nome')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="cpf"
          control={control}
          label={t('vinculoFamiliar.fields.cpf')}
          required
          error={errors?.cpf?.message}
          tooltip={t('vinculoFamiliar.tooltips.cpf')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataNascimento"
          control={control}
          label={t('vinculoFamiliar.fields.dataNascimento')}
          required
          error={errors?.dataNascimento?.message}
          tooltip={t('vinculoFamiliar.tooltips.dataNascimento')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormCheckbox
          name="ativo"
          control={control}
          label={t('vinculoFamiliar.fields.ativo')}
          tooltip={t('vinculoFamiliar.tooltips.ativo')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="observacoes"
          control={control}
          label={t('vinculoFamiliar.fields.observacoes')}
          multiline
          rows={4}
          error={errors?.observacoes?.message}
          tooltip={t('vinculoFamiliar.tooltips.observacoes')}
        />
      </Grid>
    </Grid>
  );
} 

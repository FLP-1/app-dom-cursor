/**
 * Arquivo: FamiliarFormFields.tsx
 * Caminho: src/components/forms/familiar/FamiliarFormFields.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-14
 * Descrição: Campos reutilizáveis para o formulário de familiar.
 */

import { Grid } from '@mui/material';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import FormInput from '@/components/forms/inputs/FormInput';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import FormDatePicker from '@/components/forms/inputs/FormDatePicker';
import { FamiliarFormData, TipoFamiliar } from './FamiliarFormTypes';

interface FamiliarFormFieldsProps {
  control: Control<FamiliarFormData>;
  errors?: FieldErrors<FamiliarFormData>;
}

export function FamiliarFormFields({ control, errors }: FamiliarFormFieldsProps) {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput<FamiliarFormData>
          name="nome"
          label={t('familiar.fields.nome')}
          control={control}
          required
          error={!!errors?.nome?.message}
          tooltip={t('familiar.tooltips.nome')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput<FamiliarFormData>
          name="cpf"
          label={t('familiar.fields.cpf')}
          control={control}
          required
          error={!!errors?.cpf?.message}
          tooltip={t('familiar.tooltips.cpf')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker<FamiliarFormData>
          name="dataNascimento"
          label={t('familiar.fields.dataNascimento')}
          control={control}
          required
          error={!!errors?.dataNascimento?.message}
          tooltip={t('familiar.tooltips.dataNascimento')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormSelect<FamiliarFormData>
          name="tipo"
          label={t('familiar.fields.tipo')}
          control={control}
          required
          error={!!errors?.tipo?.message}
          tooltip={t('familiar.tooltips.tipo')}
          options={Object.values(TipoFamiliar).map((tipo) => ({
            value: tipo,
            label: t(`familiar.tipos.${tipo.toLowerCase()}`)
          }))}
          inputProps={{ 'aria-label': t('familiar.fields.tipo') }}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker<FamiliarFormData>
          name="dataInicio"
          label={t('familiar.fields.dataInicio')}
          control={control}
          required
          error={!!errors?.dataInicio?.message}
          tooltip={t('familiar.tooltips.dataInicio')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker<FamiliarFormData>
          name="dataFim"
          label={t('familiar.fields.dataFim')}
          control={control}
          error={!!errors?.dataFim?.message}
          tooltip={t('familiar.tooltips.dataFim')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput<FamiliarFormData>
          name="endereco.cep"
          label={t('familiar.fields.cep')}
          control={control}
          required
          error={!!errors?.endereco?.cep?.message}
          tooltip={t('familiar.tooltips.cep')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 8' }}>
        <FormInput<FamiliarFormData>
          name="endereco.logradouro"
          label={t('familiar.fields.logradouro')}
          control={control}
          required
          error={!!errors?.endereco?.logradouro?.message}
          tooltip={t('familiar.tooltips.logradouro')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput<FamiliarFormData>
          name="endereco.numero"
          label={t('familiar.fields.numero')}
          control={control}
          required
          error={!!errors?.endereco?.numero?.message}
          tooltip={t('familiar.tooltips.numero')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 8' }}>
        <FormInput<FamiliarFormData>
          name="endereco.complemento"
          label={t('familiar.fields.complemento')}
          control={control}
          error={!!errors?.endereco?.complemento?.message}
          tooltip={t('familiar.tooltips.complemento')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput<FamiliarFormData>
          name="endereco.bairro"
          label={t('familiar.fields.bairro')}
          control={control}
          required
          error={!!errors?.endereco?.bairro?.message}
          tooltip={t('familiar.tooltips.bairro')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput<FamiliarFormData>
          name="endereco.cidade"
          label={t('familiar.fields.cidade')}
          control={control}
          required
          error={!!errors?.endereco?.cidade?.message}
          tooltip={t('familiar.tooltips.cidade')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput<FamiliarFormData>
          name="endereco.estado"
          label={t('familiar.fields.estado')}
          control={control}
          required
          error={!!errors?.endereco?.estado?.message}
          tooltip={t('familiar.tooltips.estado')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput<FamiliarFormData>
          name="observacoes"
          label={t('familiar.fields.observacoes')}
          control={control}
          multiline
          rows={4}
          error={!!errors?.observacoes?.message}
          tooltip={t('familiar.tooltips.observacoes')}
        />
      </Grid>
    </Grid>
  );
} 

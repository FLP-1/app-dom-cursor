/**
 * Arquivo: VinculoParceiroFormFields.tsx
 * Caminho: src/components/forms/vinculo-parceiro/VinculoParceiroFormFields.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-14
 * Descrição: Campos reutilizáveis do formulário de vínculo parceiro.
 */

import { Grid, MenuItem } from '@mui/material';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import { FormDatePicker } from '@/components/forms/inputs/FormDatePicker';
import { FormCheckbox } from '@/components/forms/FormCheckbox';
import { VinculoParceiroFormData, TipoVinculoParceiro } from './VinculoParceiroFormTypes';

interface VinculoParceiroFormFieldsProps {
  control: Control<VinculoParceiroFormData>;
  errors?: FieldErrors<VinculoParceiroFormData>;
}

export function VinculoParceiroFormFields({ control, errors }: VinculoParceiroFormFieldsProps) {
  const { t } = useTranslation();

  return (
    <Grid container columns={12} spacing={2}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormSelect
          name="tipo"
          control={control}
          label={t('vinculoParceiro.fields.tipo')}
          required
          error={errors?.tipo?.message}
          tooltip={t('vinculoParceiro.tooltips.tipo')}
        >
          {Object.values(TipoVinculoParceiro).map((tipo) => (
            <MenuItem key={tipo} value={tipo}>
              {t(`vinculoParceiro.tipo.${tipo.toLowerCase()}`)}
            </MenuItem>
          ))}
        </FormSelect>
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataInicio"
          control={control}
          label={t('vinculoParceiro.fields.dataInicio')}
          required
          error={errors?.dataInicio?.message}
          tooltip={t('vinculoParceiro.tooltips.dataInicio')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataFim"
          control={control}
          label={t('vinculoParceiro.fields.dataFim')}
          error={errors?.dataFim?.message}
          tooltip={t('vinculoParceiro.tooltips.dataFim')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="nome"
          control={control}
          label={t('vinculoParceiro.fields.nome')}
          required
          error={errors?.nome?.message}
          tooltip={t('vinculoParceiro.tooltips.nome')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="cnpj"
          control={control}
          label={t('vinculoParceiro.fields.cnpj')}
          required
          error={errors?.cnpj?.message}
          tooltip={t('vinculoParceiro.tooltips.cnpj')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormCheckbox
          name="ativo"
          control={control}
          label={t('vinculoParceiro.fields.ativo')}
          tooltip={t('vinculoParceiro.tooltips.ativo')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="observacoes"
          control={control}
          label={t('vinculoParceiro.fields.observacoes')}
          multiline
          rows={4}
          error={errors?.observacoes?.message}
          tooltip={t('vinculoParceiro.tooltips.observacoes')}
        />
      </Grid>
    </Grid>
  );
} 

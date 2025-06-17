/**
 * Arquivo: ParceiroFormFields.tsx
 * Caminho: src/components/forms/parceiro/ParceiroFormFields.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Campos reutilizáveis para o formulário de parceiro.
 */

import { Grid } from '@mui/material';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import FormInput from '@/components/forms/inputs/FormInput';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import FormDatePicker from '@/components/forms/inputs/FormDatePicker';
import { ParceiroFormData, TipoParceiro } from './ParceiroFormTypes';

interface ParceiroFormFieldsProps {
  control: Control<ParceiroFormData>;
  errors?: FieldErrors<ParceiroFormData>;
}

export function ParceiroFormFields({ control, errors }: ParceiroFormFieldsProps) {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="nome"
          label={t('parceiro.fields.nome')}
          control={control}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="cnpj"
          label={t('parceiro.fields.cnpj')}
          control={control}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormSelect
          name="tipo"
          label={t('parceiro.fields.tipo')}
          control={control}
          error={!!errors?.tipo}
          options={Object.values(TipoParceiro).map((tipo) => ({
            value: tipo,
            label: t(`parceiro.tipos.${tipo.toLowerCase()}`)
          }))}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataInicio"
          label={t('parceiro.fields.dataInicio')}
          control={control}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataFim"
          label={t('parceiro.fields.dataFim')}
          control={control}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput
          name="endereco.cep"
          label={t('parceiro.fields.cep')}
          control={control}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 8' }}>
        <FormInput
          name="endereco.logradouro"
          label={t('parceiro.fields.logradouro')}
          control={control}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput
          name="endereco.numero"
          label={t('parceiro.fields.numero')}
          control={control}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 8' }}>
        <FormInput
          name="endereco.complemento"
          label={t('parceiro.fields.complemento')}
          control={control}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput
          name="endereco.bairro"
          label={t('parceiro.fields.bairro')}
          control={control}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput
          name="endereco.cidade"
          label={t('parceiro.fields.cidade')}
          control={control}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput
          name="endereco.estado"
          label={t('parceiro.fields.estado')}
          control={control}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="observacoes"
          label={t('parceiro.fields.observacoes')}
          control={control}
          multiline
          rows={4}
        />
      </Grid>
    </Grid>
  );
} 

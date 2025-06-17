/**
 * Arquivo: EmpregadoDomesticoFormFields.tsx
 * Caminho: src/components/forms/empregado-domestico/EmpregadoDomesticoFormFields.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Campos reutilizáveis para o formulário de empregado doméstico.
 */

import { Grid } from '@mui/material';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormDatePicker } from '@/components/forms/inputs/FormDatePicker';
import { FormNumberInput } from '@/components/common/forms/FormNumberInput';
import { EmpregadoDomesticoFormData } from './EmpregadoDomesticoFormTypes';

interface EmpregadoDomesticoFormFieldsProps {
  control: Control<EmpregadoDomesticoFormData>;
  errors?: FieldErrors<EmpregadoDomesticoFormData>;
}

export function EmpregadoDomesticoFormFields({ control, errors }: EmpregadoDomesticoFormFieldsProps) {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="nome"
          label={t('empregado.fields.nome')}
          control={control}
          required
          error={errors?.nome?.message}
          tooltip={t('empregado.tooltips.nome')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="cpf"
          label={t('empregado.fields.cpf')}
          control={control}
          required
          error={errors?.cpf?.message}
          tooltip={t('empregado.tooltips.cpf')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataNascimento"
          label={t('empregado.fields.dataNascimento')}
          control={control}
          required
          error={errors?.dataNascimento?.message}
          tooltip={t('empregado.tooltips.dataNascimento')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataInicio"
          label={t('empregado.fields.dataInicio')}
          control={control}
          required
          error={errors?.dataInicio?.message}
          tooltip={t('empregado.tooltips.dataInicio')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataFim"
          label={t('empregado.fields.dataFim')}
          control={control}
          error={errors?.dataFim?.message}
          tooltip={t('empregado.tooltips.dataFim')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormNumberInput
          name="salario"
          label={t('empregado.fields.salario')}
          control={control}
          required
          error={errors?.salario?.message}
          tooltip={t('empregado.tooltips.salario')}
          prefix="R$ "
          decimalScale={2}
          fixedDecimalScale
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormNumberInput
          name="cargaHoraria"
          label={t('empregado.fields.cargaHoraria')}
          control={control}
          required
          error={errors?.cargaHoraria?.message}
          tooltip={t('empregado.tooltips.cargaHoraria')}
          suffix=" horas"
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="funcao"
          label={t('empregado.fields.funcao')}
          control={control}
          required
          error={errors?.funcao?.message}
          tooltip={t('empregado.tooltips.funcao')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput
          name="endereco.cep"
          label={t('empregado.fields.cep')}
          control={control}
          required
          error={errors?.endereco?.cep?.message}
          tooltip={t('empregado.tooltips.cep')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 8' }}>
        <FormInput
          name="endereco.logradouro"
          label={t('empregado.fields.logradouro')}
          control={control}
          required
          error={errors?.endereco?.logradouro?.message}
          tooltip={t('empregado.tooltips.logradouro')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput
          name="endereco.numero"
          label={t('empregado.fields.numero')}
          control={control}
          required
          error={errors?.endereco?.numero?.message}
          tooltip={t('empregado.tooltips.numero')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 8' }}>
        <FormInput
          name="endereco.complemento"
          label={t('empregado.fields.complemento')}
          control={control}
          error={errors?.endereco?.complemento?.message}
          tooltip={t('empregado.tooltips.complemento')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput
          name="endereco.bairro"
          label={t('empregado.fields.bairro')}
          control={control}
          required
          error={errors?.endereco?.bairro?.message}
          tooltip={t('empregado.tooltips.bairro')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput
          name="endereco.cidade"
          label={t('empregado.fields.cidade')}
          control={control}
          required
          error={errors?.endereco?.cidade?.message}
          tooltip={t('empregado.tooltips.cidade')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput
          name="endereco.estado"
          label={t('empregado.fields.estado')}
          control={control}
          required
          error={errors?.endereco?.estado?.message}
          tooltip={t('empregado.tooltips.estado')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="observacoes"
          label={t('empregado.fields.observacoes')}
          control={control}
          multiline
          rows={4}
          error={errors?.observacoes?.message}
          tooltip={t('empregado.tooltips.observacoes')}
        />
      </Grid>
    </Grid>
  );
} 

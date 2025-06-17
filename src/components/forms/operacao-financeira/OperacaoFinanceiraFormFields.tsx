/**
 * Arquivo: OperacaoFinanceiraFormFields.tsx
 * Caminho: src/components/forms/operacao-financeira/OperacaoFinanceiraFormFields.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2024-06-07
 * Descrição: Campos reutilizáveis para o formulário de operação financeira.
 */

import { Grid } from '@mui/material';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import FormInput from '@/components/forms/inputs/FormInput';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import FormDatePicker from '@/components/forms/inputs/FormDatePicker';
import FormNumberInput from '@/components/forms/inputs/FormNumberInput';
import { OperacaoFinanceiraFormData, TipoOperacaoFinanceira } from './OperacaoFinanceiraFormTypes';

interface OperacaoFinanceiraFormFieldsProps {
  control: Control<OperacaoFinanceiraFormData>;
  errors?: FieldErrors<OperacaoFinanceiraFormData>;
}

export function OperacaoFinanceiraFormFields({ control, errors }: OperacaoFinanceiraFormFieldsProps) {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormSelect
          name="tipo"
          label={t('operacao.fields.tipo')}
          control={control}
          required
          error={!!errors?.tipo}
          options={[
            { value: TipoOperacaoFinanceira.RECEITA, label: t('operacao.tipos.receita') },
            { value: TipoOperacaoFinanceira.DESPESA, label: t('operacao.tipos.despesa') }
          ]}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormNumberInput
          name="valor"
          label={t('operacao.fields.valor')}
          control={control}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="data"
          label={t('operacao.fields.data')}
          control={control}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="descricao"
          label={t('operacao.fields.descricao')}
          control={control}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="categoria"
          label={t('operacao.fields.categoria')}
          control={control}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="formaPagamento"
          label={t('operacao.fields.formaPagamento')}
          control={control}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="observacoes"
          label={t('operacao.fields.observacoes')}
          control={control}
          multiline
          rows={4}
        />
      </Grid>
    </Grid>
  );
} 

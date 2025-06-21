/**
 * Arquivo: OperacaoFinanceiraForm.tsx
 * Caminho: src/components/OperacaoFinanceiraForm.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useOperacaoFinanceiraForm } from '@/hooks/useOperacaoFinanceiraForm';
import type { OperacaoFinanceiraFormData } from '@/hooks/useOperacaoFinanceiraForm';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { FormDatePicker } from '@/components/common/forms/FormDatePicker';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { formatCurrency } from '@/utils/format';

interface OperacaoFinanceiraFormProps {
  empregadoDomesticoId: string;
  onSuccess?: () => void;
}

export const OperacaoFinanceiraForm = ({ empregadoDomesticoId, onSuccess }: OperacaoFinanceiraFormProps) => {
  const { t } = useTranslation();
  const { form, onSubmit, isLoading } = useOperacaoFinanceiraForm();
  const { control, handleSubmit, watch } = form;

  const tipoOperacao = watch('tipo');
  const valor = watch('valor');
  const numeroParcelas = watch('numeroParcelas');

  const handleFormSubmit = async (data: OperacaoFinanceiraFormData) => {
    try {
      await onSubmit({ ...data, empregadoDomesticoId });
      onSuccess?.();
    } catch (error) {
      console.error('Erro ao salvar operação financeira:', error);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={3} columns={12}>
          <Grid gridColumn="span 12">
            <Typography variant="h6" gutterBottom>
              {t('operacaoFinanceira.titulo')}
            </Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
            <FormSelect
              name="tipo"
              label={t('operacaoFinanceira.tipo')}
              control={control}
              options={[
                { value: 'EMPRESTIMO', label: t('operacaoFinanceira.tipos.emprestimo') },
                { value: 'ADIANTAMENTO', label: t('operacaoFinanceira.tipos.adiantamento') },
              ]}
              required
            />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
            <FormInput
              name="valor"
              label={t('operacaoFinanceira.valor')}
              control={control}
              type="number"
              required
              InputProps={{
                startAdornment: 'R$',
              }}
            />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
            <FormDatePicker
              name="dataOperacao"
              label={t('operacaoFinanceira.dataOperacao')}
              control={control}
              required
            />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
            <FormDatePicker
              name="dataVencimento"
              label={t('operacaoFinanceira.dataVencimento')}
              control={control}
              required
            />
          </Grid>
          {tipoOperacao === 'EMPRESTIMO' && (
            <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
              <FormInput
                name="numeroParcelas"
                label={t('operacaoFinanceira.numeroParcelas')}
                control={control}
                type="number"
                InputProps={{
                  inputProps: { min: 1, max: 12 },
                }}
              />
            </Grid>
          )}
          {tipoOperacao === 'EMPRESTIMO' && numeroParcelas && valor && (
            <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
              <Typography variant="body2" color="textSecondary">
                {t('operacaoFinanceira.valorParcela')}: {formatCurrency(valor / numeroParcelas)}
              </Typography>
            </Grid>
          )}
          <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
            <FormSelect
              name="formaPagamento"
              label={t('operacaoFinanceira.formaPagamento')}
              control={control}
              options={[
                { value: 'DESCONTO_FOLHA', label: t('operacaoFinanceira.formasPagamento.descontoFolha') },
                { value: 'PIX', label: t('operacaoFinanceira.formasPagamento.pix') },
                { value: 'TRANSFERENCIA', label: t('operacaoFinanceira.formasPagamento.transferencia') },
                { value: 'DINHEIRO', label: t('operacaoFinanceira.formasPagamento.dinheiro') },
              ]}
              required
            />
          </Grid>
          <Grid gridColumn="span 12">
            <FormInput
              name="observacao"
              label={t('operacaoFinanceira.observacao')}
              control={control}
              multiline
              rows={4}
            />
          </Grid>
          <Grid gridColumn="span 12">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              fullWidth
            >
              {isLoading
                ? t('common.loading')
                : t('operacaoFinanceira.actions.salvar')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}; 

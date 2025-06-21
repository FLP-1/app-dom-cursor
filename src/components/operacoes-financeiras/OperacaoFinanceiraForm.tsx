/**
 * Arquivo: OperacaoFinanceiraForm.tsx
 * Caminho: src/components/operacoes-financeiras/OperacaoFinanceiraForm.tsx
 * Criado em: 2025-06-02
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { Box, TextField, Grid } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { tooltips } from '@/i18n/tooltips';
import { useEmpregadosDomesticos } from '@/hooks/useEmpregadosDomesticos';
import { useTranslation } from 'react-i18next';
import MenuItem from '@mui/material/MenuItem';

export interface OperacaoFinanceiraFormProps {
  control: Control<any>; // Justificativa: integração com react-hook-form, tipagem dinâmica dos campos
}

const OperacaoFinanceiraForm: React.FC<OperacaoFinanceiraFormProps> = ({ control }) => {
  const { empregadosDomesticos } = useEmpregadosDomesticos();
  const { t, i18n } = useTranslation();
  const formaPagamentoOptions = [
    { value: 'DINHEIRO', label: t('operacoesFinanceiras.formaPagamento.dinheiro', 'Dinheiro') },
    { value: 'PIX', label: t('operacoesFinanceiras.formaPagamento.pix', 'PIX') },
    { value: 'TRANSFERENCIA', label: t('operacoesFinanceiras.formaPagamento.transferencia', 'Transferência') },
    { value: 'OUTRO', label: t('operacoesFinanceiras.formaPagamento.outro', 'Outro') },
  ];
  return (
    <Grid container columns={12} spacing={2}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <Controller
          name="tipo"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Tipo"
              required
              fullWidth
              inputProps={{ 'aria-label': 'Tipo de operação financeira' }}
              helperText={tooltips.tipoOperacaoFinanceira.pt}
            />
          )}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <Controller
          name="empregadoDomesticoId"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label={t('operacoesFinanceiras.empregadoDomestico.label', 'Empregado Doméstico')}
              required
              fullWidth
              inputProps={{ 'aria-label': t('operacoesFinanceiras.empregadoDomestico.label', 'Empregado Doméstico') }}
              helperText={i18n.language === 'en' ? tooltips.empregadoDomesticoId.en : tooltips.empregadoDomesticoId.pt}
            >
              {empregadosDomesticos.map((emp) => (
                <MenuItem key={emp.id} value={emp.id}>{emp.nome}</MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <Controller
          name="valor"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Valor"
              required
              fullWidth
              type="number"
              inputProps={{ 'aria-label': 'Valor da operação financeira' }}
              helperText={tooltips.valorOperacao.pt}
            />
          )}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <Controller
          name="formaPagamento"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label={t('operacoesFinanceiras.formaPagamento.label', 'Forma de Pagamento')}
              required
              fullWidth
              inputProps={{ 'aria-label': t('operacoesFinanceiras.formaPagamento.label', 'Forma de Pagamento') }}
              helperText={i18n.language === 'en' ? tooltips.formaPagamento.en : tooltips.formaPagamento.pt}
            >
              {formaPagamentoOptions.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <Controller
          name="dataOperacao"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Data da Operação"
              required
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              inputProps={{ 'aria-label': 'Data da operação financeira' }}
              helperText={tooltips.dataOperacao.pt}
            />
          )}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <Controller
          name="dataVencimento"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Data de Vencimento"
              required
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              inputProps={{ 'aria-label': 'Data de vencimento' }}
              helperText={tooltips.dataVencimento.pt}
            />
          )}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <Controller
          name="numeroParcelas"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Número de Parcelas"
              required
              fullWidth
              type="number"
              inputProps={{ 'aria-label': 'Número de parcelas' }}
              helperText={tooltips.numeroParcelas.pt}
            />
          )}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <Controller
          name="valorParcela"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Valor da Parcela"
              required
              fullWidth
              type="number"
              inputProps={{ 'aria-label': 'Valor da parcela' }}
              helperText={tooltips.valorParcela.pt}
            />
          )}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <Controller
          name="observacao"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Observação"
              fullWidth
              multiline
              minRows={2}
              inputProps={{ 'aria-label': 'Observação da operação financeira' }}
              helperText={tooltips.observacaoOperacao.pt}
            />
          )}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <Controller
          name="comprovanteUrl"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Comprovante (URL)"
              fullWidth
              inputProps={{ 'aria-label': 'Comprovante da operação financeira' }}
              helperText={tooltips.comprovanteUrl.pt}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default OperacaoFinanceiraForm; 

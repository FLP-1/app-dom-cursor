/**
 * Arquivo: RegistrarPagamentoDialog.tsx
 * Caminho: src/components/dialogs/RegistrarPagamentoDialog.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import { useOperacoesFinanceiras } from '@/hooks/useOperacoesFinanceiras';
import { FormDatePicker } from '@/components/forms/inputs/FormDatePicker';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const pagarSchema = z.object({
  valor: z.number().positive('Valor deve ser maior que zero'),
  dataPagamento: z.string().datetime(),
  comprovanteUrl: z.string().url('URL do comprovante inválida').optional(),
  observacao: z.string().optional(),
});

type PagarFormData = z.infer<typeof pagarSchema>;

interface RegistrarPagamentoDialogProps {
  open: boolean;
  onClose: () => void;
  operacaoId: string;
  valor: number;
}

export function RegistrarPagamentoDialog({
  open,
  onClose,
  operacaoId,
  valor,
}: RegistrarPagamentoDialogProps) {
  const { t } = useTranslation();
  const { loading, registrarPagamento } = useOperacoesFinanceiras();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PagarFormData>({
    resolver: zodResolver(pagarSchema),
    defaultValues: {
      valor,
      dataPagamento: new Date().toISOString(),
    },
  });

  const onSubmit = async (data: PagarFormData) => {
    await registrarPagamento(operacaoId, data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('operacoesFinanceiras.acoes.pagar')}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2} columns={12}>
            <Grid gridColumn={{ xs: 'span 12' }}>
              <FormInput
                control={control}
                name="valor"
                label={t('operacoesFinanceiras.valor.label')}
                type="number"
                placeholder={t('operacoesFinanceiras.valor.placeholder')}
                error={!!errors.valor}
                helperText={errors.valor?.message}
              />
            </Grid>
            <Grid gridColumn={{ xs: 'span 12' }}>
              <FormDatePicker
                control={control}
                name="dataPagamento"
                label={t('operacoesFinanceiras.dataOperacao.label')}
                error={!!errors.dataPagamento}
                helperText={errors.dataPagamento?.message}
              />
            </Grid>
            <Grid gridColumn={{ xs: 'span 12' }}>
              <FormInput
                control={control}
                name="comprovanteUrl"
                label={t('operacoesFinanceiras.comprovanteUrl.label')}
                placeholder={t('operacoesFinanceiras.comprovanteUrl.placeholder')}
                error={!!errors.comprovanteUrl}
                helperText={errors.comprovanteUrl?.message}
              />
            </Grid>
            <Grid gridColumn={{ xs: 'span 12' }}>
              <FormInput
                control={control}
                name="observacao"
                label={t('operacoesFinanceiras.observacao.label')}
                multiline
                rows={3}
                placeholder={t('operacoesFinanceiras.observacao.placeholder')}
                error={!!errors.observacao}
                helperText={errors.observacao?.message}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>{t('common.cancel')}</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {t('operacoesFinanceiras.acoes.pagar')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 

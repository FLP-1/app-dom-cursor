/**
 * Arquivo: useOperacoesFinanceiras.ts
 * Caminho: src/hooks/useOperacoesFinanceiras.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useSnackbar } from 'notistack';
import { z } from 'zod';

export const operacaoFinanceiraSchema = z.object({
  tipo: z.enum(['ADIANTAMENTO', 'EMPRESTIMO']),
  valor: z.number().positive('Valor deve ser maior que zero'),
  dataOperacao: z.string().datetime(),
  dataVencimento: z.string().datetime(),
  numeroParcelas: z.number().min(1).optional(),
  valorParcela: z.number().positive().optional(),
  formaPagamento: z.enum(['DINHEIRO', 'PIX', 'TRANSFERENCIA', 'OUTRO']),
  observacao: z.string().optional(),
  comprovanteUrl: z.string().url('URL do comprovante inválida').optional(),
  empregadoDomesticoId: z.string().uuid(),
});

export type OperacaoFinanceiraFormData = z.infer<typeof operacaoFinanceiraSchema>;

export function useOperacoesFinanceiras() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const criarOperacao = async (data: OperacaoFinanceiraFormData) => {
    try {
      setLoading(true);
      const response = await fetch('/api/operacoes-financeiras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      enqueueSnackbar(t('operacoesFinanceiras.mensagens.sucesso'), { variant: 'success' });
      router.reload();
    } catch (error) {
      enqueueSnackbar(
        error instanceof Error ? error.message : t('operacoesFinanceiras.mensagens.erro'),
        { variant: 'error' }
      );
    } finally {
      setLoading(false);
    }
  };

  const aprovarOperacao = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/operacoes-financeiras/${id}/aprovar`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      enqueueSnackbar(t('operacoesFinanceiras.mensagens.aprovado'), { variant: 'success' });
      router.reload();
    } catch (error) {
      enqueueSnackbar(
        error instanceof Error ? error.message : t('operacoesFinanceiras.mensagens.erroAprovacao'),
        { variant: 'error' }
      );
    } finally {
      setLoading(false);
    }
  };

  const rejeitarOperacao = async (id: string, motivo: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/operacoes-financeiras/${id}/rejeitar`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ motivo }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      enqueueSnackbar(t('operacoesFinanceiras.mensagens.rejeitado'), { variant: 'success' });
      router.reload();
    } catch (error) {
      enqueueSnackbar(
        error instanceof Error ? error.message : t('operacoesFinanceiras.mensagens.erroRejeicao'),
        { variant: 'error' }
      );
    } finally {
      setLoading(false);
    }
  };

  const registrarPagamento = async (
    id: string,
    data: {
      valor: number;
      dataPagamento: string;
      comprovanteUrl?: string;
      observacao?: string;
    }
  ) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/operacoes-financeiras/${id}/pagar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      enqueueSnackbar(t('operacoesFinanceiras.mensagens.pagamentoRegistrado'), { variant: 'success' });
      router.reload();
    } catch (error) {
      enqueueSnackbar(
        error instanceof Error ? error.message : t('operacoesFinanceiras.mensagens.erroPagamento'),
        { variant: 'error' }
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    criarOperacao,
    aprovarOperacao,
    rejeitarOperacao,
    registrarPagamento,
  };
} 

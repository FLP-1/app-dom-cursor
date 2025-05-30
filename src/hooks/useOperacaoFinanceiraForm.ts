import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'next-i18next';
import { useNotification } from '@/hooks/useNotification';
import { api } from '@/services/api';
import { TipoOperacao, StatusOperacao, FormaPagamento } from '@prisma/client';

const operacaoFinanceiraSchema = z.object({
  tipo: z.enum(['EMPRESTIMO', 'ADIANTAMENTO'] as const),
  valor: z.number().min(0.01, 'O valor deve ser maior que zero'),
  dataOperacao: z.date(),
  dataVencimento: z.date(),
  numeroParcelas: z.number().optional(),
  formaPagamento: z.enum(['DESCONTO_FOLHA', 'PIX', 'TRANSFERENCIA', 'DINHEIRO'] as const),
  observacao: z.string().optional(),
  comprovanteUrl: z.string().optional(),
  empregadoDomesticoId: z.string().uuid(),
});

type OperacaoFinanceiraFormData = z.infer<typeof operacaoFinanceiraSchema>;

export const useOperacaoFinanceiraForm = () => {
  const { t } = useTranslation();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<OperacaoFinanceiraFormData>({
    resolver: zodResolver(operacaoFinanceiraSchema),
    defaultValues: {
      tipo: 'EMPRESTIMO',
      dataOperacao: new Date(),
      formaPagamento: 'DESCONTO_FOLHA',
    },
  });

  const onSubmit = async (data: OperacaoFinanceiraFormData) => {
    try {
      setIsLoading(true);

      // Calcula o valor da parcela se houver número de parcelas
      if (data.numeroParcelas && data.numeroParcelas > 1) {
        data.valorParcela = data.valor / data.numeroParcelas;
      }

      const response = await api.post('/api/operacoes-financeiras', data);

      showNotification({
        type: 'success',
        message: t('operacaoFinanceira.messages.sucesso'),
      });

      return response.data;
    } catch (error) {
      showNotification({
        type: 'error',
        message: t('operacaoFinanceira.messages.erro'),
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const aprovarOperacao = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await api.patch(`/api/operacoes-financeiras/${id}/aprovar`);
      
      showNotification({
        type: 'success',
        message: t('operacaoFinanceira.messages.aprovado'),
      });

      return response.data;
    } catch (error) {
      showNotification({
        type: 'error',
        message: t('operacaoFinanceira.messages.erroAprovacao'),
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const rejeitarOperacao = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await api.patch(`/api/operacoes-financeiras/${id}/rejeitar`);
      
      showNotification({
        type: 'success',
        message: t('operacaoFinanceira.messages.rejeitado'),
      });

      return response.data;
    } catch (error) {
      showNotification({
        type: 'error',
        message: t('operacaoFinanceira.messages.erroRejeicao'),
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registrarPagamento = async (id: string, parcelaId: string) => {
    try {
      setIsLoading(true);
      const response = await api.patch(`/api/operacoes-financeiras/${id}/parcelas/${parcelaId}/pagar`);
      
      showNotification({
        type: 'success',
        message: t('operacaoFinanceira.messages.pagamentoRegistrado'),
      });

      return response.data;
    } catch (error) {
      showNotification({
        type: 'error',
        message: t('operacaoFinanceira.messages.erroPagamento'),
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit,
    isLoading,
    aprovarOperacao,
    rejeitarOperacao,
    registrarPagamento,
  };
}; 
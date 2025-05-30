import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Button,
  Typography,
  Box,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { useTranslation } from 'next-i18next';
import { formatCurrency, formatDate } from '@/utils/format';
import { StatusOperacao, TipoOperacao } from '@prisma/client';

interface OperacaoFinanceira {
  id: string;
  tipo: TipoOperacao;
  valor: number;
  dataOperacao: Date;
  dataVencimento: Date;
  numeroParcelas?: number;
  valorParcela?: number;
  status: StatusOperacao;
  formaPagamento: string;
  observacao?: string;
  parcelas: {
    id: string;
    numero: number;
    valor: number;
    dataVencimento: Date;
    dataPagamento?: Date;
    status: StatusOperacao;
  }[];
}

interface OperacaoFinanceiraListProps {
  operacoes: OperacaoFinanceira[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onAprovar?: (id: string) => void;
  onRejeitar?: (id: string) => void;
  onRegistrarPagamento?: (operacaoId: string, parcelaId: string) => void;
  isLoading?: boolean;
}

export const OperacaoFinanceiraList = ({
  operacoes,
  onEdit,
  onDelete,
  onAprovar,
  onRejeitar,
  onRegistrarPagamento,
  isLoading,
}: OperacaoFinanceiraListProps) => {
  const { t } = useTranslation();

  const getStatusColor = (status: StatusOperacao) => {
    switch (status) {
      case 'PENDENTE':
        return 'warning';
      case 'APROVADO':
        return 'info';
      case 'REJEITADO':
        return 'error';
      case 'PAGO':
        return 'success';
      case 'CANCELADO':
        return 'default';
      default:
        return 'default';
    }
  };

  const getTipoLabel = (tipo: TipoOperacao) => {
    switch (tipo) {
      case 'EMPRESTIMO':
        return t('operacaoFinanceira.tipos.emprestimo');
      case 'ADIANTAMENTO':
        return t('operacaoFinanceira.tipos.adiantamento');
      default:
        return tipo;
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('operacaoFinanceira.tipo')}</TableCell>
            <TableCell>{t('operacaoFinanceira.valor')}</TableCell>
            <TableCell>{t('operacaoFinanceira.dataOperacao')}</TableCell>
            <TableCell>{t('operacaoFinanceira.dataVencimento')}</TableCell>
            <TableCell>{t('operacaoFinanceira.status')}</TableCell>
            <TableCell>{t('operacaoFinanceira.parcelas')}</TableCell>
            <TableCell>{t('common.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {operacoes.map((operacao) => (
            <TableRow key={operacao.id}>
              <TableCell>{getTipoLabel(operacao.tipo)}</TableCell>
              <TableCell>{formatCurrency(operacao.valor)}</TableCell>
              <TableCell>{formatDate(operacao.dataOperacao)}</TableCell>
              <TableCell>{formatDate(operacao.dataVencimento)}</TableCell>
              <TableCell>
                <Chip
                  label={t(`operacaoFinanceira.status.${operacao.status.toLowerCase()}`)}
                  color={getStatusColor(operacao.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                {operacao.numeroParcelas ? (
                  <Typography variant="body2">
                    {operacao.parcelas.length}/{operacao.numeroParcelas}
                  </Typography>
                ) : (
                  '-'
                )}
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {operacao.status === 'PENDENTE' && (
                    <>
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() => onAprovar?.(operacao.id)}
                        disabled={isLoading}
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onRejeitar?.(operacao.id)}
                        disabled={isLoading}
                      >
                        <CloseIcon />
                      </IconButton>
                    </>
                  )}

                  {operacao.status === 'APROVADO' && operacao.parcelas.some((p) => p.status === 'PENDENTE') && (
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => {
                        const parcelaPendente = operacao.parcelas.find((p) => p.status === 'PENDENTE');
                        if (parcelaPendente) {
                          onRegistrarPagamento?.(operacao.id, parcelaPendente.id);
                        }
                      }}
                      disabled={isLoading}
                    >
                      <MoneyIcon />
                    </IconButton>
                  )}

                  {operacao.status === 'PENDENTE' && (
                    <>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onEdit?.(operacao.id)}
                        disabled={isLoading}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDelete?.(operacao.id)}
                        disabled={isLoading}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}; 
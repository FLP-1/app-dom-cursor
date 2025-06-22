/**
 * Arquivo: OperacaoFinanceiraList.tsx
 * Caminho: src/components/OperacaoFinanceiraList.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Componente de lista de operações financeiras
 */

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
import { formatCurrency, formatDate } from '@/utils/format';
import { StatusOperacao, TipoOperacao } from '@prisma/client';
import React from 'react';
import { financeiroMessages } from '@/i18n/messages/financeiro.messages';

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

export const OperacaoFinanceiraList = React.memo(({
  operacoes,
  onEdit,
  onDelete,
  onAprovar,
  onRejeitar,
  onRegistrarPagamento,
  isLoading,
}: OperacaoFinanceiraListProps) => {
  // Usar mensagens em português por padrão
  const messages = financeiroMessages.pt;

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
    return messages.tipos[tipo] || tipo;
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{messages.labels.tipo}</TableCell>
            <TableCell>{messages.labels.valor}</TableCell>
            <TableCell>{messages.labels.data}</TableCell>
            <TableCell>{messages.labels.vencimento}</TableCell>
            <TableCell>{messages.labels.status}</TableCell>
            <TableCell>{messages.labels.parcelas}</TableCell>
            <TableCell>{messages.labels.acoes}</TableCell>
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
                  label={messages.status[operacao.status] || operacao.status}
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
                        aria-label={messages.tooltips.aprovar}
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onRejeitar?.(operacao.id)}
                        disabled={isLoading}
                        aria-label={messages.tooltips.rejeitar}
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
                      aria-label={messages.tooltips.registrar}
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
                        aria-label={messages.tooltips.editar}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDelete?.(operacao.id)}
                        disabled={isLoading}
                        aria-label={messages.tooltips.excluir}
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
});

export default OperacaoFinanceiraList; 

/**
 * Arquivo: index.tsx
 * Caminho: src/pages/operacoes-financeiras/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de listagem de operações financeiras
 */

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Alert, 
  Snackbar,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useNotification } from '@/hooks/useNotification';
import { useOperacaoFinanceiraForm } from '@/hooks/useOperacaoFinanceiraForm';
import { useOperacoesFinanceiras } from '@/hooks/useOperacoesFinanceiras';
import { OperacaoFinanceira } from '@/types/operacao-financeira';
import OperacaoFinanceiraForm from '@/components/operacoes-financeiras/OperacaoFinanceiraForm';
import RejeitarOperacaoDialog from '@/components/operacoes-financeiras/RejeitarOperacaoDialog';
import RegistrarPagamentoDialog from '@/components/operacoes-financeiras/RegistrarPagamentoDialog';
import { PageHeader } from '@/components/common/PageHeader';
import { TableActions } from '@/components/common/TableActions';
import { api } from '@/services/api';
import { formatCurrency, formatDateBR } from '@/utils/formatters';
import { Layout } from '@/components/layout/Layout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PaymentIcon from '@mui/icons-material/Payment';
import { tooltips } from '@/i18n/tooltips';

export default function OperacoesFinanceirasPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { showNotification } = useNotification();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [operacoes, setOperacoes] = useState<OperacaoFinanceira[]>([]);
  const { aprovarOperacao, rejeitarOperacao, registrarPagamento } = useOperacaoFinanceiraForm();
  const { loading } = useOperacoesFinanceiras();
  const [rejeitarDialogOpen, setRejeitarDialogOpen] = useState(false);
  const [pagarDialogOpen, setPagarDialogOpen] = useState(false);
  const [selectedOperacao, setSelectedOperacao] = useState<OperacaoFinanceira | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  const handleSuccess = async () => {
    handleCloseForm();
    await loadOperacoes();
  };

  const loadOperacoes = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/api/operacoes-financeiras');
      setOperacoes(response.data);
    } catch (error) {
      showNotification({
        type: 'error',
        message: t('operacaoFinanceira.messages.erroCarregar'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAprovar = async (id: string) => {
    try {
      await aprovarOperacao(id);
      await loadOperacoes();
      setSnackbar({ open: true, message: t('Operação aprovada com sucesso!'), severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: t('Erro ao aprovar operação.'), severity: 'error' });
    }
  };

  const handleRejeitar = (operacao: OperacaoFinanceira) => {
    setSelectedOperacao(operacao);
    setRejeitarDialogOpen(true);
  };

  const handleRegistrarPagamento = (operacaoId: string, parcelaId: string) => {
    setSelectedOperacao(operacoes.find(o => o.id === operacaoId) || null);
    setPagarDialogOpen(true);
  };

  useEffect(() => {
    loadOperacoes();
  }, []);

  if (isLoading && operacoes.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <PageHeader
          title={t('Operações Financeiras')}
          onAdd={handleOpenForm}
          onRefresh={loadOperacoes}
          addButtonText={t('Nova Operação')}
        />

        <Box sx={{ mt: 3 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('operacoesFinanceiras.tipo.label')}</TableCell>
                  <TableCell>{t('operacoesFinanceiras.empregadoDomestico.label')}</TableCell>
                  <TableCell>{t('operacoesFinanceiras.valor.label')}</TableCell>
                  <TableCell>{t('operacoesFinanceiras.dataOperacao.label')}</TableCell>
                  <TableCell>{t('operacoesFinanceiras.dataVencimento.label')}</TableCell>
                  <TableCell>{t('operacoesFinanceiras.formaPagamento.label')}</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {operacoes.map((operacao) => (
                  <TableRow key={operacao.id}>
                    <TableCell>{operacao.tipo}</TableCell>
                    <TableCell>{operacao.empregadoDomestico.nome}</TableCell>
                    <TableCell>{formatCurrency(operacao.valor)}</TableCell>
                    <TableCell>{formatDateBR(operacao.dataOperacao)}</TableCell>
                    <TableCell>{formatDateBR(operacao.dataVencimento)}</TableCell>
                    <TableCell>{operacao.formaPagamento}</TableCell>
                    <TableCell>{operacao.status}</TableCell>
                    <TableCell>
                      {operacao.status === 'PENDENTE' && (
                        <TableActions
                          actions={[
                            {
                              icon: <CheckCircleIcon color="success" />, 
                              tooltip: tooltips.aprovar.pt,
                              onClick: () => handleAprovar(operacao.id),
                              disabled: loading,
                              ariaLabel: 'Aprovar operação'
                            },
                            {
                              icon: <CancelIcon color="warning" />, 
                              tooltip: tooltips.rejeitar.pt,
                              onClick: () => handleRejeitar(operacao),
                              disabled: loading,
                              ariaLabel: 'Rejeitar operação'
                            }
                          ]}
                        />
                      )}
                      {operacao.status === 'APROVADO' && (
                        <TableActions
                          actions={[
                            {
                              icon: <PaymentIcon color="secondary" />, 
                              tooltip: tooltips.registrarPagamento.pt,
                              onClick: () => handleRegistrarPagamento(operacao.id, operacao.parcelas?.[0].id),
                              disabled: loading,
                              ariaLabel: 'Registrar pagamento'
                            }
                          ]}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <OperacaoFinanceiraForm
          empregadoDomesticoId={router.query.empregadoId as string}
          onSuccess={handleSuccess}
          open={isFormOpen}
          onClose={handleCloseForm}
        />

        {selectedOperacao && (
          <>
            <RejeitarOperacaoDialog
              open={rejeitarDialogOpen}
              onClose={() => {
                setRejeitarDialogOpen(false);
                setSelectedOperacao(null);
              }}
              operacaoId={selectedOperacao.id}
            />

            <RegistrarPagamentoDialog
              open={pagarDialogOpen}
              onClose={() => {
                setPagarDialogOpen(false);
                setSelectedOperacao(null);
              }}
              operacaoId={selectedOperacao.id}
              valor={selectedOperacao.valor}
            />
          </>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Layout>
  );
} 

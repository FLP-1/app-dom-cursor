import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  Container,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Add as AddIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import { OperacaoFinanceiraForm } from '@/components/forms/OperacaoFinanceiraForm';
import { OperacaoFinanceiraList } from '@/components/OperacaoFinanceiraList';
import { useOperacaoFinanceiraForm } from '@/hooks/useOperacaoFinanceiraForm';
import { useNotification } from '@/hooks/useNotification';
import { api } from '@/services/api';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useOperacoesFinanceiras } from '@/hooks/useOperacoesFinanceiras';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { RejeitarOperacaoDialog } from '@/components/dialogs/RejeitarOperacaoDialog';
import { RegistrarPagamentoDialog } from '@/components/dialogs/RegistrarPagamentoDialog';

interface OperacaoFinanceira {
  id: string;
  tipo: 'ADIANTAMENTO' | 'EMPRESTIMO';
  valor: number;
  dataOperacao: string;
  dataVencimento: string;
  formaPagamento: 'DINHEIRO' | 'PIX' | 'TRANSFERENCIA' | 'OUTRO';
  status: 'PENDENTE' | 'APROVADO' | 'REJEITADO' | 'CONCLUIDO';
  observacao?: string;
  comprovanteUrl?: string;
  empregadoDomestico: {
    id: string;
    nome: string;
  };
  parcelas?: {
    id: string;
    numero: number;
    valor: number;
    dataVencimento: string;
    status: 'PENDENTE' | 'PAGO';
  }[];
}

export default function OperacoesFinanceirasPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { showNotification } = useNotification();
  const { data: session } = useSession();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [operacoes, setOperacoes] = useState<OperacaoFinanceira[]>([]);
  const { aprovarOperacao, rejeitarOperacao, registrarPagamento } = useOperacaoFinanceiraForm();
  const { loading } = useOperacoesFinanceiras();
  const [rejeitarDialogOpen, setRejeitarDialogOpen] = useState(false);
  const [pagarDialogOpen, setPagarDialogOpen] = useState(false);
  const [selectedOperacao, setSelectedOperacao] = useState<OperacaoFinanceira | null>(null);

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
    await aprovarOperacao(id);
    const response = await fetch('/api/operacoes-financeiras');
    const data = await response.json();
    setOperacoes(data);
  };

  const handleRejeitar = (operacao: OperacaoFinanceira) => {
    setSelectedOperacao(operacao);
    setRejeitarDialogOpen(true);
  };

  const handleRegistrarPagamento = async (operacaoId: string, parcelaId: string) => {
    try {
      await registrarPagamento(operacaoId, parcelaId);
      await loadOperacoes();
    } catch (error) {
      console.error('Erro ao registrar pagamento:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDENTE':
        return 'warning';
      case 'APROVADO':
        return 'info';
      case 'REJEITADO':
        return 'error';
      case 'CONCLUIDO':
        return 'success';
      default:
        return 'default';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy', { locale: ptBR });
  };

  useEffect(() => {
    const fetchOperacoes = async () => {
      try {
        const response = await fetch('/api/operacoes-financeiras');
        if (!response.ok) {
          throw new Error('Erro ao carregar operações financeiras');
        }
        const data = await response.json();
        setOperacoes(data);
      } catch (error) {
        console.error('Erro ao carregar operações financeiras:', error);
      }
    };

    if (session) {
      fetchOperacoes();
    }
  }, [session]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          {t('operacaoFinanceira.titulo')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenForm}
        >
          {t('operacaoFinanceira.actions.nova')}
        </Button>
      </Box>

      <Card>
        <CardContent>
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
                    <TableCell>
                      {t(`operacoesFinanceiras.tipo.${operacao.tipo.toLowerCase()}`)}
                    </TableCell>
                    <TableCell>{operacao.empregadoDomestico.nome}</TableCell>
                    <TableCell>{formatCurrency(operacao.valor)}</TableCell>
                    <TableCell>{formatDate(operacao.dataOperacao)}</TableCell>
                    <TableCell>{formatDate(operacao.dataVencimento)}</TableCell>
                    <TableCell>
                      {t(`operacoesFinanceiras.formaPagamento.${operacao.formaPagamento.toLowerCase()}`)}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={t(`operacoesFinanceiras.status.${operacao.status.toLowerCase()}`)}
                        color={getStatusColor(operacao.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {operacao.status === 'PENDENTE' && (
                        <>
                          <IconButton
                            color="success"
                            size="small"
                            onClick={() => handleAprovar(operacao.id)}
                            disabled={loading}
                          >
                            <CheckIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => handleRejeitar(operacao)}
                            disabled={loading}
                          >
                            <CloseIcon />
                          </IconButton>
                        </>
                      )}
                      {operacao.status === 'APROVADO' && (
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => handleRegistrarPagamento(operacao.id, operacao.parcelas?.[0].id)}
                          disabled={loading}
                        >
                          <PaymentIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

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
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'pt-BR', ['common'])),
    },
  };
}; 
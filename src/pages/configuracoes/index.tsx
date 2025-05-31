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
import { useSession } from 'next-auth/react';
import { useNotification } from '../../hooks/useNotification';
import { useConfiguracaoForm } from '../../hooks/useConfiguracaoForm';
import { useConfiguracoes } from '../../hooks/useConfiguracoes';
import { Configuracao } from '../../types/configuracao';
import { ConfiguracaoForm } from '../../components/configuracoes/ConfiguracaoForm';
import { PageHeader } from '../../components/common/PageHeader';
import { TableActions } from '../../components/common/TableActions';
import { api } from '../../services/api';
import { formatDateBR } from '../../utils/formatters';

export default function ConfiguracoesPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { showNotification } = useNotification();
  const { data: session } = useSession();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [configuracoes, setConfiguracoes] = useState<Configuracao[]>([]);
  const { updateConfiguracao, deleteConfiguracao } = useConfiguracaoForm();
  const { loading } = useConfiguracoes();
  const [selectedConfiguracao, setSelectedConfiguracao] = useState<Configuracao | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  const handleSuccess = async () => {
    handleCloseForm();
    await loadConfiguracoes();
  };

  const loadConfiguracoes = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/api/configuracoes');
      setConfiguracoes(response.data);
    } catch (error) {
      showNotification({
        type: 'error',
        message: t('configuracao.messages.erroCarregar'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (configuracao: Configuracao) => {
    setSelectedConfiguracao(configuracao);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteConfiguracao(id);
      await loadConfiguracoes();
      setSnackbar({ open: true, message: t('Configuração excluída com sucesso!'), severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: t('Erro ao excluir configuração.'), severity: 'error' });
    }
  };

  useEffect(() => {
    loadConfiguracoes();
  }, []);

  if (isLoading && configuracoes.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title={t('Configurações')}
        onAdd={handleOpenForm}
        onRefresh={loadConfiguracoes}
        addButtonText={t('Nova Configuração')}
      />

      <Box sx={{ mt: 3 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('configuracoes.chave.label')}</TableCell>
                <TableCell>{t('configuracoes.valor.label')}</TableCell>
                <TableCell>{t('configuracoes.descricao.label')}</TableCell>
                <TableCell>{t('configuracoes.dataAtualizacao.label')}</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {configuracoes.map((configuracao) => (
                <TableRow key={configuracao.id}>
                  <TableCell>{configuracao.chave}</TableCell>
                  <TableCell>{configuracao.valor}</TableCell>
                  <TableCell>{configuracao.descricao}</TableCell>
                  <TableCell>{formatDateBR(configuracao.dataAtualizacao)}</TableCell>
                  <TableCell>
                    <TableActions
                      onEdit={() => handleEdit(configuracao)}
                      onDelete={() => handleDelete(configuracao.id)}
                      disabled={loading}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <ConfiguracaoForm
        configuracao={selectedConfiguracao}
        onSuccess={handleSuccess}
        open={isFormOpen}
        onClose={handleCloseForm}
      />

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
  );
} 
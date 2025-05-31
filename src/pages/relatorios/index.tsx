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
import { useRelatorio } from '../../hooks/useRelatorio';
import { Relatorio } from '../../types/relatorio';
import { PageHeader } from '../../components/common/PageHeader';
import { TableActions } from '../../components/common/TableActions';
import { api } from '../../services/api';
import { formatDateBR, formatFileSize } from '../../utils/formatters';

export default function RelatoriosPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { showNotification } = useNotification();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const { loading, generateRelatorio, deleteRelatorio } = useRelatorio();
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const loadRelatorios = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/api/relatorios');
      setRelatorios(response.data);
    } catch (error) {
      showNotification({
        type: 'error',
        message: t('relatorio.messages.erroCarregar'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    try {
      await generateRelatorio();
      await loadRelatorios();
      setSnackbar({ open: true, message: t('Relatório gerado com sucesso!'), severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: t('Erro ao gerar relatório.'), severity: 'error' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRelatorio(id);
      await loadRelatorios();
      setSnackbar({ open: true, message: t('Relatório excluído com sucesso!'), severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: t('Erro ao excluir relatório.'), severity: 'error' });
    }
  };

  const handleDownload = async (relatorio: Relatorio) => {
    try {
      const response = await api.get(`/api/relatorios/${relatorio.id}/download`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', relatorio.nome);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      showNotification({
        type: 'error',
        message: t('relatorio.messages.erroDownload'),
      });
    }
  };

  useEffect(() => {
    loadRelatorios();
  }, []);

  if (isLoading && relatorios.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title={t('Relatórios')}
        onAdd={handleGenerate}
        onRefresh={loadRelatorios}
        addButtonText={t('Novo Relatório')}
      />

      <Box sx={{ mt: 3 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('relatorios.nome.label')}</TableCell>
                <TableCell>{t('relatorios.tipo.label')}</TableCell>
                <TableCell>{t('relatorios.data.label')}</TableCell>
                <TableCell>{t('relatorios.tamanho.label')}</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {relatorios.map((relatorio) => (
                <TableRow key={relatorio.id}>
                  <TableCell>{relatorio.nome}</TableCell>
                  <TableCell>{relatorio.tipo}</TableCell>
                  <TableCell>{formatDateBR(relatorio.data)}</TableCell>
                  <TableCell>{formatFileSize(relatorio.tamanho)}</TableCell>
                  <TableCell>
                    <TableActions
                      onView={() => handleDownload(relatorio)}
                      onDelete={() => handleDelete(relatorio.id)}
                      disabled={loading}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

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
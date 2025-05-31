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
import { useBackup } from '../../hooks/useBackup';
import { Backup } from '../../types/backup';
import { PageHeader } from '../../components/common/PageHeader';
import { TableActions } from '../../components/common/TableActions';
import { api } from '../../services/api';
import { formatDateBR, formatFileSize } from '../../utils/formatters';

export default function BackupPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { showNotification } = useNotification();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [backups, setBackups] = useState<Backup[]>([]);
  const { loading, createBackup, restoreBackup, deleteBackup } = useBackup();
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const loadBackups = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/api/backups');
      setBackups(response.data);
    } catch (error) {
      showNotification({
        type: 'error',
        message: t('backup.messages.erroCarregar'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      await createBackup();
      await loadBackups();
      setSnackbar({ open: true, message: t('Backup criado com sucesso!'), severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: t('Erro ao criar backup.'), severity: 'error' });
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await restoreBackup(id);
      setSnackbar({ open: true, message: t('Backup restaurado com sucesso!'), severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: t('Erro ao restaurar backup.'), severity: 'error' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBackup(id);
      await loadBackups();
      setSnackbar({ open: true, message: t('Backup excluído com sucesso!'), severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: t('Erro ao excluir backup.'), severity: 'error' });
    }
  };

  const handleDownload = async (backup: Backup) => {
    try {
      const response = await api.get(`/api/backups/${backup.id}/download`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', backup.nome);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      showNotification({
        type: 'error',
        message: t('backup.messages.erroDownload'),
      });
    }
  };

  useEffect(() => {
    loadBackups();
  }, []);

  if (isLoading && backups.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title={t('Backups')}
        onAdd={handleCreate}
        onRefresh={loadBackups}
        addButtonText={t('Novo Backup')}
      />

      <Box sx={{ mt: 3 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('backups.nome.label')}</TableCell>
                <TableCell>{t('backups.data.label')}</TableCell>
                <TableCell>{t('backups.tamanho.label')}</TableCell>
                <TableCell>{t('backups.status.label')}</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {backups.map((backup) => (
                <TableRow key={backup.id}>
                  <TableCell>{backup.nome}</TableCell>
                  <TableCell>{formatDateBR(backup.data)}</TableCell>
                  <TableCell>{formatFileSize(backup.tamanho)}</TableCell>
                  <TableCell>{backup.status}</TableCell>
                  <TableCell>
                    <TableActions
                      onView={() => handleDownload(backup)}
                      onEdit={() => handleRestore(backup.id)}
                      onDelete={() => handleDelete(backup.id)}
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
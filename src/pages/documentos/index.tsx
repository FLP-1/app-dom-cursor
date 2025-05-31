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
import { useDocumentoForm } from '../../hooks/useDocumentoForm';
import { useDocumentos } from '../../hooks/useDocumentos';
import { Documento } from '../../types/documento';
import { DocumentoForm } from '../../components/documentos/DocumentoForm';
import { PageHeader } from '../../components/common/PageHeader';
import { TableActions } from '../../components/common/TableActions';
import { api } from '../../services/api';
import { formatDateBR, formatFileSize } from '../../utils/formatters';

export default function DocumentosPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { showNotification } = useNotification();
  const { data: session } = useSession();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const { uploadDocumento, deleteDocumento } = useDocumentoForm();
  const { loading } = useDocumentos();
  const [selectedDocumento, setSelectedDocumento] = useState<Documento | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  const handleSuccess = async () => {
    handleCloseForm();
    await loadDocumentos();
  };

  const loadDocumentos = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/api/documentos');
      setDocumentos(response.data);
    } catch (error) {
      showNotification({
        type: 'error',
        message: t('documento.messages.erroCarregar'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDocumento(id);
      await loadDocumentos();
      setSnackbar({ open: true, message: t('Documento excluído com sucesso!'), severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: t('Erro ao excluir documento.'), severity: 'error' });
    }
  };

  const handleDownload = async (documento: Documento) => {
    try {
      const response = await api.get(`/api/documentos/${documento.id}/download`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', documento.nome);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      showNotification({
        type: 'error',
        message: t('documento.messages.erroDownload'),
      });
    }
  };

  useEffect(() => {
    loadDocumentos();
  }, []);

  if (isLoading && documentos.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title={t('Documentos')}
        onAdd={handleOpenForm}
        onRefresh={loadDocumentos}
        addButtonText={t('Novo Documento')}
      />

      <Box sx={{ mt: 3 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('documentos.nome.label')}</TableCell>
                <TableCell>{t('documentos.tipo.label')}</TableCell>
                <TableCell>{t('documentos.dataUpload.label')}</TableCell>
                <TableCell>{t('documentos.tamanho.label')}</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documentos.map((documento) => (
                <TableRow key={documento.id}>
                  <TableCell>{documento.nome}</TableCell>
                  <TableCell>{documento.tipo}</TableCell>
                  <TableCell>{formatDateBR(documento.dataUpload)}</TableCell>
                  <TableCell>{formatFileSize(documento.tamanho)}</TableCell>
                  <TableCell>
                    <TableActions
                      onView={() => handleDownload(documento)}
                      onDelete={() => handleDelete(documento.id)}
                      disabled={loading}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <DocumentoForm
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
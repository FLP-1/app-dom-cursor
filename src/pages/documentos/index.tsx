/**
 * Arquivo: index.tsx
 * Caminho: src/pages/documentos/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de documentos
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
import { useDocumentoForm } from '@/hooks/useDocumentoForm';
import { useDocumentos } from '@/hooks/useDocumentos';
import { Documento } from '@/types/documento';
import { DocumentoForm } from '@/components/documentos/DocumentoForm';
import { PageHeader } from '@/components/common/PageHeader';
import { TableActions } from '@/components/common/TableActions';
import { api } from '@/services/api';
import { formatDateBR, formatFileSize } from '@/utils/formatters';
import { Layout } from '@/components/layout/Layout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { tooltips } from '@/i18n/tooltips';

export default function DocumentosPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { showNotification } = useNotification();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const { uploadDocumento, deleteDocumento, submit, update, loading: loadingForm } = useDocumentoForm();
  const { loading } = useDocumentos();
  const [selectedDocumento, setSelectedDocumento] = useState<Documento | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const handleOpenForm = () => {
    setSelectedDocumento(null);
    setModalMode('create');
    setIsFormOpen(true);
  };
  const handleOpenEdit = (documento: Documento) => {
    setSelectedDocumento(documento);
    setModalMode('edit');
    setIsFormOpen(true);
  };
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedDocumento(null);
  };
  const handleSubmit = async (data) => {
    try {
      if (modalMode === 'edit' && selectedDocumento) {
        await update(selectedDocumento.id, data);
        showNotification({ type: 'success', message: t('Documento atualizado com sucesso!') });
      } else {
        await submit(data);
        showNotification({ type: 'success', message: t('Documento criado com sucesso!') });
      }
      handleCloseForm();
      await loadDocumentos();
    } catch {
      showNotification({ type: 'error', message: t('Erro ao salvar documento.') });
    }
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
    <Layout>
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
                  <TableRow key={documento.id} onDoubleClick={() => handleOpenEdit(documento)} sx={{ cursor: 'pointer' }}>
                    <TableCell>{documento.nome}</TableCell>
                    <TableCell>{documento.tipo}</TableCell>
                    <TableCell>{formatDateBR(documento.dataUpload)}</TableCell>
                    <TableCell>{formatFileSize(documento.tamanho)}</TableCell>
                    <TableCell>
                      <TableActions
                        actions={[
                          {
                            icon: <VisibilityIcon color="info" />, 
                            tooltip: tooltips.visualizar.pt,
                            onClick: () => handleDownload(documento),
                            disabled: loading,
                            ariaLabel: 'Visualizar documento'
                          },
                          {
                            icon: <DeleteIcon color="error" />, 
                            tooltip: tooltips.excluir.pt,
                            onClick: () => handleDelete(documento.id),
                            disabled: loading,
                            ariaLabel: 'Excluir documento'
                          }
                        ]}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <DocumentoForm
          initialValues={selectedDocumento || {}}
          onSubmit={handleSubmit}
          onCancel={handleCloseForm}
          loading={loadingForm}
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
    </Layout>
  );
} 

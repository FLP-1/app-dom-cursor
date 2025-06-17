/**
 * Arquivo: index.tsx
 * Caminho: src/pages/relatorios/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de listagem de relatórios
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
import { useRelatorio } from '@/hooks/useRelatorio';
import { Relatorio } from '@/types/relatorio';
import { PageHeader } from '@/components/common/PageHeader';
import { TableActions } from '@/components/common/TableActions';
import { api } from '@/services/api';
import { formatDateBR, formatFileSize } from '@/utils/formatters';
import { Layout } from '@/components/layout/Layout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { tooltips } from '@/i18n/tooltips';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableChartIcon from '@mui/icons-material/TableChart';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';

export default function RelatoriosPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { showNotification } = useNotification();
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

  // Função para exportar CSV
  const handleExportCsv = () => {
    if (!relatorios.length) return;
    const header = [
      t('relatorios.nome.label'),
      t('relatorios.tipo.label'),
      t('relatorios.data.label'),
      t('relatorios.tamanho.label')
    ];
    const rows = relatorios.map(r => [
      r.nome,
      r.tipo,
      formatDateBR(r.data),
      formatFileSize(r.tamanho)
    ]);
    const csvContent = [header, ...rows].map(e => e.join(';')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'relatorios.csv');
  };

  // Função para exportar XLSX
  const handleExportXlsx = () => {
    if (!relatorios.length) return;
    const ws = XLSX.utils.json_to_sheet(relatorios.map(r => ({
      [t('relatorios.nome.label')]: r.nome,
      [t('relatorios.tipo.label')]: r.tipo,
      [t('relatorios.data.label')]: formatDateBR(r.data),
      [t('relatorios.tamanho.label')]: formatFileSize(r.tamanho)
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Relatórios');
    const xlsxBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([xlsxBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'relatorios.xlsx');
  };

  // Função para exportar PDF
  const handleExportPdf = () => {
    if (!relatorios.length) return;
    const doc = new jsPDF();
    doc.text(t('Relatórios'), 14, 16);
    (doc as any).autoTable({
      head: [[
        t('relatorios.nome.label'),
        t('relatorios.tipo.label'),
        t('relatorios.data.label'),
        t('relatorios.tamanho.label')
      ]],
      body: relatorios.map(r => [
        r.nome,
        r.tipo,
        formatDateBR(r.data),
        formatFileSize(r.tamanho)
      ]),
      startY: 22,
      styles: { fontSize: 10 }
    });
    doc.save('relatorios.pdf');
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
    <Layout>
      <Box sx={{ p: 3 }}>
        <PageHeader
          title={t('Relatórios')}
          onAdd={handleGenerate}
          onRefresh={loadRelatorios}
          addButtonText={t('Novo Relatório')}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: 1 }}>
          <Tooltip title={tooltips.exportarCsv.pt}>
            <span>
              <IconButton aria-label={tooltips.exportarCsv.pt} onClick={handleExportCsv} size="large">
                <DownloadIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={tooltips.exportarPdf.pt}>
            <span>
              <IconButton aria-label={tooltips.exportarPdf.pt} onClick={handleExportPdf} size="large">
                <PictureAsPdfIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={tooltips.exportarXlsx.pt}>
            <span>
              <IconButton aria-label={tooltips.exportarXlsx.pt} onClick={handleExportXlsx} size="large">
                <TableChartIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Box>

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
                        actions={[
                          {
                            icon: <VisibilityIcon color="info" />, 
                            tooltip: tooltips.visualizar.pt,
                            onClick: () => handleDownload(relatorio),
                            disabled: loading,
                            ariaLabel: 'Visualizar relatório'
                          },
                          {
                            icon: <DeleteIcon color="error" />, 
                            tooltip: tooltips.excluir.pt,
                            onClick: () => handleDelete(relatorio.id),
                            disabled: loading,
                            ariaLabel: 'Excluir relatório'
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

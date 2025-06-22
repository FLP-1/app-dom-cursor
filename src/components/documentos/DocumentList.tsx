/**
 * Arquivo: DocumentList.tsx
 * Caminho: src/components/DocumentList.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Lista de documentos com funcionalidades de CRUD
 */

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Download as DownloadIcon } from '@mui/icons-material';
import { useDocumentList } from '@/hooks/useDocumentList';
import { Document } from '@prisma/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useConfirmDialog } from '@/hooks/useConfirmDialog';
import { DocumentService } from '@/services/DocumentService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DocumentListProps {
  initialFilters?: {
    tipo?: string;
    empregadoId?: string;
    esocialEventId?: string;
  };
}

export function DocumentList({ initialFilters }: DocumentListProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    documents,
    total,
    pages,
    loading,
    filters,
    loadDocuments,
    handleFilterChange,
    handlePageChange,
    handleDelete,
  } = useDocumentList({ initialFilters });

  const { ConfirmDialog, showConfirmDialog } = useConfirmDialog({
    title: t('document.delete.title'),
    message: t('document.delete.message'),
    confirmLabel: t('common.delete'),
    cancelLabel: t('common.cancel'),
  });

  const handleDownload = async (document: Document) => {
    try {
      const blob = await DocumentService.download(document.url);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = document.nome;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erro ao baixar documento:', error);
    }
  };

  return (
    <Box>
      <Grid container spacing={2} columns={12}>
        <Grid gridColumn="span 12">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{t('document.list.title')}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push('/documents/novo')}
            >
              {t('document.list.new')}
            </Button>
          </Box>
        </Grid>
        <Grid gridColumn="span 12">
          <Card>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>{t('document.fields.name')}</TableCell>
                      <TableCell>{t('document.fields.type')}</TableCell>
                      <TableCell>{t('document.fields.uploadDate')}</TableCell>
                      <TableCell>{t('document.fields.expirationDate')}</TableCell>
                      <TableCell>{t('document.fields.isPublic')}</TableCell>
                      <TableCell align="right">{t('common.actions')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {documents.map((document) => (
                      <TableRow key={document.id}>
                        <TableCell>{document.nome}</TableCell>
                        <TableCell>{t(`document.types.${document.tipo}`)}</TableCell>
                        <TableCell>
                          {format(new Date(document.dataUpload), 'dd/MM/yyyy', {
                            locale: ptBR,
                          })}
                        </TableCell>
                        <TableCell>
                          {document.dataValidade
                            ? format(new Date(document.dataValidade), 'dd/MM/yyyy', {
                                locale: ptBR,
                              })
                            : '-'}
                        </TableCell>
                        <TableCell>
                          {document.isPublic ? t('common.yes') : t('common.no')}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() => router.push(`/documents/${document.id}/editar`)}
                            size="small"
                            aria-label={t('document.actions.edit')}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDownload(document)}
                            size="small"
                            aria-label={t('document.actions.download')}
                          >
                            <DownloadIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => showConfirmDialog(() => handleDelete(document.id))}
                            size="small"
                            color="error"
                            aria-label={t('document.actions.delete')}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <ConfirmDialog />
    </Box>
  );
} 

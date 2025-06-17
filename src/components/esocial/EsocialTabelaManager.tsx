/**
 * Arquivo: EsocialTabelaManager.tsx
 * Caminho: src/components/esocial/EsocialTabelaManager.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Componente para gerenciamento de tabelas do eSocial.
 */

import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { EsocialTabela } from '@/types/esocial';
import { formatDate } from '@/utils/date';

interface EsocialTabelaManagerProps {
  tabelas: EsocialTabela[];
  onAdd: () => void;
  onEdit: (tabela: EsocialTabela) => void;
  onDelete: (tabela: EsocialTabela) => void;
}

export function EsocialTabelaManager({ tabelas, onAdd, onEdit, onDelete }: EsocialTabelaManagerProps) {
  const { t } = useTranslation();
  const [selectedTabela, setSelectedTabela] = useState<EsocialTabela | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleEdit = (tabela: EsocialTabela) => {
    setSelectedTabela(tabela);
    onEdit(tabela);
  };

  const handleDelete = (tabela: EsocialTabela) => {
    setSelectedTabela(tabela);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedTabela) {
      onDelete(selectedTabela);
      setDeleteDialogOpen(false);
      setSelectedTabela(null);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">{t('esocial.tabela.title')}</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAdd}
        >
          {t('esocial.tabela.add')}
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('esocial.tabela.code')}</TableCell>
              <TableCell>{t('esocial.tabela.description')}</TableCell>
              <TableCell>{t('esocial.tabela.version')}</TableCell>
              <TableCell>{t('esocial.tabela.validFrom')}</TableCell>
              <TableCell>{t('esocial.tabela.validTo')}</TableCell>
              <TableCell>{t('esocial.tabela.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tabelas.map((tabela) => (
              <TableRow key={tabela.id}>
                <TableCell>{tabela.codigo}</TableCell>
                <TableCell>{tabela.descricao}</TableCell>
                <TableCell>{tabela.versao}</TableCell>
                <TableCell>{formatDate(tabela.dataInicioVigencia)}</TableCell>
                <TableCell>{formatDate(tabela.dataFimVigencia)}</TableCell>
                <TableCell>
                  <Tooltip title={t('common.edit')}>
                    <IconButton onClick={() => handleEdit(tabela)} size="small">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('common.delete')}>
                    <IconButton onClick={() => handleDelete(tabela)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>{t('esocial.tabela.deleteConfirm')}</DialogTitle>
        <DialogContent>
          <Typography>
            {t('esocial.tabela.deleteMessage', { tabela: selectedTabela?.descricao })}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            {t('common.cancel')}
          </Button>
          <Button onClick={confirmDelete} color="error">
            {t('common.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 

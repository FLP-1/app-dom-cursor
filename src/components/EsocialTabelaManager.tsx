import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useEsocialTabela } from '../hooks/useEsocialTabela';
import { useTranslation } from 'react-i18next';
import { EsocialTabela, EsocialTabelaItem } from '@prisma/client';

interface EsocialTabelaManagerProps {
  codigoTabela: string;
}

export function EsocialTabelaManager({ codigoTabela }: EsocialTabelaManagerProps) {
  const { t } = useTranslation();
  const {
    loading,
    error,
    getTabela,
    getItemTabela,
    adicionarItemTabela,
    atualizarItemTabela,
    desativarItemTabela
  } = useEsocialTabela();

  const [tabela, setTabela] = useState<EsocialTabela | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<EsocialTabelaItem | null>(null);
  const [formData, setFormData] = useState({
    codigo: '',
    descricao: '',
    valor: '',
    dataInicio: new Date().toISOString().split('T')[0],
    dataFim: ''
  });

  useEffect(() => {
    carregarTabela();
  }, [codigoTabela]);

  const carregarTabela = async () => {
    const data = await getTabela(codigoTabela);
    setTabela(data);
  };

  const handleOpenDialog = (item?: EsocialTabelaItem) => {
    if (item) {
      setSelectedItem(item);
      setFormData({
        codigo: item.codigo,
        descricao: item.descricao,
        valor: item.valor || '',
        dataInicio: item.dataInicio.toISOString().split('T')[0],
        dataFim: item.dataFim?.toISOString().split('T')[0] || ''
      });
    } else {
      setSelectedItem(null);
      setFormData({
        codigo: '',
        descricao: '',
        valor: '',
        dataInicio: new Date().toISOString().split('T')[0],
        dataFim: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  const handleSubmit = async () => {
    try {
      if (selectedItem) {
        await atualizarItemTabela(codigoTabela, selectedItem.codigo, {
          descricao: formData.descricao,
          valor: formData.valor,
          dataInicio: new Date(formData.dataInicio),
          dataFim: formData.dataFim ? new Date(formData.dataFim) : null
        });
      } else {
        await adicionarItemTabela(codigoTabela, {
          codigo: formData.codigo,
          descricao: formData.descricao,
          valor: formData.valor,
          dataInicio: new Date(formData.dataInicio),
          dataFim: formData.dataFim ? new Date(formData.dataFim) : null,
          ativo: true
        });
      }
      handleCloseDialog();
      carregarTabela();
    } catch (err) {
      console.error('Erro ao salvar item:', err);
    }
  };

  const handleDelete = async (item: EsocialTabelaItem) => {
    if (window.confirm(t('Tem certeza que deseja desativar este item?'))) {
      await desativarItemTabela(codigoTabela, item.codigo);
      carregarTabela();
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error.message}
      </Alert>
    );
  }

  if (!tabela) {
    return (
      <Alert severity="warning" sx={{ mt: 2 }}>
        {t('Tabela não encontrada')}
      </Alert>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">
          {tabela.nome} - {tabela.codigo}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          {t('Adicionar Item')}
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('Código')}</TableCell>
              <TableCell>{t('Descrição')}</TableCell>
              <TableCell>{t('Valor')}</TableCell>
              <TableCell>{t('Data Início')}</TableCell>
              <TableCell>{t('Data Fim')}</TableCell>
              <TableCell>{t('Ações')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tabela.itens.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.codigo}</TableCell>
                <TableCell>{item.descricao}</TableCell>
                <TableCell>{item.valor}</TableCell>
                <TableCell>{new Date(item.dataInicio).toLocaleDateString()}</TableCell>
                <TableCell>
                  {item.dataFim ? new Date(item.dataFim).toLocaleDateString() : '-'}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(item)}
                    aria-label={t('Editar')}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(item)}
                    aria-label={t('Excluir')}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedItem ? t('Editar Item') : t('Adicionar Item')}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            {!selectedItem && (
              <TextField
                label={t('Código')}
                value={formData.codigo}
                onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                required
                fullWidth
              />
            )}
            <TextField
              label={t('Descrição')}
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              required
              fullWidth
            />
            <TextField
              label={t('Valor')}
              value={formData.valor}
              onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
              fullWidth
            />
            <TextField
              label={t('Data Início')}
              type="date"
              value={formData.dataInicio}
              onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label={t('Data Fim')}
              type="date"
              value={formData.dataFim}
              onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t('Cancelar')}</Button>
          <Button onClick={handleSubmit} variant="contained">
            {t('Salvar')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 
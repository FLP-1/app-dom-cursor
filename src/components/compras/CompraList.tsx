/**
 * Arquivo: CompraList.tsx
 * Caminho: src/components/compras/CompraList.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-01-27
 * Descrição: Componente de listagem de compras com suporte a filtros, edição, remoção e alteração de status
 */

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Button, 
  CircularProgress, 
  Alert, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Box, 
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { tooltips } from '@/i18n/tooltips';
import { useMessages } from '@/hooks/useMessages';
import { comprasMessages } from '@/i18n/messages/compras.messages';

interface Compra {
  id: string;
  produto: string;
  foto?: string;
  unidade: string;
  quantidade: number;
  valor: number;
  dataCompra: string;
  grupo?: string;
  status: 'Pendente' | 'Realizada';
}

interface CompraListProps {
  produto?: string;
  data?: string;
  grupo?: string;
  status?: Compra['status'];
}

const CompraList: React.FC<CompraListProps> = ({ produto, data, grupo, status }) => {
  const { messages } = useMessages(comprasMessages);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [compras, setCompras] = useState<Compra[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editCompra, setEditCompra] = useState<Compra | null>(null);
  const [removeId, setRemoveId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Compra>>({});

  useEffect(() => {
    const fetchCompras = async () => {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams();
        if (produto) params.append('produto', produto);
        if (data) params.append('data', data);
        if (grupo) params.append('grupo', grupo);
        if (status) params.append('status', status);
        const res = await fetch(`/api/compras?${params.toString()}`);
        if (!res.ok) throw new Error(messages.errors.fetchError);
        const comprasData = await res.json();
        setCompras(comprasData);
      } catch (err) {
        setError(messages.errors.fetchError);
      } finally {
        setLoading(false);
      }
    };
    fetchCompras();
  }, [produto, data, grupo, status, messages.errors.fetchError]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleToggleStatus = async (id: string, currentStatus: Compra['status']) => {
    const novoStatus = currentStatus === 'Pendente' ? 'Realizada' : 'Pendente';
    try {
      const res = await fetch('/api/compras', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: novoStatus }),
      });
      if (!res.ok) throw new Error(messages.errors.updateError);
      const updated = await res.json();
      setCompras((prev) => prev.map((c) => (c.id === id ? { ...c, status: updated.status } : c)));
    } catch {
      alert(messages.errors.updateError);
    }
  };

  const handleRemove = async (id: string) => {
    if (!window.confirm(messages.confirmations.delete)) return;
    try {
      const res = await fetch('/api/compras', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error(messages.errors.deleteError);
      setCompras((prev) => prev.filter((c) => c.id !== id));
    } catch {
      alert(messages.errors.deleteError);
    }
  };

  const openEdit = (compra: Compra) => {
    setEditCompra(compra);
    setForm({ ...compra });
  };

  const handleEditSave = async () => {
    if (!form.id || !form.produto || !form.unidade || !form.quantidade || !form.valor || !form.dataCompra || !form.status) {
      alert(messages.errors.fillRequiredFields);
      return;
    }
    try {
      const res = await fetch('/api/compras', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(messages.errors.editError);
      const updated = await res.json();
      setCompras((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      setEditCompra(null);
    } catch {
      alert(messages.errors.editError);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2.5, boxShadow: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.50' }}>
            <TableCell>{messages.table.photo}</TableCell>
            <TableCell>{messages.table.product}</TableCell>
            <TableCell>{messages.table.unit}</TableCell>
            <TableCell>{messages.table.quantity}</TableCell>
            <TableCell>{messages.table.value}</TableCell>
            <TableCell>{messages.table.purchaseDate}</TableCell>
            <TableCell>{messages.table.group}</TableCell>
            <TableCell>{messages.table.status}</TableCell>
            <TableCell>{messages.table.actions}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {compras.map((compra) => (
            <TableRow
              key={compra.id}
              selected={selectedId === compra.id}
              onClick={() => handleSelect(compra.id)}
              sx={{
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <TableCell>
                {compra.foto ? (
                  <Box
                    component={Image}
                    src={compra.foto}
                    alt={compra.produto}
                    width={48}
                    height={48}
                    sx={{
                      objectFit: 'cover',
                      borderRadius: 1
                    }}
                  />
                ) : (
                  <span>-</span>
                )}
              </TableCell>
              <TableCell>{compra.produto}</TableCell>
              <TableCell>{compra.unidade}</TableCell>
              <TableCell>{compra.quantidade}</TableCell>
              <TableCell>R$ {compra.valor.toFixed(2)}</TableCell>
              <TableCell>{new Date(compra.dataCompra).toLocaleDateString()}</TableCell>
              <TableCell>{compra.grupo || '-'}</TableCell>
              <TableCell>
                <Chip
                  label={compra.status}
                  color={compra.status === 'Realizada' ? 'success' : 'warning'}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title={tooltips.editar}>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEdit(compra);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={tooltips.excluir}>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(compra.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!editCompra} onClose={() => setEditCompra(null)}>
        <DialogTitle>{messages.editDialog.title}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label={messages.editDialog.fields.product}
              value={form.produto || ''}
              onChange={(e) => setForm({ ...form, produto: e.target.value })}
              fullWidth
            />
            <TextField
              label={messages.editDialog.fields.unit}
              value={form.unidade || ''}
              onChange={(e) => setForm({ ...form, unidade: e.target.value })}
              fullWidth
            />
            <TextField
              label={messages.editDialog.fields.quantity}
              type="number"
              value={form.quantidade || ''}
              onChange={(e) => setForm({ ...form, quantidade: Number(e.target.value) })}
              fullWidth
            />
            <TextField
              label={messages.editDialog.fields.value}
              type="number"
              value={form.valor || ''}
              onChange={(e) => setForm({ ...form, valor: Number(e.target.value) })}
              fullWidth
            />
            <TextField
              label={messages.editDialog.fields.purchaseDate}
              type="date"
              value={form.dataCompra || ''}
              onChange={(e) => setForm({ ...form, dataCompra: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label={messages.editDialog.fields.status}
              select
              value={form.status || ''}
              onChange={(e) => setForm({ ...form, status: e.target.value as Compra['status'] })}
              fullWidth
            >
              <MenuItem value="Pendente">{messages.status.pending}</MenuItem>
              <MenuItem value="Realizada">{messages.status.completed}</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditCompra(null)}>{messages.common.cancel}</Button>
          <Button onClick={handleEditSave} variant="contained">
            {messages.common.save}
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default CompraList; 

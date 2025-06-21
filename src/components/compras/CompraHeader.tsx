/**
 * Arquivo: CompraHeader.tsx
 * Caminho: src/components/compras/CompraHeader.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Cabeçalho com filtros e botão para nova compra na gestão de compras.
 */

import React from 'react';
import Link from 'next/link';
import { Box, TextField, MenuItem, Tooltip } from '@mui/material';
import { tooltips } from '@/i18n/tooltips';

const statusOptions = [
  { value: '', label: 'Todos' },
  { value: 'Pendente', label: 'Pendente' },
  { value: 'Realizada', label: 'Realizada' },
];

interface CompraHeaderProps {
  filtros: { produto: string; data: string; grupo: string; status: string };
  setFiltros: (f: { produto: string; data: string; grupo: string; status: string }) => void;
}

const CompraHeader: React.FC<CompraHeaderProps> = ({ filtros, setFiltros }) => (
  <Box component="header" sx={{ display: 'flex', flexDirection: 'column', gap: 2, bgcolor: 'background.paper', p: { xs: 2, md: 4 }, boxShadow: 2, borderBottom: '1px solid #e0e0e0', position: 'sticky', top: 0, zIndex: 10 }}>
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box component="h2" sx={{ m: 0, fontWeight: 700, fontSize: 24, color: 'primary.dark' }}>Gestão de Compras</Box>
      <Link href="/compras/nova">
        <Box component="button" sx={{ background: 'primary.main', color: '#fff', border: 'none', borderRadius: 1.5, px: 2.5, py: 1, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>+ Nova Compra</Box>
      </Link>
    </Box>
    <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
      <Tooltip title={tooltips.comprasProduto?.pt || ''}>
        <TextField
          label="Produto"
          size="small"
          variant="outlined"
          name="produto"
          aria-label="Filtro por produto"
          value={filtros.produto}
          onChange={e => setFiltros({ ...filtros, produto: e.target.value })}
        />
      </Tooltip>
      <Tooltip title={tooltips.comprasData?.pt || ''}>
        <TextField
          label="Data"
          size="small"
          variant="outlined"
          name="data"
          type="date"
          InputLabelProps={{ shrink: true }}
          aria-label="Filtro por data"
          value={filtros.data}
          onChange={e => setFiltros({ ...filtros, data: e.target.value })}
        />
      </Tooltip>
      <Tooltip title={tooltips.comprasGrupo?.pt || ''}>
        <TextField
          label="Grupo"
          size="small"
          variant="outlined"
          name="grupo"
          aria-label="Filtro por grupo"
          value={filtros.grupo}
          onChange={e => setFiltros({ ...filtros, grupo: e.target.value })}
        />
      </Tooltip>
      <Tooltip title={tooltips.comprasStatus?.pt || ''}>
        <TextField
          label="Status"
          size="small"
          variant="outlined"
          name="status"
          select
          value={filtros.status}
          onChange={e => setFiltros({ ...filtros, status: e.target.value })}
          aria-label="Filtro por status"
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Tooltip>
    </Box>
  </Box>
);

export default CompraHeader; 

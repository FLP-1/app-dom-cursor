/**
 * Arquivo: CompraHeader.tsx
 * Caminho: src/components/compras/CompraHeader.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Cabeçalho com filtros e botão para nova compra na gestão de compras.
 */

import React from 'react';
import Link from 'next/link';
import { Box, TextField, MenuItem, Tooltip } from '@mui/material';
import { tooltips } from '@/i18n/tooltips';
import { useLanguage } from '@/contexts/LanguageContext';
import { comprasMessages } from '@/i18n/messages/compras.messages';

interface CompraHeaderProps {
  filtros: { produto: string; data: string; grupo: string; status: string };
  setFiltros: (f: { produto: string; data: string; grupo: string; status: string }) => void;
}

const CompraHeader: React.FC<CompraHeaderProps> = ({ filtros, setFiltros }) => {
  const { language } = useLanguage();
  const messages = comprasMessages[language] || comprasMessages['pt'];

  const statusOptions = [
    { value: '', label: messages.filters.all },
    { value: 'Pendente', label: messages.filters.pending },
    { value: 'Realizada', label: messages.filters.completed },
  ];

  return (
    <Box component="header" sx={{ display: 'flex', flexDirection: 'column', gap: 2, bgcolor: 'background.paper', p: { xs: 2, md: 4 }, boxShadow: 2, borderBottom: '1px solid #e0e0e0', position: 'sticky', top: 0, zIndex: 10 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box component="h2" sx={{ m: 0, fontWeight: 700, fontSize: 24, color: 'primary.dark' }}>{messages.header.title}</Box>
        <Link href="/compras/nova">
          <Box component="button" sx={{ background: 'primary.main', color: '#fff', border: 'none', borderRadius: 1.5, px: 2.5, py: 1, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>{messages.header.newPurchase}</Box>
        </Link>
      </Box>
      <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
        <Tooltip title={messages.tooltips.filter}>
          <TextField
            label={messages.filters.product}
            size="small"
            variant="outlined"
            name="produto"
            aria-label={messages.filters.productFilter}
            value={filtros.produto}
            onChange={e => setFiltros({ ...filtros, produto: e.target.value })}
          />
        </Tooltip>
        <Tooltip title={messages.tooltips.filter}>
          <TextField
            label={messages.filters.date}
            size="small"
            variant="outlined"
            name="data"
            type="date"
            InputLabelProps={{ shrink: true }}
            aria-label={messages.filters.dateFilter}
            value={filtros.data}
            onChange={e => setFiltros({ ...filtros, data: e.target.value })}
          />
        </Tooltip>
        <Tooltip title={messages.tooltips.filter}>
          <TextField
            label={messages.filters.group}
            size="small"
            variant="outlined"
            name="grupo"
            aria-label={messages.filters.groupFilter}
            value={filtros.grupo}
            onChange={e => setFiltros({ ...filtros, grupo: e.target.value })}
          />
        </Tooltip>
        <Tooltip title={messages.tooltips.filter}>
          <TextField
            label={messages.filters.status}
            size="small"
            variant="outlined"
            name="status"
            select
            value={filtros.status}
            onChange={e => setFiltros({ ...filtros, status: e.target.value })}
            aria-label={messages.filters.statusFilter}
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
};

export default CompraHeader; 

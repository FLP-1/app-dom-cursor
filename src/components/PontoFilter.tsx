/**
 * Arquivo: PontoFilter.tsx
 * Caminho: src/components/PontoFilter.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { Box, TextField, MenuItem, Grid } from '@mui/material';
import { FiltrosPonto } from '@/hooks/usePonto';

interface PontoFilterProps {
  filtros: FiltrosPonto;
  setFiltros: (f: FiltrosPonto) => void;
}

const PontoFilter: React.FC<PontoFilterProps> = ({ filtros, setFiltros }) => {
  const safeFiltros = filtros || {};
  return (
    <Box component="form" sx={{ mb: 2 }} aria-label="Filtros de ponto">
      <Grid container spacing={2} columns={12}>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 3' }}>
          <TextField
            label="Usuário (nome)"
            value={safeFiltros.usuarioId || ''}
            onChange={e => setFiltros({ ...safeFiltros, usuarioId: e.target.value })}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 3' }}>
          <TextField
            label="Data"
            type="date"
            value={safeFiltros.data || ''}
            onChange={e => setFiltros({ ...safeFiltros, data: e.target.value })}
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 3' }}>
          <TextField
            select
            label="Validado"
            value={safeFiltros.validado === undefined ? '' : safeFiltros.validado ? 'sim' : 'nao'}
            onChange={e => {
              const val = e.target.value;
              setFiltros({ ...safeFiltros, validado: val === '' ? undefined : val === 'sim' });
            }}
            fullWidth
            size="small"
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="sim">Sim</MenuItem>
            <MenuItem value="nao">Não</MenuItem>
          </TextField>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 3' }}>
          <TextField
            select
            label="Alerta"
            value={safeFiltros.alerta === undefined ? '' : safeFiltros.alerta ? 'sim' : 'nao'}
            onChange={e => {
              const val = e.target.value;
              setFiltros({ ...safeFiltros, alerta: val === '' ? undefined : val === 'sim' });
            }}
            fullWidth
            size="small"
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="sim">Sim</MenuItem>
            <MenuItem value="nao">Não</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PontoFilter; 

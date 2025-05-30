import React from 'react';
import { Box, TextField, MenuItem, Grid } from '@mui/material';
import { FiltrosPonto } from '../hooks/usePonto';

interface PontoFilterProps {
  filtros: FiltrosPonto;
  setFiltros: (f: FiltrosPonto) => void;
}

const PontoFilter: React.FC<PontoFilterProps> = ({ filtros, setFiltros }) => {
  return (
    <Box component="form" sx={{ mb: 2 }} aria-label="Filtros de ponto">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Usuário (nome)"
            value={filtros.usuarioId || ''}
            onChange={e => setFiltros({ ...filtros, usuarioId: e.target.value })}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Data"
            type="date"
            value={filtros.data || ''}
            onChange={e => setFiltros({ ...filtros, data: e.target.value })}
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Validado"
            value={filtros.validado === undefined ? '' : filtros.validado ? 'sim' : 'nao'}
            onChange={e => {
              const val = e.target.value;
              setFiltros({ ...filtros, validado: val === '' ? undefined : val === 'sim' });
            }}
            fullWidth
            size="small"
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="sim">Sim</MenuItem>
            <MenuItem value="nao">Não</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Alerta"
            value={filtros.alerta === undefined ? '' : filtros.alerta ? 'sim' : 'nao'}
            onChange={e => {
              const val = e.target.value;
              setFiltros({ ...filtros, alerta: val === '' ? undefined : val === 'sim' });
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
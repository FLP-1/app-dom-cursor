import React from 'react';
import { Box, TextField, MenuItem, Grid } from '@mui/material';
import { FiltrosTarefa } from '../hooks/useTarefas';
import { TaskStatus, TaskPriority } from '../types/task';

interface TarefaFilterProps {
  filtros: FiltrosTarefa;
  setFiltros: (f: FiltrosTarefa) => void;
}

const TarefaFilter: React.FC<TarefaFilterProps> = ({ filtros, setFiltros }) => {
  return (
    <Box component="form" sx={{ mb: 2 }} aria-label="Filtros de tarefas">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Status"
            value={filtros.status || ''}
            onChange={e => setFiltros({ ...filtros, status: e.target.value as TaskStatus })}
            fullWidth
            size="small"
          >
            <MenuItem value="">Todos</MenuItem>
            {Object.values(TaskStatus).map(status => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Prioridade"
            value={filtros.prioridade || ''}
            onChange={e => setFiltros({ ...filtros, prioridade: e.target.value as TaskPriority })}
            fullWidth
            size="small"
          >
            <MenuItem value="">Todas</MenuItem>
            {Object.values(TaskPriority).map(prio => (
              <MenuItem key={prio} value={prio}>{prio}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Responsável (nome)"
            value={filtros.responsavelId || ''}
            onChange={e => setFiltros({ ...filtros, responsavelId: e.target.value })}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Buscar por título ou descrição"
            value={filtros.busca || ''}
            onChange={e => setFiltros({ ...filtros, busca: e.target.value })}
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TarefaFilter; 
/**
 * Arquivo: TarefaFilter.tsx
 * Caminho: src/components/TarefaFilter.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Componente de filtro para tarefas, permitindo filtrar por status, prioridade, responsável e busca textual.
 */

import React from 'react';
import { Box, TextField, MenuItem, Grid, Tooltip } from '@mui/material';
import { FiltrosTarefa } from '@/hooks/useTarefas';
import { TaskStatus, TaskPriority } from '@/types/task';
import { tooltips } from '@/i18n/tooltips';

interface TarefaFilterProps {
  filtros: FiltrosTarefa;
  setFiltros: (f: FiltrosTarefa) => void;
}

const TarefaFilter: React.FC<TarefaFilterProps> = ({ filtros, setFiltros }) => {
  return (
    <Box component="form" sx={{ mb: 2 }} aria-label="Filtros de tarefas">
      <Grid container spacing={2} columns={12}>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 3' }}>
          <Tooltip title={tooltips.tarefaStatus.pt}>
            <span>
              <TextField
                select
                label="Status"
                value={filtros.status || ''}
                onChange={e => setFiltros({ ...filtros, status: e.target.value as TaskStatus })}
                fullWidth
                size="small"
                aria-label="Filtro de status da tarefa"
              >
                <MenuItem value="">Todos</MenuItem>
                {Object.values(TaskStatus).map(status => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </TextField>
            </span>
          </Tooltip>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 3' }}>
          <Tooltip title={tooltips.tarefaPrioridade.pt}>
            <span>
              <TextField
                select
                label="Prioridade"
                value={filtros.prioridade || ''}
                onChange={e => setFiltros({ ...filtros, prioridade: e.target.value as TaskPriority })}
                fullWidth
                size="small"
                aria-label="Filtro de prioridade da tarefa"
              >
                <MenuItem value="">Todas</MenuItem>
                {Object.values(TaskPriority).map(prio => (
                  <MenuItem key={prio} value={prio}>{prio}</MenuItem>
                ))}
              </TextField>
            </span>
          </Tooltip>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 3' }}>
          <Tooltip title={tooltips.tarefaResponsavel.pt}>
            <span>
              <TextField
                label="Responsável (nome)"
                value={filtros.responsavelId || ''}
                onChange={e => setFiltros({ ...filtros, responsavelId: e.target.value })}
                fullWidth
                size="small"
                aria-label="Filtro de responsável da tarefa"
              />
            </span>
          </Tooltip>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 3' }}>
          <Tooltip title={tooltips.tarefaBusca.pt}>
            <span>
              <TextField
                label="Buscar por título ou descrição"
                value={filtros.busca || ''}
                onChange={e => setFiltros({ ...filtros, busca: e.target.value })}
                fullWidth
                size="small"
                aria-label="Filtro de busca de tarefa"
              />
            </span>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
};

export { TarefaFilter }; 

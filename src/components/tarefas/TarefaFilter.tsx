/**
 * Arquivo: TarefaFilter.tsx
 * Caminho: src/components/tarefas/TarefaFilter.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-01-27
 * Descrição: Componente de filtro para tarefas, permitindo filtrar por status, prioridade, responsável e busca textual.
 */

import React from 'react';
import { Box, TextField, MenuItem, Grid, Tooltip } from '@mui/material';
import { FiltrosTarefa } from '@/hooks/useTarefas';
import { TaskStatus, TaskPriority } from '@/types/task';
import { tooltips } from '@/i18n/tooltips';
import { useLanguage } from '@/contexts/LanguageContext';
import { tarefasMessages } from '@/i18n/messages/tarefas.messages';

interface TarefaFilterProps {
  filtros: FiltrosTarefa;
  setFiltros: (f: FiltrosTarefa) => void;
}

const TarefaFilter: React.FC<TarefaFilterProps> = ({ filtros, setFiltros }) => {
  const { language } = useLanguage();
  const messages = tarefasMessages[language] || tarefasMessages['pt'];

  return (
    <Box component="form" sx={{ mb: 2 }} aria-label={messages.tooltips.filtros}>
      <Grid container spacing={2} columns={12}>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 3' }}>
          <Tooltip title={tooltips.tarefaStatus[language] || tooltips.tarefaStatus.pt}>
            <span>
              <TextField
                select
                label={messages.labels.status}
                value={filtros.status || ''}
                onChange={e => setFiltros({ ...filtros, status: e.target.value as TaskStatus })}
                fullWidth
                size="small"
                aria-label={messages.tooltips.filtroStatus}
              >
                <MenuItem value="">{messages.status.todas}</MenuItem>
                {Object.values(TaskStatus).map(status => (
                  <MenuItem key={status} value={status}>
                    {messages.status[status] || status}
                  </MenuItem>
                ))}
              </TextField>
            </span>
          </Tooltip>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 3' }}>
          <Tooltip title={tooltips.tarefaPrioridade[language] || tooltips.tarefaPrioridade.pt}>
            <span>
              <TextField
                select
                label={messages.labels.prioridade}
                value={filtros.prioridade || ''}
                onChange={e => setFiltros({ ...filtros, prioridade: e.target.value as TaskPriority })}
                fullWidth
                size="small"
                aria-label={messages.tooltips.filtroPrioridade}
              >
                <MenuItem value="">{messages.prioridades.todas}</MenuItem>
                {Object.values(TaskPriority).map(prio => (
                  <MenuItem key={prio} value={prio}>
                    {messages.prioridades[prio] || prio}
                  </MenuItem>
                ))}
              </TextField>
            </span>
          </Tooltip>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 3' }}>
          <Tooltip title={tooltips.tarefaResponsavel[language] || tooltips.tarefaResponsavel.pt}>
            <span>
              <TextField
                label={messages.labels.responsavel}
                value={filtros.responsavelId || ''}
                onChange={e => setFiltros({ ...filtros, responsavelId: e.target.value })}
                fullWidth
                size="small"
                aria-label={messages.tooltips.filtroResponsavel}
              />
            </span>
          </Tooltip>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 3' }}>
          <Tooltip title={tooltips.tarefaBusca[language] || tooltips.tarefaBusca.pt}>
            <span>
              <TextField
                label={messages.labels.buscar}
                value={filtros.busca || ''}
                onChange={e => setFiltros({ ...filtros, busca: e.target.value })}
                fullWidth
                size="small"
                aria-label={messages.tooltips.filtroBusca}
              />
            </span>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
};

export { TarefaFilter }; 

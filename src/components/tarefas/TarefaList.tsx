/**
 * Arquivo: TarefaList.tsx
 * Caminho: src/components/TarefaList.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Componente de tabela para exibição de tarefas, com ações de visualizar, editar e excluir.
 */

import React from 'react';
import { Task } from '@/types/task';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, IconButton, Tooltip } from '@mui/material';
import { formatDateBR } from '@/utils/date';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { tooltips } from '@/i18n/tooltips';

interface TarefaListProps {
  tarefas: Task[];
  loading: boolean;
  onEdit?: (tarefa: Task) => void;
  onView?: (tarefa: Task) => void;
  onDelete?: (tarefa: Task) => void;
}

const TarefaList: React.FC<TarefaListProps> = ({ tarefas, loading, onEdit, onView, onDelete }) => {
  if (loading) {
    return <CircularProgress aria-label="Carregando tarefas" />;
  }
  if (!tarefas || tarefas.length === 0) {
    return <Typography variant="body1">Nenhuma tarefa encontrada.</Typography>;
  }
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table aria-label="Lista de tarefas">
        <TableHead>
          <TableRow>
            <TableCell>Título</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Prioridade</TableCell>
            <TableCell>Responsável</TableCell>
            <TableCell>Vencimento</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tarefas.map((tarefa) => (
            <TableRow key={tarefa.id}>
              <TableCell>{tarefa.title}</TableCell>
              <TableCell>{tarefa.status}</TableCell>
              <TableCell>{tarefa.prioridade}</TableCell>
              <TableCell>{tarefa.responsavelNome || '-'}</TableCell>
              <TableCell>{tarefa.dataVencimento ? formatDateBR(tarefa.dataVencimento) : '-'}</TableCell>
              <TableCell>
                {onView && (
                  <Tooltip title={tooltips.tarefaVisualizar.pt}>
                    <span>
                      <IconButton aria-label="Visualizar tarefa" onClick={() => onView(tarefa)} size="small">
                        <VisibilityIcon color="info" />
                      </IconButton>
                    </span>
                  </Tooltip>
                )}
                {onEdit && (
                  <Tooltip title={tooltips.tarefaEditar.pt}>
                    <span>
                      <IconButton aria-label="Editar tarefa" onClick={() => onEdit(tarefa)} size="small">
                        <EditIcon color="primary" />
                      </IconButton>
                    </span>
                  </Tooltip>
                )}
                {onDelete && (
                  <Tooltip title={tooltips.tarefaExcluir.pt}>
                    <span>
                      <IconButton aria-label="Excluir tarefa" onClick={() => onDelete(tarefa)} size="small">
                        <DeleteIcon color="error" />
                      </IconButton>
                    </span>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(TarefaList); 

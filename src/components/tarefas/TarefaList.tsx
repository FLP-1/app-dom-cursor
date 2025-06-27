/**
 * Arquivo: TarefaList.tsx
 * Caminho: src/components/tarefas/TarefaList.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-01-27
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
import { useLanguage } from '@/contexts/LanguageContext';
import { tarefasMessages } from '@/i18n/messages/tarefas.messages';

interface TarefaListProps {
  tarefas: Task[];
  loading: boolean;
  onEdit?: (tarefa: Task) => void;
  onView?: (tarefa: Task) => void;
  onDelete?: (tarefa: Task) => void;
}

const TarefaList: React.FC<TarefaListProps> = ({ tarefas, loading, onEdit, onView, onDelete }) => {
  const { language } = useLanguage();
  const messages = tarefasMessages[language] || tarefasMessages['pt'];

  if (loading) {
    return <CircularProgress aria-label={messages.tooltips.carregando} />;
  }
  
  if (!tarefas || tarefas.length === 0) {
    return <Typography variant="body1">{messages.mensagens.nenhuma}</Typography>;
  }
  
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table aria-label={messages.tooltips.listaTarefas}>
        <TableHead>
          <TableRow>
            <TableCell>{messages.labels.titulo}</TableCell>
            <TableCell>{messages.labels.status}</TableCell>
            <TableCell>{messages.labels.prioridade}</TableCell>
            <TableCell>{messages.labels.responsavel}</TableCell>
            <TableCell>{messages.labels.vencimento}</TableCell>
            <TableCell>{messages.labels.acoes}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tarefas.map((tarefa) => (
            <TableRow key={tarefa.id}>
              <TableCell>{tarefa.title}</TableCell>
              <TableCell>{messages.status[tarefa.status] || tarefa.status}</TableCell>
              <TableCell>{messages.prioridades[tarefa.prioridade] || tarefa.prioridade}</TableCell>
              <TableCell>{tarefa.responsavelNome || '-'}</TableCell>
              <TableCell>{tarefa.dataVencimento ? formatDateBR(tarefa.dataVencimento) : '-'}</TableCell>
              <TableCell>
                {onView && (
                  <Tooltip title={tooltips.tarefaVisualizar[language] || tooltips.tarefaVisualizar.pt}>
                    <span>
                      <IconButton aria-label={messages.tooltips.visualizar} onClick={() => onView(tarefa)} size="small">
                        <VisibilityIcon color="info" />
                      </IconButton>
                    </span>
                  </Tooltip>
                )}
                {onEdit && (
                  <Tooltip title={tooltips.tarefaEditar[language] || tooltips.tarefaEditar.pt}>
                    <span>
                      <IconButton aria-label={messages.tooltips.editar} onClick={() => onEdit(tarefa)} size="small">
                        <EditIcon color="primary" />
                      </IconButton>
                    </span>
                  </Tooltip>
                )}
                {onDelete && (
                  <Tooltip title={tooltips.tarefaExcluir[language] || tooltips.tarefaExcluir.pt}>
                    <span>
                      <IconButton aria-label={messages.tooltips.excluir} onClick={() => onDelete(tarefa)} size="small">
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

export { TarefaList }; 

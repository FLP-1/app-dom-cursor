import React from 'react';
import { Task } from '../types/task';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from '@mui/material';
import { formatDateBR } from '../utils/date';

interface TarefaListProps {
  tarefas: Task[];
  loading: boolean;
}

const TarefaList: React.FC<TarefaListProps> = ({ tarefas, loading }) => {
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
              <TableCell>{/* Placeholder para ações (editar, visualizar, etc) */}-</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TarefaList; 
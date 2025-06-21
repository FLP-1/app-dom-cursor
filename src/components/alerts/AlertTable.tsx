/**
 * Arquivo: AlertTable.tsx
 * Caminho: src/components/alerts/AlertTable.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon } from '@mui/icons-material';

interface Alert {
  alert_id?: number;
  type?: string;
  message?: string;
  severity?: string;
  channels?: string[];
  created_at?: string;
}

interface AlertTableProps {
  alerts: Alert[];
  onVisualizar: (id: string) => void;
  onEditar: (id: string) => void;
  onExcluir: (id: string) => void;
  loading?: boolean;
}

export const AlertTable: React.FC<AlertTableProps> = ({ alerts, onVisualizar, onEditar, onExcluir, loading }) => {
  if (loading) {
    return <CircularProgress />;
  }
  if (!alerts || alerts.length === 0) {
    return <div>Nenhum alerta encontrado.</div>;
  }
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Mensagem</TableCell>
            <TableCell>Severidade</TableCell>
            <TableCell>Canais</TableCell>
            <TableCell>Criado em</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.map((alert) => (
            <TableRow key={alert.alert_id}>
              <TableCell>{alert.alert_id}</TableCell>
              <TableCell>{alert.type}</TableCell>
              <TableCell>{alert.message}</TableCell>
              <TableCell>{alert.severity}</TableCell>
              <TableCell>{alert.channels?.join(', ')}</TableCell>
              <TableCell>{alert.created_at ? new Date(alert.created_at).toLocaleString('pt-BR') : ''}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onVisualizar(String(alert.alert_id))} size="small"><ViewIcon /></IconButton>
                <IconButton onClick={() => onEditar(String(alert.alert_id))} size="small"><EditIcon /></IconButton>
                <IconButton onClick={() => onExcluir(String(alert.alert_id))} size="small"><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}; 

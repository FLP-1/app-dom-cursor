/**
 * Arquivo: AlertTable.tsx
 * Caminho: src/components/alerts/AlertTable.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Tabela de alertas com ações de visualizar, editar e excluir.
 */

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { useLanguage } from '@/contexts/LanguageContext';
import { alertasMessages } from '@/i18n/messages/alertas.messages';

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
  const { language } = useLanguage();
  const messages = alertasMessages[language] || alertasMessages['pt'];

  if (loading) {
    return <CircularProgress />;
  }
  if (!alerts || alerts.length === 0) {
    return <div>{messages.table.noAlertsFound}</div>;
  }
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{messages.table.id}</TableCell>
            <TableCell>{messages.table.type}</TableCell>
            <TableCell>{messages.table.message}</TableCell>
            <TableCell>{messages.table.severity}</TableCell>
            <TableCell>{messages.table.channels}</TableCell>
            <TableCell>{messages.table.createdAt}</TableCell>
            <TableCell align="right">{messages.table.actions}</TableCell>
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

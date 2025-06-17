/**
 * Arquivo: EsocialEventTable.tsx
 * Caminho: src/components/esocial/EsocialEventTable.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Componente de tabela para exibição de eventos do eSocial.
 */

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Send as SendIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { EsocialEvent } from '@/types/esocial';
import { formatDate } from '@/utils/date';
import { esocialEventStatus } from '@/constants/esocial';

interface EsocialEventTableProps {
  events: EsocialEvent[];
  onEdit: (event: EsocialEvent) => void;
  onDelete: (event: EsocialEvent) => void;
  onSend: (event: EsocialEvent) => void;
}

export function EsocialEventTable({ events, onEdit, onDelete, onSend }: EsocialEventTableProps) {
  const { t } = useTranslation();
  const [selectedEvent, setSelectedEvent] = useState<EsocialEvent | null>(null);

  const handleEdit = (event: EsocialEvent) => {
    setSelectedEvent(event);
    onEdit(event);
  };

  const handleDelete = (event: EsocialEvent) => {
    setSelectedEvent(event);
    onDelete(event);
  };

  const handleSend = (event: EsocialEvent) => {
    setSelectedEvent(event);
    onSend(event);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('esocial.event.type')}</TableCell>
            <TableCell>{t('esocial.event.date')}</TableCell>
            <TableCell>{t('esocial.event.status')}</TableCell>
            <TableCell>{t('esocial.event.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.tipo.descricao}</TableCell>
              <TableCell>{formatDate(event.dataEvento)}</TableCell>
              <TableCell>
                <Chip
                  label={t(`esocial.status.${event.status.toLowerCase()}`)}
                  color={esocialEventStatus[event.status].color}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Tooltip title={t('common.edit')}>
                  <IconButton onClick={() => handleEdit(event)} size="small">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('common.delete')}>
                  <IconButton onClick={() => handleDelete(event)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                {event.status === 'PENDENTE' && (
                  <Tooltip title={t('esocial.event.send')}>
                    <IconButton onClick={() => handleSend(event)} size="small">
                      <SendIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 

import React from 'react';
import { Box } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { IconButton } from './IconButton';

interface TableActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  disabled?: boolean;
}

export const TableActions: React.FC<TableActionsProps> = ({
  onEdit,
  onDelete,
  onView,
  disabled = false
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {onView && (
        <IconButton
          icon={<ViewIcon />}
          onClick={onView}
          tooltip="Visualizar"
          color="info"
          disabled={disabled}
        />
      )}
      {onEdit && (
        <IconButton
          icon={<EditIcon />}
          onClick={onEdit}
          tooltip="Editar"
          color="primary"
          disabled={disabled}
        />
      )}
      {onDelete && (
        <IconButton
          icon={<DeleteIcon />}
          onClick={onDelete}
          tooltip="Excluir"
          color="error"
          disabled={disabled}
        />
      )}
    </Box>
  );
}; 
import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {onView && (
        <Tooltip title={t('Visualizar')}>
          <IconButton
            onClick={onView}
            disabled={disabled}
            color="info"
            size="small"
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      )}
      {onEdit && (
        <Tooltip title={t('Editar')}>
          <IconButton
            onClick={onEdit}
            disabled={disabled}
            color="primary"
            size="small"
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip title={t('Excluir')}>
          <IconButton
            onClick={onDelete}
            disabled={disabled}
            color="error"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}; 
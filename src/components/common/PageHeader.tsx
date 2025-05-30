import React from 'react';
import { Box, Typography } from '@mui/material';
import { Add as AddIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { ActionButton } from './ActionButton';

interface PageHeaderProps {
  title: string;
  onAdd?: () => void;
  onRefresh?: () => void;
  addButtonText?: string;
  disabled?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  onAdd,
  onRefresh,
  addButtonText = 'Adicionar',
  disabled = false
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant="h5" component="h1">
        {title}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {onRefresh && (
          <ActionButton
            icon={<RefreshIcon />}
            text="Atualizar"
            onClick={onRefresh}
            variant="outlined"
            disabled={disabled}
          />
        )}
        {onAdd && (
          <ActionButton
            icon={<AddIcon />}
            text={addButtonText}
            onClick={onAdd}
            variant="contained"
            disabled={disabled}
          />
        )}
      </Box>
    </Box>
  );
}; 
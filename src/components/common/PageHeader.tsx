import React from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useTranslation } from 'react-i18next';

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
  addButtonText,
  disabled = false
}) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {onRefresh && (
          <Tooltip title={t('Atualizar')}>
            <IconButton
              onClick={onRefresh}
              disabled={disabled}
              color="primary"
              size="large"
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        )}
        {onAdd && (
          <Tooltip title={addButtonText || t('Adicionar')}>
            <IconButton
              onClick={onAdd}
              disabled={disabled}
              color="primary"
              size="large"
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}; 
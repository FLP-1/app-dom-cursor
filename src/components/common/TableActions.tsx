/**
 * Arquivo: TableActions.tsx
 * Caminho: src/components/common/TableActions.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PaymentIcon from '@mui/icons-material/Payment';
import { useTranslation } from 'react-i18next';
import { tooltips } from '@/i18n/tooltips';

// Interface para cada ação
export interface TableAction {
  icon: React.ReactNode;
  tooltip: string; // O tooltip deve vir do dicionário central de tooltips
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
}

// Interface do componente
export interface TableActionsProps {
  actions: TableAction[];
}

/**
 * Componente de ações em tabela.
 * Todos os tooltips DEVEM vir do dicionário central de tooltips (src/i18n/tooltips.ts).
 */
export const TableActions: React.FC<TableActionsProps> = ({ actions }) => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {actions.map((action, idx) => (
        <Tooltip key={idx} title={action.tooltip}>
          <span>
            <IconButton
              onClick={action.onClick}
              disabled={action.disabled}
              aria-label={action.ariaLabel}
              size="small"
            >
              {action.icon}
            </IconButton>
          </span>
        </Tooltip>
      ))}
    </Box>
  );
}; 

import React from 'react';
import { Box, Tooltip, SxProps, Theme } from '@mui/material';
import {
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Pending as PendingIcon,
  Block as BlockedIcon
} from '@mui/icons-material';

export type StatusType = 'success' | 'error' | 'warning' | 'info' | 'pending' | 'blocked';

interface StatusIconProps {
  status: StatusType;
  tooltip?: string;
  size?: 'small' | 'medium' | 'large';
  sx?: SxProps<Theme>;
}

const statusConfig = {
  success: {
    icon: SuccessIcon,
    color: 'success.main'
  },
  error: {
    icon: ErrorIcon,
    color: 'error.main'
  },
  warning: {
    icon: WarningIcon,
    color: 'warning.main'
  },
  info: {
    icon: InfoIcon,
    color: 'info.main'
  },
  pending: {
    icon: PendingIcon,
    color: 'text.secondary'
  },
  blocked: {
    icon: BlockedIcon,
    color: 'error.dark'
  }
};

export const StatusIcon: React.FC<StatusIconProps> = ({
  status,
  tooltip,
  size = 'medium',
  sx
}) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  const iconSize = {
    small: 20,
    medium: 24,
    large: 32
  }[size];

  const icon = (
    <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
      <Icon
        sx={{
          color: config.color,
          fontSize: iconSize
        }}
      />
    </Box>
  );

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        {icon}
      </Tooltip>
    );
  }

  return icon;
}; 
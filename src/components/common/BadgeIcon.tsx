import React from 'react';
import { Badge, IconButton, Tooltip, SxProps, Theme } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface BadgeIconProps {
  icon: React.ReactElement<SvgIconComponent>;
  count?: number;
  max?: number;
  onClick?: () => void;
  tooltip?: string;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

export const BadgeIcon: React.FC<BadgeIconProps> = ({
  icon,
  count,
  max = 99,
  onClick,
  tooltip,
  color = 'primary',
  size = 'medium',
  disabled = false,
  sx
}) => {
  const badge = (
    <Badge
      badgeContent={count}
      max={max}
      color={color}
      sx={sx}
    >
      <IconButton
        onClick={onClick}
        color={color}
        size={size}
        disabled={disabled}
      >
        {icon}
      </IconButton>
    </Badge>
  );

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        {badge}
      </Tooltip>
    );
  }

  return badge;
}; 
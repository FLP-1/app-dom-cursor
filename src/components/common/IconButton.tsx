import React from 'react';
import { IconButton as MuiIconButton, Tooltip, SxProps, Theme } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface IconButtonProps {
  icon: React.ReactElement<SvgIconComponent>;
  onClick?: () => void;
  tooltip?: string;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  tooltip,
  color = 'primary',
  size = 'medium',
  disabled = false,
  sx
}) => {
  const button = (
    <MuiIconButton
      onClick={onClick}
      color={color}
      size={size}
      disabled={disabled}
      sx={sx}
    >
      {icon}
    </MuiIconButton>
  );

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        {button}
      </Tooltip>
    );
  }

  return button;
}; 
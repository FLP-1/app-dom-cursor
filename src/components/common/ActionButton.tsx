import React from 'react';
import { Button, SxProps, Theme } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface ActionButtonProps {
  icon: React.ReactElement<SvgIconComponent>;
  text: string;
  onClick?: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  text,
  onClick,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
  sx
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      onClick={onClick}
      startIcon={icon}
      sx={sx}
    >
      {text}
    </Button>
  );
}; 
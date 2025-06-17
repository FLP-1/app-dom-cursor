/**
 * Arquivo: ToggleIcon.tsx
 * Caminho: src/components/common/ToggleIcon.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { IconButton, Tooltip, SxProps, Theme } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface ToggleIconProps {
  onIcon: React.ReactElement<SvgIconComponent>;
  offIcon: React.ReactElement<SvgIconComponent>;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onTooltip?: string;
  offTooltip?: string;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

export const ToggleIcon: React.FC<ToggleIconProps> = ({
  onIcon,
  offIcon,
  checked,
  onChange,
  onTooltip,
  offTooltip,
  color = 'primary',
  size = 'medium',
  disabled = false,
  sx
}) => {
  const handleClick = () => {
    onChange(!checked);
  };

  const icon = (
    <IconButton
      onClick={handleClick}
      color={color}
      size={size}
      disabled={disabled}
      sx={sx}
    >
      {checked ? onIcon : offIcon}
    </IconButton>
  );

  const tooltip = checked ? onTooltip : offTooltip;

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        {icon}
      </Tooltip>
    );
  }

  return icon;
}; 

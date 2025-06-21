/**
 * Arquivo: EstatCard.tsx
 * Caminho: src/components/EstatCard.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { Paper, Typography, Box, Tooltip as MuiTooltip } from '@mui/material';
import { ReactNode } from 'react';

interface EstatCardProps {
  title: string;
  value: string | number;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | string;
  icon?: ReactNode;
  iconSize?: number;
  height?: number | string;
  padding?: number | string;
  valueColor?: string;
  tooltip?: string;
  children?: ReactNode;
}

export default function EstatCard({
  title,
  value,
  color = 'primary',
  icon,
  iconSize = 32,
  height = 140,
  padding = 2,
  valueColor,
  tooltip,
  children,
}: EstatCardProps) {
  const content = (
    <Paper
      sx={{
        p: padding,
        display: 'flex',
        flexDirection: 'column',
        height,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {icon && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            opacity: 0.2,
            fontSize: iconSize,
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& svg': { fontSize: iconSize },
          }}
        >
          {icon}
        </Box>
      )}
      <Typography component="h2" variant="h6" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography
        component="p"
        variant="h4"
        color={valueColor || (typeof color === 'string' ? color + '.main' : `${color}.main`)}
        sx={{ wordBreak: 'break-all' }}
      >
        {typeof value === 'string' ? value : value.toLocaleString('pt-BR')}
      </Typography>
      {children}
    </Paper>
  );
  return tooltip ? <MuiTooltip title={tooltip}>{content}</MuiTooltip> : content;
} 

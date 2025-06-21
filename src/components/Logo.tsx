/**
 * Arquivo: Logo.tsx
 * Caminho: src/components/Logo.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente de logo do sistema com suporte a diferentes variantes.
 * Utiliza gradiente e tipografia do Material UI.
 */

import React from 'react';
import { Box, Typography, SxProps, Theme } from '@mui/material';

export type LogoVariant = 'default' | 'compact';

export interface LogoProps {
  variant?: LogoVariant;
  sx?: SxProps<Theme>;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'default',
  sx 
}) => {
  const isCompact = variant === 'compact';
  const logoSize = isCompact ? 32 : 48;
  const fontSize = isCompact ? 'h4' : 'h1';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        ...sx,
      }}
    >
      <Box
        component="img"
        src="/logo.png"
        alt="DOM Logo"
        sx={{
          width: logoSize,
          height: logoSize,
          objectFit: 'contain',
        }}
      />
      <Typography
        variant={fontSize}
        component="h1"
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          m: 0,
        }}
      >
        DOM
      </Typography>
    </Box>
  );
};

export default Logo; 

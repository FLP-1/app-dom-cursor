/**
 * Arquivo: HelperText.tsx
 * Caminho: src/components/common/HelperText.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente de texto de ajuda para campos de formulário com suporte a estados de erro e acessibilidade
 */

import React from 'react';
import { Typography, SxProps, Theme } from '@mui/material';

export interface HelperTextProps {
  text?: string;
  error?: boolean;
  sx?: SxProps<Theme>;
  'aria-live'?: 'polite' | 'assertive' | 'off';
  'aria-atomic'?: boolean;
}

const HelperText: React.FC<HelperTextProps> = ({
  text,
  error = false,
  sx,
  'aria-live': ariaLive = 'polite',
  'aria-atomic': ariaAtomic = true,
}) => {
  if (!text) return null;

  return (
    <Typography
      variant="caption"
      color={error ? 'error' : 'text.secondary'}
      sx={{
        mt: 0.5,
        display: 'block',
        ...sx
      }}
      aria-live={ariaLive}
      aria-atomic={ariaAtomic}
    >
      {text}
    </Typography>
  );
};

export default HelperText; 

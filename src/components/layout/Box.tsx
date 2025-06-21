/**
 * Arquivo: Box.tsx
 * Caminho: src/components/layout/Box.tsx
 * Criado em: 2024-06-07
 * Última atualização: 2025-06-13
 * Descrição: Componente Box customizado usando Material UI.
 */

import { Box as MuiBox, BoxProps } from '@mui/material';

export function Box(props: BoxProps) {
  return <MuiBox {...props} />;
}

export default Box; 

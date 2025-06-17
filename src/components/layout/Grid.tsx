/**
 * Arquivo: Grid.tsx
 * Caminho: src/components/layout/Grid.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: number;
  gap?: string;
  minColWidth?: string;
}

const StyledGrid = styled.div<{
  columns: number;
  gap: string;
  minColWidth: string;
}>(({ theme, columns, gap, minColWidth }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${columns}, minmax(${minColWidth}, 1fr))`,
  gap: gap || theme.spacing.medium,
  width: '100%',
}));

const Grid: React.FC<GridProps> = ({
  children,
  columns = 3,
  gap,
  minColWidth = '200px',
  ...props
}) => {
  const theme = useTheme();
  return (
    <StyledGrid columns={columns} gap={gap || theme.spacing.medium} minColWidth={minColWidth} theme={theme} {...props}>
      {children}
    </StyledGrid>
  );
};

export default Grid; 

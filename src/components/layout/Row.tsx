/**
 * Arquivo: Row.tsx
 * Caminho: src/components/layout/Row.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gap?: string;
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
}

const StyledRow = styled.div<{
  gap: string;
  align: string;
  justify: string;
}>(({ theme, gap, align, justify }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: gap || theme.spacing.medium,
  alignItems: align,
  justifyContent: justify,
  width: '100%',
}));

const Row: React.FC<RowProps> = ({
  children,
  gap,
  align = 'stretch',
  justify = 'flex-start',
  ...props
}) => {
  const theme = useTheme();
  return (
    <StyledRow gap={gap || theme.spacing.medium} align={align} justify={justify} theme={theme} {...props}>
      {children}
    </StyledRow>
  );
};

export default Row; 

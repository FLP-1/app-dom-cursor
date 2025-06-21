/**
 * Arquivo: Container.tsx
 * Caminho: src/components/layout/Container.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxWidth?: string;
}

const StyledContainer = styled.div<{ maxWidth: string }>(({ theme, maxWidth }) => ({
  width: '100%',
  maxWidth: maxWidth || '1200px',
  margin: '0 auto',
  paddingLeft: theme.spacing.large,
  paddingRight: theme.spacing.large,
  boxSizing: 'border-box',
}));

const Container: React.FC<ContainerProps> = ({ children, maxWidth = '1200px', ...props }) => {
  const theme = useTheme();
  return (
    <StyledContainer maxWidth={maxWidth} theme={theme} {...props}>
      {children}
    </StyledContainer>
  );
};

export default Container; 

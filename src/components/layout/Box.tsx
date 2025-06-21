/**
 * Arquivo: Box.tsx
 * Caminho: src/components/layout/Box.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: string;
  margin?: string;
  background?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
  display?: string;
  alignItems?: string;
  justifyContent?: string;
  as?: React.ElementType;
}

const StyledBox = styled.div<BoxProps>(({ theme, ...props }) => ({
  padding: props.padding,
  margin: props.margin,
  background: props.background,
  borderRadius: props.borderRadius,
  width: props.width,
  height: props.height,
  display: props.display,
  alignItems: props.alignItems,
  justifyContent: props.justifyContent,
}));

const Box: React.FC<BoxProps> = ({ children, as: Component = 'div', ...props }) => {
  const theme = useTheme();
  return <StyledBox as={Component} theme={theme} {...props}>{children}</StyledBox>;
};

export default Box; 

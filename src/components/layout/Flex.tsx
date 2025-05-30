import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  gap?: string;
  align?: string;
  justify?: string;
  wrap?: string;
}

const StyledFlex = styled.div<FlexProps>(({ theme, direction, gap, align, justify, wrap }) => ({
  display: 'flex',
  flexDirection: direction || 'row',
  gap: gap || theme.spacing.medium,
  alignItems: align,
  justifyContent: justify,
  flexWrap: wrap,
}));

const Flex: React.FC<FlexProps> = ({ children, direction, gap, align, justify, wrap, ...props }) => {
  const theme = useTheme();
  return (
    <StyledFlex theme={theme} direction={direction} gap={gap} align={align} justify={justify} wrap={wrap} {...props}>
      {children}
    </StyledFlex>
  );
};

export default Flex; 
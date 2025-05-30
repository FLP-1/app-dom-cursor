import React from 'react';
import styled from '@emotion/styled';

interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  flex?: string | number;
  maxWidth?: string;
  minWidth?: string;
}

const StyledCol = styled.div<{
  flex: string | number;
  maxWidth?: string;
  minWidth?: string;
}>(({ flex, maxWidth, minWidth }) => ({
  flex: flex ?? 1,
  maxWidth: maxWidth || '100%',
  minWidth: minWidth || '0',
  boxSizing: 'border-box',
}));

const Col: React.FC<ColProps> = ({
  children,
  flex = 1,
  maxWidth,
  minWidth,
  ...props
}) => {
  return (
    <StyledCol flex={flex} maxWidth={maxWidth} minWidth={minWidth} {...props}>
      {children}
    </StyledCol>
  );
};

export default Col; 
import React from 'react';
import styled from '@emotion/styled';

interface SpacerProps {
  size?: string;
  axis?: 'vertical' | 'horizontal';
}

const StyledSpacer = styled.div<SpacerProps>(({ size, axis }) => ({
  width: axis === 'horizontal' ? size || '16px' : '100%',
  height: axis === 'vertical' ? size || '16px' : '100%',
  display: 'block',
  flexShrink: 0,
}));

const Spacer: React.FC<SpacerProps> = ({ size = '16px', axis = 'vertical' }) => {
  return <StyledSpacer size={size} axis={axis} />;
};

export default Spacer; 
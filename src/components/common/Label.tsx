import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

const StyledLabel = styled.label(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: 16,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
  display: 'inline-block',
}));

const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  const theme = useTheme();
  return (
    <StyledLabel theme={theme} {...props}>
      {children}
    </StyledLabel>
  );
};

export default Label; 
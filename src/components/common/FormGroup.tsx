import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const StyledFormGroup = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.small,
  marginBottom: theme.spacing.large,
  width: '100%',
}));

const FormGroup: React.FC<FormGroupProps> = ({ children, ...props }) => {
  const theme = useTheme();
  return (
    <StyledFormGroup theme={theme} {...props}>
      {children}
    </StyledFormGroup>
  );
};

export default FormGroup; 
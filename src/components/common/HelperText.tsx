import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Theme } from '@mui/material';

export type HelperTextType = 'normal' | 'error' | 'success' | 'warning';

interface HelperTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  type?: HelperTextType;
  children: React.ReactNode;
}

const getColor = (theme: Theme, type: HelperTextType) => {
  switch (type) {
    case 'error':
      return '#d32f2f'; // vermelho (pode ser adicionado ao tema)
    case 'success':
      return '#388e3c'; // verde (pode ser adicionado ao tema)
    case 'warning':
      return '#fbc02d'; // amarelo (pode ser adicionado ao tema)
    default:
      return theme.palette.text.primary;
  }
};

const StyledHelperText = styled.span<{ type: HelperTextType }>(({ theme, type }) => ({
  fontSize: 12,
  color: getColor(theme, type),
  marginTop: theme.spacing(1),
  display: 'block',
}));

const HelperText: React.FC<HelperTextProps> = ({ type = 'normal', children, ...props }) => {
  const theme = useTheme();
  return (
    <StyledHelperText type={type} theme={theme} {...props}>
      {children}
    </StyledHelperText>
  );
};

export default HelperText; 
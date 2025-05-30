import React from 'react';
import styled from '@emotion/styled';
// import { useTheme } from '@emotion/react'; // Removido pois não está em uso

// Justificativa: Interface extendida para permitir futura expansão de props customizadas do input, conforme padrão de componentes reutilizáveis do projeto.
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Props adicionais podem ser definidas aqui, se necessário
}

// Estilização do input usando Emotion e o tema
const StyledInput = styled.input(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.text.primary}`,
  fontSize: theme.typography.fontSize.medium,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  width: '100%', // Input ocupa a largura total do container
  boxSizing: 'border-box', // Inclui padding e borda no cálculo da largura

  '&:focus': {
    outline: 'none',
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 0.2rem ${theme.palette.primary.main}40`,
  },

  '&::placeholder': {
    color: theme.palette.text.primary,
    opacity: 0.7,
  },
}));

const Input: React.FC<InputProps> = ({ ...props }) => {
  return (
    <StyledInput {...props} />
  );
};

export default Input; 
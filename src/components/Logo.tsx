import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface LogoProps {
  variant?: 'default' | 'compact';
}

// Styled component para o container principal (substitui Box)
const LogoContainer = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.medium, // Usando espaçamento do tema
}));

// Styled component para a imagem (substitui img com estilo inline)
const LogoImage = styled.img<LogoProps>(({ variant = 'default' }) => ({
  width: variant === 'default' ? 48 : 32,
  height: variant === 'default' ? 48 : 32,
}));

// Styled component para o texto "DOM" (substitui Typography)
const LogoText = styled.h1<LogoProps>(({ theme, variant = 'default' }) => ({
  fontWeight: theme.typography.fontWeight.bold, // Usando peso da fonte do tema
  fontSize: variant === 'default' ? theme.typography.fontSize.large : theme.typography.fontSize.medium, // Usando tamanho da fonte do tema
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  backgroundClip: 'text',
  textFillColor: 'transparent',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  margin: 0, // Remover margem padrão do h1
}));

const Logo: React.FC<LogoProps> = ({ variant = 'default' }) => {
  const theme = useTheme();

  return (
    <LogoContainer>
      <LogoImage
        src="/logo.png"
        alt="DOM Logo"
        variant={variant}
      />
      <LogoText variant={variant}>
        DOM
      </LogoText>
    </LogoContainer>
  );
};

export default Logo; 
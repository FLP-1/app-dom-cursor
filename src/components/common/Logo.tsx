import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'white';
  showText?: boolean;
  className?: string;
}

const LogoContainer = styled.div<{ size: LogoProps['size'] }>(({ size = 'medium' }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  ...getSizeStyles(size),
}));

const LogoImage = styled.img<{ size: LogoProps['size'] }>(({ size = 'medium' }) => ({
  width: getImageSize(size),
  height: 'auto',
}));

const LogoText = styled.span<{ variant: LogoProps['variant'] }>(({ theme, variant = 'default' }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 600,
  fontSize: 50,
  color: variant === 'white' ? '#fff' : '#1c3a5b',
  lineHeight: 1,
  letterSpacing: '-0.04em',
  display: 'inline-block',
}));

const getSizeStyles = (size: LogoProps['size']) => {
  switch (size) {
    case 'small':
      return {
        gap: 4,
      };
    case 'large':
      return {
        gap: 12,
      };
    default:
      return {
        gap: 8,
      };
  }
};

const getImageSize = (size: LogoProps['size']) => {
  switch (size) {
    case 'small':
      return 80;
    case 'large':
      return 160;
    default:
      return 120;
  }
};

const Logo: React.FC<LogoProps> = ({
  size = 'medium',
  variant = 'default',
  showText = true,
  className,
}) => {
  return (
    <LogoContainer size={size} className={className}>
      <LogoImage
        src="/logo.png"
        alt="Logo"
        size={size}
      />
      {showText && <LogoText variant={variant}>DOM</LogoText>}
    </LogoContainer>
  );
};

export default Logo; 
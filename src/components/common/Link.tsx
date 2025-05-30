import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import NextLink from 'next/link';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: 'default' | 'primary' | 'secondary';
  underline?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const StyledLink = styled.a<{ variant: LinkProps['variant']; underline: boolean }>(
  ({ theme, variant = 'default', underline = false }) => ({
    color: variant === 'primary' 
      ? theme.palette.primary.main 
      : variant === 'secondary'
      ? theme.palette.secondary.main
      : theme.palette.text.primary,
    textDecoration: underline ? 'underline' : 'none',
    cursor: 'pointer',
    fontSize: theme.typography.body1.fontSize,
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    transition: 'color 0.2s',
    '&:hover': {
      color: variant === 'primary'
        ? theme.palette.primary.dark
        : variant === 'secondary'
        ? theme.palette.secondary.dark
        : theme.palette.text.secondary,
    },
  })
);

const Link: React.FC<LinkProps> = ({
  href,
  variant = 'default',
  underline = false,
  icon,
  iconPosition = 'left',
  children,
  ...props
}) => {
  const isExternal = href.startsWith('http');
  const LinkComponent = isExternal ? 'a' : NextLink;

  const content = (
    <>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </>
  );

  if (isExternal) {
    return (
      <StyledLink
        as="a"
        href={href}
        variant={variant}
        underline={underline}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </StyledLink>
    );
  }

  return (
    <LinkComponent href={href} passHref>
      <StyledLink variant={variant} underline={underline} {...props}>
        {content}
      </StyledLink>
    </LinkComponent>
  );
};

export default Link; 
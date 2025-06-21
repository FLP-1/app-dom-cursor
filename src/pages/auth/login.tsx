/**
 * Arquivo: login.tsx
 * Caminho: src/pages/auth/login.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Página de login do sistema, com autenticação, validação de CPF e integração com o hook customizado.
 */

import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Theme } from '@mui/material/styles';
import { Controller } from 'react-hook-form';
import { FaWhatsapp, FaUserPlus, FaInfoCircle } from 'react-icons/fa';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/700.css';
import Link from 'next/link';
import Box from '@/components/layout/Box';
import { FormInput } from '@/components/common/forms/FormInput';
import Button from '@/components/common/Button';
import { CheckboxField } from '@/components/common/forms/CheckboxField';
import { PasswordInput } from '@/components/common';
import { validateCPF } from '@/utils/validators';
import { useLoginForm, LoginForm } from '@/hooks/forms/useLoginForm';
import { Tooltip } from '@mui/material';

const messages = [
  'O DOM da gestão doméstica.',
  'Transforme sua rotina com nosso DOM.',
  'Seu lar, sua gestão, nosso DOM.',
  'Nosso DOM ajudando o seu dom.'
];

const LoginWrapper = styled.div<{ theme?: Theme }>(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme?.palette.background.default,
  position: 'relative',
  overflow: 'auto',
}));

const LoginCard = styled.div<{ theme?: Theme }>(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme?.palette.background.paper} 60%, #e9ecf3 100%)`,
  borderRadius: theme?.shape.borderRadius,
  padding: theme?.spacing(4),
  boxShadow: '0 10px 32px 0 rgba(31, 38, 135, 0.18), 0 1.5px 6px 0 rgba(0,0,0,0.10)',
  width: '100%',
  maxWidth: 380,
  textAlign: 'center',
  position: 'relative',
  fontFamily: 'Montserrat, sans-serif',
}));

const HeaderRow = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  width: '100%',
  marginTop: 5,
  marginBottom: 20,
});

const LogoLeft = styled.div({
  flex: '0 0 auto',
  display: 'flex',
  alignItems: 'flex-start',
});

const DomColumn = styled.div({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: 150,
  alignItems: 'center',
});

const LogoImg = styled.img({
  width: 120,
  height: 'auto',
  marginBottom: 0,
});

const LogoText = styled.span({
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 600,
  fontSize: 50,
  color: '#1c3a5b',
  lineHeight: 1,
  letterSpacing: '-0.04em',
  display: 'inline-block',
});

const Motivational = styled(Box)(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  fontWeight: 600,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(6),
}));

const TooltipIcon = styled.span({
  marginLeft: 6,
  color: '#888',
  cursor: 'pointer',
  position: 'relative',
  display: 'inline-block',
});

const TooltipText = styled.span<{ theme?: Theme }>(({ theme }) => ({
  visibility: 'hidden',
  width: 220,
  backgroundColor: '#333',
  color: '#fff',
  textAlign: 'center',
  borderRadius: 6,
  padding: '8px',
  position: 'absolute',
  zIndex: 1,
  bottom: '125%',
  left: '50%',
  marginLeft: '-110px',
  opacity: 0,
  transition: 'opacity 0.3s',
  fontSize: theme?.typography.body2.fontSize,
  pointerEvents: 'none',
  '::after': {
    content: '""',
    position: 'absolute',
    top: '100%',
    left: '50%',
    marginLeft: '-5px',
    borderWidth: '5px',
    borderStyle: 'solid',
    borderColor: '#333 transparent transparent transparent',
  },
}));

const CustomTooltip = ({ text }: { text: string }) => (
  <TooltipIcon tabIndex={0} aria-label={text}>
    <FaInfoCircle />
    <TooltipText className="tooltip-text">{text}</TooltipText>
    <style>{`
      span[tabindex]:focus .tooltip-text, span[tabindex]:hover .tooltip-text {
        visibility: visible;
        opacity: 1;
      }
    `}</style>
  </TooltipIcon>
);

const WhatsAppButton = styled.a<{ theme?: Theme }>(({ theme }) => ({
  position: 'fixed',
  bottom: theme?.spacing(5),
  right: theme?.spacing(5),
  background: '#25D366',
  color: '#fff',
  borderRadius: '100%',
  width: 56,
  height: 56,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: theme?.shadows[2],
  fontSize: 32,
  zIndex: 100,
  textDecoration: 'none',
}));

const CTAText = styled.span<{ theme?: Theme }>(({ theme }) => ({
  color: theme?.palette.text.primary,
  fontSize: theme?.typography.body1.fontSize,
}));

const CTAInlineLink = styled.a<{ theme?: Theme }>(({ theme }) => ({
  color: theme?.palette.primary.main,
  textDecoration: 'underline',
  cursor: 'pointer',
  fontSize: theme?.typography.body1.fontSize,
}));

const CPFRow = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  gap: 5,
});

const LabelRow = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  gap: 5,
});

const ConsentRow = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 5,
  marginTop: 15,
  fontSize: '0.8rem',
  color: '#666',
});

const Login: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const { control, handleSubmit, onSubmit, loading } = useLoginForm();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <LoginWrapper>
      <LoginCard>
        <Box margin="0 0 10px">
          <HeaderRow>
            <LogoLeft>
              <LogoImg src="/logo.png" alt="Logo" />
            </LogoLeft>
            <DomColumn>
              
              <Motivational>
                {messages[currentMessageIndex]}
              </Motivational>
            </DomColumn>
          </HeaderRow>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <input
            type="text"
            name="fakeusernameremembered"
            hidden
            autoComplete="username"
            title="Campo oculto para evitar autocomplete"
            aria-hidden="true"
            tabIndex={-1}
          />
          <Box margin="0 0 40px">
            <CTAText>
              <CTAInlineLink href="/register">
                <Box as="span" sx={{ mr: 1, display: 'inline-flex', alignItems: 'center' }}>
                  <FaUserPlus />
                </Box>
                Cadastre-se!
              </CTAInlineLink>
              {' '} e facilite sua vida.
            </CTAText>
          </Box>
          <Box margin="0 0 15px">
            <CPFRow>
              <FormInput
                name="dom_cpf_login"
                label="CPF"
                mask="cpf"
                type="text"
                validation={{
                  required: true,
                  validate: (value: unknown) => {
                    if (typeof value !== 'string' || !value) return true;
                    return validateCPF(value) || 'CPF inválido';
                  }
                }}
                sx={{ width: '48%' }}
                autoComplete="new-password"
                control={control}
              />
              <CheckboxField<LoginForm>
                name="rememberMe"
                control={control}
                label="Lembrar de mim"
                renderLabel={(label: string) => (
                  <Box as="span" sx={{ fontSize: '0.8rem' }}>{label}</Box>
                )}
              />
            </CPFRow>
          </Box>
          <Box margin="0 0 20px">
            <LabelRow>
              <PasswordInput<LoginForm>
                name="password"
                label="Senha"
                validation={{
                  required: true,
                  minLength: 6
                }}
                sx={{ width: '48%' }}
                autoComplete="new-password"
                control={control}
              />
              <CTAInlineLink href="/forgot-password" sx={{ fontSize: '0.8rem' }}>
                Esqueci minha senha
              </CTAInlineLink>
            </LabelRow>
          </Box>
          <ConsentRow>
            <CheckboxField<LoginForm>
              name="acceptTerms"
              control={control}
            />
            <span>
              <CustomTooltip text="Você precisa aceitar os termos para continuar" />
            </span>
            <Box as="span" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span>
                Li e aceito os{' '}
                <Link href="/terms-of-use" passHref legacyBehavior>
                  <CTAInlineLink target="_blank" sx={{ fontSize: '0.8rem' }}>
                    Termos de Uso
                  </CTAInlineLink>
                </Link>
              </span>
              <Link href="/privacy-policy" passHref legacyBehavior>
                <CTAInlineLink target="_blank" sx={{ marginTop: 2, fontSize: '0.8rem' }}>
                  Política de Privacidade
                </CTAInlineLink>
              </Link>
            </Box>
          </ConsentRow>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            sx={{ mt: 2.5, width: '100%' }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </LoginCard>
      <WhatsAppButton
        href="https://wa.me/5511999999999"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contato via WhatsApp"
      >
        <FaWhatsapp />
      </WhatsAppButton>
    </LoginWrapper>
  );
};

export default Login; 

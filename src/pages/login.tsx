import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { notificationService } from '../services/NotificationService';
import Container from '../components/layout/Container';
import Row from '../components/layout/Row';
import Col from '../components/layout/Col';
import Box from '../components/layout/Box';
import { FormInput } from '../components/common/forms/FormInput';
import Button from '../components/common/Button';
import Checkbox from '../components/common/Checkbox';
import { validateCPF } from '../utils/validators';
import { FaWhatsapp, FaUserPlus, FaInfoCircle } from 'react-icons/fa';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/700.css';
import { PasswordInput } from '../components/common';
import Link from 'next/link';
import { useLoginForm } from '../hooks/forms/useLoginForm';

const messages = [
  'O DOM da gestão doméstica.',
  'Transforme sua rotina com nosso DOM.',
  'Seu lar, sua gestão, nosso DOM.',
  'Nosso DOM ajudando o seu dom.'
];

const CTA = 'Cadastre-se! Facilite sua vida.';

const LoginWrapper = styled.div(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.background.default,
  position: 'relative',
  overflow: 'auto',
}));

const LoginCard = styled.div(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 60%, #e9ecf3 100%)`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  boxShadow: '0 10px 32px 0 rgba(31, 38, 135, 0.18), 0 1.5px 6px 0 rgba(0,0,0,0.10)',
  width: '100%',
  maxWidth: 350,
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
}));

const TooltipIcon = styled.span({
  marginLeft: 6,
  color: '#888',
  cursor: 'pointer',
  position: 'relative',
  display: 'inline-block',
});

const TooltipText = styled.span(({ theme }) => ({
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
  fontSize: theme.typography.body2.fontSize,
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

const Tooltip = ({ text }: { text: string }) => (
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

const WhatsAppButton = styled.a(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(5),
  right: theme.spacing(5),
  background: '#25D366',
  color: '#fff',
  borderRadius: '100%',
  width: 56,
  height: 56,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: theme.shadows[2],
  fontSize: 32,
  zIndex: 100,
  textDecoration: 'none',
}));

const CTAText = styled.span(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: theme.typography.body1.fontSize,
}));

const CTAInlineLink = styled.a(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'underline',
  cursor: 'pointer',
  fontSize: theme.typography.body1.fontSize,
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

const RememberMeText = styled.span(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.secondary,
}));

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
        <Box margin="0 0 20px">
          <HeaderRow>
            <LogoLeft>
              <LogoImg src="/logo.png" alt="Logo" />
            </LogoLeft>
            <DomColumn>
              <LogoText>DOM</LogoText>
              <Motivational>
                {messages[currentMessageIndex]}
              </Motivational>
            </DomColumn>
          </HeaderRow>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Box margin="0 0 40px">
            <CTAText>
              <CTAInlineLink href="/register">
                <FaUserPlus style={{ marginRight: 8 }} />
                Cadastre-se!
              </CTAInlineLink>
              {' '} e facilite sua vida.
            </CTAText>
          </Box>
          <Box margin="0 0 15px">
            <CPFRow>
              <FormInput
                name="cpf"
                label="CPF"
                mask="999.999.999-99"
                validation={{
                  required: true,
                  validate: (value) => {
                    if (!value) return true;
                    return validateCPF(value) || 'CPF inválido';
                  }
                }}
                sx={{ width: '48%' }}
                autoComplete="nope"
                control={control}
              />
              <Controller
                name="rememberMe"
                control={control}
                render={({ field: { value, ...fieldRest } }) => (
                  <Checkbox
                    {...fieldRest}
                    checked={!!value}
                    inputRef={fieldRest.ref}
                    label="Lembrar de mim"
                    renderLabel={label => <span style={{ fontSize: '0.8rem' }}>{label}</span>}
                  />
                )}
              />
            </CPFRow>
          </Box>
          <Box margin="0 0 20px">
            <LabelRow>
              <PasswordInput
                name="password"
                label="Senha"
                validation={{
                  required: true,
                  minLength: 6
                }}
                sx={{ width: '48%' }}
                autoComplete="off"
                control={control}
              />
              <CTAInlineLink href="/forgot-password" sx={{ fontSize: '0.8rem' }}>
                Esqueci minha senha
              </CTAInlineLink>
            </LabelRow>
          </Box>
          <ConsentRow>
            <Controller
              name="acceptTerms"
              control={control}
              render={({ field: { value, ...fieldRest } }) => (
                <Checkbox
                  {...fieldRest}
                  checked={!!value}
                  inputRef={fieldRest.ref}
                />
              )}
            />
            <Tooltip text="Você precisa aceitar os termos para continuar" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
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
            </div>
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
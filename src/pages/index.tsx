import React from 'react';
import { useRouter } from 'next/router';
import { Button, Logo } from '../components/common';
import Link from 'next/link';
import { Box } from '@mui/material';

export default function Home() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#f7f8fa',
      }}
    >
      <Logo size="large" showText />
      <Box sx={{ marginTop: 4, fontWeight: 700, color: '#1c3a5b', fontSize: 32 }} component="h1">
        Bem-vindo ao sistema!
      </Box>
      <Box sx={{ margin: '16px 0 32px 0', color: '#333', fontSize: 18 }}>
        Acesse sua conta para continuar.
      </Box>
      <Button variant="primary" onClick={() => router.push('/login')}>
        Ir para Login
      </Button>
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Link href="/terms-of-use">Termos de Uso</Link>
        <Link href="/privacy-policy">Política de Privacidade</Link>
        <Link href="/cancelamento-reembolso">Política de Cancelamento e Reembolso</Link>
        <Link href="/planos">Planos de Assinatura</Link>
      </Box>
    </Box>
  );
} 
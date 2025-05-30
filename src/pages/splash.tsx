import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Checkbox, FormControlLabel, Fade, CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
// Supondo que exista um hook ou contexto para alertas
// import { useAlert } from '@/contexts/AlertContext';

const MENSAGENS_ALTERNADAS = [
  'Gerencie com leveza',
  'Valorizamos você',
];

export default function SplashScreen() {
  const [altIndex, setAltIndex] = useState(0);
  const [showAlt, setShowAlt] = useState(true);
  const [lembrarSplash, setLembrarSplash] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const { addAlert } = useAlert();

  useEffect(() => {
    // Se o usuário já marcou para não mostrar novamente, redireciona
    if (typeof window !== 'undefined' && localStorage.getItem('ocultarSplash') === 'true') {
      router.replace('/login');
    }
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAlt(false);
      setTimeout(() => {
        setAltIndex((prev) => (prev + 1) % MENSAGENS_ALTERNADAS.length);
        setShowAlt(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleLoginClick = () => {
    if (lembrarSplash && typeof window !== 'undefined') {
      localStorage.setItem('ocultarSplash', 'true');
    }
    setLoading(true);
    router.push('/login');
  };

  const handleVerPlanosClick = () => {
    if (lembrarSplash && typeof window !== 'undefined') {
      localStorage.setItem('ocultarSplash', 'true');
    }
    setLoading(true);
    router.push('/planos-assinatura');
  };

  // Exemplo de uso da gestão de alertas (descomente se houver contexto/hook)
  // useEffect(() => {
  //   if (algumaCondicaoDeErro) {
  //     addAlert({ tipo: 'erro', mensagem: 'Ocorreu um erro ao carregar a splash.' });
  //   }
  // }, [addAlert]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(/img/splash-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        p: 2,
      }}
    >
      <Fade in timeout={1200}>
        <img src="/img/logo.prn" alt="Logo DOM" style={{ width: 120, marginBottom: 32 }} />
      </Fade>
      <Fade in timeout={1600}>
        <Box>
          <Typography variant="h4" align="center" sx={{ color: '#fff', textShadow: '0 2px 8px #0008' }}>
            Bem vindo ao DOM!
          </Typography>
          <Typography variant="h6" align="center" sx={{ color: '#fff', textShadow: '0 2px 8px #0008', mt: 1 }}>
            Simplificamos a vidas e unimos lares.
          </Typography>
          <Fade in={showAlt} timeout={400}>
            <Typography variant="subtitle1" align="center" sx={{ color: '#ffe082', textShadow: '0 2px 8px #0008', mt: 2 }} aria-live="polite">
              {MENSAGENS_ALTERNADAS[altIndex]}
            </Typography>
          </Fade>
          <Typography variant="body1" align="center" sx={{ color: '#fff', textShadow: '0 2px 8px #0008', mt: 2 }}>
            Organize, inspire, transforme. Bem-vindo!
          </Typography>
        </Box>
      </Fade>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 5 }}>
        <Button variant="contained" color="primary" onClick={handleLoginClick} disabled={loading}>
          Entrar
        </Button>
        <Button variant="outlined" color="primary" onClick={handleVerPlanosClick} disabled={loading}>
          Conheça nossos planos
        </Button>
      </Box>
      <FormControlLabel
        control={
          <Checkbox
            checked={lembrarSplash}
            onChange={e => setLembrarSplash(e.target.checked)}
            color="primary"
          />
        }
        label="Não mostrar novamente"
        sx={{ mt: 3, color: '#fff', textShadow: '0 2px 8px #0008' }}
      />
      {loading && <CircularProgress sx={{ mt: 4, color: '#fff' }} />}
    </Box>
  );
} 
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../styles/theme';
import { AuthProvider } from '../contexts/AuthContext';
import { NotificationContainer } from '../components/common';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SplashScreen from './splash';

// Configuração do cache do Emotion para SSR
const clientSideEmotionCache = createCache({ key: 'css' });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Redireciona '/' para a splash
  useEffect(() => {
    if (router.pathname === '/') {
      router.replace('/splash');
    }
  }, [router]);

  // Renderiza normalmente para outras rotas
  if (router.pathname === '/splash') {
    return <SplashScreen />;
  }

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <NotificationContainer />
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  );
} 
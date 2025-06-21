/**
 * Arquivo: _app.tsx
 * Caminho: src/pages/_app.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Arquivo principal da aplicação
 */

import '@/services/i18n.service';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@/styles/theme';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationContainer } from '@/components/common';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useRouter } from 'next/router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';

// Configuração do cache do Emotion para SSR
const clientSideEmotionCache = createCache({ key: 'css' });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <AuthProvider>
            <NotificationContainer />
            <Component {...pageProps} />
          </AuthProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
} 

/**
 * Arquivo: _app.tsx
 * Caminho: src/pages/_app.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Configuração principal da aplicação Next.js com tema customizado, autenticação e layout
 */

import type { AppProps } from "next/app";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/styles/theme';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Páginas que não precisam do layout com menu
const PUBLIC_PAGES = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/',
];

function AppContent({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isPublicPage = PUBLIC_PAGES.includes(router.pathname);

  return (
    <LanguageProvider defaultLanguage="pt">
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthProvider>
            {isPublicPage ? (
              <Component {...pageProps} />
            ) : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </AuthProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default function App(props: AppProps) {
  return <AppContent {...props} />;
}

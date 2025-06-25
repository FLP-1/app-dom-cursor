/**
 * Arquivo: _app.tsx
 * Caminho: src/pages/_app.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-24
 * Descrição: Configuração principal da aplicação Next.js com tema customizado
 */

import type { AppProps } from "next/app";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/styles/theme';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider defaultLanguage="pt">
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </LanguageProvider>
  );
}

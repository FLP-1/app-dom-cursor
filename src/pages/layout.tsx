import React from 'react';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../theme';
import { NotificationProvider } from '../hooks/useNotification';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <SessionProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <I18nextProvider i18n={i18n}>
              <NotificationProvider>
                {children}
              </NotificationProvider>
            </I18nextProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
} 
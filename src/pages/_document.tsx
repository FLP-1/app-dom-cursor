/**
 * Arquivo: _document.tsx
 * Caminho: src/pages/_document.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Arquivo de configuração do Next.js
 */

import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheets } from '@mui/styles';
import { theme } from '@/styles/theme';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    };
  }

  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta name="msapplication-navbutton-color" content={theme.palette.primary.main} />
          <meta name="apple-mobile-web-app-status-bar-style" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link rel="icon" href="/favicon.ico" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
} 

/**
 * Arquivo: theme.ts
 * Caminho: src/styles/theme.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Tema do Material-UI
 */

// src/styles/theme.ts

import { createTheme } from '@mui/material/styles';

// Definição da paleta de cores
const colors = {
  primary: '#0070f3', // Exemplo de cor primária (pode ser ajustada)
  secondary: '#1c3a5b', // Exemplo de cor secundária
  background: '#ffffff', // Cor de fundo padrão
  text: '#333333', // Cor do texto padrão
  backgroundSecondary: '#f7f8fa',
  // Adicionar mais cores conforme a paleta definida na identidade visual
};

// Criação do tema do Material-UI
export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.background,
      paper: colors.backgroundSecondary,
    },
    text: {
      primary: colors.text,
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    fontSize: 16,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.background,
          color: colors.text,
        },
      },
    },
  },
});

export type Theme = typeof theme; 

/**
 * Arquivo: theme.ts
 * Caminho: src/styles/theme.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-25
 * Descrição: Tema customizado do Material-UI compatível com MUI v7+ usando createTheme
 */

import { createTheme } from '@mui/material/styles';

const colors = {
  primary: '#0070f3',
  secondary: '#1c3a5b',
  background: '#ffffff',
  text: '#333333',
  backgroundSecondary: '#f7f8fa',
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  error: {
    main: '#d32f2f',
    light: '#ef5350',
    dark: '#c62828',
    contrastText: '#fff',
  },
  warning: {
    main: '#ed6c02',
    light: '#ff9800',
    dark: '#e65100',
    contrastText: '#fff',
  },
  info: {
    main: '#0288d1',
    light: '#03a9f4',
    dark: '#01579b',
    contrastText: '#fff',
  },
  success: {
    main: '#2e7d32',
    light: '#4caf50',
    dark: '#1b5e20',
    contrastText: '#fff',
  },
  common: {
    white: '#fff',
    black: '#000',
  },
};

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary,
      light: '#4d94ff',
      dark: '#0052cc',
      contrastText: '#fff',
    },
    secondary: {
      main: colors.secondary,
      light: '#4a5f7a',
      dark: '#0f1f2e',
      contrastText: '#fff',
    },
    background: {
      default: colors.background,
      paper: colors.backgroundSecondary,
    },
    text: {
      primary: colors.text,
      secondary: colors.grey[600],
      disabled: colors.grey[400],
    },
    grey: colors.grey,
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
    success: colors.success,
    divider: colors.grey[200],
    action: {
      active: colors.grey[600],
      hover: colors.grey[100],
      hoverOpacity: 0.04,
      selected: colors.grey[200],
      selectedOpacity: 0.08,
      disabled: colors.grey[400],
      disabledBackground: colors.grey[200],
      disabledOpacity: 0.38,
      focus: colors.grey[300],
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
    common: colors.common,
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    fontSize: 16,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
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

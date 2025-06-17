/**
 * Arquivo: useTheme.ts
 * Caminho: src/hooks/useTheme.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

export const useTheme = () => {
  return {
    palette: {
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
      },
      secondary: {
        main: '#9c27b0',
        light: '#ba68c8',
        dark: '#7b1fa2',
      },
      error: {
        main: '#d32f2f',
        light: '#ef5350',
        dark: '#c62828',
      },
      warning: {
        main: '#ed6c02',
        light: '#ff9800',
        dark: '#e65100',
      },
      info: {
        main: '#0288d1',
        light: '#03a9f4',
        dark: '#01579b',
      },
      success: {
        main: '#2e7d32',
        light: '#4caf50',
        dark: '#1b5e20',
      },
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
      text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.6)',
        disabled: 'rgba(0, 0, 0, 0.38)',
      },
      background: {
        default: '#fff',
        paper: '#fff',
      },
    },
    spacing: (factor: number) => `${8 * factor}px`,
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h1: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 300,
        fontSize: '6rem',
        lineHeight: 1.167,
        letterSpacing: '-0.01562em',
      },
      h2: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 300,
        fontSize: '3.75rem',
        lineHeight: 1.2,
        letterSpacing: '-0.00833em',
      },
      h3: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        fontSize: '3rem',
        lineHeight: 1.167,
        letterSpacing: '0em',
      },
      h4: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        fontSize: '2.125rem',
        lineHeight: 1.235,
        letterSpacing: '0.00735em',
      },
      h5: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        fontSize: '1.5rem',
        lineHeight: 1.334,
        letterSpacing: '0em',
      },
      h6: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 500,
        fontSize: '1.25rem',
        lineHeight: 1.6,
        letterSpacing: '0.0075em',
      },
      subtitle1: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: 1.75,
        letterSpacing: '0.00938em',
      },
      subtitle2: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 500,
        fontSize: '0.875rem',
        lineHeight: 1.57,
        letterSpacing: '0.00714em',
      },
      body1: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: 1.5,
        letterSpacing: '0.00938em',
      },
      body2: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        fontSize: '0.875rem',
        lineHeight: 1.43,
        letterSpacing: '0.01071em',
      },
      button: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 500,
        fontSize: '0.875rem',
        lineHeight: 1.75,
        letterSpacing: '0.02857em',
        textTransform: 'uppercase',
      },
      caption: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        fontSize: '0.75rem',
        lineHeight: 1.66,
        letterSpacing: '0.03333em',
      },
      overline: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        fontSize: '0.75rem',
        lineHeight: 2.66,
        letterSpacing: '0.08333em',
        textTransform: 'uppercase',
      },
    },
    shape: {
      borderRadius: 4,
    },
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },
    zIndex: {
      mobileStepper: 1000,
      fab: 1050,
      speedDial: 1050,
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500,
    },
  };
}; 

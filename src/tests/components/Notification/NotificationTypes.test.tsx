import React from 'react';
import { render, screen } from '@testing-library/react';
import { Notification } from '../../../components/Notification';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../theme';

// Mock do react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'pt'
    }
  })
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

describe('Notification - Tipos e Variantes', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar com diferentes tipos de mensagem', () => {
    const { rerender } = render(
      <TestWrapper>
        <Notification
          open={true}
          message="Sucesso"
          type="success"
          onClose={mockOnClose}
        />
      </TestWrapper>
    );

    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardSuccess');

    rerender(
      <TestWrapper>
        <Notification
          open={true}
          message="Erro"
          type="error"
          onClose={mockOnClose}
        />
      </TestWrapper>
    );

    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardError');

    rerender(
      <TestWrapper>
        <Notification
          open={true}
          message="Aviso"
          type="warning"
          onClose={mockOnClose}
        />
      </TestWrapper>
    );

    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardWarning');

    rerender(
      <TestWrapper>
        <Notification
          open={true}
          message="Informação"
          type="info"
          onClose={mockOnClose}
        />
      </TestWrapper>
    );

    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardInfo');
  });

  it('deve renderizar com diferentes variantes', () => {
    const { rerender } = render(
      <TestWrapper>
        <Notification
          open={true}
          message="Mensagem"
          variant="filled"
          onClose={mockOnClose}
        />
      </TestWrapper>
    );

    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-filled');

    rerender(
      <TestWrapper>
        <Notification
          open={true}
          message="Mensagem"
          variant="outlined"
          onClose={mockOnClose}
        />
      </TestWrapper>
    );

    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-outlined');
  });
}); 
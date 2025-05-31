import React from 'react';
import { render, act } from '@testing-library/react';
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

describe('Notification - Comportamento', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('deve fechar automaticamente após o tempo definido', () => {
    render(
      <TestWrapper>
        <Notification
          open={true}
          message="Operação realizada com sucesso"
          onClose={mockOnClose}
          autoHideDuration={3000}
        />
      </TestWrapper>
    );

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('não deve fechar automaticamente quando autoHideDuration é 0', () => {
    render(
      <TestWrapper>
        <Notification
          open={true}
          message="Operação realizada com sucesso"
          onClose={mockOnClose}
          autoHideDuration={0}
        />
      </TestWrapper>
    );

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('deve fechar automaticamente após o tempo padrão quando autoHideDuration não é definido', () => {
    render(
      <TestWrapper>
        <Notification
          open={true}
          message="Operação realizada com sucesso"
          onClose={mockOnClose}
        />
      </TestWrapper>
    );

    act(() => {
      jest.advanceTimersByTime(6000); // Tempo padrão do Snackbar
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
}); 
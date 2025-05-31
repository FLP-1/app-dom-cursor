import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

describe('Notification - Renderização Básica', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar corretamente com props básicas', () => {
    render(
      <TestWrapper>
        <Notification
          open={true}
          message="Operação realizada com sucesso"
          onClose={mockOnClose}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Operação realizada com sucesso')).toBeInTheDocument();
  });

  it('não deve renderizar quando open é false', () => {
    render(
      <TestWrapper>
        <Notification
          open={false}
          message="Operação realizada com sucesso"
          onClose={mockOnClose}
        />
      </TestWrapper>
    );

    expect(screen.queryByText('Operação realizada com sucesso')).not.toBeInTheDocument();
  });

  it('deve chamar onClose ao clicar no botão de fechar', () => {
    render(
      <TestWrapper>
        <Notification
          open={true}
          message="Operação realizada com sucesso"
          onClose={mockOnClose}
        />
      </TestWrapper>
    );

    const closeButton = screen.getByRole('button', { name: /fechar/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
}); 
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

describe('Notification - Personalização', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar com ícone personalizado', () => {
    render(
      <TestWrapper>
        <Notification
          open={true}
          message="Mensagem"
          icon={<span>✓</span>}
          onClose={mockOnClose}
        />
      </TestWrapper>
    );

    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('deve renderizar com ação personalizada', () => {
    const mockAction = jest.fn();
    render(
      <TestWrapper>
        <Notification
          open={true}
          message="Mensagem"
          action={
            <button onClick={mockAction}>Desfazer</button>
          }
          onClose={mockOnClose}
        />
      </TestWrapper>
    );

    const actionButton = screen.getByText('Desfazer');
    fireEvent.click(actionButton);

    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it('deve renderizar com posição personalizada', () => {
    render(
      <TestWrapper>
        <Notification
          open={true}
          message="Mensagem"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          onClose={mockOnClose}
        />
      </TestWrapper>
    );

    const snackbar = screen.getByRole('presentation');
    expect(snackbar).toHaveStyle({
      top: '24px',
      right: '24px'
    });
  });

  it('deve renderizar com classes personalizadas', () => {
    render(
      <TestWrapper>
        <Notification
          open={true}
          message="Mensagem"
          className="custom-notification"
          onClose={mockOnClose}
        />
      </TestWrapper>
    );

    expect(screen.getByRole('alert')).toHaveClass('custom-notification');
  });
}); 
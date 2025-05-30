import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Notification } from '../../components/Notification';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';

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

describe('Notification', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
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

  it('deve renderizar com estilos personalizados', () => {
    render(
      <TestWrapper>
        <Notification
          open={true}
          message="Mensagem"
          style={{ backgroundColor: 'red' }}
          onClose={mockOnClose}
        />
      </TestWrapper>
    );

    expect(screen.getByRole('alert')).toHaveStyle({ backgroundColor: 'red' });
  });

  it('deve renderizar com mensagem longa', () => {
    const longMessage = 'Esta é uma mensagem muito longa que deve ser exibida corretamente na notificação, mesmo ocupando múltiplas linhas e tendo um conteúdo extenso que pode ultrapassar o tamanho padrão do componente.';
    
    render(
      <TestWrapper>
        <Notification
          open={true}
          message={longMessage}
          onClose={mockOnClose}
        />
      </TestWrapper>
    );

    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });

  it('deve renderizar com título', () => {
    render(
      <TestWrapper>
        <Notification
          open={true}
          title="Título"
          message="Mensagem"
          onClose={mockOnClose}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Mensagem')).toBeInTheDocument();
  });

  it('deve renderizar com múltiplas ações', () => {
    const mockAction1 = jest.fn();
    const mockAction2 = jest.fn();

    render(
      <TestWrapper>
        <Notification
          open={true}
          message="Mensagem"
          actions={[
            <button key="1" onClick={mockAction1}>Ação 1</button>,
            <button key="2" onClick={mockAction2}>Ação 2</button>
          ]}
          onClose={mockOnClose}
        />
      </TestWrapper>
    );

    const action1 = screen.getByText('Ação 1');
    const action2 = screen.getByText('Ação 2');

    fireEvent.click(action1);
    fireEvent.click(action2);

    expect(mockAction1).toHaveBeenCalledTimes(1);
    expect(mockAction2).toHaveBeenCalledTimes(1);
  });
}); 
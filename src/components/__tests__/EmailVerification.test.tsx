import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EmailVerification } from '../EmailVerification';
import { messages } from '../../utils/messages';

// Mock do fetch global
global.fetch = jest.fn();

describe('EmailVerification', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('deve renderizar corretamente', () => {
    render(<EmailVerification />);
    expect(screen.getByText('Verificação de Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByText('Enviar Código')).toBeInTheDocument();
  });

  it('deve enviar código com sucesso', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
    });

    render(<EmailVerification />);

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const sendButton = screen.getByText('Enviar Código');
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/verificacao/email/enviar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com' }),
      });
    });

    expect(screen.getByText(messages.verificacao.email.sucesso)).toBeInTheDocument();
    expect(screen.getByLabelText('Código de Verificação')).toBeInTheDocument();
  });

  it('deve verificar código com sucesso', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true }) // Envio do código
      .mockResolvedValueOnce({ ok: true }); // Verificação do código

    const onVerified = jest.fn();
    render(<EmailVerification onVerified={onVerified} />);

    // Envia o código
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const sendButton = screen.getByText('Enviar Código');
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Código de Verificação')).toBeInTheDocument();
    });

    // Verifica o código
    const codeInput = screen.getByLabelText('Código de Verificação');
    fireEvent.change(codeInput, { target: { value: '123456' } });

    const verifyButton = screen.getByText('Verificar');
    fireEvent.click(verifyButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/verificacao/email/verificar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', codigo: '123456' }),
      });
    });

    expect(onVerified).toHaveBeenCalled();
  });

  it('deve mostrar erro quando o email é inválido', async () => {
    render(<EmailVerification />);

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const sendButton = screen.getByText('Enviar Código');
    fireEvent.click(sendButton);

    expect(global.fetch).not.toHaveBeenCalled();
    expect(screen.getByText(messages.verificacao.email.erro)).toBeInTheDocument();
  });

  it('deve mostrar erro quando o código é inválido', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true }); // Envio do código

    render(<EmailVerification />);

    // Envia o código
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const sendButton = screen.getByText('Enviar Código');
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Código de Verificação')).toBeInTheDocument();
    });

    // Tenta verificar com código inválido
    const codeInput = screen.getByLabelText('Código de Verificação');
    fireEvent.change(codeInput, { target: { value: '123' } });

    const verifyButton = screen.getByText('Verificar');
    fireEvent.click(verifyButton);

    expect(global.fetch).toHaveBeenCalledTimes(1); // Apenas o envio do código
    expect(screen.getByText(messages.verificacao.email.codigoInvalido)).toBeInTheDocument();
  });

  it('deve mostrar erro quando o envio do código falha', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<EmailVerification />);

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const sendButton = screen.getByText('Enviar Código');
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText(messages.verificacao.email.erro)).toBeInTheDocument();
    });
  });

  it('deve mostrar erro quando a verificação do código falha', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true }) // Envio do código
      .mockResolvedValueOnce({ ok: false }); // Verificação do código

    render(<EmailVerification />);

    // Envia o código
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const sendButton = screen.getByText('Enviar Código');
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Código de Verificação')).toBeInTheDocument();
    });

    // Verifica o código
    const codeInput = screen.getByLabelText('Código de Verificação');
    fireEvent.change(codeInput, { target: { value: '123456' } });

    const verifyButton = screen.getByText('Verificar');
    fireEvent.click(verifyButton);

    await waitFor(() => {
      expect(screen.getByText(messages.verificacao.email.erro)).toBeInTheDocument();
    });
  });

  it('deve mostrar loading durante o envio do código', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => new Promise(resolve => {
      setTimeout(() => {
        resolve({
          ok: true,
        });
      }, 100);
    }));

    render(<EmailVerification />);

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const sendButton = screen.getByText('Enviar Código');
    fireEvent.click(sendButton);

    expect(screen.getByText('Enviando...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Enviando...')).not.toBeInTheDocument();
    });
  });

  it('deve mostrar loading durante a verificação do código', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true }) // Envio do código
      .mockImplementationOnce(() => new Promise(resolve => {
        setTimeout(() => {
          resolve({
            ok: true,
          });
        }, 100);
      }));

    render(<EmailVerification />);

    // Envia o código
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const sendButton = screen.getByText('Enviar Código');
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Código de Verificação')).toBeInTheDocument();
    });

    // Verifica o código
    const codeInput = screen.getByLabelText('Código de Verificação');
    fireEvent.change(codeInput, { target: { value: '123456' } });

    const verifyButton = screen.getByText('Verificar');
    fireEvent.click(verifyButton);

    expect(screen.getByText('Verificando...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Verificando...')).not.toBeInTheDocument();
    });
  });
}); 
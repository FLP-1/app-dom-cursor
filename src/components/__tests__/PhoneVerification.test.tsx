import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PhoneVerification } from '../PhoneVerification';
import { messages } from '../../utils/messages';

// Mock do fetch global
global.fetch = jest.fn();

describe('PhoneVerification', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('deve renderizar corretamente', () => {
    render(<PhoneVerification />);
    expect(screen.getByText('Verificação de Telefone')).toBeInTheDocument();
    expect(screen.getByLabelText('Telefone')).toBeInTheDocument();
    expect(screen.getByText('Enviar Código')).toBeInTheDocument();
  });

  it('deve enviar código com sucesso', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
    });

    render(<PhoneVerification />);

    const phoneInput = screen.getByLabelText('Telefone');
    fireEvent.change(phoneInput, { target: { value: '(11) 98765-4321' } });

    const sendButton = screen.getByText('Enviar Código');
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/verificacao/telefone/enviar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telefone: '(11) 98765-4321' }),
      });
    });

    expect(screen.getByText(messages.verificacao.telefone.sucesso)).toBeInTheDocument();
    expect(screen.getByLabelText('Código de Verificação')).toBeInTheDocument();
  });

  it('deve verificar código com sucesso', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true }) // Envio do código
      .mockResolvedValueOnce({ ok: true }); // Verificação do código

    const onVerified = jest.fn();
    render(<PhoneVerification onVerified={onVerified} />);

    // Envia o código
    const phoneInput = screen.getByLabelText('Telefone');
    fireEvent.change(phoneInput, { target: { value: '(11) 98765-4321' } });

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
      expect(global.fetch).toHaveBeenCalledWith('/api/verificacao/telefone/verificar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telefone: '(11) 98765-4321', codigo: '123456' }),
      });
    });

    expect(onVerified).toHaveBeenCalled();
  });

  it('deve mostrar erro quando o telefone é inválido', async () => {
    render(<PhoneVerification />);

    const phoneInput = screen.getByLabelText('Telefone');
    fireEvent.change(phoneInput, { target: { value: '123' } });

    const sendButton = screen.getByText('Enviar Código');
    fireEvent.click(sendButton);

    expect(global.fetch).not.toHaveBeenCalled();
    expect(screen.getByText(messages.verificacao.telefone.erro)).toBeInTheDocument();
  });

  it('deve mostrar erro quando o código é inválido', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true }); // Envio do código

    render(<PhoneVerification />);

    // Envia o código
    const phoneInput = screen.getByLabelText('Telefone');
    fireEvent.change(phoneInput, { target: { value: '(11) 98765-4321' } });

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
    expect(screen.getByText(messages.verificacao.telefone.codigoInvalido)).toBeInTheDocument();
  });

  it('deve mostrar erro quando o envio do código falha', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<PhoneVerification />);

    const phoneInput = screen.getByLabelText('Telefone');
    fireEvent.change(phoneInput, { target: { value: '(11) 98765-4321' } });

    const sendButton = screen.getByText('Enviar Código');
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText(messages.verificacao.telefone.erro)).toBeInTheDocument();
    });
  });

  it('deve mostrar erro quando a verificação do código falha', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true }) // Envio do código
      .mockResolvedValueOnce({ ok: false }); // Verificação do código

    render(<PhoneVerification />);

    // Envia o código
    const phoneInput = screen.getByLabelText('Telefone');
    fireEvent.change(phoneInput, { target: { value: '(11) 98765-4321' } });

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
      expect(screen.getByText(messages.verificacao.telefone.erro)).toBeInTheDocument();
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

    render(<PhoneVerification />);

    const phoneInput = screen.getByLabelText('Telefone');
    fireEvent.change(phoneInput, { target: { value: '(11) 98765-4321' } });

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
      }); // Verificação do código

    render(<PhoneVerification />);

    // Envia o código
    const phoneInput = screen.getByLabelText('Telefone');
    fireEvent.change(phoneInput, { target: { value: '(11) 98765-4321' } });

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
  });
}); 
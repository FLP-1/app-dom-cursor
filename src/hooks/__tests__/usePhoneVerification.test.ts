import { renderHook, act } from '@testing-library/react-hooks';
import { usePhoneVerification } from '../usePhoneVerification';
import { messages } from '../../utils/messages';

// Mock do fetch global
global.fetch = jest.fn();

describe('usePhoneVerification', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('deve enviar código com sucesso', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
    });

    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() => usePhoneVerification({ onSuccess, onError }));

    await act(async () => {
      await result.current.enviarCodigo('11999999999');
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/verificacao/telefone/enviar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telefone: '11999999999' }),
    });

    expect(onSuccess).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('deve verificar código com sucesso', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
    });

    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() => usePhoneVerification({ onSuccess, onError }));

    await act(async () => {
      await result.current.verificarCodigo('11999999999', '123456');
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/verificacao/telefone/verificar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telefone: '11999999999', codigo: '123456' }),
    });

    expect(onSuccess).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('deve mostrar erro quando o telefone é inválido', async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() => usePhoneVerification({ onSuccess, onError }));

    await act(async () => {
      await result.current.enviarCodigo('123');
    });

    expect(global.fetch).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(messages.verificacao.telefone.erro);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(messages.verificacao.telefone.erro);
  });

  it('deve mostrar erro quando o código é inválido', async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() => usePhoneVerification({ onSuccess, onError }));

    await act(async () => {
      await result.current.verificarCodigo('11999999999', '123');
    });

    expect(global.fetch).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(messages.verificacao.telefone.codigoInvalido);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(messages.verificacao.telefone.codigoInvalido);
  });

  it('deve mostrar erro quando o envio do código falha', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() => usePhoneVerification({ onSuccess, onError }));

    await act(async () => {
      await result.current.enviarCodigo('11999999999');
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/verificacao/telefone/enviar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telefone: '11999999999' }),
    });

    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(messages.verificacao.telefone.erro);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(messages.verificacao.telefone.erro);
  });

  it('deve mostrar erro quando a verificação do código falha', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() => usePhoneVerification({ onSuccess, onError }));

    await act(async () => {
      await result.current.verificarCodigo('11999999999', '123456');
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/verificacao/telefone/verificar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telefone: '11999999999', codigo: '123456' }),
    });

    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(messages.verificacao.telefone.erro);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(messages.verificacao.telefone.erro);
  });

  it('deve mostrar loading durante o envio do código', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => new Promise(resolve => {
      setTimeout(() => {
        resolve({
          ok: true,
        });
      }, 100);
    }));

    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() => usePhoneVerification({ onSuccess, onError }));

    let promise: Promise<void>;
    act(() => {
      promise = result.current.enviarCodigo('11999999999');
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await promise;
    });

    expect(result.current.loading).toBe(false);
  });

  it('deve mostrar loading durante a verificação do código', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => new Promise(resolve => {
      setTimeout(() => {
        resolve({
          ok: true,
        });
      }, 100);
    }));

    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() => usePhoneVerification({ onSuccess, onError }));

    let promise: Promise<void>;
    act(() => {
      promise = result.current.verificarCodigo('11999999999', '123456');
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await promise;
    });

    expect(result.current.loading).toBe(false);
  });
}); 
import { renderHook, act } from '@testing-library/react-hooks';
import { useCEP } from '../useCEP';
import { messages } from '../../utils/messages';

// Mock do fetch global
global.fetch = jest.fn();

describe('useCEP', () => {
  const mockEndereco = {
    cep: '12345678',
    logradouro: 'Rua Teste',
    bairro: 'Centro',
    cidade: 'São Paulo',
    estado: 'SP',
  };

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('deve buscar endereço com sucesso', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockEndereco),
    });

    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() => useCEP({ onSuccess, onError }));

    await act(async () => {
      await result.current.buscarEndereco('12345678');
    });

    expect(global.fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/12345678/json/');
    expect(onSuccess).toHaveBeenCalledWith(mockEndereco);
    expect(onError).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('deve mostrar erro quando o CEP é inválido', async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() => useCEP({ onSuccess, onError }));

    await act(async () => {
      await result.current.buscarEndereco('123');
    });

    expect(global.fetch).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(messages.cep.erro.formato);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(messages.cep.erro.formato);
  });

  it('deve mostrar erro quando a busca falha', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() => useCEP({ onSuccess, onError }));

    await act(async () => {
      await result.current.buscarEndereco('12345678');
    });

    expect(global.fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/12345678/json/');
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(messages.cep.erro.busca);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(messages.cep.erro.busca);
  });

  it('deve mostrar erro quando o CEP não é encontrado', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ erro: true }),
    });

    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() => useCEP({ onSuccess, onError }));

    await act(async () => {
      await result.current.buscarEndereco('12345678');
    });

    expect(global.fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/12345678/json/');
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(messages.cep.erro.naoEncontrado);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(messages.cep.erro.naoEncontrado);
  });

  it('deve limpar caracteres não numéricos do CEP', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockEndereco),
    });

    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() => useCEP({ onSuccess, onError }));

    await act(async () => {
      await result.current.buscarEndereco('123.456-78');
    });

    expect(global.fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/12345678/json/');
    expect(onSuccess).toHaveBeenCalledWith(mockEndereco);
    expect(onError).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('deve mostrar loading durante a busca', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => new Promise(resolve => {
      setTimeout(() => {
        resolve({
          ok: true,
          json: () => Promise.resolve(mockEndereco),
        });
      }, 100);
    }));

    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() => useCEP({ onSuccess, onError }));

    let promise: Promise<void>;
    act(() => {
      promise = result.current.buscarEndereco('12345678');
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await promise;
    });

    expect(result.current.loading).toBe(false);
  });
}); 
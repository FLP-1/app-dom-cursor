import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  it('deve inicializar com valor padrão', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

    expect(result.current[0]).toBe('defaultValue');
  });

  it('deve salvar valor no localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

    act(() => {
      result.current[1]('newValue');
    });

    expect(result.current[0]).toBe('newValue');
    expect(JSON.parse(window.localStorage.getItem('testKey') || '')).toBe('newValue');
  });

  it('deve recuperar valor do localStorage', () => {
    window.localStorage.setItem('testKey', JSON.stringify('storedValue'));

    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

    expect(result.current[0]).toBe('storedValue');
  });

  it('deve lidar com valores complexos', () => {
    const complexValue = { name: 'Test', items: [1, 2, 3] };
    const { result } = renderHook(() => useLocalStorage('testKey', complexValue));

    act(() => {
      result.current[1](complexValue);
    });

    expect(result.current[0]).toEqual(complexValue);
    expect(JSON.parse(window.localStorage.getItem('testKey') || '')).toEqual(complexValue);
  });

  it('deve manter estado entre re-renderizações', () => {
    const { result, rerender } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

    act(() => {
      result.current[1]('newValue');
    });

    rerender();

    expect(result.current[0]).toBe('newValue');
  });

  it('deve lidar com erro ao ler JSON inválido', () => {
    window.localStorage.setItem('testKey', 'invalid-json');

    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

    expect(result.current[0]).toBe('defaultValue');
  });

  it('deve sincronizar estado entre abas', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

    // Simula evento de storage de outra aba
    const storageEvent = new StorageEvent('storage', {
      key: 'testKey',
      newValue: JSON.stringify('value-from-other-tab'),
      oldValue: null,
      storageArea: window.localStorage,
      url: window.location.href
    });

    act(() => {
      window.dispatchEvent(storageEvent);
    });

    expect(result.current[0]).toBe('value-from-other-tab');
  });

  it('deve ignorar eventos de storage de outras chaves', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

    act(() => {
      result.current[1]('initial-value');
    });

    // Simula evento de storage para outra chave
    const storageEvent = new StorageEvent('storage', {
      key: 'otherKey',
      newValue: JSON.stringify('other-value'),
      oldValue: null,
      storageArea: window.localStorage,
      url: window.location.href
    });

    act(() => {
      window.dispatchEvent(storageEvent);
    });

    expect(result.current[0]).toBe('initial-value');
  });

  it('deve lidar com erro ao salvar no localStorage', async () => {
    // Usa spyOn para garantir que o mock é aplicado corretamente
    const spy = jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(() => {
      throw new Error('Storage error');
    });

    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

    // Verifica o valor inicial
    expect(result.current[0]).toBe('defaultValue');

    // Tenta atualizar o valor
    await act(async () => {
      result.current[1]('newValue');
    });

    // Verifica se o mock foi chamado
    expect(spy).toHaveBeenCalledWith('testKey', JSON.stringify('newValue'));

    // O estado deve permanecer com o valor anterior
    expect(result.current[0]).toBe('defaultValue');

    // Restaura o mock
    spy.mockRestore();
  });

  it('deve limpar valor do localStorage ao remover', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

    act(() => {
      result.current[1]('newValue');
    });

    expect(window.localStorage.getItem('testKey')).toBeTruthy();

    act(() => {
      result.current[1](null);
    });

    expect(result.current[0]).toBeNull();
    expect(window.localStorage.getItem('testKey')).toBeNull();
  });

  it('deve manter valor padrão quando localStorage não está disponível', () => {
    // Simula localStorage não disponível
    const originalLocalStorage = window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      value: null,
      writable: true
    });

    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

    act(() => {
      result.current[1]('newValue');
    });

    // O estado deve permanecer com o valor padrão
    expect(result.current[0]).toBe('defaultValue');

    // Restaura localStorage
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true
    });
  });
}); 
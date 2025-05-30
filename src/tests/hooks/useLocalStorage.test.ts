import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  it('deve retornar o valor inicial quando não há valor no localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('chave', 'valor inicial'));

    expect(result.current[0]).toBe('valor inicial');
  });

  it('deve retornar o valor do localStorage quando existe', () => {
    window.localStorage.setItem('chave', JSON.stringify('valor salvo'));

    const { result } = renderHook(() => useLocalStorage('chave', 'valor inicial'));

    expect(result.current[0]).toBe('valor salvo');
  });

  it('deve atualizar o valor no localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('chave', 'valor inicial'));

    act(() => {
      result.current[1]('novo valor');
    });

    expect(result.current[0]).toBe('novo valor');
    expect(JSON.parse(window.localStorage.getItem('chave') || '')).toBe('novo valor');
  });

  it('deve lidar com valores nulos', () => {
    const { result } = renderHook(() => useLocalStorage('chave', null));

    act(() => {
      result.current[1](null);
    });

    expect(result.current[0]).toBe(null);
    expect(window.localStorage.getItem('chave')).toBe('null');
  });

  it('deve lidar com valores undefined', () => {
    const { result } = renderHook(() => useLocalStorage('chave', undefined));

    act(() => {
      result.current[1](undefined);
    });

    expect(result.current[0]).toBe(undefined);
    expect(window.localStorage.getItem('chave')).toBe('undefined');
  });

  it('deve lidar com valores numéricos', () => {
    const { result } = renderHook(() => useLocalStorage('chave', 0));

    act(() => {
      result.current[1](42);
    });

    expect(result.current[0]).toBe(42);
    expect(JSON.parse(window.localStorage.getItem('chave') || '')).toBe(42);
  });

  it('deve lidar com valores booleanos', () => {
    const { result } = renderHook(() => useLocalStorage('chave', false));

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);
    expect(JSON.parse(window.localStorage.getItem('chave') || '')).toBe(true);
  });

  it('deve lidar com objetos', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 3, b: 4 };

    const { result } = renderHook(() => useLocalStorage('chave', obj1));

    act(() => {
      result.current[1](obj2);
    });

    expect(result.current[0]).toEqual(obj2);
    expect(JSON.parse(window.localStorage.getItem('chave') || '')).toEqual(obj2);
  });

  it('deve lidar com arrays', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];

    const { result } = renderHook(() => useLocalStorage('chave', arr1));

    act(() => {
      result.current[1](arr2);
    });

    expect(result.current[0]).toEqual(arr2);
    expect(JSON.parse(window.localStorage.getItem('chave') || '')).toEqual(arr2);
  });

  it('deve lidar com funções', () => {
    const fn1 = () => 1;
    const fn2 = () => 2;

    const { result } = renderHook(() => useLocalStorage('chave', fn1));

    act(() => {
      result.current[1](fn2);
    });

    expect(result.current[0]).toBe(fn2);
    expect(window.localStorage.getItem('chave')).toBe('undefined');
  });

  it('deve lidar com erros de JSON inválido no localStorage', () => {
    window.localStorage.setItem('chave', 'json inválido');

    const { result } = renderHook(() => useLocalStorage('chave', 'valor inicial'));

    expect(result.current[0]).toBe('valor inicial');
  });

  it('deve lidar com localStorage indisponível', () => {
    const originalLocalStorage = window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      value: undefined,
      writable: true
    });

    const { result } = renderHook(() => useLocalStorage('chave', 'valor inicial'));

    act(() => {
      result.current[1]('novo valor');
    });

    expect(result.current[0]).toBe('novo valor');

    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true
    });
  });

  it('deve lidar com erro ao acessar localStorage', () => {
    const originalLocalStorage = window.localStorage;
    const mockLocalStorage = {
      getItem: jest.fn(() => {
        throw new Error('Erro ao acessar localStorage');
      }),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0
    };

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });

    const { result } = renderHook(() => useLocalStorage('chave', 'valor inicial'));

    expect(result.current[0]).toBe('valor inicial');

    act(() => {
      result.current[1]('novo valor');
    });

    expect(result.current[0]).toBe('novo valor');

    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true
    });
  });

  it('deve lidar com erro ao definir item no localStorage', () => {
    const originalLocalStorage = window.localStorage;
    const mockLocalStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(() => {
        throw new Error('Erro ao definir item no localStorage');
      }),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0
    };

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });

    const { result } = renderHook(() => useLocalStorage('chave', 'valor inicial'));

    act(() => {
      result.current[1]('novo valor');
    });

    expect(result.current[0]).toBe('novo valor');

    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true
    });
  });

  it('deve lidar com erro ao remover item do localStorage', () => {
    const originalLocalStorage = window.localStorage;
    const mockLocalStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(() => {
        throw new Error('Erro ao remover item do localStorage');
      }),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0
    };

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });

    const { result } = renderHook(() => useLocalStorage('chave', 'valor inicial'));

    act(() => {
      result.current[1](undefined);
    });

    expect(result.current[0]).toBe(undefined);

    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true
    });
  });

  it('deve lidar com erro ao limpar localStorage', () => {
    const originalLocalStorage = window.localStorage;
    const mockLocalStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(() => {
        throw new Error('Erro ao limpar localStorage');
      }),
      key: jest.fn(),
      length: 0
    };

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });

    const { result } = renderHook(() => useLocalStorage('chave', 'valor inicial'));

    expect(result.current[0]).toBe('valor inicial');

    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true
    });
  });

  it('deve lidar com erro ao obter chave do localStorage', () => {
    const originalLocalStorage = window.localStorage;
    const mockLocalStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(() => {
        throw new Error('Erro ao obter chave do localStorage');
      }),
      length: 0
    };

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });

    const { result } = renderHook(() => useLocalStorage('chave', 'valor inicial'));

    expect(result.current[0]).toBe('valor inicial');

    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true
    });
  });
}); 
import { renderHook, act } from '@testing-library/react';
import { useSessionStorage } from '../../hooks/useSessionStorage';

describe('useSessionStorage', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    jest.clearAllMocks();
  });

  it('deve retornar o valor inicial quando não há valor no sessionStorage', () => {
    const { result } = renderHook(() => useSessionStorage('chave', 'valor inicial'));

    expect(result.current[0]).toBe('valor inicial');
  });

  it('deve retornar o valor do sessionStorage quando existe', () => {
    window.sessionStorage.setItem('chave', JSON.stringify('valor salvo'));

    const { result } = renderHook(() => useSessionStorage('chave', 'valor inicial'));

    expect(result.current[0]).toBe('valor salvo');
  });

  it('deve atualizar o valor no sessionStorage', () => {
    const { result } = renderHook(() => useSessionStorage('chave', 'valor inicial'));

    act(() => {
      result.current[1]('novo valor');
    });

    expect(result.current[0]).toBe('novo valor');
    expect(JSON.parse(window.sessionStorage.getItem('chave') || '')).toBe('novo valor');
  });

  it('deve lidar com valores nulos', () => {
    const { result } = renderHook(() => useSessionStorage('chave', null));

    act(() => {
      result.current[1](null);
    });

    expect(result.current[0]).toBe(null);
    expect(window.sessionStorage.getItem('chave')).toBe('null');
  });

  it('deve lidar com valores undefined', () => {
    const { result } = renderHook(() => useSessionStorage('chave', undefined));

    act(() => {
      result.current[1](undefined);
    });

    expect(result.current[0]).toBe(undefined);
    expect(window.sessionStorage.getItem('chave')).toBe('undefined');
  });

  it('deve lidar com valores numéricos', () => {
    const { result } = renderHook(() => useSessionStorage('chave', 0));

    act(() => {
      result.current[1](42);
    });

    expect(result.current[0]).toBe(42);
    expect(JSON.parse(window.sessionStorage.getItem('chave') || '')).toBe(42);
  });

  it('deve lidar com valores booleanos', () => {
    const { result } = renderHook(() => useSessionStorage('chave', false));

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);
    expect(JSON.parse(window.sessionStorage.getItem('chave') || '')).toBe(true);
  });

  it('deve lidar com objetos', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 3, b: 4 };

    const { result } = renderHook(() => useSessionStorage('chave', obj1));

    act(() => {
      result.current[1](obj2);
    });

    expect(result.current[0]).toEqual(obj2);
    expect(JSON.parse(window.sessionStorage.getItem('chave') || '')).toEqual(obj2);
  });

  it('deve lidar com arrays', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];

    const { result } = renderHook(() => useSessionStorage('chave', arr1));

    act(() => {
      result.current[1](arr2);
    });

    expect(result.current[0]).toEqual(arr2);
    expect(JSON.parse(window.sessionStorage.getItem('chave') || '')).toEqual(arr2);
  });

  it('deve lidar com funções', () => {
    const fn1 = () => 1;
    const fn2 = () => 2;

    const { result } = renderHook(() => useSessionStorage('chave', fn1));

    act(() => {
      result.current[1](fn2);
    });

    expect(result.current[0]).toBe(fn2);
    expect(window.sessionStorage.getItem('chave')).toBe('undefined');
  });

  it('deve lidar com erros de JSON inválido no sessionStorage', () => {
    window.sessionStorage.setItem('chave', 'json inválido');

    const { result } = renderHook(() => useSessionStorage('chave', 'valor inicial'));

    expect(result.current[0]).toBe('valor inicial');
  });

  it('deve lidar com sessionStorage indisponível', () => {
    const originalSessionStorage = window.sessionStorage;
    Object.defineProperty(window, 'sessionStorage', {
      value: undefined,
      writable: true
    });

    const { result } = renderHook(() => useSessionStorage('chave', 'valor inicial'));

    act(() => {
      result.current[1]('novo valor');
    });

    expect(result.current[0]).toBe('novo valor');

    Object.defineProperty(window, 'sessionStorage', {
      value: originalSessionStorage,
      writable: true
    });
  });

  it('deve lidar com erro ao acessar sessionStorage', () => {
    const originalSessionStorage = window.sessionStorage;
    const mockSessionStorage = {
      getItem: jest.fn(() => {
        throw new Error('Erro ao acessar sessionStorage');
      }),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0
    };

    Object.defineProperty(window, 'sessionStorage', {
      value: mockSessionStorage,
      writable: true
    });

    const { result } = renderHook(() => useSessionStorage('chave', 'valor inicial'));

    expect(result.current[0]).toBe('valor inicial');

    act(() => {
      result.current[1]('novo valor');
    });

    expect(result.current[0]).toBe('novo valor');

    Object.defineProperty(window, 'sessionStorage', {
      value: originalSessionStorage,
      writable: true
    });
  });

  it('deve lidar com erro ao definir item no sessionStorage', () => {
    const originalSessionStorage = window.sessionStorage;
    const mockSessionStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(() => {
        throw new Error('Erro ao definir item no sessionStorage');
      }),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0
    };

    Object.defineProperty(window, 'sessionStorage', {
      value: mockSessionStorage,
      writable: true
    });

    const { result } = renderHook(() => useSessionStorage('chave', 'valor inicial'));

    act(() => {
      result.current[1]('novo valor');
    });

    expect(result.current[0]).toBe('novo valor');

    Object.defineProperty(window, 'sessionStorage', {
      value: originalSessionStorage,
      writable: true
    });
  });

  it('deve lidar com erro ao remover item do sessionStorage', () => {
    const originalSessionStorage = window.sessionStorage;
    const mockSessionStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(() => {
        throw new Error('Erro ao remover item do sessionStorage');
      }),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0
    };

    Object.defineProperty(window, 'sessionStorage', {
      value: mockSessionStorage,
      writable: true
    });

    const { result } = renderHook(() => useSessionStorage('chave', 'valor inicial'));

    act(() => {
      result.current[1](undefined);
    });

    expect(result.current[0]).toBe(undefined);

    Object.defineProperty(window, 'sessionStorage', {
      value: originalSessionStorage,
      writable: true
    });
  });

  it('deve lidar com erro ao limpar sessionStorage', () => {
    const originalSessionStorage = window.sessionStorage;
    const mockSessionStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(() => {
        throw new Error('Erro ao limpar sessionStorage');
      }),
      key: jest.fn(),
      length: 0
    };

    Object.defineProperty(window, 'sessionStorage', {
      value: mockSessionStorage,
      writable: true
    });

    const { result } = renderHook(() => useSessionStorage('chave', 'valor inicial'));

    expect(result.current[0]).toBe('valor inicial');

    Object.defineProperty(window, 'sessionStorage', {
      value: originalSessionStorage,
      writable: true
    });
  });

  it('deve lidar com erro ao obter chave do sessionStorage', () => {
    const originalSessionStorage = window.sessionStorage;
    const mockSessionStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(() => {
        throw new Error('Erro ao obter chave do sessionStorage');
      }),
      length: 0
    };

    Object.defineProperty(window, 'sessionStorage', {
      value: mockSessionStorage,
      writable: true
    });

    const { result } = renderHook(() => useSessionStorage('chave', 'valor inicial'));

    expect(result.current[0]).toBe('valor inicial');

    Object.defineProperty(window, 'sessionStorage', {
      value: originalSessionStorage,
      writable: true
    });
  });
}); 
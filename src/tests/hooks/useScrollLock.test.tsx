import { renderHook, act } from '@testing-library/react';
import { useScrollLock } from '../../hooks/useScrollLock';

describe('useScrollLock', () => {
  const originalDocumentBody = document.body;
  const originalDocumentElement = document.documentElement;

  beforeEach(() => {
    document.body = originalDocumentBody;
    document.documentElement = originalDocumentElement;
    jest.clearAllMocks();
  });

  it('deve retornar o estado inicial como false', () => {
    const { result } = renderHook(() => useScrollLock());

    expect(result.current[0]).toBe(false);
  });

  it('deve bloquear o scroll quando ativado', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.documentElement.style.overflow).toBe('hidden');
  });

  it('deve desbloquear o scroll quando desativado', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](true);
      result.current[1](false);
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
    expect(document.documentElement.style.overflow).toBe('');
  });

  it('deve manter o scroll bloqueado quando ativado múltiplas vezes', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](true);
      result.current[1](true);
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.documentElement.style.overflow).toBe('hidden');
  });

  it('deve manter o scroll desbloqueado quando desativado múltiplas vezes', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](false);
      result.current[1](false);
      result.current[1](false);
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
    expect(document.documentElement.style.overflow).toBe('');
  });

  it('deve alternar o estado do scroll corretamente', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](true);
    });
    expect(result.current[0]).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');

    act(() => {
      result.current[1](false);
    });
    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');

    act(() => {
      result.current[1](true);
    });
    expect(result.current[0]).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('deve lidar com valores undefined', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](undefined);
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores null', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](null);
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores NaN', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](NaN);
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores Infinity', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](Infinity);
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores -Infinity', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](-Infinity);
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores string', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1]('true');
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores objeto', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1]({});
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores array', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1]([]);
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores função', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](() => {});
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores símbolo', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](Symbol());
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores data', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](new Date());
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores regex', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](/test/);
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores error', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](new Error());
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores map', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](new Map());
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores set', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](new Set());
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores weakmap', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](new WeakMap());
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores weakset', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](new WeakSet());
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores arraybuffer', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](new ArrayBuffer(8));
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores dataview', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](new DataView(new ArrayBuffer(8)));
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores int8array', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](new Int8Array(8));
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores uint8array', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](new Uint8Array(8));
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores uint8clampedarray', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](new Uint8ClampedArray(8));
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores int16array', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](new Int16Array(8));
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores uint16array', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](new Uint16Array(8));
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores int32array', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](new Int32Array(8));
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores uint32array', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](new Uint32Array(8));
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores float32array', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](new Float32Array(8));
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores float64array', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](new Float64Array(8));
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores bigint64array', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](new BigInt64Array(8));
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('deve lidar com valores biguint64array', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1](new BigUint64Array(8));
    });

    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });
}); 
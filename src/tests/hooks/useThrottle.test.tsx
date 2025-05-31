import { renderHook, act } from '@testing-library/react';
import { useThrottle } from '../../hooks/useThrottle';

describe('useThrottle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('deve retornar o valor inicial', () => {
    const { result } = renderHook(() => useThrottle('valor inicial', 500));

    expect(result.current).toBe('valor inicial');
  });

  it('deve retornar o valor após o delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useThrottle(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: 500 }
      }
    );

    rerender({ value: 'novo valor', delay: 500 });

    expect(result.current).toBe('valor inicial');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('novo valor');
  });

  it('deve lidar com delay zero', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useThrottle(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: 0 }
      }
    );

    rerender({ value: 'novo valor', delay: 0 });

    expect(result.current).toBe('novo valor');
  });

  it('deve lidar com delay negativo', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useThrottle(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: -500 }
      }
    );

    rerender({ value: 'novo valor', delay: -500 });

    expect(result.current).toBe('novo valor');
  });

  it('deve lidar com delay undefined', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useThrottle(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: undefined }
      }
    );

    rerender({ value: 'novo valor', delay: undefined });

    expect(result.current).toBe('novo valor');
  });

  it('deve lidar com delay null', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useThrottle(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: null }
      }
    );

    rerender({ value: 'novo valor', delay: null });

    expect(result.current).toBe('novo valor');
  });

  it('deve lidar com delay NaN', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useThrottle(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: NaN }
      }
    );

    rerender({ value: 'novo valor', delay: NaN });

    expect(result.current).toBe('novo valor');
  });

  it('deve lidar com delay Infinity', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useThrottle(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: Infinity }
      }
    );

    rerender({ value: 'novo valor', delay: Infinity });

    expect(result.current).toBe('valor inicial');

    act(() => {
      jest.advanceTimersByTime(Infinity);
    });

    expect(result.current).toBe('novo valor');
  });

  it('deve lidar com delay -Infinity', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useThrottle(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: -Infinity }
      }
    );

    rerender({ value: 'novo valor', delay: -Infinity });

    expect(result.current).toBe('novo valor');
  });

  it('deve lidar com múltiplas mudanças de valor', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useThrottle(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: 500 }
      }
    );

    rerender({ value: 'valor 1', delay: 500 });
    rerender({ value: 'valor 2', delay: 500 });
    rerender({ value: 'valor 3', delay: 500 });

    expect(result.current).toBe('valor inicial');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('valor 3');
  });

  it('deve lidar com múltiplas mudanças de valor e delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useThrottle(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: 500 }
      }
    );

    rerender({ value: 'valor 1', delay: 1000 });
    rerender({ value: 'valor 2', delay: 500 });
    rerender({ value: 'valor 3', delay: 2000 });

    expect(result.current).toBe('valor inicial');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('valor inicial');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('valor 2');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe('valor 3');
  });

  it('deve lidar com múltiplas mudanças de valor e delay zero', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useThrottle(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: 0 }
      }
    );

    rerender({ value: 'valor 1', delay: 0 });
    rerender({ value: 'valor 2', delay: 0 });
    rerender({ value: 'valor 3', delay: 0 });

    expect(result.current).toBe('valor 3');
  });

  it('deve lidar com múltiplas mudanças de valor e delay negativo', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useThrottle(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: -500 }
      }
    );

    rerender({ value: 'valor 1', delay: -500 });
    rerender({ value: 'valor 2', delay: -500 });
    rerender({ value: 'valor 3', delay: -500 });

    expect(result.current).toBe('valor 3');
  });

  it('deve lidar com múltiplas mudanças de valor e delay undefined', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useThrottle(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: undefined }
      }
    );

    rerender({ value: 'valor 1', delay: undefined });
    rerender({ value: 'valor 2', delay: undefined });
    rerender({ value: 'valor 3', delay: undefined });

    expect(result.current).toBe('valor 3');
  });

  it('deve lidar com múltiplas mudanças de valor e delay null', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useThrottle(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: null }
      }
    );

    rerender({ value: 'valor 1', delay: null });
    rerender({ value: 'valor 2', delay: null });
    rerender({ value: 'valor 3', delay: null });

    expect(result.current).toBe('valor 3');
  });

  it('deve lidar com múltiplas mudanças de valor e delay NaN', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useThrottle(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: NaN }
      }
    );

    rerender({ value: 'valor 1', delay: NaN });
    rerender({ value: 'valor 2', delay: NaN });
    rerender({ value: 'valor 3', delay: NaN });

    expect(result.current).toBe('valor 3');
  });

  it('deve lidar com múltiplas mudanças de valor e delay Infinity', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useThrottle(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: Infinity }
      }
    );

    rerender({ value: 'valor 1', delay: Infinity });
    rerender({ value: 'valor 2', delay: Infinity });
    rerender({ value: 'valor 3', delay: Infinity });

    expect(result.current).toBe('valor inicial');

    act(() => {
      jest.advanceTimersByTime(Infinity);
    });

    expect(result.current).toBe('valor 3');
  });

  it('deve lidar com múltiplas mudanças de valor e delay -Infinity', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useThrottle(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: -Infinity }
      }
    );

    rerender({ value: 'valor 1', delay: -Infinity });
    rerender({ value: 'valor 2', delay: -Infinity });
    rerender({ value: 'valor 3', delay: -Infinity });

    expect(result.current).toBe('valor 3');
  });

  it('deve lidar com múltiplas atualizações em sequência', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 1000),
      {
        initialProps: { value: 'valor inicial' }
      }
    );

    rerender({ value: 'valor 1' });
    rerender({ value: 'valor 2' });
    rerender({ value: 'valor 3' });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe('valor 3');
  });

  it('deve lidar com valores complexos', () => {
    const complex1 = {
      a: 1,
      b: { c: 2, d: [3, 4] },
      e: new Date(),
      f: () => {}
    };

    const complex2 = {
      a: 5,
      b: { c: 6, d: [7, 8] },
      e: new Date(),
      f: () => {}
    };

    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 1000),
      {
        initialProps: { value: complex1 }
      }
    );

    rerender({ value: complex2 });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toEqual(complex2);
  });

  it('deve lidar com valores primitivos misturados', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 1000),
      {
        initialProps: { value: 'string' }
      }
    );

    rerender({ value: 42 });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(42);

    rerender({ value: true });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(true);

    rerender({ value: null });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(null);
  });

  it('deve lidar com valores de referência', () => {
    const ref1 = { current: 'valor 1' };
    const ref2 = { current: 'valor 2' };

    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 1000),
      {
        initialProps: { value: ref1 }
      }
    );

    rerender({ value: ref2 });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(ref2);
  });

  it('deve lidar com valores de data', () => {
    const date1 = new Date('2023-01-01');
    const date2 = new Date('2023-12-31');

    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 1000),
      {
        initialProps: { value: date1 }
      }
    );

    rerender({ value: date2 });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toEqual(date2);
  });

  it('deve lidar com valores de regex', () => {
    const regex1 = /teste/;
    const regex2 = /outro/;

    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 1000),
      {
        initialProps: { value: regex1 }
      }
    );

    rerender({ value: regex2 });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toEqual(regex2);
  });

  it('deve lidar com valores de símbolo', () => {
    const symbol1 = Symbol('teste');
    const symbol2 = Symbol('outro');

    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 1000),
      {
        initialProps: { value: symbol1 }
      }
    );

    rerender({ value: symbol2 });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(symbol2);
  });
}); 
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../../hooks/useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('deve retornar o valor inicial', () => {
    const { result } = renderHook(() => useDebounce('valor inicial', 500));

    expect(result.current).toBe('valor inicial');
  });

  it('deve retornar o valor após o delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
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
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: 0 }
      }
    );

    rerender({ value: 'novo valor', delay: 0 });

    expect(result.current).toBe('novo valor');
  });

  it('deve lidar com delay negativo', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: -500 }
      }
    );

    rerender({ value: 'novo valor', delay: -500 });

    expect(result.current).toBe('novo valor');
  });

  it('deve lidar com delay undefined', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: undefined }
      }
    );

    rerender({ value: 'novo valor', delay: undefined });

    expect(result.current).toBe('novo valor');
  });

  it('deve lidar com delay null', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: null }
      }
    );

    rerender({ value: 'novo valor', delay: null });

    expect(result.current).toBe('novo valor');
  });

  it('deve lidar com delay NaN', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: NaN }
      }
    );

    rerender({ value: 'novo valor', delay: NaN });

    expect(result.current).toBe('novo valor');
  });

  it('deve lidar com delay Infinity', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
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
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: -Infinity }
      }
    );

    rerender({ value: 'novo valor', delay: -Infinity });

    expect(result.current).toBe('novo valor');
  });

  it('deve lidar com múltiplas mudanças de valor', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
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
      ({ value, delay }) => useDebounce(value, delay),
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
      ({ value, delay }) => useDebounce(value, delay),
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
      ({ value, delay }) => useDebounce(value, delay),
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
      ({ value, delay }) => useDebounce(value, delay),
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
      ({ value, delay }) => useDebounce(value, delay),
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
      ({ value, delay }) => useDebounce(value, delay),
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
      ({ value, delay }) => useDebounce(value, delay),
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
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: -Infinity }
      }
    );

    rerender({ value: 'valor 1', delay: -Infinity });
    rerender({ value: 'valor 2', delay: -Infinity });
    rerender({ value: 'valor 3', delay: -Infinity });

    expect(result.current).toBe('valor 3');
  });

  it('deve lidar com múltiplas mudanças de valor e delay NaN', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
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
      ({ value, delay }) => useDebounce(value, delay),
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
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'valor inicial', delay: -Infinity }
      }
    );

    rerender({ value: 'valor 1', delay: -Infinity });
    rerender({ value: 'valor 2', delay: -Infinity });
    rerender({ value: 'valor 3', delay: -Infinity });

    expect(result.current).toBe('valor 3');
  });
}); 
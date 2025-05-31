import { renderHook, act } from '@testing-library/react';
import { useActive } from '../../hooks/useActive';

describe('useActive', () => {
  it('deve retornar false inicialmente', () => {
    const { result } = renderHook(() => useActive());
    expect(result.current[0]).toBe(false);
  });

  it('deve retornar true quando o elemento é ativado', () => {
    const { result } = renderHook(() => useActive());
    act(() => {
      result.current[1].onMouseDown();
    });
    expect(result.current[0]).toBe(true);
  });

  it('deve retornar false quando o elemento é desativado', () => {
    const { result } = renderHook(() => useActive());
    act(() => {
      result.current[1].onMouseDown();
    });
    act(() => {
      result.current[1].onMouseUp();
    });
    expect(result.current[0]).toBe(false);
  });

  it('deve lidar com múltiplos eventos de mouseDown', () => {
    const { result } = renderHook(() => useActive());
    act(() => {
      result.current[1].onMouseDown();
    });
    act(() => {
      result.current[1].onMouseDown();
    });
    expect(result.current[0]).toBe(true);
  });

  it('deve lidar com múltiplos eventos de mouseUp', () => {
    const { result } = renderHook(() => useActive());
    act(() => {
      result.current[1].onMouseDown();
    });
    act(() => {
      result.current[1].onMouseUp();
    });
    act(() => {
      result.current[1].onMouseUp();
    });
    expect(result.current[0]).toBe(false);
  });

  it('deve lidar com eventos de mouseDown e mouseUp em sequência', () => {
    const { result } = renderHook(() => useActive());
    act(() => {
      result.current[1].onMouseDown();
    });
    act(() => {
      result.current[1].onMouseUp();
    });
    act(() => {
      result.current[1].onMouseDown();
    });
    expect(result.current[0]).toBe(true);
  });

  it('deve lidar com eventos de mouseUp e mouseDown em sequência', () => {
    const { result } = renderHook(() => useActive());
    act(() => {
      result.current[1].onMouseUp();
    });
    act(() => {
      result.current[1].onMouseDown();
    });
    expect(result.current[0]).toBe(true);
  });

  it('deve lidar com eventos de mouseDown e mouseUp em sequência rápida', () => {
    const { result } = renderHook(() => useActive());
    act(() => {
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
    });
    expect(result.current[0]).toBe(false);
  });

  it('deve lidar com eventos de mouseUp e mouseDown em sequência rápida', () => {
    const { result } = renderHook(() => useActive());
    act(() => {
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
    });
    expect(result.current[0]).toBe(true);
  });

  it('deve lidar com eventos de mouseDown e mouseUp em sequência muito rápida', () => {
    const { result } = renderHook(() => useActive());
    act(() => {
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
    });
    expect(result.current[0]).toBe(false);
  });

  it('deve lidar com eventos de mouseUp e mouseDown em sequência muito rápida', () => {
    const { result } = renderHook(() => useActive());
    act(() => {
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
    });
    expect(result.current[0]).toBe(true);
  });

  it('deve lidar com eventos de mouseDown e mouseUp em sequência muito rápida com delay', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useActive());
    act(() => {
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
    });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current[0]).toBe(false);
    jest.useRealTimers();
  });

  it('deve lidar com eventos de mouseUp e mouseDown em sequência muito rápida com delay', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useActive());
    act(() => {
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
    });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current[0]).toBe(true);
    jest.useRealTimers();
  });

  it('deve lidar com eventos de mouseDown e mouseUp em sequência muito rápida com delay e múltiplos eventos', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useActive());
    act(() => {
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
    });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current[0]).toBe(false);
    jest.useRealTimers();
  });

  it('deve lidar com eventos de mouseUp e mouseDown em sequência muito rápida com delay e múltiplos eventos', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useActive());
    act(() => {
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
    });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current[0]).toBe(true);
    jest.useRealTimers();
  });

  it('deve lidar com eventos de mouseDown e mouseUp em sequência muito rápida com delay e múltiplos eventos e diferentes delays', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useActive());
    act(() => {
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
    });
    act(() => {
      jest.advanceTimersByTime(50);
    });
    act(() => {
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
    });
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(result.current[0]).toBe(false);
    jest.useRealTimers();
  });

  it('deve lidar com eventos de mouseUp e mouseDown em sequência muito rápida com delay e múltiplos eventos e diferentes delays', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useActive());
    act(() => {
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
    });
    act(() => {
      jest.advanceTimersByTime(50);
    });
    act(() => {
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
    });
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(result.current[0]).toBe(true);
    jest.useRealTimers();
  });

  it('deve lidar com eventos de mouseDown e mouseUp em sequência muito rápida com delay e múltiplos eventos e diferentes delays e múltiplos timers', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useActive());
    act(() => {
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
    });
    act(() => {
      jest.advanceTimersByTime(50);
    });
    act(() => {
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
    });
    act(() => {
      jest.advanceTimersByTime(50);
    });
    act(() => {
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
    });
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(result.current[0]).toBe(false);
    jest.useRealTimers();
  });

  it('deve lidar com eventos de mouseUp e mouseDown em sequência muito rápida com delay e múltiplos eventos e diferentes delays e múltiplos timers', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useActive());
    act(() => {
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
    });
    act(() => {
      jest.advanceTimersByTime(50);
    });
    act(() => {
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
    });
    act(() => {
      jest.advanceTimersByTime(50);
    });
    act(() => {
      result.current[1].onMouseUp();
      result.current[1].onMouseDown();
    });
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(result.current[0]).toBe(true);
    jest.useRealTimers();
  });
}); 
import { renderHook, act } from '@testing-library/react';
import { useTimeout } from '../../hooks/useTimeout';

describe('useTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('deve executar o callback após o delay especificado', () => {
    const callback = jest.fn();
    renderHook(() => useTimeout(callback, 1000));

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('deve não executar o callback antes do delay especificado', () => {
    const callback = jest.fn();
    renderHook(() => useTimeout(callback, 1000));

    act(() => {
      jest.advanceTimersByTime(999);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('deve limpar o timeout quando o componente é desmontado', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useTimeout(callback, 1000));

    unmount();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('deve limpar o timeout anterior quando o delay é alterado', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(
      ({ delay }) => useTimeout(callback, delay),
      {
        initialProps: { delay: 1000 }
      }
    );

    act(() => {
      jest.advanceTimersByTime(500);
    });

    rerender({ delay: 2000 });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('deve limpar o timeout anterior quando o callback é alterado', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const { rerender } = renderHook(
      ({ callback }) => useTimeout(callback, 1000),
      {
        initialProps: { callback: callback1 }
      }
    );

    act(() => {
      jest.advanceTimersByTime(500);
    });

    rerender({ callback: callback2 });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('deve lidar com delay zero', () => {
    const callback = jest.fn();
    renderHook(() => useTimeout(callback, 0));

    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('deve lidar com delay negativo', () => {
    const callback = jest.fn();
    renderHook(() => useTimeout(callback, -1000));

    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('deve lidar com callback undefined', () => {
    const { result } = renderHook(() => useTimeout(undefined, 1000));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Não deve lançar erro
  });

  it('deve lidar com múltiplos timeouts', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    renderHook(() => {
      useTimeout(callback1, 1000);
      useTimeout(callback2, 2000);
      useTimeout(callback3, 3000);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).not.toHaveBeenCalled();
    expect(callback3).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback3).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback3).toHaveBeenCalledTimes(1);
  });

  it('deve lidar com timeouts aninhados', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    renderHook(() => {
      useTimeout(() => {
        callback1();
        useTimeout(callback2, 1000);
      }, 1000);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('deve lidar com timeouts recursivos', () => {
    const callback = jest.fn();
    let count = 0;

    renderHook(() => {
      useTimeout(() => {
        callback();
        if (count < 3) {
          count++;
          useTimeout(callback, 1000);
        }
      }, 1000);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(2);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(3);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(4);
  });

  it('deve lidar com timeouts em diferentes componentes', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const { unmount: unmount1 } = renderHook(() => useTimeout(callback1, 1000));
    const { unmount: unmount2 } = renderHook(() => useTimeout(callback2, 1000));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);

    unmount1();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).not.toHaveBeenCalled();

    unmount2();
  });

  it('deve lidar com timeouts em diferentes níveis de componentes', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    const { unmount: unmount1 } = renderHook(() => {
      useTimeout(callback1, 1000);
      const { unmount: unmount2 } = renderHook(() => {
        useTimeout(callback2, 1000);
        const { unmount: unmount3 } = renderHook(() => {
          useTimeout(callback3, 1000);
        });
        return { unmount: unmount3 };
      });
      return { unmount: unmount2 };
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback3).toHaveBeenCalledTimes(1);

    unmount1();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();
    expect(callback3).not.toHaveBeenCalled();
  });
}); 
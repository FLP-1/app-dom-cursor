import { renderHook, act } from '@testing-library/react';
import { useInterval } from '../../hooks/useInterval';

describe('useInterval', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('deve executar o callback após o intervalo especificado', () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, 1000));

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('deve executar o callback múltiplas vezes', () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, 1000));

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
  });

  it('deve não executar o callback antes do intervalo especificado', () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, 1000));

    act(() => {
      jest.advanceTimersByTime(999);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('deve limpar o intervalo quando o componente é desmontado', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useInterval(callback, 1000));

    unmount();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('deve limpar o intervalo anterior quando o delay é alterado', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(
      ({ delay }) => useInterval(callback, delay),
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

  it('deve limpar o intervalo anterior quando o callback é alterado', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const { rerender } = renderHook(
      ({ callback }) => useInterval(callback, 1000),
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
    renderHook(() => useInterval(callback, 0));

    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('deve lidar com delay negativo', () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, -1000));

    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('deve lidar com callback undefined', () => {
    const { result } = renderHook(() => useInterval(undefined, 1000));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Não deve lançar erro
  });

  it('deve lidar com múltiplos intervalos', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    renderHook(() => {
      useInterval(callback1, 1000);
      useInterval(callback2, 2000);
      useInterval(callback3, 3000);
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

    expect(callback1).toHaveBeenCalledTimes(2);
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback3).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback1).toHaveBeenCalledTimes(3);
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback3).toHaveBeenCalledTimes(1);
  });

  it('deve lidar com intervalos aninhados', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    renderHook(() => {
      useInterval(() => {
        callback1();
        useInterval(callback2, 1000);
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

    expect(callback1).toHaveBeenCalledTimes(2);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('deve lidar com intervalos recursivos', () => {
    const callback = jest.fn();
    let count = 0;

    renderHook(() => {
      useInterval(() => {
        callback();
        if (count < 3) {
          count++;
          useInterval(callback, 1000);
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

  it('deve lidar com intervalos em diferentes componentes', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const { unmount: unmount1 } = renderHook(() => useInterval(callback1, 1000));
    const { unmount: unmount2 } = renderHook(() => useInterval(callback2, 1000));

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
    expect(callback2).toHaveBeenCalledTimes(2);

    unmount2();
  });

  it('deve lidar com intervalos em diferentes níveis de componentes', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    const { unmount: unmount1 } = renderHook(() => {
      useInterval(callback1, 1000);
      const { unmount: unmount2 } = renderHook(() => {
        useInterval(callback2, 1000);
        const { unmount: unmount3 } = renderHook(() => {
          useInterval(callback3, 1000);
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

  it('deve lidar com intervalos pausados', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(
      ({ isActive }) => useInterval(callback, 1000, isActive),
      {
        initialProps: { isActive: true }
      }
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);

    rerender({ isActive: false });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);

    rerender({ isActive: true });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });
}); 
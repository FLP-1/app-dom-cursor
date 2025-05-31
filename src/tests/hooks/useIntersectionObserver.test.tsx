import { renderHook } from '@testing-library/react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

describe('useIntersectionObserver', () => {
  let mockIntersectionObserver: jest.Mock;
  let mockDisconnect: jest.Mock;
  let mockObserve: jest.Mock;
  let mockUnobserve: jest.Mock;

  beforeEach(() => {
    mockDisconnect = jest.fn();
    mockObserve = jest.fn();
    mockUnobserve = jest.fn();

    mockIntersectionObserver = jest.fn().mockImplementation((callback) => ({
      disconnect: mockDisconnect,
      observe: mockObserve,
      unobserve: mockUnobserve
    }));

    window.IntersectionObserver = mockIntersectionObserver;
    jest.clearAllMocks();
  });

  it('deve criar um IntersectionObserver com as opções padrão', () => {
    const { result } = renderHook(() => useIntersectionObserver());

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        root: null,
        rootMargin: '0px',
        threshold: 0
      }
    );
  });

  it('deve criar um IntersectionObserver com opções personalizadas', () => {
    const options = {
      root: document.body,
      rootMargin: '10px',
      threshold: 0.5
    };

    const { result } = renderHook(() => useIntersectionObserver(options));

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      options
    );
  });

  it('deve observar o elemento quando ref é fornecido', () => {
    const element = document.createElement('div');
    const { result } = renderHook(() => useIntersectionObserver());

    act(() => {
      result.current.ref.current = element;
    });

    expect(mockObserve).toHaveBeenCalledWith(element);
  });

  it('deve parar de observar o elemento quando ref é removido', () => {
    const element = document.createElement('div');
    const { result } = renderHook(() => useIntersectionObserver());

    act(() => {
      result.current.ref.current = element;
    });

    act(() => {
      result.current.ref.current = null;
    });

    expect(mockUnobserve).toHaveBeenCalledWith(element);
  });

  it('deve atualizar o estado de interseção quando o callback é chamado', () => {
    const { result } = renderHook(() => useIntersectionObserver());

    const mockEntry = {
      isIntersecting: true,
      intersectionRatio: 1
    };

    act(() => {
      const callback = mockIntersectionObserver.mock.calls[0][0];
      callback([mockEntry]);
    });

    expect(result.current.isIntersecting).toBe(true);
    expect(result.current.intersectionRatio).toBe(1);
  });

  it('deve lidar com múltiplas entradas de interseção', () => {
    const { result } = renderHook(() => useIntersectionObserver());

    const mockEntries = [
      { isIntersecting: true, intersectionRatio: 0.5 },
      { isIntersecting: false, intersectionRatio: 0 }
    ];

    act(() => {
      const callback = mockIntersectionObserver.mock.calls[0][0];
      callback(mockEntries);
    });

    expect(result.current.isIntersecting).toBe(true);
    expect(result.current.intersectionRatio).toBe(0.5);
  });

  it('deve lidar com entradas vazias', () => {
    const { result } = renderHook(() => useIntersectionObserver());

    act(() => {
      const callback = mockIntersectionObserver.mock.calls[0][0];
      callback([]);
    });

    expect(result.current.isIntersecting).toBe(false);
    expect(result.current.intersectionRatio).toBe(0);
  });

  it('deve desconectar o observer quando o componente é desmontado', () => {
    const { unmount } = renderHook(() => useIntersectionObserver());

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('deve lidar com diferentes thresholds', () => {
    const thresholds = [0, 0.25, 0.5, 0.75, 1];
    const { result } = renderHook(() => useIntersectionObserver({ threshold: thresholds }));

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        threshold: thresholds
      })
    );
  });

  it('deve lidar com diferentes rootMargins', () => {
    const rootMargin = '10px 20px 30px 40px';
    const { result } = renderHook(() => useIntersectionObserver({ rootMargin }));

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        rootMargin
      })
    );
  });

  it('deve lidar com diferentes roots', () => {
    const root = document.createElement('div');
    const { result } = renderHook(() => useIntersectionObserver({ root }));

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        root
      })
    );
  });

  it('deve lidar com mudanças nas opções', () => {
    const { rerender } = renderHook(
      ({ options }) => useIntersectionObserver(options),
      {
        initialProps: {
          options: { threshold: 0 }
        }
      }
    );

    const newOptions = { threshold: 0.5 };

    rerender({ options: newOptions });

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining(newOptions)
    );
  });

  it('deve lidar com mudanças no elemento observado', () => {
    const element1 = document.createElement('div');
    const element2 = document.createElement('div');
    const { result } = renderHook(() => useIntersectionObserver());

    act(() => {
      result.current.ref.current = element1;
    });

    expect(mockObserve).toHaveBeenCalledWith(element1);

    act(() => {
      result.current.ref.current = element2;
    });

    expect(mockUnobserve).toHaveBeenCalledWith(element1);
    expect(mockObserve).toHaveBeenCalledWith(element2);
  });

  it('deve lidar com erros no callback', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useIntersectionObserver());

    act(() => {
      const callback = mockIntersectionObserver.mock.calls[0][0];
      callback([{ isIntersecting: true, intersectionRatio: 1 }]);
    });

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it('deve lidar com o navegador não suportando IntersectionObserver', () => {
    const originalIntersectionObserver = window.IntersectionObserver;
    delete window.IntersectionObserver;

    const { result } = renderHook(() => useIntersectionObserver());

    expect(result.current.isIntersecting).toBe(false);
    expect(result.current.intersectionRatio).toBe(0);

    window.IntersectionObserver = originalIntersectionObserver;
  });
}); 
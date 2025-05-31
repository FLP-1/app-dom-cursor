import { renderHook } from '@testing-library/react';
import { useOnScreen } from '../../hooks/useOnScreen';

describe('useOnScreen', () => {
  const mockIntersectionObserver = (isIntersecting: boolean) => {
    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: jest.fn().mockImplementation((callback) => ({
        observe: () => callback([{ isIntersecting }]),
        unobserve: jest.fn(),
        disconnect: jest.fn()
      }))
    });
  };

  beforeEach(() => {
    mockIntersectionObserver(false);
  });

  it('deve retornar false quando o elemento não está visível', () => {
    const { result } = renderHook(() => useOnScreen());

    expect(result.current).toBe(false);
  });

  it('deve retornar true quando o elemento está visível', () => {
    mockIntersectionObserver(true);
    const { result } = renderHook(() => useOnScreen());

    expect(result.current).toBe(true);
  });

  it('deve lidar com diferentes opções de root', () => {
    const root = document.createElement('div');
    const { result } = renderHook(() => useOnScreen({ root }));

    expect(result.current).toBe(false);
  });

  it('deve lidar com diferentes opções de rootMargin', () => {
    const { result } = renderHook(() => useOnScreen({ rootMargin: '10px' }));

    expect(result.current).toBe(false);
  });

  it('deve lidar com diferentes opções de threshold', () => {
    const { result } = renderHook(() => useOnScreen({ threshold: 0.5 }));

    expect(result.current).toBe(false);
  });

  it('deve lidar com múltiplos thresholds', () => {
    const { result } = renderHook(() => useOnScreen({ threshold: [0, 0.5, 1] }));

    expect(result.current).toBe(false);
  });

  it('deve lidar com mudanças nas opções', () => {
    const { rerender } = renderHook(
      ({ options }) => useOnScreen(options),
      {
        initialProps: { options: { threshold: 0 } }
      }
    );

    rerender({ options: { threshold: 0.5 } });

    expect(result.current).toBe(false);
  });

  it('deve lidar com o navegador não suportando IntersectionObserver', () => {
    delete window.IntersectionObserver;

    const { result } = renderHook(() => useOnScreen());

    expect(result.current).toBe(false);
  });

  it('deve lidar com elementos removidos do DOM', () => {
    const element = document.createElement('div');
    const { result } = renderHook(() => useOnScreen());

    act(() => {
      result.current.ref.current = element;
    });

    document.body.removeChild(element);

    expect(result.current).toBe(false);
  });

  it('deve lidar com elementos adicionados ao DOM', () => {
    const element = document.createElement('div');
    const { result } = renderHook(() => useOnScreen());

    act(() => {
      result.current.ref.current = element;
    });

    document.body.appendChild(element);

    expect(result.current).toBe(false);
  });

  it('deve lidar com elementos com z-index', () => {
    const element = document.createElement('div');
    element.style.zIndex = '1000';
    const { result } = renderHook(() => useOnScreen());

    act(() => {
      result.current.ref.current = element;
    });

    expect(result.current).toBe(false);
  });

  it('deve lidar com elementos com position absolute', () => {
    const element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.top = '0';
    element.style.left = '0';
    const { result } = renderHook(() => useOnScreen());

    act(() => {
      result.current.ref.current = element;
    });

    expect(result.current).toBe(false);
  });

  it('deve lidar com elementos com position fixed', () => {
    const element = document.createElement('div');
    element.style.position = 'fixed';
    element.style.top = '0';
    element.style.left = '0';
    const { result } = renderHook(() => useOnScreen());

    act(() => {
      result.current.ref.current = element;
    });

    expect(result.current).toBe(false);
  });

  it('deve lidar com elementos com position sticky', () => {
    const element = document.createElement('div');
    element.style.position = 'sticky';
    element.style.top = '0';
    const { result } = renderHook(() => useOnScreen());

    act(() => {
      result.current.ref.current = element;
    });

    expect(result.current).toBe(false);
  });

  it('deve lidar com elementos com position relative', () => {
    const element = document.createElement('div');
    element.style.position = 'relative';
    const { result } = renderHook(() => useOnScreen());

    act(() => {
      result.current.ref.current = element;
    });

    expect(result.current).toBe(false);
  });

  it('deve lidar com elementos com position static', () => {
    const element = document.createElement('div');
    element.style.position = 'static';
    const { result } = renderHook(() => useOnScreen());

    act(() => {
      result.current.ref.current = element;
    });

    expect(result.current).toBe(false);
  });
}); 
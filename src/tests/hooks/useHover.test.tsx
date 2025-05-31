import { renderHook, act } from '@testing-library/react';
import { useHover } from '../../hooks/useHover';

describe('useHover', () => {
  it('deve retornar false inicialmente', () => {
    const { result } = renderHook(() => useHover());

    expect(result.current.isHovered).toBe(false);
  });

  it('deve retornar true quando o mouse entra no elemento', () => {
    const { result } = renderHook(() => useHover());
    const element = document.createElement('div');

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new MouseEvent('mouseenter'));
    });

    expect(result.current.isHovered).toBe(true);
  });

  it('deve retornar false quando o mouse sai do elemento', () => {
    const { result } = renderHook(() => useHover());
    const element = document.createElement('div');

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new MouseEvent('mouseenter'));
      element.dispatchEvent(new MouseEvent('mouseleave'));
    });

    expect(result.current.isHovered).toBe(false);
  });

  it('deve lidar com ref nula', () => {
    const { result } = renderHook(() => useHover());

    act(() => {
      result.current.ref.current = null;
    });

    expect(result.current.isHovered).toBe(false);
  });

  it('deve lidar com ref undefined', () => {
    const { result } = renderHook(() => useHover());

    act(() => {
      result.current.ref.current = undefined;
    });

    expect(result.current.isHovered).toBe(false);
  });

  it('deve lidar com elemento removido do DOM', () => {
    const { result } = renderHook(() => useHover());
    const element = document.createElement('div');

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new MouseEvent('mouseenter'));
      document.body.removeChild(element);
    });

    expect(result.current.isHovered).toBe(false);
  });

  it('deve lidar com elemento adicionado ao DOM', () => {
    const { result } = renderHook(() => useHover());
    const element = document.createElement('div');

    act(() => {
      result.current.ref.current = element;
      document.body.appendChild(element);
      element.dispatchEvent(new MouseEvent('mouseenter'));
    });

    expect(result.current.isHovered).toBe(true);
  });

  it('deve lidar com elemento com z-index', () => {
    const { result } = renderHook(() => useHover());
    const element = document.createElement('div');
    element.style.zIndex = '1000';

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new MouseEvent('mouseenter'));
    });

    expect(result.current.isHovered).toBe(true);
  });

  it('deve lidar com elemento com position absolute', () => {
    const { result } = renderHook(() => useHover());
    const element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.top = '0';
    element.style.left = '0';

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new MouseEvent('mouseenter'));
    });

    expect(result.current.isHovered).toBe(true);
  });

  it('deve lidar com elemento com position fixed', () => {
    const { result } = renderHook(() => useHover());
    const element = document.createElement('div');
    element.style.position = 'fixed';
    element.style.top = '0';
    element.style.left = '0';

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new MouseEvent('mouseenter'));
    });

    expect(result.current.isHovered).toBe(true);
  });

  it('deve lidar com elemento com position sticky', () => {
    const { result } = renderHook(() => useHover());
    const element = document.createElement('div');
    element.style.position = 'sticky';
    element.style.top = '0';

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new MouseEvent('mouseenter'));
    });

    expect(result.current.isHovered).toBe(true);
  });

  it('deve lidar com elemento com position relative', () => {
    const { result } = renderHook(() => useHover());
    const element = document.createElement('div');
    element.style.position = 'relative';

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new MouseEvent('mouseenter'));
    });

    expect(result.current.isHovered).toBe(true);
  });

  it('deve lidar com elemento com position static', () => {
    const { result } = renderHook(() => useHover());
    const element = document.createElement('div');
    element.style.position = 'static';

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new MouseEvent('mouseenter'));
    });

    expect(result.current.isHovered).toBe(true);
  });

  it('deve lidar com elemento com pointer-events none', () => {
    const { result } = renderHook(() => useHover());
    const element = document.createElement('div');
    element.style.pointerEvents = 'none';

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new MouseEvent('mouseenter'));
    });

    expect(result.current.isHovered).toBe(false);
  });

  it('deve lidar com elemento com pointer-events auto', () => {
    const { result } = renderHook(() => useHover());
    const element = document.createElement('div');
    element.style.pointerEvents = 'auto';

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new MouseEvent('mouseenter'));
    });

    expect(result.current.isHovered).toBe(true);
  });

  it('deve lidar com elemento com pointer-events all', () => {
    const { result } = renderHook(() => useHover());
    const element = document.createElement('div');
    element.style.pointerEvents = 'all';

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new MouseEvent('mouseenter'));
    });

    expect(result.current.isHovered).toBe(true);
  });

  it('deve lidar com elemento com pointer-events none e auto', () => {
    const { result } = renderHook(() => useHover());
    const element = document.createElement('div');
    element.style.pointerEvents = 'none';

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new MouseEvent('mouseenter'));
      element.style.pointerEvents = 'auto';
      element.dispatchEvent(new MouseEvent('mouseenter'));
    });

    expect(result.current.isHovered).toBe(true);
  });

  it('deve lidar com elemento com pointer-events auto e none', () => {
    const { result } = renderHook(() => useHover());
    const element = document.createElement('div');
    element.style.pointerEvents = 'auto';

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new MouseEvent('mouseenter'));
      element.style.pointerEvents = 'none';
      element.dispatchEvent(new MouseEvent('mouseenter'));
    });

    expect(result.current.isHovered).toBe(false);
  });
}); 
import { renderHook, act } from '@testing-library/react';
import { useClickOutside } from '../../hooks/useClickOutside';

describe('useClickOutside', () => {
  const mockRef = { current: document.createElement('div') };
  const mockCallback = jest.fn();

  beforeEach(() => {
    document.body.appendChild(mockRef.current!);
    jest.clearAllMocks();
  });

  afterEach(() => {
    document.body.removeChild(mockRef.current!);
  });

  it('deve chamar o callback quando o clique é fora do elemento', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));
    const element = document.createElement('div');
    document.body.appendChild(element);

    act(() => {
      result.current.ref.current = element;
      document.body.click();
    });

    expect(callback).toHaveBeenCalled();
  });

  it('não deve chamar o callback quando o clique é dentro do elemento', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));
    const element = document.createElement('div');
    document.body.appendChild(element);

    act(() => {
      result.current.ref.current = element;
      element.click();
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('deve lidar com ref nula', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));

    act(() => {
      result.current.ref.current = null;
      document.body.click();
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('deve lidar com ref undefined', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));

    act(() => {
      result.current.ref.current = undefined;
      document.body.click();
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('deve lidar com elemento removido do DOM', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));
    const element = document.createElement('div');
    document.body.appendChild(element);

    act(() => {
      result.current.ref.current = element;
      document.body.removeChild(element);
      document.body.click();
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('deve lidar com elemento adicionado ao DOM', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));
    const element = document.createElement('div');

    act(() => {
      result.current.ref.current = element;
      document.body.appendChild(element);
      document.body.click();
    });

    expect(callback).toHaveBeenCalled();
  });

  it('deve lidar com elemento com z-index', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));
    const element = document.createElement('div');
    element.style.zIndex = '1000';
    document.body.appendChild(element);

    act(() => {
      result.current.ref.current = element;
      document.body.click();
    });

    expect(callback).toHaveBeenCalled();
  });

  it('deve lidar com elemento com position absolute', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));
    const element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.top = '0';
    element.style.left = '0';
    document.body.appendChild(element);

    act(() => {
      result.current.ref.current = element;
      document.body.click();
    });

    expect(callback).toHaveBeenCalled();
  });

  it('deve lidar com elemento com position fixed', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));
    const element = document.createElement('div');
    element.style.position = 'fixed';
    element.style.top = '0';
    element.style.left = '0';
    document.body.appendChild(element);

    act(() => {
      result.current.ref.current = element;
      document.body.click();
    });

    expect(callback).toHaveBeenCalled();
  });

  it('deve lidar com elemento com position sticky', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));
    const element = document.createElement('div');
    element.style.position = 'sticky';
    element.style.top = '0';
    document.body.appendChild(element);

    act(() => {
      result.current.ref.current = element;
      document.body.click();
    });

    expect(callback).toHaveBeenCalled();
  });

  it('deve lidar com elemento com position relative', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));
    const element = document.createElement('div');
    element.style.position = 'relative';
    document.body.appendChild(element);

    act(() => {
      result.current.ref.current = element;
      document.body.click();
    });

    expect(callback).toHaveBeenCalled();
  });

  it('deve lidar com elemento com position static', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));
    const element = document.createElement('div');
    element.style.position = 'static';
    document.body.appendChild(element);

    act(() => {
      result.current.ref.current = element;
      document.body.click();
    });

    expect(callback).toHaveBeenCalled();
  });

  it('deve lidar com elemento com pointer-events none', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));
    const element = document.createElement('div');
    element.style.pointerEvents = 'none';
    document.body.appendChild(element);

    act(() => {
      result.current.ref.current = element;
      document.body.click();
    });

    expect(callback).toHaveBeenCalled();
  });

  it('deve lidar com elemento com pointer-events auto', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));
    const element = document.createElement('div');
    element.style.pointerEvents = 'auto';
    document.body.appendChild(element);

    act(() => {
      result.current.ref.current = element;
      document.body.click();
    });

    expect(callback).toHaveBeenCalled();
  });

  it('deve lidar com elemento com pointer-events all', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));
    const element = document.createElement('div');
    element.style.pointerEvents = 'all';
    document.body.appendChild(element);

    act(() => {
      result.current.ref.current = element;
      document.body.click();
    });

    expect(callback).toHaveBeenCalled();
  });

  it('deve lidar com elemento com pointer-events none e auto', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));
    const element = document.createElement('div');
    element.style.pointerEvents = 'none';
    document.body.appendChild(element);

    act(() => {
      result.current.ref.current = element;
      document.body.click();
      element.style.pointerEvents = 'auto';
      document.body.click();
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('deve lidar com elemento com pointer-events auto e none', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));
    const element = document.createElement('div');
    element.style.pointerEvents = 'auto';
    document.body.appendChild(element);

    act(() => {
      result.current.ref.current = element;
      document.body.click();
      element.style.pointerEvents = 'none';
      document.body.click();
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('deve lidar com elemento com pointer-events none e auto e clique dentro', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));
    const element = document.createElement('div');
    element.style.pointerEvents = 'none';
    document.body.appendChild(element);

    act(() => {
      result.current.ref.current = element;
      document.body.click();
      element.style.pointerEvents = 'auto';
      element.click();
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('deve lidar com elemento com pointer-events auto e none e clique dentro', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));
    const element = document.createElement('div');
    element.style.pointerEvents = 'auto';
    document.body.appendChild(element);

    act(() => {
      result.current.ref.current = element;
      document.body.click();
      element.style.pointerEvents = 'none';
      element.click();
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('deve lidar com elemento com pointer-events none e auto e clique fora', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));
    const element = document.createElement('div');
    element.style.pointerEvents = 'none';
    document.body.appendChild(element);

    act(() => {
      result.current.ref.current = element;
      document.body.click();
      element.style.pointerEvents = 'auto';
      document.body.click();
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('deve lidar com elemento com pointer-events auto e none e clique fora', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));
    const element = document.createElement('div');
    element.style.pointerEvents = 'auto';
    document.body.appendChild(element);

    act(() => {
      result.current.ref.current = element;
      document.body.click();
      element.style.pointerEvents = 'none';
      document.body.click();
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });
}); 
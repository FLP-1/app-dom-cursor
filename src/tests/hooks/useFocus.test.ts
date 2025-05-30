import { renderHook, act } from '@testing-library/react';
import { useFocus } from '../../hooks/useFocus';

describe('useFocus', () => {
  it('deve retornar false inicialmente', () => {
    const { result } = renderHook(() => useFocus());

    expect(result.current.isFocused).toBe(false);
  });

  it('deve retornar true quando o elemento recebe foco', () => {
    const { result } = renderHook(() => useFocus());
    const element = document.createElement('input');

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new FocusEvent('focus'));
    });

    expect(result.current.isFocused).toBe(true);
  });

  it('deve retornar false quando o elemento perde foco', () => {
    const { result } = renderHook(() => useFocus());
    const element = document.createElement('input');

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new FocusEvent('focus'));
      element.dispatchEvent(new FocusEvent('blur'));
    });

    expect(result.current.isFocused).toBe(false);
  });

  it('deve lidar com ref nula', () => {
    const { result } = renderHook(() => useFocus());

    act(() => {
      result.current.ref.current = null;
    });

    expect(result.current.isFocused).toBe(false);
  });

  it('deve lidar com ref undefined', () => {
    const { result } = renderHook(() => useFocus());

    act(() => {
      result.current.ref.current = undefined;
    });

    expect(result.current.isFocused).toBe(false);
  });

  it('deve lidar com elemento removido do DOM', () => {
    const { result } = renderHook(() => useFocus());
    const element = document.createElement('input');

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new FocusEvent('focus'));
      document.body.removeChild(element);
    });

    expect(result.current.isFocused).toBe(false);
  });

  it('deve lidar com elemento adicionado ao DOM', () => {
    const { result } = renderHook(() => useFocus());
    const element = document.createElement('input');

    act(() => {
      result.current.ref.current = element;
      document.body.appendChild(element);
      element.dispatchEvent(new FocusEvent('focus'));
    });

    expect(result.current.isFocused).toBe(true);
  });

  it('deve lidar com elemento com tabindex', () => {
    const { result } = renderHook(() => useFocus());
    const element = document.createElement('div');
    element.tabIndex = 0;

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new FocusEvent('focus'));
    });

    expect(result.current.isFocused).toBe(true);
  });

  it('deve lidar com elemento com tabindex negativo', () => {
    const { result } = renderHook(() => useFocus());
    const element = document.createElement('div');
    element.tabIndex = -1;

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new FocusEvent('focus'));
    });

    expect(result.current.isFocused).toBe(true);
  });

  it('deve lidar com elemento com tabindex positivo', () => {
    const { result } = renderHook(() => useFocus());
    const element = document.createElement('div');
    element.tabIndex = 1;

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new FocusEvent('focus'));
    });

    expect(result.current.isFocused).toBe(true);
  });

  it('deve lidar com elemento com tabindex zero', () => {
    const { result } = renderHook(() => useFocus());
    const element = document.createElement('div');
    element.tabIndex = 0;

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new FocusEvent('focus'));
    });

    expect(result.current.isFocused).toBe(true);
  });

  it('deve lidar com elemento com tabindex undefined', () => {
    const { result } = renderHook(() => useFocus());
    const element = document.createElement('div');
    element.tabIndex = undefined;

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new FocusEvent('focus'));
    });

    expect(result.current.isFocused).toBe(true);
  });

  it('deve lidar com elemento com tabindex null', () => {
    const { result } = renderHook(() => useFocus());
    const element = document.createElement('div');
    element.tabIndex = null;

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new FocusEvent('focus'));
    });

    expect(result.current.isFocused).toBe(true);
  });

  it('deve lidar com elemento com tabindex NaN', () => {
    const { result } = renderHook(() => useFocus());
    const element = document.createElement('div');
    element.tabIndex = NaN;

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new FocusEvent('focus'));
    });

    expect(result.current.isFocused).toBe(true);
  });

  it('deve lidar com elemento com tabindex Infinity', () => {
    const { result } = renderHook(() => useFocus());
    const element = document.createElement('div');
    element.tabIndex = Infinity;

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new FocusEvent('focus'));
    });

    expect(result.current.isFocused).toBe(true);
  });

  it('deve lidar com elemento com tabindex -Infinity', () => {
    const { result } = renderHook(() => useFocus());
    const element = document.createElement('div');
    element.tabIndex = -Infinity;

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new FocusEvent('focus'));
    });

    expect(result.current.isFocused).toBe(true);
  });

  it('deve lidar com elemento com tabindex mudando', () => {
    const { result } = renderHook(() => useFocus());
    const element = document.createElement('div');
    element.tabIndex = 0;

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new FocusEvent('focus'));
      element.tabIndex = 1;
      element.dispatchEvent(new FocusEvent('focus'));
    });

    expect(result.current.isFocused).toBe(true);
  });

  it('deve lidar com elemento com tabindex mudando para negativo', () => {
    const { result } = renderHook(() => useFocus());
    const element = document.createElement('div');
    element.tabIndex = 0;

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new FocusEvent('focus'));
      element.tabIndex = -1;
      element.dispatchEvent(new FocusEvent('focus'));
    });

    expect(result.current.isFocused).toBe(true);
  });

  it('deve lidar com elemento com tabindex mudando para zero', () => {
    const { result } = renderHook(() => useFocus());
    const element = document.createElement('div');
    element.tabIndex = 1;

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new FocusEvent('focus'));
      element.tabIndex = 0;
      element.dispatchEvent(new FocusEvent('focus'));
    });

    expect(result.current.isFocused).toBe(true);
  });

  it('deve lidar com elemento com tabindex mudando para undefined', () => {
    const { result } = renderHook(() => useFocus());
    const element = document.createElement('div');
    element.tabIndex = 0;

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new FocusEvent('focus'));
      element.tabIndex = undefined;
      element.dispatchEvent(new FocusEvent('focus'));
    });

    expect(result.current.isFocused).toBe(true);
  });

  it('deve lidar com elemento com tabindex mudando para null', () => {
    const { result } = renderHook(() => useFocus());
    const element = document.createElement('div');
    element.tabIndex = 0;

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new FocusEvent('focus'));
      element.tabIndex = null;
      element.dispatchEvent(new FocusEvent('focus'));
    });

    expect(result.current.isFocused).toBe(true);
  });

  it('deve lidar com elemento com tabindex mudando para NaN', () => {
    const { result } = renderHook(() => useFocus());
    const element = document.createElement('div');
    element.tabIndex = 0;

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new FocusEvent('focus'));
      element.tabIndex = NaN;
      element.dispatchEvent(new FocusEvent('focus'));
    });

    expect(result.current.isFocused).toBe(true);
  });

  it('deve lidar com elemento com tabindex mudando para Infinity', () => {
    const { result } = renderHook(() => useFocus());
    const element = document.createElement('div');
    element.tabIndex = 0;

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new FocusEvent('focus'));
      element.tabIndex = Infinity;
      element.dispatchEvent(new FocusEvent('focus'));
    });

    expect(result.current.isFocused).toBe(true);
  });

  it('deve lidar com elemento com tabindex mudando para -Infinity', () => {
    const { result } = renderHook(() => useFocus());
    const element = document.createElement('div');
    element.tabIndex = 0;

    act(() => {
      result.current.ref.current = element;
      element.dispatchEvent(new FocusEvent('focus'));
      element.tabIndex = -Infinity;
      element.dispatchEvent(new FocusEvent('focus'));
    });

    expect(result.current.isFocused).toBe(true);
  });
}); 
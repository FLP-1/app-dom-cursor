import { renderHook } from '@testing-library/react';
import { useKeyPress } from '../../hooks/useKeyPress';

describe('useKeyPress', () => {
  let mockCallback: jest.Mock;

  beforeEach(() => {
    mockCallback = jest.fn();
  });

  it('deve chamar o callback quando a tecla é pressionada', () => {
    renderHook(() => useKeyPress('a', mockCallback));

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('não deve chamar o callback quando uma tecla diferente é pressionada', () => {
    renderHook(() => useKeyPress('a', mockCallback));

    const event = new KeyboardEvent('keydown', {
      key: 'b',
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('não deve chamar o callback quando o callback é undefined', () => {
    renderHook(() => useKeyPress('a', undefined));

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('deve chamar o callback quando a tecla é pressionada com shift', () => {
    renderHook(() => useKeyPress('Shift+a', mockCallback));

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('deve chamar o callback quando a tecla é pressionada com ctrl', () => {
    renderHook(() => useKeyPress('Control+a', mockCallback));

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('deve chamar o callback quando a tecla é pressionada com alt', () => {
    renderHook(() => useKeyPress('Alt+a', mockCallback));

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      altKey: true,
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('deve chamar o callback quando a tecla é pressionada com meta', () => {
    renderHook(() => useKeyPress('Meta+a', mockCallback));

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      metaKey: true,
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('deve chamar o callback quando a tecla é pressionada com múltiplas teclas modificadoras', () => {
    renderHook(() => useKeyPress('Control+Shift+a', mockCallback));

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      ctrlKey: true,
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('não deve chamar o callback quando a tecla é pressionada sem as teclas modificadoras necessárias', () => {
    renderHook(() => useKeyPress('Control+Shift+a', mockCallback));

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('deve chamar o callback quando a tecla é pressionada com case insensitive', () => {
    renderHook(() => useKeyPress('a', mockCallback));

    const event = new KeyboardEvent('keydown', {
      key: 'A',
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('deve chamar o callback quando a tecla é pressionada com case sensitive', () => {
    renderHook(() => useKeyPress('A', mockCallback));

    const event = new KeyboardEvent('keydown', {
      key: 'A',
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('não deve chamar o callback quando a tecla é pressionada com case sensitive e case errado', () => {
    renderHook(() => useKeyPress('A', mockCallback));

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('deve chamar o callback quando a tecla é pressionada com múltiplas teclas', () => {
    renderHook(() => useKeyPress(['a', 'b'], mockCallback));

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('deve chamar o callback quando a tecla é pressionada com múltiplas teclas e case insensitive', () => {
    renderHook(() => useKeyPress(['a', 'b'], mockCallback));

    const event = new KeyboardEvent('keydown', {
      key: 'A',
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('deve chamar o callback quando a tecla é pressionada com múltiplas teclas e case sensitive', () => {
    renderHook(() => useKeyPress(['A', 'B'], mockCallback));

    const event = new KeyboardEvent('keydown', {
      key: 'A',
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('não deve chamar o callback quando a tecla é pressionada com múltiplas teclas e case sensitive e case errado', () => {
    renderHook(() => useKeyPress(['A', 'B'], mockCallback));

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('deve chamar o callback quando a tecla é pressionada com múltiplas teclas e teclas modificadoras', () => {
    renderHook(() => useKeyPress(['Control+a', 'Control+b'], mockCallback));

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('não deve chamar o callback quando a tecla é pressionada com múltiplas teclas e teclas modificadoras erradas', () => {
    renderHook(() => useKeyPress(['Control+a', 'Control+b'], mockCallback));

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);

    expect(mockCallback).not.toHaveBeenCalled();
  });
}); 
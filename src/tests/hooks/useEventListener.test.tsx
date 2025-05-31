import { renderHook } from '@testing-library/react';
import { useEventListener } from '../../hooks/useEventListener';

describe('useEventListener', () => {
  let mockAddEventListener: jest.Mock;
  let mockRemoveEventListener: jest.Mock;
  let mockCallback: jest.Mock;

  beforeEach(() => {
    mockAddEventListener = jest.fn();
    mockRemoveEventListener = jest.fn();
    mockCallback = jest.fn();

    window.addEventListener = mockAddEventListener;
    window.removeEventListener = mockRemoveEventListener;
    jest.clearAllMocks();
  });

  it('deve adicionar o event listener quando o hook é montado', () => {
    renderHook(() => useEventListener('click', mockCallback));

    expect(mockAddEventListener).toHaveBeenCalledWith(
      'click',
      expect.any(Function),
      undefined
    );
  });

  it('deve remover o event listener quando o hook é desmontado', () => {
    const { unmount } = renderHook(() => useEventListener('click', mockCallback));

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'click',
      expect.any(Function),
      undefined
    );
  });

  it('deve chamar o callback quando o evento é disparado', () => {
    renderHook(() => useEventListener('click', mockCallback));

    const event = new MouseEvent('click');
    const listener = mockAddEventListener.mock.calls[0][1];

    listener(event);

    expect(mockCallback).toHaveBeenCalledWith(event);
  });

  it('deve lidar com diferentes tipos de eventos', () => {
    const events = ['click', 'scroll', 'resize', 'keydown', 'mouseover'];

    events.forEach(eventType => {
      const { unmount } = renderHook(() =>
        useEventListener(eventType, mockCallback)
      );

      expect(mockAddEventListener).toHaveBeenCalledWith(
        eventType,
        expect.any(Function),
        undefined
      );

      unmount();
    });
  });

  it('deve lidar com diferentes elementos', () => {
    const element = document.createElement('div');
    element.addEventListener = mockAddEventListener;
    element.removeEventListener = mockRemoveEventListener;

    const { unmount } = renderHook(() =>
      useEventListener('click', mockCallback, element)
    );

    expect(mockAddEventListener).toHaveBeenCalledWith(
      'click',
      expect.any(Function),
      undefined
    );

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'click',
      expect.any(Function),
      undefined
    );
  });

  it('deve lidar com diferentes opções', () => {
    const options = { capture: true, once: true, passive: true };

    const { unmount } = renderHook(() =>
      useEventListener('click', mockCallback, window, options)
    );

    expect(mockAddEventListener).toHaveBeenCalledWith(
      'click',
      expect.any(Function),
      options
    );

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'click',
      expect.any(Function),
      options
    );
  });

  it('deve lidar com mudanças no callback', () => {
    const { rerender } = renderHook(
      ({ callback }) => useEventListener('click', callback),
      {
        initialProps: { callback: mockCallback }
      }
    );

    const newCallback = jest.fn();
    rerender({ callback: newCallback });

    const event = new MouseEvent('click');
    const listener = mockAddEventListener.mock.calls[0][1];

    listener(event);

    expect(newCallback).toHaveBeenCalledWith(event);
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('deve lidar com mudanças no elemento', () => {
    const element1 = document.createElement('div');
    const element2 = document.createElement('div');

    element1.addEventListener = mockAddEventListener;
    element1.removeEventListener = mockRemoveEventListener;
    element2.addEventListener = mockAddEventListener;
    element2.removeEventListener = mockRemoveEventListener;

    const { rerender } = renderHook(
      ({ element }) => useEventListener('click', mockCallback, element),
      {
        initialProps: { element: element1 }
      }
    );

    rerender({ element: element2 });

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'click',
      expect.any(Function),
      undefined
    );

    expect(mockAddEventListener).toHaveBeenCalledWith(
      'click',
      expect.any(Function),
      undefined
    );
  });

  it('deve lidar com mudanças nas opções', () => {
    const { rerender } = renderHook(
      ({ options }) => useEventListener('click', mockCallback, window, options),
      {
        initialProps: { options: { capture: true } }
      }
    );

    const newOptions = { capture: false };
    rerender({ options: newOptions });

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'click',
      expect.any(Function),
      { capture: true }
    );

    expect(mockAddEventListener).toHaveBeenCalledWith(
      'click',
      expect.any(Function),
      newOptions
    );
  });

  it('deve lidar com callback undefined', () => {
    const { unmount } = renderHook(() => useEventListener('click', undefined));

    expect(mockAddEventListener).not.toHaveBeenCalled();
    unmount();
    expect(mockRemoveEventListener).not.toHaveBeenCalled();
  });

  it('deve lidar com elemento undefined', () => {
    const { unmount } = renderHook(() =>
      useEventListener('click', mockCallback, undefined)
    );

    expect(mockAddEventListener).toHaveBeenCalledWith(
      'click',
      expect.any(Function),
      undefined
    );

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'click',
      expect.any(Function),
      undefined
    );
  });

  it('deve lidar com opções undefined', () => {
    const { unmount } = renderHook(() =>
      useEventListener('click', mockCallback, window, undefined)
    );

    expect(mockAddEventListener).toHaveBeenCalledWith(
      'click',
      expect.any(Function),
      undefined
    );

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'click',
      expect.any(Function),
      undefined
    );
  });

  it('deve lidar com múltiplos event listeners', () => {
    const events = ['click', 'scroll', 'resize'];
    const callbacks = events.map(() => jest.fn());

    const { unmount } = renderHook(() => {
      events.forEach((event, index) => {
        useEventListener(event, callbacks[index]);
      });
    });

    events.forEach((event, index) => {
      expect(mockAddEventListener).toHaveBeenCalledWith(
        event,
        expect.any(Function),
        undefined
      );
    });

    unmount();

    events.forEach((event, index) => {
      expect(mockRemoveEventListener).toHaveBeenCalledWith(
        event,
        expect.any(Function),
        undefined
      );
    });
  });

  it('deve lidar com eventos personalizados', () => {
    const customEvent = new CustomEvent('custom');
    const { result } = renderHook(() => useEventListener('custom', mockCallback));

    const listener = mockAddEventListener.mock.calls[0][1];
    listener(customEvent);

    expect(mockCallback).toHaveBeenCalledWith(customEvent);
  });

  it('deve lidar com eventos de teclado', () => {
    const keyEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    const { result } = renderHook(() => useEventListener('keydown', mockCallback));

    const listener = mockAddEventListener.mock.calls[0][1];
    listener(keyEvent);

    expect(mockCallback).toHaveBeenCalledWith(keyEvent);
  });

  it('deve lidar com eventos de mouse', () => {
    const mouseEvent = new MouseEvent('mouseover', {
      clientX: 100,
      clientY: 200
    });
    const { result } = renderHook(() => useEventListener('mouseover', mockCallback));

    const listener = mockAddEventListener.mock.calls[0][1];
    listener(mouseEvent);

    expect(mockCallback).toHaveBeenCalledWith(mouseEvent);
  });

  it('deve lidar com eventos de toque', () => {
    const touchEvent = new TouchEvent('touchstart', {
      touches: [
        new Touch({
          identifier: 1,
          target: document.createElement('div'),
          clientX: 100,
          clientY: 200
        })
      ]
    });
    const { result } = renderHook(() => useEventListener('touchstart', mockCallback));

    const listener = mockAddEventListener.mock.calls[0][1];
    listener(touchEvent);

    expect(mockCallback).toHaveBeenCalledWith(touchEvent);
  });
}); 
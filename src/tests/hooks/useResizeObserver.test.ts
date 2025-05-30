import { renderHook } from '@testing-library/react-hooks';
import { useResizeObserver } from '../../hooks/useResizeObserver';

describe('useResizeObserver', () => {
  let mockRef: { current: HTMLElement | null };
  let mockCallback: jest.Mock;
  let mockResizeObserver: jest.Mock;
  let mockObserve: jest.Mock;
  let mockUnobserve: jest.Mock;
  let mockDisconnect: jest.Mock;

  beforeEach(() => {
    mockRef = { current: document.createElement('div') };
    mockCallback = jest.fn();
    mockObserve = jest.fn();
    mockUnobserve = jest.fn();
    mockDisconnect = jest.fn();

    mockResizeObserver = jest.fn().mockImplementation((callback) => ({
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
    }));

    window.ResizeObserver = mockResizeObserver;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um ResizeObserver', () => {
    renderHook(() => useResizeObserver(mockRef, mockCallback));

    expect(mockResizeObserver).toHaveBeenCalledWith(expect.any(Function));
  });

  it('deve observar o elemento referenciado', () => {
    renderHook(() => useResizeObserver(mockRef, mockCallback));

    expect(mockObserve).toHaveBeenCalledWith(mockRef.current);
  });

  it('deve chamar o callback quando o elemento é redimensionado', () => {
    renderHook(() => useResizeObserver(mockRef, mockCallback));

    const entries = [
      {
        contentRect: {
          width: 100,
          height: 100,
          top: 0,
          left: 0,
          right: 100,
          bottom: 100,
          x: 0,
          y: 0,
        },
        target: mockRef.current,
      },
    ];

    const observerCallback = mockResizeObserver.mock.calls[0][0];
    observerCallback(entries);

    expect(mockCallback).toHaveBeenCalledWith(entries[0]);
  });

  it('deve lidar com ref nula', () => {
    mockRef.current = null;
    renderHook(() => useResizeObserver(mockRef, mockCallback));

    expect(mockObserve).not.toHaveBeenCalled();
  });

  it('deve lidar com callback undefined', () => {
    renderHook(() => useResizeObserver(mockRef, undefined));

    const entries = [
      {
        contentRect: {
          width: 100,
          height: 100,
          top: 0,
          left: 0,
          right: 100,
          bottom: 100,
          x: 0,
          y: 0,
        },
        target: mockRef.current,
      },
    ];

    const observerCallback = mockResizeObserver.mock.calls[0][0];
    observerCallback(entries);

    // Não deve lançar erro
  });

  it('deve desconectar o observer ao desmontar', () => {
    const { unmount } = renderHook(() => useResizeObserver(mockRef, mockCallback));

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('deve lidar com múltiplas entradas', () => {
    renderHook(() => useResizeObserver(mockRef, mockCallback));

    const entries = [
      {
        contentRect: {
          width: 100,
          height: 100,
          top: 0,
          left: 0,
          right: 100,
          bottom: 100,
          x: 0,
          y: 0,
        },
        target: mockRef.current,
      },
      {
        contentRect: {
          width: 200,
          height: 200,
          top: 0,
          left: 0,
          right: 200,
          bottom: 200,
          x: 0,
          y: 0,
        },
        target: document.createElement('div'),
      },
    ];

    const observerCallback = mockResizeObserver.mock.calls[0][0];
    observerCallback(entries);

    expect(mockCallback).toHaveBeenCalledWith(entries[0]);
  });

  it('deve lidar com diferentes dimensões', () => {
    renderHook(() => useResizeObserver(mockRef, mockCallback));

    const entries = [
      {
        contentRect: {
          width: 0,
          height: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          x: 0,
          y: 0,
        },
        target: mockRef.current,
      },
    ];

    const observerCallback = mockResizeObserver.mock.calls[0][0];
    observerCallback(entries);

    expect(mockCallback).toHaveBeenCalledWith(entries[0]);
  });

  it('deve lidar com diferentes posições', () => {
    renderHook(() => useResizeObserver(mockRef, mockCallback));

    const entries = [
      {
        contentRect: {
          width: 100,
          height: 100,
          top: 50,
          left: 50,
          right: 150,
          bottom: 150,
          x: 50,
          y: 50,
        },
        target: mockRef.current,
      },
    ];

    const observerCallback = mockResizeObserver.mock.calls[0][0];
    observerCallback(entries);

    expect(mockCallback).toHaveBeenCalledWith(entries[0]);
  });

  it('deve lidar com ResizeObserver indisponível', () => {
    const originalResizeObserver = window.ResizeObserver;
    delete window.ResizeObserver;

    renderHook(() => useResizeObserver(mockRef, mockCallback));

    expect(mockCallback).not.toHaveBeenCalled();

    window.ResizeObserver = originalResizeObserver;
  });

  it('deve lidar com entradas vazias', () => {
    renderHook(() => useResizeObserver(mockRef, mockCallback));

    const observerCallback = mockResizeObserver.mock.calls[0][0];
    observerCallback([]);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('deve lidar com entradas undefined', () => {
    renderHook(() => useResizeObserver(mockRef, mockCallback));

    const observerCallback = mockResizeObserver.mock.calls[0][0];
    observerCallback(undefined);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('deve lidar com entradas nulas', () => {
    renderHook(() => useResizeObserver(mockRef, mockCallback));

    const observerCallback = mockResizeObserver.mock.calls[0][0];
    observerCallback(null);

    expect(mockCallback).not.toHaveBeenCalled();
  });
}); 
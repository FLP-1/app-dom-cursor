import { renderHook } from '@testing-library/react';
import { useResizeObserver } from '@/hooks/useResizeObserver';
import { TestWrapper } from '@/tests/utils/TestWrapper';

describe('useResizeObserver', () => {
  const mockResizeObserver = jest.fn();
  const mockDisconnect = jest.fn();
  const mockObserve = jest.fn();
  const mockUnobserve = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    global.ResizeObserver = mockResizeObserver;
    mockResizeObserver.mockImplementation((callback) => ({
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect
    }));
  });

  it('should create ResizeObserver with callback', () => {
    const { result } = renderHook(() => useResizeObserver(), {
      wrapper: TestWrapper
    });

    expect(mockResizeObserver).toHaveBeenCalledWith(expect.any(Function));
    expect(result.current.observer).toBeDefined();
  });

  it('should disconnect observer on unmount', () => {
    const { unmount } = renderHook(() => useResizeObserver(), {
      wrapper: TestWrapper
    });

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('should observe element when ref is set', () => {
    const { result } = renderHook(() => useResizeObserver(), {
      wrapper: TestWrapper
    });

    const element = document.createElement('div');
    result.current.ref.current = element;

    expect(mockObserve).toHaveBeenCalledWith(element);
  });

  it('should unobserve element when ref is cleared', () => {
    const { result } = renderHook(() => useResizeObserver(), {
      wrapper: TestWrapper
    });

    const element = document.createElement('div');
    result.current.ref.current = element;
    result.current.ref.current = null;

    expect(mockUnobserve).toHaveBeenCalledWith(element);
  });
}); 
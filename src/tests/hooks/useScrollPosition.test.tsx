import { renderHook } from '@testing-library/react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { TestWrapper } from '@/tests/utils/TestWrapper';

describe('useScrollPosition', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial position', () => {
    const { result } = renderHook(() => useScrollPosition(), {
      wrapper: TestWrapper
    });

    expect(result.current).toEqual({ x: 0, y: 0 });
  });

  it('should update position on scroll', () => {
    const { result } = renderHook(() => useScrollPosition(), {
      wrapper: TestWrapper
    });

    // Simular evento de scroll
    const scrollEvent = new Event('scroll');
    Object.defineProperty(window, 'scrollX', { value: 100 });
    Object.defineProperty(window, 'scrollY', { value: 200 });
    window.dispatchEvent(scrollEvent);

    expect(result.current).toEqual({ x: 100, y: 200 });
  });

  it('should handle window resize', () => {
    const { result } = renderHook(() => useScrollPosition(), {
      wrapper: TestWrapper
    });

    // Simular evento de resize
    const resizeEvent = new Event('resize');
    Object.defineProperty(window, 'scrollX', { value: 150 });
    Object.defineProperty(window, 'scrollY', { value: 250 });
    window.dispatchEvent(resizeEvent);

    expect(result.current).toEqual({ x: 150, y: 250 });
  });

  it('should cleanup event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useScrollPosition(), {
      wrapper: TestWrapper
    });

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
}); 
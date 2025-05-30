import { renderHook, act } from '@testing-library/react';
import { useScrollPosition } from '../../hooks/useScrollPosition';

describe('useScrollPosition', () => {
  const originalScrollX = window.scrollX;
  const originalScrollY = window.scrollY;
  const originalPageXOffset = window.pageXOffset;
  const originalPageYOffset = window.pageYOffset;

  beforeEach(() => {
    Object.defineProperty(window, 'scrollX', {
      writable: true,
      value: originalScrollX
    });
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: originalScrollY
    });
    Object.defineProperty(window, 'pageXOffset', {
      writable: true,
      value: originalPageXOffset
    });
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      value: originalPageYOffset
    });
  });

  it('deve retornar a posição inicial de scroll', () => {
    const { result } = renderHook(() => useScrollPosition());

    expect(result.current).toEqual({
      x: window.scrollX,
      y: window.scrollY
    });
  });

  it('deve atualizar a posição quando o scroll é alterado', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: 100
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: 200
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: 100,
      y: 200
    });
  });

  it('deve lidar com valores negativos', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: -100
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: -200
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: -100,
      y: -200
    });
  });

  it('deve lidar com valores zero', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: 0
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: 0
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: 0,
      y: 0
    });
  });

  it('deve lidar com valores undefined', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: undefined
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: undefined
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: undefined,
      y: undefined
    });
  });

  it('deve lidar com valores null', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: null
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: null
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: null,
      y: null
    });
  });

  it('deve lidar com valores NaN', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: NaN
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: NaN
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: NaN,
      y: NaN
    });
  });

  it('deve lidar com valores Infinity', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: Infinity
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: Infinity
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: Infinity,
      y: Infinity
    });
  });

  it('deve lidar com valores -Infinity', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: -Infinity
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: -Infinity
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: -Infinity,
      y: -Infinity
    });
  });

  it('deve lidar com valores string', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: '100'
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: '200'
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: '100',
      y: '200'
    });
  });

  it('deve lidar com valores boolean', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: true
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: false
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: true,
      y: false
    });
  });

  it('deve lidar com valores objeto', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: { x: 100 }
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: { y: 200 }
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: { x: 100 },
      y: { y: 200 }
    });
  });

  it('deve lidar com valores array', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: [100]
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: [200]
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: [100],
      y: [200]
    });
  });

  it('deve lidar com valores função', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: () => 100
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: () => 200
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: expect.any(Function),
      y: expect.any(Function)
    });
  });

  it('deve lidar com valores símbolo', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: Symbol('x')
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: Symbol('y')
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: expect.any(Symbol),
      y: expect.any(Symbol)
    });
  });

  it('deve lidar com valores data', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: new Date()
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: new Date()
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: expect.any(Date),
      y: expect.any(Date)
    });
  });

  it('deve lidar com valores regex', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: /x/
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: /y/
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: expect.any(RegExp),
      y: expect.any(RegExp)
    });
  });

  it('deve lidar com valores error', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: new Error('x error')
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: new Error('y error')
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: expect.any(Error),
      y: expect.any(Error)
    });
  });

  it('deve lidar com valores map', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: new Map([['x', 100]])
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: new Map([['y', 200]])
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: expect.any(Map),
      y: expect.any(Map)
    });
  });

  it('deve lidar com valores set', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: new Set([100])
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: new Set([200])
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: expect.any(Set),
      y: expect.any(Set)
    });
  });

  it('deve lidar com valores weakmap', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: new WeakMap()
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: new WeakMap()
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: expect.any(WeakMap),
      y: expect.any(WeakMap)
    });
  });

  it('deve lidar com valores weakset', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: new WeakSet()
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: new WeakSet()
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: expect.any(WeakSet),
      y: expect.any(WeakSet)
    });
  });

  it('deve lidar com valores arraybuffer', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: new ArrayBuffer(8)
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: new ArrayBuffer(8)
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: expect.any(ArrayBuffer),
      y: expect.any(ArrayBuffer)
    });
  });

  it('deve lidar com valores dataview', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: new DataView(new ArrayBuffer(8))
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: new DataView(new ArrayBuffer(8))
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: expect.any(DataView),
      y: expect.any(DataView)
    });
  });

  it('deve lidar com valores int8array', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: new Int8Array(8)
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: new Int8Array(8)
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: expect.any(Int8Array),
      y: expect.any(Int8Array)
    });
  });

  it('deve lidar com valores uint8array', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: new Uint8Array(8)
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: new Uint8Array(8)
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: expect.any(Uint8Array),
      y: expect.any(Uint8Array)
    });
  });

  it('deve lidar com valores uint8clampedarray', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: new Uint8ClampedArray(8)
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: new Uint8ClampedArray(8)
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: expect.any(Uint8ClampedArray),
      y: expect.any(Uint8ClampedArray)
    });
  });

  it('deve lidar com valores int16array', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: new Int16Array(8)
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: new Int16Array(8)
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: expect.any(Int16Array),
      y: expect.any(Int16Array)
    });
  });

  it('deve lidar com valores uint16array', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: new Uint16Array(8)
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: new Uint16Array(8)
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: expect.any(Uint16Array),
      y: expect.any(Uint16Array)
    });
  });

  it('deve lidar com valores int32array', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: new Int32Array(8)
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: new Int32Array(8)
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: expect.any(Int32Array),
      y: expect.any(Int32Array)
    });
  });

  it('deve lidar com valores uint32array', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: new Uint32Array(8)
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: new Uint32Array(8)
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: expect.any(Uint32Array),
      y: expect.any(Uint32Array)
    });
  });

  it('deve lidar com valores float32array', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: new Float32Array(8)
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: new Float32Array(8)
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: expect.any(Float32Array),
      y: expect.any(Float32Array)
    });
  });

  it('deve lidar com valores float64array', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: new Float64Array(8)
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: new Float64Array(8)
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: expect.any(Float64Array),
      y: expect.any(Float64Array)
    });
  });

  it('deve lidar com valores bigint64array', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: new BigInt64Array(8)
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: new BigInt64Array(8)
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: expect.any(BigInt64Array),
      y: expect.any(BigInt64Array)
    });
  });

  it('deve lidar com valores biguint64array', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: new BigUint64Array(8)
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: new BigUint64Array(8)
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: expect.any(BigUint64Array),
      y: expect.any(BigUint64Array)
    });
  });
}); 
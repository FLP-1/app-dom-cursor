import { renderHook, act } from '@testing-library/react';
import { useWindowSize } from '../../hooks/useWindowSize';

describe('useWindowSize', () => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;
  const originalOuterWidth = window.outerWidth;
  const originalOuterHeight = window.outerHeight;

  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: originalInnerWidth
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      value: originalInnerHeight
    });
    Object.defineProperty(window, 'outerWidth', {
      writable: true,
      value: originalOuterWidth
    });
    Object.defineProperty(window, 'outerHeight', {
      writable: true,
      value: originalOuterHeight
    });
  });

  it('deve retornar o tamanho inicial da janela', () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current).toEqual({
      width: window.innerWidth,
      height: window.innerHeight
    });
  });

  it('deve atualizar o tamanho quando a janela é redimensionada', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1024
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: 768
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: 1024,
      height: 768
    });
  });

  it('deve lidar com valores negativos', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: -1024
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: -768
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: -1024,
      height: -768
    });
  });

  it('deve lidar com valores zero', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 0
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: 0
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: 0,
      height: 0
    });
  });

  it('deve lidar com valores undefined', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: undefined
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: undefined
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: undefined,
      height: undefined
    });
  });

  it('deve lidar com valores null', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: null
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: null
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: null,
      height: null
    });
  });

  it('deve lidar com valores NaN', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: NaN
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: NaN
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: NaN,
      height: NaN
    });
  });

  it('deve lidar com valores Infinity', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: Infinity
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: Infinity
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: Infinity,
      height: Infinity
    });
  });

  it('deve lidar com valores -Infinity', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: -Infinity
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: -Infinity
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: -Infinity,
      height: -Infinity
    });
  });

  it('deve lidar com valores string', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: '1024'
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: '768'
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: '1024',
      height: '768'
    });
  });

  it('deve lidar com valores boolean', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: true
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: false
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: true,
      height: false
    });
  });

  it('deve lidar com valores objeto', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: { width: 1024 }
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: { height: 768 }
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: { width: 1024 },
      height: { height: 768 }
    });
  });

  it('deve lidar com valores array', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: [1024]
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: [768]
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: [1024],
      height: [768]
    });
  });

  it('deve lidar com valores função', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: () => 1024
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: () => 768
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: expect.any(Function),
      height: expect.any(Function)
    });
  });

  it('deve lidar com valores símbolo', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: Symbol('width')
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: Symbol('height')
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: expect.any(Symbol),
      height: expect.any(Symbol)
    });
  });

  it('deve lidar com valores data', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: new Date()
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: new Date()
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: expect.any(Date),
      height: expect.any(Date)
    });
  });

  it('deve lidar com valores regex', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: /width/
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: /height/
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: expect.any(RegExp),
      height: expect.any(RegExp)
    });
  });

  it('deve lidar com valores error', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: new Error('width error')
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: new Error('height error')
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: expect.any(Error),
      height: expect.any(Error)
    });
  });

  it('deve lidar com valores map', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: new Map([['width', 1024]])
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: new Map([['height', 768]])
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: expect.any(Map),
      height: expect.any(Map)
    });
  });

  it('deve lidar com valores set', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: new Set([1024])
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: new Set([768])
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: expect.any(Set),
      height: expect.any(Set)
    });
  });

  it('deve lidar com valores weakmap', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: new WeakMap()
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: new WeakMap()
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: expect.any(WeakMap),
      height: expect.any(WeakMap)
    });
  });

  it('deve lidar com valores weakset', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: new WeakSet()
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: new WeakSet()
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: expect.any(WeakSet),
      height: expect.any(WeakSet)
    });
  });

  it('deve lidar com valores arraybuffer', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: new ArrayBuffer(8)
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: new ArrayBuffer(8)
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: expect.any(ArrayBuffer),
      height: expect.any(ArrayBuffer)
    });
  });

  it('deve lidar com valores dataview', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: new DataView(new ArrayBuffer(8))
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: new DataView(new ArrayBuffer(8))
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: expect.any(DataView),
      height: expect.any(DataView)
    });
  });

  it('deve lidar com valores int8array', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: new Int8Array(8)
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: new Int8Array(8)
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: expect.any(Int8Array),
      height: expect.any(Int8Array)
    });
  });

  it('deve lidar com valores uint8array', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: new Uint8Array(8)
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: new Uint8Array(8)
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: expect.any(Uint8Array),
      height: expect.any(Uint8Array)
    });
  });

  it('deve lidar com valores uint8clampedarray', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: new Uint8ClampedArray(8)
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: new Uint8ClampedArray(8)
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: expect.any(Uint8ClampedArray),
      height: expect.any(Uint8ClampedArray)
    });
  });

  it('deve lidar com valores int16array', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: new Int16Array(8)
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: new Int16Array(8)
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: expect.any(Int16Array),
      height: expect.any(Int16Array)
    });
  });

  it('deve lidar com valores uint16array', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: new Uint16Array(8)
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: new Uint16Array(8)
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: expect.any(Uint16Array),
      height: expect.any(Uint16Array)
    });
  });

  it('deve lidar com valores int32array', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: new Int32Array(8)
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: new Int32Array(8)
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: expect.any(Int32Array),
      height: expect.any(Int32Array)
    });
  });

  it('deve lidar com valores uint32array', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: new Uint32Array(8)
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: new Uint32Array(8)
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: expect.any(Uint32Array),
      height: expect.any(Uint32Array)
    });
  });

  it('deve lidar com valores float32array', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: new Float32Array(8)
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: new Float32Array(8)
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: expect.any(Float32Array),
      height: expect.any(Float32Array)
    });
  });

  it('deve lidar com valores float64array', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: new Float64Array(8)
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: new Float64Array(8)
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: expect.any(Float64Array),
      height: expect.any(Float64Array)
    });
  });

  it('deve lidar com valores bigint64array', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: new BigInt64Array(8)
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: new BigInt64Array(8)
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: expect.any(BigInt64Array),
      height: expect.any(BigInt64Array)
    });
  });

  it('deve lidar com valores biguint64array', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: new BigUint64Array(8)
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: new BigUint64Array(8)
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: expect.any(BigUint64Array),
      height: expect.any(BigUint64Array)
    });
  });
}); 
import { renderHook, act } from '@testing-library/react';
import { useScrollDirection } from '../../hooks/useScrollDirection';

describe('useScrollDirection', () => {
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

  it('deve retornar a direção inicial de scroll', () => {
    const { result } = renderHook(() => useScrollDirection());

    expect(result.current).toEqual({
      x: 'none',
      y: 'none'
    });
  });

  it('deve atualizar a direção quando o scroll é alterado para direita', () => {
    const { result } = renderHook(() => useScrollDirection());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: 100
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: 'right',
      y: 'none'
    });
  });

  it('deve atualizar a direção quando o scroll é alterado para esquerda', () => {
    const { result } = renderHook(() => useScrollDirection());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: -100
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: 'left',
      y: 'none'
    });
  });

  it('deve atualizar a direção quando o scroll é alterado para baixo', () => {
    const { result } = renderHook(() => useScrollDirection());

    act(() => {
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: 100
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: 'none',
      y: 'down'
    });
  });

  it('deve atualizar a direção quando o scroll é alterado para cima', () => {
    const { result } = renderHook(() => useScrollDirection());

    act(() => {
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: -100
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: 'none',
      y: 'up'
    });
  });

  it('deve atualizar a direção quando o scroll é alterado para direita e baixo', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'right',
      y: 'down'
    });
  });

  it('deve atualizar a direção quando o scroll é alterado para esquerda e cima', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'left',
      y: 'up'
    });
  });

  it('deve atualizar a direção quando o scroll é alterado para direita e cima', () => {
    const { result } = renderHook(() => useScrollDirection());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: 100
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: -200
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: 'right',
      y: 'up'
    });
  });

  it('deve atualizar a direção quando o scroll é alterado para esquerda e baixo', () => {
    const { result } = renderHook(() => useScrollDirection());

    act(() => {
      Object.defineProperty(window, 'scrollX', {
        writable: true,
        value: -100
      });
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: 200
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({
      x: 'left',
      y: 'down'
    });
  });

  it('deve manter a direção quando o scroll não é alterado', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores undefined', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores null', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores NaN', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores Infinity', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'right',
      y: 'down'
    });
  });

  it('deve lidar com valores -Infinity', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'left',
      y: 'up'
    });
  });

  it('deve lidar com valores string', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'right',
      y: 'down'
    });
  });

  it('deve lidar com valores boolean', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'right',
      y: 'none'
    });
  });

  it('deve lidar com valores objeto', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores array', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores função', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores símbolo', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores data', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores regex', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores error', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores map', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores set', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores weakmap', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores weakset', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores arraybuffer', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores dataview', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores int8array', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores uint8array', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores uint8clampedarray', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores int16array', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores uint16array', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores int32array', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores uint32array', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores float32array', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores float64array', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores bigint64array', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });

  it('deve lidar com valores biguint64array', () => {
    const { result } = renderHook(() => useScrollDirection());

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
      x: 'none',
      y: 'none'
    });
  });
}); 
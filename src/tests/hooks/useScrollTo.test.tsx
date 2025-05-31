import { renderHook } from '@testing-library/react';
import { useScrollTo } from '../../hooks/useScrollTo';

describe('useScrollTo', () => {
  const originalScrollTo = window.scrollTo;

  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
  });

  it('deve chamar scrollTo com as coordenadas corretas', () => {
    const { result } = renderHook(() => useScrollTo());

    result.current(100, 200);

    expect(window.scrollTo).toHaveBeenCalledWith(100, 200);
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado', () => {
    const { result } = renderHook(() => useScrollTo());

    result.current(100, 200);
    result.current(300, 400);

    expect(window.scrollTo).toHaveBeenCalledWith(300, 400);
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para zero', () => {
    const { result } = renderHook(() => useScrollTo());

    result.current(100, 200);
    result.current(0, 0);

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para valores negativos', () => {
    const { result } = renderHook(() => useScrollTo());

    result.current(100, 200);
    result.current(-100, -200);

    expect(window.scrollTo).toHaveBeenCalledWith(-100, -200);
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para valores decimais', () => {
    const { result } = renderHook(() => useScrollTo());

    result.current(100, 200);
    result.current(100.5, 200.5);

    expect(window.scrollTo).toHaveBeenCalledWith(100.5, 200.5);
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para valores muito grandes', () => {
    const { result } = renderHook(() => useScrollTo());

    result.current(100, 200);
    result.current(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);

    expect(window.scrollTo).toHaveBeenCalledWith(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para valores muito pequenos', () => {
    const { result } = renderHook(() => useScrollTo());

    result.current(100, 200);
    result.current(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);

    expect(window.scrollTo).toHaveBeenCalledWith(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para valores infinitos', () => {
    const { result } = renderHook(() => useScrollTo());

    result.current(100, 200);
    result.current(Infinity, Infinity);

    expect(window.scrollTo).toHaveBeenCalledWith(Infinity, Infinity);
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para valores NaN', () => {
    const { result } = renderHook(() => useScrollTo());

    result.current(100, 200);
    result.current(NaN, NaN);

    expect(window.scrollTo).toHaveBeenCalledWith(NaN, NaN);
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para valores undefined', () => {
    const { result } = renderHook(() => useScrollTo());

    result.current(100, 200);
    result.current(undefined, undefined);

    expect(window.scrollTo).toHaveBeenCalledWith(undefined, undefined);
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para valores null', () => {
    const { result } = renderHook(() => useScrollTo());

    result.current(100, 200);
    result.current(null, null);

    expect(window.scrollTo).toHaveBeenCalledWith(null, null);
  });
}); 
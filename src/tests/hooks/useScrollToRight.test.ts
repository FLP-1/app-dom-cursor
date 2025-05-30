import { renderHook } from '@testing-library/react';
import { useScrollToRight } from '../../hooks/useScrollToRight';

describe('useScrollToRight', () => {
  const originalScrollTo = window.scrollTo;

  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
  });

  it('deve chamar scrollTo com as coordenadas corretas', () => {
    const { result } = renderHook(() => useScrollToRight());

    result.current();

    expect(window.scrollTo).toHaveBeenCalledWith(document.documentElement.scrollWidth, 0);
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado', () => {
    const { result } = renderHook(() => useScrollToRight());

    result.current();
    result.current();

    expect(window.scrollTo).toHaveBeenCalledWith(document.documentElement.scrollWidth, 0);
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para undefined', () => {
    const { result } = renderHook(() => useScrollToRight());

    result.current(undefined);

    expect(window.scrollTo).toHaveBeenCalledWith(document.documentElement.scrollWidth, 0);
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para null', () => {
    const { result } = renderHook(() => useScrollToRight());

    result.current(null);

    expect(window.scrollTo).toHaveBeenCalledWith(document.documentElement.scrollWidth, 0);
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para um objeto vazio', () => {
    const { result } = renderHook(() => useScrollToRight());

    result.current({});

    expect(window.scrollTo).toHaveBeenCalledWith(document.documentElement.scrollWidth, 0);
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para um objeto com behavior', () => {
    const { result } = renderHook(() => useScrollToRight());

    result.current({ behavior: 'auto' });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: document.documentElement.scrollWidth,
      behavior: 'auto',
    });
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para um objeto com behavior e block', () => {
    const { result } = renderHook(() => useScrollToRight());

    result.current({ behavior: 'auto', block: 'end' });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: document.documentElement.scrollWidth,
      behavior: 'auto',
    });
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para um objeto com behavior e block undefined', () => {
    const { result } = renderHook(() => useScrollToRight());

    result.current({ behavior: 'auto', block: undefined });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: document.documentElement.scrollWidth,
      behavior: 'auto',
    });
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para um objeto com behavior undefined e block', () => {
    const { result } = renderHook(() => useScrollToRight());

    result.current({ behavior: undefined, block: 'end' });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: document.documentElement.scrollWidth,
      behavior: 'smooth',
    });
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para um objeto com behavior e block null', () => {
    const { result } = renderHook(() => useScrollToRight());

    result.current({ behavior: 'auto', block: null });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: document.documentElement.scrollWidth,
      behavior: 'auto',
    });
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para um objeto com behavior null e block', () => {
    const { result } = renderHook(() => useScrollToRight());

    result.current({ behavior: null, block: 'end' });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: document.documentElement.scrollWidth,
      behavior: 'smooth',
    });
  });
}); 
import { renderHook } from '@testing-library/react';
import { useScrollToCenter } from '../../hooks/useScrollToCenter';

describe('useScrollToCenter', () => {
  const originalScrollTo = window.scrollTo;

  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
  });

  it('deve chamar scrollTo com as coordenadas corretas', () => {
    const { result } = renderHook(() => useScrollToCenter());

    result.current();

    expect(window.scrollTo).toHaveBeenCalledWith(
      document.documentElement.scrollWidth / 2,
      document.documentElement.scrollHeight / 2
    );
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado', () => {
    const { result } = renderHook(() => useScrollToCenter());

    result.current();
    result.current();

    expect(window.scrollTo).toHaveBeenCalledWith(
      document.documentElement.scrollWidth / 2,
      document.documentElement.scrollHeight / 2
    );
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para undefined', () => {
    const { result } = renderHook(() => useScrollToCenter());

    result.current(undefined);

    expect(window.scrollTo).toHaveBeenCalledWith(
      document.documentElement.scrollWidth / 2,
      document.documentElement.scrollHeight / 2
    );
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para null', () => {
    const { result } = renderHook(() => useScrollToCenter());

    result.current(null);

    expect(window.scrollTo).toHaveBeenCalledWith(
      document.documentElement.scrollWidth / 2,
      document.documentElement.scrollHeight / 2
    );
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para um objeto vazio', () => {
    const { result } = renderHook(() => useScrollToCenter());

    result.current({});

    expect(window.scrollTo).toHaveBeenCalledWith(
      document.documentElement.scrollWidth / 2,
      document.documentElement.scrollHeight / 2
    );
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para um objeto com behavior', () => {
    const { result } = renderHook(() => useScrollToCenter());

    result.current({ behavior: 'auto' });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: document.documentElement.scrollHeight / 2,
      left: document.documentElement.scrollWidth / 2,
      behavior: 'auto',
    });
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para um objeto com behavior e block', () => {
    const { result } = renderHook(() => useScrollToCenter());

    result.current({ behavior: 'auto', block: 'end' });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: document.documentElement.scrollHeight / 2,
      left: document.documentElement.scrollWidth / 2,
      behavior: 'auto',
    });
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para um objeto com behavior e block undefined', () => {
    const { result } = renderHook(() => useScrollToCenter());

    result.current({ behavior: 'auto', block: undefined });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: document.documentElement.scrollHeight / 2,
      left: document.documentElement.scrollWidth / 2,
      behavior: 'auto',
    });
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para um objeto com behavior undefined e block', () => {
    const { result } = renderHook(() => useScrollToCenter());

    result.current({ behavior: undefined, block: 'end' });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: document.documentElement.scrollHeight / 2,
      left: document.documentElement.scrollWidth / 2,
      behavior: 'smooth',
    });
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para um objeto com behavior e block null', () => {
    const { result } = renderHook(() => useScrollToCenter());

    result.current({ behavior: 'auto', block: null });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: document.documentElement.scrollHeight / 2,
      left: document.documentElement.scrollWidth / 2,
      behavior: 'auto',
    });
  });

  it('deve chamar scrollTo com as coordenadas corretas quando o valor é alterado para um objeto com behavior null e block', () => {
    const { result } = renderHook(() => useScrollToCenter());

    result.current({ behavior: null, block: 'end' });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: document.documentElement.scrollHeight / 2,
      left: document.documentElement.scrollWidth / 2,
      behavior: 'smooth',
    });
  });
}); 
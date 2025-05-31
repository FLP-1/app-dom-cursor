import { renderHook } from '@testing-library/react';
import { useScrollToElementLeft } from '../../hooks/useScrollToElementLeft';

describe('useScrollToElementLeft', () => {
  const originalScrollIntoView = Element.prototype.scrollIntoView;
  const originalScrollTo = window.scrollTo;

  beforeEach(() => {
    Element.prototype.scrollIntoView = jest.fn();
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    Element.prototype.scrollIntoView = originalScrollIntoView;
    window.scrollTo = originalScrollTo;
  });

  it('deve chamar scrollIntoView com as opções corretas', () => {
    const { result } = renderHook(() => useScrollToElementLeft());
    const element = document.createElement('div');

    result.current(element);

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  });

  it('deve chamar scrollIntoView com as opções corretas quando o valor é alterado', () => {
    const { result } = renderHook(() => useScrollToElementLeft());
    const element = document.createElement('div');

    result.current(element, { behavior: 'auto', block: 'end', inline: 'end' });

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'nearest',
      inline: 'start',
    });
  });

  it('deve chamar scrollIntoView com as opções corretas quando o valor é alterado para undefined', () => {
    const { result } = renderHook(() => useScrollToElementLeft());
    const element = document.createElement('div');

    result.current(element, undefined);

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  });

  it('deve chamar scrollIntoView com as opções corretas quando o valor é alterado para null', () => {
    const { result } = renderHook(() => useScrollToElementLeft());
    const element = document.createElement('div');

    result.current(element, null);

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  });

  it('deve chamar scrollIntoView com as opções corretas quando o valor é alterado para um objeto vazio', () => {
    const { result } = renderHook(() => useScrollToElementLeft());
    const element = document.createElement('div');

    result.current(element, {});

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  });

  it('deve chamar scrollIntoView com as opções corretas quando o valor é alterado para um objeto com behavior', () => {
    const { result } = renderHook(() => useScrollToElementLeft());
    const element = document.createElement('div');

    result.current(element, { behavior: 'auto' });

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'nearest',
      inline: 'start',
    });
  });

  it('deve chamar scrollIntoView com as opções corretas quando o valor é alterado para um objeto com behavior e block', () => {
    const { result } = renderHook(() => useScrollToElementLeft());
    const element = document.createElement('div');

    result.current(element, { behavior: 'auto', block: 'end' });

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'nearest',
      inline: 'start',
    });
  });

  it('deve chamar scrollIntoView com as opções corretas quando o valor é alterado para um objeto com behavior e block undefined', () => {
    const { result } = renderHook(() => useScrollToElementLeft());
    const element = document.createElement('div');

    result.current(element, { behavior: 'auto', block: undefined });

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'nearest',
      inline: 'start',
    });
  });

  it('deve chamar scrollIntoView com as opções corretas quando o valor é alterado para um objeto com behavior undefined e block', () => {
    const { result } = renderHook(() => useScrollToElementLeft());
    const element = document.createElement('div');

    result.current(element, { behavior: undefined, block: 'end' });

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  });

  it('deve chamar scrollIntoView com as opções corretas quando o valor é alterado para um objeto com behavior e block null', () => {
    const { result } = renderHook(() => useScrollToElementLeft());
    const element = document.createElement('div');

    result.current(element, { behavior: 'auto', block: null });

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'nearest',
      inline: 'start',
    });
  });

  it('deve chamar scrollIntoView com as opções corretas quando o valor é alterado para um objeto com behavior null e block', () => {
    const { result } = renderHook(() => useScrollToElementLeft());
    const element = document.createElement('div');

    result.current(element, { behavior: null, block: 'end' });

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  });
}); 
import { renderHook } from '@testing-library/react';
import { useSorting } from '../useSorting';

describe('useSorting', () => {
  it('deve retornar um objeto vazio inicialmente', () => {
    const { result } = renderHook(() => useSorting());
    expect(result.current).toEqual({});
  });

  // Adicione mais testes conforme a implementação do hook for desenvolvida
}); 
import { renderHook, act } from '@testing-library/react-hooks';
import { useSort } from '../../hooks/useSort';

describe('useSort', () => {
  it('deve inicializar com valores padrão', () => {
    const { result } = renderHook(() => useSort());

    expect(result.current.sortField).toBe('');
    expect(result.current.sortDirection).toBe('asc');
  });

  it('deve inicializar com valores personalizados', () => {
    const { result } = renderHook(() => useSort({
      initialField: 'name',
      initialDirection: 'desc'
    }));

    expect(result.current.sortField).toBe('name');
    expect(result.current.sortDirection).toBe('desc');
  });

  it('deve mudar campo de ordenação', () => {
    const { result } = renderHook(() => useSort());

    act(() => {
      result.current.setSortField('email');
    });

    expect(result.current.sortField).toBe('email');
    expect(result.current.sortDirection).toBe('asc'); // Mantém direção padrão
  });

  it('deve mudar direção de ordenação', () => {
    const { result } = renderHook(() => useSort());

    act(() => {
      result.current.setSortDirection('desc');
    });

    expect(result.current.sortDirection).toBe('desc');
  });

  it('deve alternar direção de ordenação', () => {
    const { result } = renderHook(() => useSort());

    act(() => {
      result.current.toggleSortDirection();
    });

    expect(result.current.sortDirection).toBe('desc');

    act(() => {
      result.current.toggleSortDirection();
    });

    expect(result.current.sortDirection).toBe('asc');
  });

  it('deve ordenar por campo', () => {
    const { result } = renderHook(() => useSort());

    act(() => {
      result.current.sortBy('name');
    });

    expect(result.current.sortField).toBe('name');
    expect(result.current.sortDirection).toBe('asc');

    act(() => {
      result.current.sortBy('name'); // Ordena pelo mesmo campo
    });

    expect(result.current.sortField).toBe('name');
    expect(result.current.sortDirection).toBe('desc');
  });

  it('deve resetar ordenação', () => {
    const { result } = renderHook(() => useSort({
      initialField: 'name',
      initialDirection: 'desc'
    }));

    act(() => {
      result.current.resetSort();
    });

    expect(result.current.sortField).toBe('');
    expect(result.current.sortDirection).toBe('asc');
  });

  it('deve manter estado entre re-renderizações', () => {
    const { result, rerender } = renderHook(() => useSort());

    act(() => {
      result.current.sortBy('email');
    });

    rerender();

    expect(result.current.sortField).toBe('email');
    expect(result.current.sortDirection).toBe('asc');
  });

  it('deve lidar com ordenação múltipla', () => {
    const { result } = renderHook(() => useSort());

    act(() => {
      result.current.sortBy('name');
    });

    expect(result.current.sortField).toBe('name');
    expect(result.current.sortDirection).toBe('asc');

    act(() => {
      result.current.sortBy('email');
    });

    expect(result.current.sortField).toBe('email');
    expect(result.current.sortDirection).toBe('asc');
  });

  it('deve lidar com ordenação cíclica', () => {
    const { result } = renderHook(() => useSort());

    act(() => {
      result.current.sortBy('name');
    });

    expect(result.current.sortDirection).toBe('asc');

    act(() => {
      result.current.sortBy('name');
    });

    expect(result.current.sortDirection).toBe('desc');

    act(() => {
      result.current.sortBy('name');
    });

    expect(result.current.sortDirection).toBe('asc');
  });

  it('deve lidar com mudança de campo mantendo direção', () => {
    const { result } = renderHook(() => useSort());

    act(() => {
      result.current.setSortDirection('desc');
      result.current.setSortField('name');
    });

    expect(result.current.sortField).toBe('name');
    expect(result.current.sortDirection).toBe('desc');

    act(() => {
      result.current.setSortField('email');
    });

    expect(result.current.sortField).toBe('email');
    expect(result.current.sortDirection).toBe('desc');
  });

  it('deve lidar com valores inválidos de direção', () => {
    const { result } = renderHook(() => useSort());

    act(() => {
      // @ts-expect-error - Testando comportamento com valor inválido
      result.current.setSortDirection('invalid');
    });

    expect(result.current.sortDirection).toBe('asc');
  });

  it('deve lidar com valores vazios de campo', () => {
    const { result } = renderHook(() => useSort());

    act(() => {
      result.current.setSortField('');
    });

    expect(result.current.sortField).toBe('');
    expect(result.current.sortDirection).toBe('asc');
  });

  it('deve lidar com valores nulos de campo', () => {
    const { result } = renderHook(() => useSort());

    act(() => {
      // @ts-expect-error - Testando comportamento com valor nulo
      result.current.setSortField(null);
    });

    expect(result.current.sortField).toBe('');
  });

  it('deve lidar com valores undefined de campo', () => {
    const { result } = renderHook(() => useSort());

    act(() => {
      // @ts-expect-error - Testando comportamento com valor undefined
      result.current.setSortField(undefined);
    });

    expect(result.current.sortField).toBe('');
  });
}); 
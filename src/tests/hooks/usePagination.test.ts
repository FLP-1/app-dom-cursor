import { renderHook, act } from '@testing-library/react';
import { usePagination } from '../../hooks/usePagination';

describe('usePagination', () => {
  const mockTotalItems = 100;
  const mockInitialPage = 1;
  const mockInitialPageSize = 10;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve inicializar com valores padrão', () => {
    const { result } = renderHook(() => usePagination());

    expect(result.current.page).toBe(1);
    expect(result.current.pageSize).toBe(10);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPages).toBe(0);
  });

  it('deve inicializar com valores personalizados', () => {
    const { result } = renderHook(() => usePagination({
      initialPage: mockInitialPage,
      initialPageSize: mockInitialPageSize,
      totalItems: mockTotalItems
    }));

    expect(result.current.page).toBe(mockInitialPage);
    expect(result.current.pageSize).toBe(mockInitialPageSize);
    expect(result.current.totalItems).toBe(mockTotalItems);
    expect(result.current.totalPages).toBe(Math.ceil(mockTotalItems / mockInitialPageSize));
  });

  it('deve mudar de página', () => {
    const { result } = renderHook(() => usePagination({
      totalItems: mockTotalItems
    }));

    act(() => {
      result.current.setPage(2);
    });

    expect(result.current.page).toBe(2);
  });

  it('deve mudar o tamanho da página', () => {
    const { result } = renderHook(() => usePagination({
      totalItems: mockTotalItems
    }));

    act(() => {
      result.current.setPageSize(20);
    });

    expect(result.current.pageSize).toBe(20);
    expect(result.current.totalPages).toBe(Math.ceil(mockTotalItems / 20));
  });

  it('deve atualizar o total de itens', () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.setTotalItems(mockTotalItems);
    });

    expect(result.current.totalItems).toBe(mockTotalItems);
    expect(result.current.totalPages).toBe(Math.ceil(mockTotalItems / result.current.pageSize));
  });

  it('deve resetar para a primeira página ao mudar o tamanho da página', () => {
    const { result } = renderHook(() => usePagination({
      initialPage: 3,
      totalItems: mockTotalItems
    }));

    act(() => {
      result.current.setPageSize(20);
    });

    expect(result.current.page).toBe(1);
  });

  it('deve limitar a página ao total de páginas', () => {
    const { result } = renderHook(() => usePagination({
      totalItems: mockTotalItems,
      initialPageSize: 10
    }));

    act(() => {
      result.current.setPage(20); // Total de páginas é 10
    });

    expect(result.current.page).toBe(10);
  });

  it('deve limitar a página a 1 quando total de itens é 0', () => {
    const { result } = renderHook(() => usePagination({
      initialPage: 5,
      totalItems: 0
    }));

    expect(result.current.page).toBe(1);
  });

  it('deve calcular corretamente o total de páginas', () => {
    const { result } = renderHook(() => usePagination({
      totalItems: 25,
      initialPageSize: 10
    }));

    expect(result.current.totalPages).toBe(3); // 25 itens / 10 por página = 3 páginas
  });

  it('deve retornar os índices dos itens da página atual', () => {
    const { result } = renderHook(() => usePagination({
      totalItems: 25,
      initialPageSize: 10,
      initialPage: 2
    }));

    expect(result.current.pageStartIndex).toBe(10);
    expect(result.current.pageEndIndex).toBe(19);
  });

  it('deve retornar os índices corretos para a última página', () => {
    const { result } = renderHook(() => usePagination({
      totalItems: 25,
      initialPageSize: 10,
      initialPage: 3
    }));

    expect(result.current.pageStartIndex).toBe(20);
    expect(result.current.pageEndIndex).toBe(24);
  });

  it('deve retornar os índices corretos quando não há itens', () => {
    const { result } = renderHook(() => usePagination({
      totalItems: 0
    }));

    expect(result.current.pageStartIndex).toBe(0);
    expect(result.current.pageEndIndex).toBe(0);
  });

  it('deve retornar os índices corretos quando a página está vazia', () => {
    const { result } = renderHook(() => usePagination({
      totalItems: 5,
      initialPageSize: 10,
      initialPage: 2
    }));

    expect(result.current.pageStartIndex).toBe(10);
    expect(result.current.pageEndIndex).toBe(4);
  });

  it('deve chamar onPageChange quando a página é alterada', () => {
    const mockOnPageChange = jest.fn();
    const { result } = renderHook(() => usePagination({
      onPageChange: mockOnPageChange
    }));

    act(() => {
      result.current.setPage(2);
    });

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('deve chamar onPageSizeChange quando o tamanho da página é alterado', () => {
    const mockOnPageSizeChange = jest.fn();
    const { result } = renderHook(() => usePagination({
      onPageSizeChange: mockOnPageSizeChange
    }));

    act(() => {
      result.current.setPageSize(20);
    });

    expect(mockOnPageSizeChange).toHaveBeenCalledWith(20);
  });

  it('deve chamar onTotalItemsChange quando o total de itens é alterado', () => {
    const mockOnTotalItemsChange = jest.fn();
    const { result } = renderHook(() => usePagination({
      onTotalItemsChange: mockOnTotalItemsChange
    }));

    act(() => {
      result.current.setTotalItems(50);
    });

    expect(mockOnTotalItemsChange).toHaveBeenCalledWith(50);
  });

  it('deve resetar para a primeira página ao chamar reset', () => {
    const { result } = renderHook(() => usePagination({
      initialPage: 3,
      initialPageSize: 20
    }));

    act(() => {
      result.current.reset();
    });

    expect(result.current.page).toBe(1);
    expect(result.current.pageSize).toBe(10); // Volta para o valor padrão
  });

  it('deve manter o tamanho da página ao chamar reset com keepPageSize', () => {
    const { result } = renderHook(() => usePagination({
      initialPage: 3,
      initialPageSize: 20
    }));

    act(() => {
      result.current.reset(true);
    });

    expect(result.current.page).toBe(1);
    expect(result.current.pageSize).toBe(20); // Mantém o tamanho da página
  });
}); 
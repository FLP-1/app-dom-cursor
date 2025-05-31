import { renderHook, act } from '@testing-library/react';
import { useFilter } from '../../hooks/useFilter';

describe('useFilter', () => {
  const mockInitialFilters = {
    nome: 'João',
    email: 'joao@email.com',
    status: 'ativo'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve inicializar com valores padrão', () => {
    const { result } = renderHook(() => useFilter());

    expect(result.current.filters).toEqual({});
  });

  it('deve inicializar com valores personalizados', () => {
    const { result } = renderHook(() => useFilter({
      initialFilters: mockInitialFilters
    }));

    expect(result.current.filters).toEqual(mockInitialFilters);
  });

  it('deve adicionar um filtro', () => {
    const { result } = renderHook(() => useFilter());

    act(() => {
      result.current.setFilter('nome', 'Maria');
    });

    expect(result.current.filters).toEqual({ nome: 'Maria' });
  });

  it('deve atualizar um filtro existente', () => {
    const { result } = renderHook(() => useFilter({
      initialFilters: mockInitialFilters
    }));

    act(() => {
      result.current.setFilter('nome', 'Maria');
    });

    expect(result.current.filters).toEqual({
      ...mockInitialFilters,
      nome: 'Maria'
    });
  });

  it('deve remover um filtro', () => {
    const { result } = renderHook(() => useFilter({
      initialFilters: mockInitialFilters
    }));

    act(() => {
      result.current.removeFilter('nome');
    });

    expect(result.current.filters).toEqual({
      email: 'joao@email.com',
      status: 'ativo'
    });
  });

  it('deve limpar todos os filtros', () => {
    const { result } = renderHook(() => useFilter({
      initialFilters: mockInitialFilters
    }));

    act(() => {
      result.current.clearFilters();
    });

    expect(result.current.filters).toEqual({});
  });

  it('deve resetar para valores iniciais', () => {
    const { result } = renderHook(() => useFilter({
      initialFilters: mockInitialFilters
    }));

    act(() => {
      result.current.setFilter('nome', 'Maria');
      result.current.setFilter('email', 'maria@email.com');
      result.current.reset();
    });

    expect(result.current.filters).toEqual(mockInitialFilters);
  });

  it('deve chamar onFilterChange quando um filtro é alterado', () => {
    const mockOnFilterChange = jest.fn();
    const { result } = renderHook(() => useFilter({
      onFilterChange: mockOnFilterChange
    }));

    act(() => {
      result.current.setFilter('nome', 'Maria');
    });

    expect(mockOnFilterChange).toHaveBeenCalledWith({ nome: 'Maria' });
  });

  it('deve chamar onFilterChange quando um filtro é removido', () => {
    const mockOnFilterChange = jest.fn();
    const { result } = renderHook(() => useFilter({
      initialFilters: mockInitialFilters,
      onFilterChange: mockOnFilterChange
    }));

    act(() => {
      result.current.removeFilter('nome');
    });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      email: 'joao@email.com',
      status: 'ativo'
    });
  });

  it('deve chamar onFilterChange quando os filtros são limpos', () => {
    const mockOnFilterChange = jest.fn();
    const { result } = renderHook(() => useFilter({
      initialFilters: mockInitialFilters,
      onFilterChange: mockOnFilterChange
    }));

    act(() => {
      result.current.clearFilters();
    });

    expect(mockOnFilterChange).toHaveBeenCalledWith({});
  });

  it('deve lidar com filtros nulos', () => {
    const { result } = renderHook(() => useFilter());

    act(() => {
      result.current.setFilter('nome', null);
    });

    expect(result.current.filters).toEqual({ nome: null });
  });

  it('deve lidar com filtros undefined', () => {
    const { result } = renderHook(() => useFilter());

    act(() => {
      result.current.setFilter('nome', undefined);
    });

    expect(result.current.filters).toEqual({});
  });

  it('deve lidar com filtros vazios', () => {
    const { result } = renderHook(() => useFilter());

    act(() => {
      result.current.setFilter('nome', '');
    });

    expect(result.current.filters).toEqual({ nome: '' });
  });

  it('deve lidar com múltiplos filtros', () => {
    const { result } = renderHook(() => useFilter());

    act(() => {
      result.current.setFilter('nome', 'Maria');
      result.current.setFilter('email', 'maria@email.com');
      result.current.setFilter('status', 'inativo');
    });

    expect(result.current.filters).toEqual({
      nome: 'Maria',
      email: 'maria@email.com',
      status: 'inativo'
    });
  });

  it('deve lidar com filtros aninhados', () => {
    const { result } = renderHook(() => useFilter());

    act(() => {
      result.current.setFilter('endereco.cep', '12345-678');
      result.current.setFilter('endereco.rua', 'Rua Principal');
    });

    expect(result.current.filters).toEqual({
      'endereco.cep': '12345-678',
      'endereco.rua': 'Rua Principal'
    });
  });

  it('deve lidar com filtros de array', () => {
    const { result } = renderHook(() => useFilter());

    act(() => {
      result.current.setFilter('tags', ['urgente', 'importante']);
    });

    expect(result.current.filters).toEqual({
      tags: ['urgente', 'importante']
    });
  });

  it('deve lidar com filtros de data', () => {
    const { result } = renderHook(() => useFilter());

    const data = new Date('2024-01-01');

    act(() => {
      result.current.setFilter('dataInicio', data);
    });

    expect(result.current.filters).toEqual({
      dataInicio: data
    });
  });

  it('deve lidar com filtros booleanos', () => {
    const { result } = renderHook(() => useFilter());

    act(() => {
      result.current.setFilter('ativo', true);
    });

    expect(result.current.filters).toEqual({
      ativo: true
    });
  });

  it('deve lidar com filtros numéricos', () => {
    const { result } = renderHook(() => useFilter());

    act(() => {
      result.current.setFilter('idade', 25);
    });

    expect(result.current.filters).toEqual({
      idade: 25
    });
  });
}); 
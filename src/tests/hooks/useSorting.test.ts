import { renderHook, act } from '@testing-library/react';
import { useSorting } from '../../hooks/useSorting';

describe('useSorting', () => {
  const mockInitialField = 'nome';
  const mockInitialDirection = 'asc' as const;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve inicializar com valores padrão', () => {
    const { result } = renderHook(() => useSorting());

    expect(result.current.field).toBe('');
    expect(result.current.direction).toBe('asc');
  });

  it('deve inicializar com valores personalizados', () => {
    const { result } = renderHook(() => useSorting({
      initialField: mockInitialField,
      initialDirection: mockInitialDirection
    }));

    expect(result.current.field).toBe(mockInitialField);
    expect(result.current.direction).toBe(mockInitialDirection);
  });

  it('deve mudar o campo de ordenação', () => {
    const { result } = renderHook(() => useSorting());

    act(() => {
      result.current.setField('email');
    });

    expect(result.current.field).toBe('email');
  });

  it('deve mudar a direção da ordenação', () => {
    const { result } = renderHook(() => useSorting());

    act(() => {
      result.current.setDirection('desc');
    });

    expect(result.current.direction).toBe('desc');
  });

  it('deve alternar a direção da ordenação', () => {
    const { result } = renderHook(() => useSorting({
      initialField: mockInitialField,
      initialDirection: 'asc'
    }));

    act(() => {
      result.current.toggleDirection();
    });

    expect(result.current.direction).toBe('desc');

    act(() => {
      result.current.toggleDirection();
    });

    expect(result.current.direction).toBe('asc');
  });

  it('deve ordenar por um novo campo', () => {
    const { result } = renderHook(() => useSorting({
      initialField: mockInitialField,
      initialDirection: mockInitialDirection
    }));

    act(() => {
      result.current.sort('email');
    });

    expect(result.current.field).toBe('email');
    expect(result.current.direction).toBe('asc');
  });

  it('deve alternar a direção ao ordenar pelo mesmo campo', () => {
    const { result } = renderHook(() => useSorting({
      initialField: mockInitialField,
      initialDirection: mockInitialDirection
    }));

    act(() => {
      result.current.sort(mockInitialField);
    });

    expect(result.current.field).toBe(mockInitialField);
    expect(result.current.direction).toBe('desc');
  });

  it('deve resetar para valores padrão', () => {
    const { result } = renderHook(() => useSorting({
      initialField: mockInitialField,
      initialDirection: 'desc'
    }));

    act(() => {
      result.current.reset();
    });

    expect(result.current.field).toBe('');
    expect(result.current.direction).toBe('asc');
  });

  it('deve resetar para valores iniciais', () => {
    const { result } = renderHook(() => useSorting({
      initialField: mockInitialField,
      initialDirection: mockInitialDirection
    }));

    act(() => {
      result.current.setField('email');
      result.current.setDirection('desc');
      result.current.reset();
    });

    expect(result.current.field).toBe(mockInitialField);
    expect(result.current.direction).toBe(mockInitialDirection);
  });

  it('deve chamar onSortChange quando a ordenação é alterada', () => {
    const mockOnSortChange = jest.fn();
    const { result } = renderHook(() => useSorting({
      onSortChange: mockOnSortChange
    }));

    act(() => {
      result.current.sort('email');
    });

    expect(mockOnSortChange).toHaveBeenCalledWith({
      field: 'email',
      direction: 'asc'
    });
  });

  it('deve chamar onSortChange ao alternar a direção', () => {
    const mockOnSortChange = jest.fn();
    const { result } = renderHook(() => useSorting({
      initialField: mockInitialField,
      initialDirection: mockInitialDirection,
      onSortChange: mockOnSortChange
    }));

    act(() => {
      result.current.toggleDirection();
    });

    expect(mockOnSortChange).toHaveBeenCalledWith({
      field: mockInitialField,
      direction: 'desc'
    });
  });

  it('deve retornar o objeto de ordenação atual', () => {
    const { result } = renderHook(() => useSorting({
      initialField: mockInitialField,
      initialDirection: mockInitialDirection
    }));

    expect(result.current.sorting).toEqual({
      field: mockInitialField,
      direction: mockInitialDirection
    });
  });

  it('deve atualizar o objeto de ordenação ao mudar o campo', () => {
    const { result } = renderHook(() => useSorting());

    act(() => {
      result.current.setField('email');
    });

    expect(result.current.sorting).toEqual({
      field: 'email',
      direction: 'asc'
    });
  });

  it('deve atualizar o objeto de ordenação ao mudar a direção', () => {
    const { result } = renderHook(() => useSorting());

    act(() => {
      result.current.setDirection('desc');
    });

    expect(result.current.sorting).toEqual({
      field: '',
      direction: 'desc'
    });
  });

  it('deve manter a direção ao mudar para um campo diferente', () => {
    const { result } = renderHook(() => useSorting({
      initialDirection: 'desc'
    }));

    act(() => {
      result.current.setField('email');
    });

    expect(result.current.direction).toBe('desc');
  });

  it('deve lidar com campos vazios', () => {
    const { result } = renderHook(() => useSorting({
      initialField: mockInitialField
    }));

    act(() => {
      result.current.setField('');
    });

    expect(result.current.field).toBe('');
    expect(result.current.direction).toBe('asc');
  });

  it('deve lidar com direções inválidas', () => {
    const { result } = renderHook(() => useSorting());

    act(() => {
      result.current.setDirection('invalid' as any);
    });

    expect(result.current.direction).toBe('asc');
  });
}); 
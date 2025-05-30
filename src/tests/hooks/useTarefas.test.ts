import { renderHook, act } from '@testing-library/react';
import { useTarefas } from '../../hooks/useTarefas';

describe('useTarefas', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('deve retornar o estado inicial corretamente', () => {
    const { result } = renderHook(() => useTarefas());

    expect(result.current.tarefas).toEqual([]);
    expect(result.current.filtros).toEqual({});
    expect(result.current.loading).toBe(true);
  });

  it('deve carregar tarefas ao montar', async () => {
    const { result } = renderHook(() => useTarefas());

    expect(result.current.loading).toBe(true);

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.tarefas).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it('deve atualizar filtros e recarregar tarefas', async () => {
    const { result } = renderHook(() => useTarefas());

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    const novosFiltros = {
      status: 'PENDENTE',
      prioridade: 'ALTA',
      responsavelId: '123',
      busca: 'teste'
    };

    act(() => {
      result.current.setFiltros(novosFiltros);
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.filtros).toEqual(novosFiltros);

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.loading).toBe(false);
  });

  it('deve lidar com filtros undefined', async () => {
    const { result } = renderHook(() => useTarefas());

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    act(() => {
      result.current.setFiltros(undefined as any);
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.filtros).toEqual({});

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.loading).toBe(false);
  });

  it('deve lidar com filtros null', async () => {
    const { result } = renderHook(() => useTarefas());

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    act(() => {
      result.current.setFiltros(null as any);
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.filtros).toEqual({});

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.loading).toBe(false);
  });

  it('deve lidar com filtros vazios', async () => {
    const { result } = renderHook(() => useTarefas());

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    act(() => {
      result.current.setFiltros({});
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.filtros).toEqual({});

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.loading).toBe(false);
  });

  it('deve lidar com filtros parciais', async () => {
    const { result } = renderHook(() => useTarefas());

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    const filtrosParciais = {
      status: 'PENDENTE'
    };

    act(() => {
      result.current.setFiltros(filtrosParciais);
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.filtros).toEqual(filtrosParciais);

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.loading).toBe(false);
  });

  it('deve lidar com filtros inválidos', async () => {
    const { result } = renderHook(() => useTarefas());

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    const filtrosInvalidos = {
      status: 'INVALIDO' as any,
      prioridade: 'INVALIDO' as any,
      responsavelId: 123 as any,
      busca: 123 as any
    };

    act(() => {
      result.current.setFiltros(filtrosInvalidos);
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.filtros).toEqual(filtrosInvalidos);

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.loading).toBe(false);
  });

  it('deve lidar com filtros com valores vazios', async () => {
    const { result } = renderHook(() => useTarefas());

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    const filtrosVazios = {
      status: '',
      prioridade: '',
      responsavelId: '',
      busca: ''
    };

    act(() => {
      result.current.setFiltros(filtrosVazios);
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.filtros).toEqual(filtrosVazios);

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.loading).toBe(false);
  });

  it('deve lidar com filtros com valores muito longos', async () => {
    const { result } = renderHook(() => useTarefas());

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    const filtrosLongos = {
      status: 'PENDENTE'.repeat(100),
      prioridade: 'ALTA'.repeat(100),
      responsavelId: '123'.repeat(100),
      busca: 'teste'.repeat(100)
    };

    act(() => {
      result.current.setFiltros(filtrosLongos);
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.filtros).toEqual(filtrosLongos);

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.loading).toBe(false);
  });

  it('deve lidar com filtros com valores especiais', async () => {
    const { result } = renderHook(() => useTarefas());

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    const filtrosEspeciais = {
      status: '!@#$%^&*()',
      prioridade: '!@#$%^&*()',
      responsavelId: '!@#$%^&*()',
      busca: '!@#$%^&*()'
    };

    act(() => {
      result.current.setFiltros(filtrosEspeciais);
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.filtros).toEqual(filtrosEspeciais);

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.loading).toBe(false);
  });
}); 
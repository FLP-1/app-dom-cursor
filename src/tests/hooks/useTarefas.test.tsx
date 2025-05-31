import { renderHook, act } from '@testing-library/react';
import { useTarefas } from '@/hooks/useTarefas';
import { TarefaService } from '@/services/TarefaService';
import { TestWrapper } from '@/tests/utils/TestWrapper';
import { TestTarefa, TestFiltros } from '@/tests/types';

jest.mock('@/services/TarefaService');

describe('useTarefas', () => {
  const mockTarefa: TestTarefa = {
    id: '1',
    titulo: 'Teste',
    descricao: 'Descrição teste',
    status: 'PENDENTE',
    prioridade: 'ALTA',
    responsavelId: '1',
    dataCriacao: new Date(),
    dataVencimento: new Date(),
    dataConclusao: null
  };

  const mockFiltros: TestFiltros = {
    status: 'PENDENTE',
    prioridade: 'ALTA',
    responsavelId: '1',
    busca: 'teste'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set filters correctly', () => {
    const { result } = renderHook(() => useTarefas(), {
      wrapper: TestWrapper
    });

    act(() => {
      result.current.setFiltros(mockFiltros);
    });

    expect(result.current.filtros).toEqual(mockFiltros);
  });

  it('should handle undefined filters', () => {
    const { result } = renderHook(() => useTarefas(), {
      wrapper: TestWrapper
    });

    act(() => {
      result.current.setFiltros(undefined as unknown as TestFiltros);
    });

    expect(result.current.filtros).toEqual({});
  });

  it('should handle null filters', () => {
    const { result } = renderHook(() => useTarefas(), {
      wrapper: TestWrapper
    });

    act(() => {
      result.current.setFiltros(null as unknown as TestFiltros);
    });

    expect(result.current.filtros).toEqual({});
  });

  it('should handle invalid filter values', () => {
    const { result } = renderHook(() => useTarefas(), {
      wrapper: TestWrapper
    });

    act(() => {
      result.current.setFiltros({
        status: 'INVALIDO' as unknown as 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA',
        prioridade: 'INVALIDO' as unknown as 'BAIXA' | 'MEDIA' | 'ALTA',
        responsavelId: '123',
        busca: 'teste'
      });
    });

    expect(result.current.filtros).toEqual({
      status: 'INVALIDO',
      prioridade: 'INVALIDO',
      responsavelId: '123',
      busca: 'teste'
    });
  });

  it('should load tasks successfully', async () => {
    const mockGetTarefas = jest.spyOn(TarefaService, 'getTarefas').mockResolvedValueOnce([mockTarefa]);

    const { result } = renderHook(() => useTarefas(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.carregarTarefas();
    });

    expect(mockGetTarefas).toHaveBeenCalled();
    expect(result.current.tarefas).toEqual([mockTarefa]);
  });

  it('should handle error when loading tasks', async () => {
    const mockGetTarefas = jest.spyOn(TarefaService, 'getTarefas').mockRejectedValueOnce(new Error('Erro ao carregar tarefas'));

    const { result } = renderHook(() => useTarefas(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.carregarTarefas()).rejects.toThrow('Erro ao carregar tarefas');
    });

    expect(mockGetTarefas).toHaveBeenCalled();
    expect(result.current.tarefas).toEqual([]);
  });
}); 
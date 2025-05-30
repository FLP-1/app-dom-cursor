import { renderHook, act } from '@testing-library/react';
import { useEsocialEventList } from '../../hooks/useEsocialEventList';
import { EsocialEventService } from '../../services/esocial-event.service';

jest.mock('../../services/esocial-event.service');

describe('useEsocialEventList', () => {
  const mockEventos = [
    { id: 1, tipo: 'S-1000', status: 'PENDENTE' },
    { id: 2, tipo: 'S-2200', status: 'PROCESSADO' }
  ];

  const mockTipos = [
    { codigo: 'S-1000', descricao: 'Informações do Empregador' },
    { codigo: 'S-2200', descricao: 'Cadastro de Trabalhador' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (EsocialEventService.list as jest.Mock).mockResolvedValue(mockEventos);
    (EsocialEventService.listTypes as jest.Mock).mockResolvedValue(mockTipos);
  });

  it('deve retornar o estado inicial corretamente', () => {
    const { result } = renderHook(() => useEsocialEventList());

    expect(result.current.eventos).toEqual([]);
    expect(result.current.tipos).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.filtros).toEqual({});
  });

  it('deve carregar eventos e tipos ao montar', async () => {
    const { result } = renderHook(() => useEsocialEventList());

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(EsocialEventService.list).toHaveBeenCalledWith({});
    expect(EsocialEventService.listTypes).toHaveBeenCalled();
    expect(result.current.eventos).toEqual(mockEventos);
    expect(result.current.tipos).toEqual(mockTipos);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('deve atualizar eventos quando os filtros mudam', async () => {
    const { result } = renderHook(() => useEsocialEventList());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const novosFiltros = { status: 'PENDENTE' };

    await act(async () => {
      result.current.setFiltros(novosFiltros);
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(EsocialEventService.list).toHaveBeenCalledWith(novosFiltros);
    expect(result.current.filtros).toEqual(novosFiltros);
  });

  it('deve lidar com erro ao carregar eventos', async () => {
    const mockError = new Error('Erro ao carregar eventos');
    (EsocialEventService.list as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useEsocialEventList());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.error).toBe('Erro ao carregar eventos do eSocial.');
    expect(result.current.loading).toBe(false);
    expect(result.current.eventos).toEqual([]);
  });

  it('deve lidar com erro ao carregar tipos', async () => {
    const mockError = new Error('Erro ao carregar tipos');
    (EsocialEventService.listTypes as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useEsocialEventList());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.error).toBe('Erro ao carregar eventos do eSocial.');
    expect(result.current.loading).toBe(false);
    expect(result.current.tipos).toEqual([]);
  });

  it('deve atualizar eventos manualmente', async () => {
    const { result } = renderHook(() => useEsocialEventList());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const novosEventos = [
      { id: 3, tipo: 'S-2300', status: 'PENDENTE' }
    ];

    (EsocialEventService.list as jest.Mock).mockResolvedValueOnce(novosEventos);

    await act(async () => {
      result.current.atualizar();
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.eventos).toEqual(novosEventos);
    expect(result.current.loading).toBe(false);
  });

  it('deve manter o estado de loading durante a requisição', async () => {
    let resolveRequest: (value: any) => void;
    const requestPromise = new Promise(resolve => {
      resolveRequest = resolve;
    });

    (EsocialEventService.list as jest.Mock).mockReturnValueOnce(requestPromise);

    const { result } = renderHook(() => useEsocialEventList());

    expect(result.current.loading).toBe(true);

    await act(async () => {
      resolveRequest(mockEventos);
      await requestPromise;
    });

    expect(result.current.loading).toBe(false);
  });

  it('deve lidar com resposta vazia de eventos', async () => {
    (EsocialEventService.list as jest.Mock).mockResolvedValueOnce([]);

    const { result } = renderHook(() => useEsocialEventList());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.eventos).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it('deve lidar com resposta vazia de tipos', async () => {
    (EsocialEventService.listTypes as jest.Mock).mockResolvedValueOnce([]);

    const { result } = renderHook(() => useEsocialEventList());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.tipos).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it('deve lidar com resposta undefined de eventos', async () => {
    (EsocialEventService.list as jest.Mock).mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useEsocialEventList());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.eventos).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it('deve lidar com resposta undefined de tipos', async () => {
    (EsocialEventService.listTypes as jest.Mock).mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useEsocialEventList());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.tipos).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it('deve lidar com resposta null de eventos', async () => {
    (EsocialEventService.list as jest.Mock).mockResolvedValueOnce(null);

    const { result } = renderHook(() => useEsocialEventList());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.eventos).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it('deve lidar com resposta null de tipos', async () => {
    (EsocialEventService.listTypes as jest.Mock).mockResolvedValueOnce(null);

    const { result } = renderHook(() => useEsocialEventList());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.tipos).toEqual([]);
    expect(result.current.loading).toBe(false);
  });
}); 
import { renderHook, act } from '@testing-library/react';
import { useEsocialEventList } from '@/hooks/useEsocialEventList';
import { EsocialEventService } from '@/services/EsocialEventService';
import { TestWrapper } from '@/tests/utils/TestWrapper';
import { TestEvent } from '@/tests/types';

jest.mock('@/services/EsocialEventService');

describe('useEsocialEventList', () => {
  const mockEvent: TestEvent = {
    id: '1',
    tipo: 'S2206',
    data: new Date(),
    status: 'PENDENTE',
    payload: {
      cpf: '12345678900',
      data: new Date(),
      dataInicioAviso: new Date(),
      dataFimAviso: new Date(),
      motivoAviso: 'DISPENSA_SEM_JUSTA_CAUSA',
      observacao: 'Aviso prévio iniciado'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load events successfully', async () => {
    const mockGetEvents = jest.spyOn(EsocialEventService, 'getEvents').mockResolvedValueOnce([mockEvent]);

    const { result } = renderHook(() => useEsocialEventList(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.carregarEventos();
    });

    expect(mockGetEvents).toHaveBeenCalled();
    expect(result.current.eventos).toEqual([mockEvent]);
  });

  it('should handle error when loading events', async () => {
    const mockGetEvents = jest.spyOn(EsocialEventService, 'getEvents').mockRejectedValueOnce(new Error('Erro ao carregar eventos'));

    const { result } = renderHook(() => useEsocialEventList(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.carregarEventos()).rejects.toThrow('Erro ao carregar eventos');
    });

    expect(mockGetEvents).toHaveBeenCalled();
    expect(result.current.eventos).toEqual([]);
  });

  it('should filter events by type', async () => {
    const mockGetEvents = jest.spyOn(EsocialEventService, 'getEvents').mockResolvedValueOnce([mockEvent]);

    const { result } = renderHook(() => useEsocialEventList(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.carregarEventos();
      result.current.setFiltroTipo('S2206');
    });

    expect(result.current.eventosFiltrados).toEqual([mockEvent]);
  });

  it('should filter events by status', async () => {
    const mockGetEvents = jest.spyOn(EsocialEventService, 'getEvents').mockResolvedValueOnce([mockEvent]);

    const { result } = renderHook(() => useEsocialEventList(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.carregarEventos();
      result.current.setFiltroStatus('PENDENTE');
    });

    expect(result.current.eventosFiltrados).toEqual([mockEvent]);
  });

  it('should filter events by date range', async () => {
    const mockGetEvents = jest.spyOn(EsocialEventService, 'getEvents').mockResolvedValueOnce([mockEvent]);

    const { result } = renderHook(() => useEsocialEventList(), {
      wrapper: TestWrapper
    });

    const dataInicio = new Date('2024-01-01');
    const dataFim = new Date('2024-12-31');

    await act(async () => {
      await result.current.carregarEventos();
      result.current.setFiltroDataInicio(dataInicio);
      result.current.setFiltroDataFim(dataFim);
    });

    expect(result.current.eventosFiltrados).toEqual([mockEvent]);
  });

  it('should clear filters', async () => {
    const mockGetEvents = jest.spyOn(EsocialEventService, 'getEvents').mockResolvedValueOnce([mockEvent]);

    const { result } = renderHook(() => useEsocialEventList(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.carregarEventos();
      result.current.setFiltroTipo('S2206');
      result.current.setFiltroStatus('PENDENTE');
      result.current.limparFiltros();
    });

    expect(result.current.filtroTipo).toBe('');
    expect(result.current.filtroStatus).toBe('');
    expect(result.current.filtroDataInicio).toBeNull();
    expect(result.current.filtroDataFim).toBeNull();
    expect(result.current.eventosFiltrados).toEqual([mockEvent]);
  });
}); 
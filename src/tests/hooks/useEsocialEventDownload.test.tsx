import { renderHook, act } from '@testing-library/react';
import { useEsocialEventDownload } from '@/hooks/useEsocialEventDownload';
import { EsocialEventService } from '@/services/EsocialEventService';
import { TestWrapper } from '@/tests/utils/TestWrapper';
import { TestEvent } from '@/tests/types';

jest.mock('@/services/EsocialEventService');

describe('useEsocialEventDownload', () => {
  const mockEvent: TestEvent = {
    id: '1',
    tipo: 'S2206',
    data: new Date(),
    status: 'PROCESSADO',
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

  it('should download event successfully', async () => {
    const mockDownload = jest.spyOn(EsocialEventService, 'download').mockResolvedValueOnce({
      url: 'https://example.com/download/1',
      nome: 'evento-1.xml'
    });

    const { result } = renderHook(() => useEsocialEventDownload(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.downloadEvento(mockEvent);
    });

    expect(mockDownload).toHaveBeenCalledWith(mockEvent.id);
    expect(result.current.isDownloading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle download error', async () => {
    const mockDownload = jest.spyOn(EsocialEventService, 'download').mockRejectedValueOnce(new Error('Erro ao baixar evento'));

    const { result } = renderHook(() => useEsocialEventDownload(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.downloadEvento(mockEvent)).rejects.toThrow('Erro ao baixar evento');
    });

    expect(mockDownload).toHaveBeenCalledWith(mockEvent.id);
    expect(result.current.isDownloading).toBe(false);
    expect(result.current.error).toBe('Erro ao baixar evento');
  });

  it('should handle download of invalid event', async () => {
    const invalidEvent = {
      ...mockEvent,
      id: ''
    };

    const { result } = renderHook(() => useEsocialEventDownload(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.downloadEvento(invalidEvent as TestEvent)).rejects.toThrow('Evento inválido');
    });

    expect(result.current.isDownloading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle download of not processed event', async () => {
    const notProcessedEvent = {
      ...mockEvent,
      status: 'PENDENTE'
    };

    const { result } = renderHook(() => useEsocialEventDownload(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.downloadEvento(notProcessedEvent)).rejects.toThrow('Evento não processado');
    });

    expect(result.current.isDownloading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should clear error', async () => {
    const mockDownload = jest.spyOn(EsocialEventService, 'download').mockRejectedValueOnce(new Error('Erro ao baixar evento'));

    const { result } = renderHook(() => useEsocialEventDownload(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.downloadEvento(mockEvent)).rejects.toThrow('Erro ao baixar evento');
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
}); 
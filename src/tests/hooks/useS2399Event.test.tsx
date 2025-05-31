import { renderHook, act } from '@testing-library/react';
import { useS2399Event } from '@/hooks/useS2399Event';
import { EsocialEventService } from '@/services/EsocialEventService';
import { TipoEventoEsocial } from '@/types/esocial';

jest.mock('@/services/EsocialEventService');

describe('useS2399Event', () => {
  const mockEvent = {
    id: '1',
    tipo: TipoEventoEsocial.S2399,
    data: new Date(),
    status: 'PENDENTE',
    payload: {
      cpf: '12345678900',
      dataDesligamento: new Date(),
      motivoDesligamento: 'PEDIDO_DEMISSAO',
      observacao: 'Desligamento solicitado pelo trabalhador'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um evento S2399 com sucesso', async () => {
    const { result } = renderHook(() => useS2399Event());

    await act(async () => {
      await result.current.createEvent(mockEvent.payload);
    });

    expect(EsocialEventService.create).toHaveBeenCalledWith({
      tipo: TipoEventoEsocial.S2399,
      payload: mockEvent.payload
    });
  });

  it('deve atualizar um evento S2399 com sucesso', async () => {
    const { result } = renderHook(() => useS2399Event());

    await act(async () => {
      await result.current.updateEvent(mockEvent.id, mockEvent.payload);
    });

    expect(EsocialEventService.update).toHaveBeenCalledWith(
      mockEvent.id,
      mockEvent.payload
    );
  });

  it('deve validar os dados do evento S2399 corretamente', async () => {
    const { result } = renderHook(() => useS2399Event());

    const validationResult = await act(async () => {
      return result.current.validateEventData(mockEvent.payload);
    });

    expect(validationResult.success).toBe(true);
  });

  it('deve retornar erro ao validar dados inválidos', async () => {
    const { result } = renderHook(() => useS2399Event());

    const invalidData = {
      ...mockEvent.payload,
      cpf: '123' // CPF inválido
    };

    const validationResult = await act(async () => {
      return result.current.validateEventData(invalidData);
    });

    expect(validationResult.success).toBe(false);
  });
}); 
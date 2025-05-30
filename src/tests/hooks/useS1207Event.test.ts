import { renderHook, act } from '@testing-library/react';
import { useS1207Event } from '@/hooks/useS1207Event';
import { EsocialEventService } from '@/services/EsocialEventService';
import { TipoEventoEsocial } from '@/types/esocial';

jest.mock('@/services/EsocialEventService');

describe('useS1207Event', () => {
  const mockEvent = {
    id: '1',
    tipo: TipoEventoEsocial.S1207,
    data: new Date(),
    status: 'PENDENTE',
    payload: {
      cpf: '12345678900',
      dataInicioBeneficio: new Date(),
      tipoBeneficio: 'AUXILIO_DOENCA',
      valorBeneficio: 1000,
      dataFimBeneficio: null,
      motivoFimBeneficio: '',
      observacao: 'Benefício concedido por 15 dias'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um evento S1207 com sucesso', async () => {
    const { result } = renderHook(() => useS1207Event());

    await act(async () => {
      await result.current.createEvent(mockEvent.payload);
    });

    expect(EsocialEventService.create).toHaveBeenCalledWith({
      tipo: TipoEventoEsocial.S1207,
      payload: mockEvent.payload
    });
  });

  it('deve atualizar um evento S1207 com sucesso', async () => {
    const { result } = renderHook(() => useS1207Event());

    await act(async () => {
      await result.current.updateEvent(mockEvent.id, mockEvent.payload);
    });

    expect(EsocialEventService.update).toHaveBeenCalledWith(
      mockEvent.id,
      mockEvent.payload
    );
  });

  it('deve validar os dados do evento S1207 corretamente', async () => {
    const { result } = renderHook(() => useS1207Event());

    const validationResult = await act(async () => {
      return result.current.validateEventData(mockEvent.payload);
    });

    expect(validationResult.success).toBe(true);
  });

  it('deve retornar erro ao validar dados inválidos', async () => {
    const { result } = renderHook(() => useS1207Event());

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
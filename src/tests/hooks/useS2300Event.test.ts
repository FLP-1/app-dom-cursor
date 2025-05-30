import { renderHook, act } from '@testing-library/react';
import { useS2300Event } from '@/hooks/useS2300Event';
import { EsocialEventService } from '@/services/EsocialEventService';
import { TipoEventoEsocial } from '@/types/esocial';

jest.mock('@/services/EsocialEventService');

describe('useS2300Event', () => {
  const mockEvent = {
    id: '1',
    tipo: TipoEventoEsocial.S2300,
    data: new Date(),
    status: 'PENDENTE',
    payload: {
      cpf: '12345678900',
      nome: 'João da Silva',
      dataNascimento: new Date('1990-01-01'),
      sexo: 'M',
      pis: '12345678900',
      dataInicio: new Date(),
      tipoTrabalhador: 'AVULSO',
      cargo: 'Diarista',
      valorHora: 50,
      cargaHoraria: 40
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um evento S2300 com sucesso', async () => {
    const { result } = renderHook(() => useS2300Event());

    await act(async () => {
      await result.current.createEvent(mockEvent.payload);
    });

    expect(EsocialEventService.create).toHaveBeenCalledWith({
      tipo: TipoEventoEsocial.S2300,
      payload: mockEvent.payload
    });
  });

  it('deve atualizar um evento S2300 com sucesso', async () => {
    const { result } = renderHook(() => useS2300Event());

    await act(async () => {
      await result.current.updateEvent(mockEvent.id, mockEvent.payload);
    });

    expect(EsocialEventService.update).toHaveBeenCalledWith(
      mockEvent.id,
      mockEvent.payload
    );
  });

  it('deve validar os dados do evento S2300 corretamente', async () => {
    const { result } = renderHook(() => useS2300Event());

    const validationResult = await act(async () => {
      return result.current.validateEventData(mockEvent.payload);
    });

    expect(validationResult.success).toBe(true);
  });

  it('deve retornar erro ao validar dados inválidos', async () => {
    const { result } = renderHook(() => useS2300Event());

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
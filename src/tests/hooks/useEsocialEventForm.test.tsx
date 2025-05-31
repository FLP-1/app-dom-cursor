import { renderHook, act } from '@testing-library/react';
import { useEsocialEventForm } from '@/hooks/useEsocialEventForm';
import { EsocialEventService } from '@/services/EsocialEventService';
import { TestWrapper } from '@/tests/utils/TestWrapper';
import { TestEvent } from '@/tests/types';

jest.mock('@/services/EsocialEventService');

describe('useEsocialEventForm', () => {
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

  it('should initialize form with default values', () => {
    const { result } = renderHook(() => useEsocialEventForm(), {
      wrapper: TestWrapper
    });

    expect(result.current.form.getValues()).toEqual({
      tipo: '',
      payload: {}
    });
  });

  it('should initialize form with event data', () => {
    const { result } = renderHook(() => useEsocialEventForm(mockEvent), {
      wrapper: TestWrapper
    });

    expect(result.current.form.getValues()).toEqual({
      tipo: mockEvent.tipo,
      payload: mockEvent.payload
    });
  });

  it('should handle form submission successfully', async () => {
    const mockCreate = jest.spyOn(EsocialEventService, 'create').mockResolvedValueOnce(mockEvent);

    const { result } = renderHook(() => useEsocialEventForm(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.form.setValue('tipo', 'S2206');
      await result.current.form.setValue('payload', mockEvent.payload);
      await result.current.handleSubmit();
    });

    expect(mockCreate).toHaveBeenCalledWith({
      tipo: 'S2206',
      payload: mockEvent.payload
    });
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle form submission error', async () => {
    const mockCreate = jest.spyOn(EsocialEventService, 'create').mockRejectedValueOnce(new Error('Erro ao criar evento'));

    const { result } = renderHook(() => useEsocialEventForm(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.form.setValue('tipo', 'S2206');
      await result.current.form.setValue('payload', mockEvent.payload);
      await expect(result.current.handleSubmit()).rejects.toThrow('Erro ao criar evento');
    });

    expect(mockCreate).toHaveBeenCalled();
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.error).toBe('Erro ao criar evento');
  });

  it('should handle form update successfully', async () => {
    const mockUpdate = jest.spyOn(EsocialEventService, 'update').mockResolvedValueOnce(mockEvent);

    const { result } = renderHook(() => useEsocialEventForm(mockEvent), {
      wrapper: TestWrapper
    });

    const updatedPayload = {
      ...mockEvent.payload,
      observacao: 'Aviso prévio atualizado'
    };

    await act(async () => {
      await result.current.form.setValue('payload', updatedPayload);
      await result.current.handleSubmit();
    });

    expect(mockUpdate).toHaveBeenCalledWith(mockEvent.id, {
      tipo: mockEvent.tipo,
      payload: updatedPayload
    });
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle form update error', async () => {
    const mockUpdate = jest.spyOn(EsocialEventService, 'update').mockRejectedValueOnce(new Error('Erro ao atualizar evento'));

    const { result } = renderHook(() => useEsocialEventForm(mockEvent), {
      wrapper: TestWrapper
    });

    const updatedPayload = {
      ...mockEvent.payload,
      observacao: 'Aviso prévio atualizado'
    };

    await act(async () => {
      await result.current.form.setValue('payload', updatedPayload);
      await expect(result.current.handleSubmit()).rejects.toThrow('Erro ao atualizar evento');
    });

    expect(mockUpdate).toHaveBeenCalled();
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.error).toBe('Erro ao atualizar evento');
  });

  it('should reset form', async () => {
    const { result } = renderHook(() => useEsocialEventForm(mockEvent), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.form.setValue('payload', {
        ...mockEvent.payload,
        observacao: 'Aviso prévio atualizado'
      });
      result.current.resetForm();
    });

    expect(result.current.form.getValues()).toEqual({
      tipo: mockEvent.tipo,
      payload: mockEvent.payload
    });
    expect(result.current.error).toBeNull();
  });
}); 
import { renderHook, act } from '@testing-library/react';
import { useNotification } from '../useNotification';
import { notificationService } from '../../services/NotificationService';

// Mock do NotificationService
jest.mock('../../services/NotificationService', () => ({
  notificationService: {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
    info: jest.fn(),
    custom: jest.fn()
  }
}));

describe('useNotification', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve inicializar com estado vazio', () => {
    const { result } = renderHook(() => useNotification());

    expect(result.current.notification).toBeNull();
    expect(result.current.showNotification).toBeDefined();
    expect(result.current.hideNotification).toBeDefined();
  });

  it('deve mostrar notificação de sucesso', () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.showNotification({
        type: 'success',
        message: 'Operação realizada com sucesso!'
      });
    });

    expect(result.current.notification).toEqual({
      type: 'success',
      message: 'Operação realizada com sucesso!'
    });
  });

  it('deve mostrar notificação de erro', () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.showNotification({
        type: 'error',
        message: 'Ocorreu um erro!'
      });
    });

    expect(result.current.notification).toEqual({
      type: 'error',
      message: 'Ocorreu um erro!'
    });
  });

  it('deve esconder notificação', () => {
    const { result } = renderHook(() => useNotification());

    // Primeiro mostra uma notificação
    act(() => {
      result.current.showNotification({
        type: 'success',
        message: 'Teste'
      });
    });

    expect(result.current.notification).toBeTruthy();

    // Depois esconde
    act(() => {
      result.current.hideNotification();
    });

    expect(result.current.notification).toBeNull();
  });

  it('deve manter estado entre re-renderizações', () => {
    const { result, rerender } = renderHook(() => useNotification());

    act(() => {
      result.current.showNotification({
        type: 'success',
        message: 'Teste'
      });
    });

    rerender();

    expect(result.current.notification).toEqual({
      type: 'success',
      message: 'Teste'
    });
  });

  it('deve chamar success do notificationService', () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.success('Mensagem de sucesso', 'Título', 5000);
    });

    expect(notificationService.success).toHaveBeenCalledWith(
      'Mensagem de sucesso',
      'Título',
      5000
    );
  });

  it('deve chamar error do notificationService', () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.error('Mensagem de erro', 'Título', 0);
    });

    expect(notificationService.error).toHaveBeenCalledWith(
      'Mensagem de erro',
      'Título',
      0
    );
  });

  it('deve chamar warning do notificationService', () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.warning('Mensagem de aviso', 'Título', 5000);
    });

    expect(notificationService.warning).toHaveBeenCalledWith(
      'Mensagem de aviso',
      'Título',
      5000
    );
  });

  it('deve chamar info do notificationService', () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.info('Mensagem informativa', 'Título', 3000);
    });

    expect(notificationService.info).toHaveBeenCalledWith(
      'Mensagem informativa',
      'Título',
      3000
    );
  });

  it('deve chamar custom do notificationService', () => {
    const { result } = renderHook(() => useNotification());

    const customNotification = {
      type: 'success' as const,
      title: 'Título',
      message: 'Mensagem',
      priority: 'high' as const,
      duration: 5000,
      action: {
        label: 'Ação',
        onClick: jest.fn()
      }
    };

    act(() => {
      result.current.custom(customNotification);
    });

    expect(notificationService.custom).toHaveBeenCalledWith(customNotification);
  });

  it('deve usar valores padrão quando não fornecidos', () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.success('Mensagem de sucesso');
    });

    expect(notificationService.success).toHaveBeenCalledWith(
      'Mensagem de sucesso',
      'Sucesso',
      5000
    );

    act(() => {
      result.current.error('Mensagem de erro');
    });

    expect(notificationService.error).toHaveBeenCalledWith(
      'Mensagem de erro',
      'Erro',
      0
    );

    act(() => {
      result.current.warning('Mensagem de aviso');
    });

    expect(notificationService.warning).toHaveBeenCalledWith(
      'Mensagem de aviso',
      'Atenção',
      5000
    );

    act(() => {
      result.current.info('Mensagem informativa');
    });

    expect(notificationService.info).toHaveBeenCalledWith(
      'Mensagem informativa',
      'Informação',
      3000
    );
  });
}); 
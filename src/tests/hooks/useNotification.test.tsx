import { renderHook, act } from '@testing-library/react-hooks';
import { useNotification } from '../../hooks/useNotification';
import { notificationService } from '../../services/notification.service';

jest.mock('../../services/notification.service');

describe('useNotification', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve mostrar notificação de sucesso', () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.showSuccess('Operação realizada com sucesso');
    });

    expect(notificationService.showSuccess).toHaveBeenCalledWith('Operação realizada com sucesso');
  });

  it('deve mostrar notificação de erro', () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.showError('Ocorreu um erro');
    });

    expect(notificationService.showError).toHaveBeenCalledWith('Ocorreu um erro');
  });

  it('deve mostrar notificação de aviso', () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.showWarning('Atenção');
    });

    expect(notificationService.showWarning).toHaveBeenCalledWith('Atenção');
  });

  it('deve mostrar notificação de informação', () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.showInfo('Informação importante');
    });

    expect(notificationService.showInfo).toHaveBeenCalledWith('Informação importante');
  });

  it('deve mostrar notificação com duração personalizada', () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.showSuccess('Mensagem', { duration: 5000 });
    });

    expect(notificationService.showSuccess).toHaveBeenCalledWith('Mensagem', { duration: 5000 });
  });

  it('deve mostrar notificação com posição personalizada', () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.showSuccess('Mensagem', { position: 'top-right' });
    });

    expect(notificationService.showSuccess).toHaveBeenCalledWith('Mensagem', { position: 'top-right' });
  });

  it('deve mostrar notificação com ação personalizada', () => {
    const { result } = renderHook(() => useNotification());
    const action = jest.fn();

    act(() => {
      result.current.showSuccess('Mensagem', { action });
    });

    expect(notificationService.showSuccess).toHaveBeenCalledWith('Mensagem', { action });
  });

  it('deve mostrar notificação com múltiplas opções', () => {
    const { result } = renderHook(() => useNotification());
    const action = jest.fn();

    act(() => {
      result.current.showSuccess('Mensagem', {
        duration: 5000,
        position: 'top-right',
        action
      });
    });

    expect(notificationService.showSuccess).toHaveBeenCalledWith('Mensagem', {
      duration: 5000,
      position: 'top-right',
      action
    });
  });

  it('deve limpar todas as notificações', () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.clearAll();
    });

    expect(notificationService.clearAll).toHaveBeenCalled();
  });

  it('deve limpar notificação específica', () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.clear('notification-id');
    });

    expect(notificationService.clear).toHaveBeenCalledWith('notification-id');
  });

  it('deve lidar com erro ao mostrar notificação', () => {
    const { result } = renderHook(() => useNotification());
    const error = new Error('Erro ao mostrar notificação');

    (notificationService.showError as jest.Mock).mockImplementationOnce(() => {
      throw error;
    });

    act(() => {
      result.current.showError('Mensagem de erro');
    });

    expect(notificationService.showError).toHaveBeenCalledWith('Mensagem de erro');
  });

  it('deve lidar com erro ao limpar notificação', () => {
    const { result } = renderHook(() => useNotification());
    const error = new Error('Erro ao limpar notificação');

    (notificationService.clear as jest.Mock).mockImplementationOnce(() => {
      throw error;
    });

    act(() => {
      result.current.clear('notification-id');
    });

    expect(notificationService.clear).toHaveBeenCalledWith('notification-id');
  });

  it('deve lidar com erro ao limpar todas as notificações', () => {
    const { result } = renderHook(() => useNotification());
    const error = new Error('Erro ao limpar todas as notificações');

    (notificationService.clearAll as jest.Mock).mockImplementationOnce(() => {
      throw error;
    });

    act(() => {
      result.current.clearAll();
    });

    expect(notificationService.clearAll).toHaveBeenCalled();
  });
}); 
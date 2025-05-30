import { renderHook, act } from '@testing-library/react-hooks';
import { useConfirmDialog } from '../../hooks/useConfirmDialog';

describe('useConfirmDialog', () => {
  it('deve inicializar com estado fechado', () => {
    const { result } = renderHook(() => useConfirmDialog());

    expect(result.current.isOpen).toBeFalsy();
    expect(result.current.title).toBe('');
    expect(result.current.message).toBe('');
    expect(result.current.confirmText).toBe('Confirmar');
    expect(result.current.cancelText).toBe('Cancelar');
    expect(result.current.onConfirm).toBeUndefined();
    expect(result.current.onCancel).toBeUndefined();
  });

  it('deve abrir diálogo com configurações padrão', () => {
    const { result } = renderHook(() => useConfirmDialog());

    act(() => {
      result.current.open({
        title: 'Confirmação',
        message: 'Deseja confirmar esta ação?'
      });
    });

    expect(result.current.isOpen).toBeTruthy();
    expect(result.current.title).toBe('Confirmação');
    expect(result.current.message).toBe('Deseja confirmar esta ação?');
    expect(result.current.confirmText).toBe('Confirmar');
    expect(result.current.cancelText).toBe('Cancelar');
  });

  it('deve abrir diálogo com configurações personalizadas', () => {
    const { result } = renderHook(() => useConfirmDialog());
    const onConfirm = jest.fn();
    const onCancel = jest.fn();

    act(() => {
      result.current.open({
        title: 'Excluir',
        message: 'Tem certeza que deseja excluir?',
        confirmText: 'Sim, excluir',
        cancelText: 'Não',
        onConfirm,
        onCancel
      });
    });

    expect(result.current.isOpen).toBeTruthy();
    expect(result.current.title).toBe('Excluir');
    expect(result.current.message).toBe('Tem certeza que deseja excluir?');
    expect(result.current.confirmText).toBe('Sim, excluir');
    expect(result.current.cancelText).toBe('Não');
    expect(result.current.onConfirm).toBe(onConfirm);
    expect(result.current.onCancel).toBe(onCancel);
  });

  it('deve fechar diálogo', () => {
    const { result } = renderHook(() => useConfirmDialog());

    act(() => {
      result.current.open({
        title: 'Confirmação',
        message: 'Deseja confirmar esta ação?'
      });
    });

    expect(result.current.isOpen).toBeTruthy();

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBeFalsy();
  });

  it('deve chamar onConfirm ao confirmar', () => {
    const { result } = renderHook(() => useConfirmDialog());
    const onConfirm = jest.fn();

    act(() => {
      result.current.open({
        title: 'Confirmação',
        message: 'Deseja confirmar esta ação?',
        onConfirm
      });
    });

    act(() => {
      result.current.handleConfirm();
    });

    expect(onConfirm).toHaveBeenCalled();
    expect(result.current.isOpen).toBeFalsy();
  });

  it('deve chamar onCancel ao cancelar', () => {
    const { result } = renderHook(() => useConfirmDialog());
    const onCancel = jest.fn();

    act(() => {
      result.current.open({
        title: 'Confirmação',
        message: 'Deseja confirmar esta ação?',
        onCancel
      });
    });

    act(() => {
      result.current.handleCancel();
    });

    expect(onCancel).toHaveBeenCalled();
    expect(result.current.isOpen).toBeFalsy();
  });

  it('deve fechar diálogo ao confirmar mesmo sem onConfirm', () => {
    const { result } = renderHook(() => useConfirmDialog());

    act(() => {
      result.current.open({
        title: 'Confirmação',
        message: 'Deseja confirmar esta ação?'
      });
    });

    act(() => {
      result.current.handleConfirm();
    });

    expect(result.current.isOpen).toBeFalsy();
  });

  it('deve fechar diálogo ao cancelar mesmo sem onCancel', () => {
    const { result } = renderHook(() => useConfirmDialog());

    act(() => {
      result.current.open({
        title: 'Confirmação',
        message: 'Deseja confirmar esta ação?'
      });
    });

    act(() => {
      result.current.handleCancel();
    });

    expect(result.current.isOpen).toBeFalsy();
  });

  it('deve manter estado entre re-renderizações', () => {
    const { result, rerender } = renderHook(() => useConfirmDialog());

    act(() => {
      result.current.open({
        title: 'Confirmação',
        message: 'Deseja confirmar esta ação?'
      });
    });

    rerender();

    expect(result.current.isOpen).toBeTruthy();
    expect(result.current.title).toBe('Confirmação');
    expect(result.current.message).toBe('Deseja confirmar esta ação?');
  });

  it('deve limpar callbacks ao fechar diálogo', () => {
    const { result } = renderHook(() => useConfirmDialog());
    const onConfirm = jest.fn();
    const onCancel = jest.fn();

    act(() => {
      result.current.open({
        title: 'Confirmação',
        message: 'Deseja confirmar esta ação?',
        onConfirm,
        onCancel
      });
    });

    act(() => {
      result.current.close();
    });

    expect(result.current.onConfirm).toBeUndefined();
    expect(result.current.onCancel).toBeUndefined();
  });

  it('deve lidar com múltiplas aberturas e fechamentos', () => {
    const { result } = renderHook(() => useConfirmDialog());
    const onConfirm1 = jest.fn();
    const onConfirm2 = jest.fn();

    act(() => {
      result.current.open({
        title: 'Confirmação 1',
        message: 'Primeira confirmação',
        onConfirm: onConfirm1
      });
    });

    act(() => {
      result.current.close();
    });

    act(() => {
      result.current.open({
        title: 'Confirmação 2',
        message: 'Segunda confirmação',
        onConfirm: onConfirm2
      });
    });

    act(() => {
      result.current.handleConfirm();
    });

    expect(onConfirm1).not.toHaveBeenCalled();
    expect(onConfirm2).toHaveBeenCalled();
    expect(result.current.isOpen).toBeFalsy();
  });
}); 
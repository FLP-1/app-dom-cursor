import { renderHook, act } from '@testing-library/react-hooks';
import { useConfirmDialog } from '@/hooks/useConfirmDialog';

describe('useConfirmDialog', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useConfirmDialog());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.title).toBe('');
    expect(result.current.message).toBe('');
    expect(result.current.confirmLabel).toBe('Confirmar');
    expect(result.current.cancelLabel).toBe('Cancelar');
  });

  it('should initialize with custom values', () => {
    const options = {
      title: 'Título',
      message: 'Mensagem',
      confirmLabel: 'Sim',
      cancelLabel: 'Não',
    };

    const { result } = renderHook(() => useConfirmDialog(options));

    expect(result.current.title).toBe(options.title);
    expect(result.current.message).toBe(options.message);
    expect(result.current.confirmLabel).toBe(options.confirmLabel);
    expect(result.current.cancelLabel).toBe(options.cancelLabel);
  });

  it('should open dialog and execute confirm callback', async () => {
    const onConfirm = jest.fn();
    const { result } = renderHook(() => useConfirmDialog());

    act(() => {
      result.current.showConfirmDialog(onConfirm);
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.handleConfirm();
    });

    expect(onConfirm).toHaveBeenCalled();
    expect(result.current.isOpen).toBe(false);
  });

  it('should open dialog and execute cancel callback', async () => {
    const onCancel = jest.fn();
    const { result } = renderHook(() => useConfirmDialog());

    act(() => {
      result.current.showConfirmDialog(jest.fn(), onCancel);
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.handleCancel();
    });

    expect(onCancel).toHaveBeenCalled();
    expect(result.current.isOpen).toBe(false);
  });

  it('should close dialog without callbacks', () => {
    const { result } = renderHook(() => useConfirmDialog());

    act(() => {
      result.current.showConfirmDialog();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.handleCancel();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('should handle multiple confirmations', () => {
    const onConfirm1 = jest.fn();
    const onConfirm2 = jest.fn();
    const { result } = renderHook(() => useConfirmDialog());

    act(() => {
      result.current.showConfirmDialog(onConfirm1);
    });

    act(() => {
      result.current.handleConfirm();
    });

    expect(onConfirm1).toHaveBeenCalled();

    act(() => {
      result.current.showConfirmDialog(onConfirm2);
    });

    act(() => {
      result.current.handleConfirm();
    });

    expect(onConfirm2).toHaveBeenCalled();
  });
}); 
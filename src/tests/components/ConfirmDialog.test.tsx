import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';
import { useConfirmDialog } from '@/hooks/useConfirmDialog';

// Mock do react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'pt'
    }
  })
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

describe('ConfirmDialog', () => {
  const mockUseConfirmDialog = {
    isOpen: false,
    title: 'Título',
    message: 'Mensagem',
    confirmLabel: 'Confirmar',
    cancelLabel: 'Cancelar',
    handleConfirm: jest.fn(),
    handleCancel: jest.fn(),
  };

  beforeEach(() => {
    (useConfirmDialog as jest.Mock).mockReturnValue(mockUseConfirmDialog);
  });

  it('should not render when dialog is closed', () => {
    render(<ConfirmDialog />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render dialog with default values', () => {
    (useConfirmDialog as jest.Mock).mockReturnValue({
      ...mockUseConfirmDialog,
      isOpen: true,
    });

    render(<ConfirmDialog />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Mensagem')).toBeInTheDocument();
    expect(screen.getByText('Confirmar')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
  });

  it('should render dialog with custom values', () => {
    (useConfirmDialog as jest.Mock).mockReturnValue({
      ...mockUseConfirmDialog,
      isOpen: true,
      title: 'Título Customizado',
      message: 'Mensagem Customizada',
      confirmLabel: 'Sim',
      cancelLabel: 'Não',
    });

    render(<ConfirmDialog />);

    expect(screen.getByText('Título Customizado')).toBeInTheDocument();
    expect(screen.getByText('Mensagem Customizada')).toBeInTheDocument();
    expect(screen.getByText('Sim')).toBeInTheDocument();
    expect(screen.getByText('Não')).toBeInTheDocument();
  });

  it('should handle confirm button click', () => {
    (useConfirmDialog as jest.Mock).mockReturnValue({
      ...mockUseConfirmDialog,
      isOpen: true,
    });

    render(<ConfirmDialog />);

    fireEvent.click(screen.getByText('Confirmar'));
    expect(mockUseConfirmDialog.handleConfirm).toHaveBeenCalled();
  });

  it('should handle cancel button click', () => {
    (useConfirmDialog as jest.Mock).mockReturnValue({
      ...mockUseConfirmDialog,
      isOpen: true,
    });

    render(<ConfirmDialog />);

    fireEvent.click(screen.getByText('Cancelar'));
    expect(mockUseConfirmDialog.handleCancel).toHaveBeenCalled();
  });

  it('should handle escape key press', () => {
    (useConfirmDialog as jest.Mock).mockReturnValue({
      ...mockUseConfirmDialog,
      isOpen: true,
    });

    render(<ConfirmDialog />);

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(mockUseConfirmDialog.handleCancel).toHaveBeenCalled();
  });

  it('should handle click outside dialog', () => {
    (useConfirmDialog as jest.Mock).mockReturnValue({
      ...mockUseConfirmDialog,
      isOpen: true,
    });

    render(<ConfirmDialog />);

    fireEvent.click(screen.getByRole('presentation'));
    expect(mockUseConfirmDialog.handleCancel).toHaveBeenCalled();
  });

  it('deve renderizar corretamente com props básicas', () => {
    render(
      <TestWrapper>
        <ConfirmDialog
          open={true}
          title="Confirmar ação"
          message="Tem certeza que deseja prosseguir?"
          onConfirm={mockUseConfirmDialog.handleConfirm}
          onCancel={mockUseConfirmDialog.handleCancel}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Confirmar ação')).toBeInTheDocument();
    expect(screen.getByText('Tem certeza que deseja prosseguir?')).toBeInTheDocument();
  });

  it('não deve renderizar quando open é false', () => {
    render(
      <TestWrapper>
        <ConfirmDialog
          open={false}
          title="Confirmar ação"
          message="Tem certeza que deseja prosseguir?"
          onConfirm={mockUseConfirmDialog.handleConfirm}
          onCancel={mockUseConfirmDialog.handleCancel}
        />
      </TestWrapper>
    );

    expect(screen.queryByText('Confirmar ação')).not.toBeInTheDocument();
  });

  it('deve chamar onConfirm ao clicar no botão de confirmar', () => {
    render(
      <TestWrapper>
        <ConfirmDialog
          open={true}
          title="Confirmar ação"
          message="Tem certeza que deseja prosseguir?"
          onConfirm={mockUseConfirmDialog.handleConfirm}
          onCancel={mockUseConfirmDialog.handleCancel}
        />
      </TestWrapper>
    );

    const confirmButton = screen.getByText('Confirmar');
    fireEvent.click(confirmButton);

    expect(mockUseConfirmDialog.handleConfirm).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onCancel ao clicar no botão de cancelar', () => {
    render(
      <TestWrapper>
        <ConfirmDialog
          open={true}
          title="Confirmar ação"
          message="Tem certeza que deseja prosseguir?"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />
      </TestWrapper>
    );

    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onCancel ao clicar fora do diálogo', () => {
    render(
      <TestWrapper>
        <ConfirmDialog
          open={true}
          title="Confirmar ação"
          message="Tem certeza que deseja prosseguir?"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />
      </TestWrapper>
    );

    const backdrop = screen.getByRole('presentation');
    fireEvent.click(backdrop);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onCancel ao pressionar ESC', () => {
    render(
      <TestWrapper>
        <ConfirmDialog
          open={true}
          title="Confirmar ação"
          message="Tem certeza que deseja prosseguir?"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />
      </TestWrapper>
    );

    fireEvent.keyDown(document.body, { key: 'Escape' });

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('deve renderizar com botões personalizados', () => {
    render(
      <TestWrapper>
        <ConfirmDialog
          open={true}
          title="Confirmar ação"
          message="Tem certeza que deseja prosseguir?"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
          confirmText="Sim, prosseguir"
          cancelText="Não, cancelar"
        />
      </TestWrapper>
    );

    expect(screen.getByText('Sim, prosseguir')).toBeInTheDocument();
    expect(screen.getByText('Não, cancelar')).toBeInTheDocument();
  });

  it('deve renderizar com cores personalizadas', () => {
    render(
      <TestWrapper>
        <ConfirmDialog
          open={true}
          title="Confirmar ação"
          message="Tem certeza que deseja prosseguir?"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
          confirmColor="error"
          cancelColor="info"
        />
      </TestWrapper>
    );

    const confirmButton = screen.getByText('Confirmar');
    const cancelButton = screen.getByText('Cancelar');

    expect(confirmButton).toHaveClass('MuiButton-colorError');
    expect(cancelButton).toHaveClass('MuiButton-colorInfo');
  });

  it('deve renderizar com tamanhos personalizados', () => {
    render(
      <TestWrapper>
        <ConfirmDialog
          open={true}
          title="Confirmar ação"
          message="Tem certeza que deseja prosseguir?"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
          confirmSize="large"
          cancelSize="small"
        />
      </TestWrapper>
    );

    const confirmButton = screen.getByText('Confirmar');
    const cancelButton = screen.getByText('Cancelar');

    expect(confirmButton).toHaveClass('MuiButton-sizeLarge');
    expect(cancelButton).toHaveClass('MuiButton-sizeSmall');
  });

  it('deve renderizar com variantes personalizadas', () => {
    render(
      <TestWrapper>
        <ConfirmDialog
          open={true}
          title="Confirmar ação"
          message="Tem certeza que deseja prosseguir?"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
          confirmVariant="contained"
          cancelVariant="outlined"
        />
      </TestWrapper>
    );

    const confirmButton = screen.getByText('Confirmar');
    const cancelButton = screen.getByText('Cancelar');

    expect(confirmButton).toHaveClass('MuiButton-contained');
    expect(cancelButton).toHaveClass('MuiButton-outlined');
  });

  it('deve renderizar com ícones personalizados', () => {
    render(
      <TestWrapper>
        <ConfirmDialog
          open={true}
          title="Confirmar ação"
          message="Tem certeza que deseja prosseguir?"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
          confirmIcon={<span>✓</span>}
          cancelIcon={<span>✕</span>}
        />
      </TestWrapper>
    );

    expect(screen.getByText('✓')).toBeInTheDocument();
    expect(screen.getByText('✕')).toBeInTheDocument();
  });

  it('deve renderizar com conteúdo personalizado', () => {
    render(
      <TestWrapper>
        <ConfirmDialog
          open={true}
          title="Confirmar ação"
          message="Tem certeza que deseja prosseguir?"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
          content={<div>Conteúdo personalizado</div>}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Conteúdo personalizado')).toBeInTheDocument();
  });

  it('deve renderizar com ações personalizadas', () => {
    render(
      <TestWrapper>
        <ConfirmDialog
          open={true}
          title="Confirmar ação"
          message="Tem certeza que deseja prosseguir?"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
          actions={<button>Botão personalizado</button>}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Botão personalizado')).toBeInTheDocument();
  });

  it('deve renderizar com classes personalizadas', () => {
    render(
      <TestWrapper>
        <ConfirmDialog
          open={true}
          title="Confirmar ação"
          message="Tem certeza que deseja prosseguir?"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
          className="custom-dialog"
        />
      </TestWrapper>
    );

    expect(screen.getByRole('dialog')).toHaveClass('custom-dialog');
  });

  it('deve renderizar com maxWidth personalizado', () => {
    render(
      <TestWrapper>
        <ConfirmDialog
          open={true}
          title="Confirmar ação"
          message="Tem certeza que deseja prosseguir?"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
          maxWidth="sm"
        />
      </TestWrapper>
    );

    expect(screen.getByRole('dialog')).toHaveClass('MuiDialog-paperWidthSm');
  });

  it('deve renderizar com fullWidth', () => {
    render(
      <TestWrapper>
        <ConfirmDialog
          open={true}
          title="Confirmar ação"
          message="Tem certeza que deseja prosseguir?"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
          fullWidth
        />
      </TestWrapper>
    );

    expect(screen.getByRole('dialog')).toHaveClass('MuiDialog-paperFullWidth');
  });

  it('deve renderizar com disableBackdropClick', () => {
    render(
      <TestWrapper>
        <ConfirmDialog
          open={true}
          title="Confirmar ação"
          message="Tem certeza que deseja prosseguir?"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
          disableBackdropClick
        />
      </TestWrapper>
    );

    const backdrop = screen.getByRole('presentation');
    fireEvent.click(backdrop);

    expect(mockOnCancel).not.toHaveBeenCalled();
  });

  it('deve renderizar com disableEscapeKeyDown', () => {
    render(
      <TestWrapper>
        <ConfirmDialog
          open={true}
          title="Confirmar ação"
          message="Tem certeza que deseja prosseguir?"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
          disableEscapeKeyDown
        />
      </TestWrapper>
    );

    fireEvent.keyDown(document.body, { key: 'Escape' });

    expect(mockOnCancel).not.toHaveBeenCalled();
  });
}); 
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormImageUpload } from './FormImageUpload';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useNotification } from '@/hooks/useNotification';

// Mock dos hooks
jest.mock('next-i18next', () => ({
  useTranslation: jest.fn()
}));

jest.mock('@/hooks/useNotification', () => ({
  useNotification: jest.fn()
}));

// Componente wrapper para testar com react-hook-form
function TestWrapper({ children }: { children: React.ReactNode }) {
  const { control } = useForm();
  return <>{children}</>;
}

describe('FormImageUpload', () => {
  const mockT = jest.fn((key) => key);
  const mockShowNotification = jest.fn();

  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({ t: mockT });
    (useNotification as jest.Mock).mockReturnValue({ showNotification: mockShowNotification });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar corretamente', () => {
    render(
      <TestWrapper>
        <FormImageUpload
          name="test"
          label="Test Image"
          control={{} as any}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Test Image')).toBeInTheDocument();
    expect(screen.getByText('imageUpload.dragAndDrop')).toBeInTheDocument();
  });

  it('deve mostrar erro quando o arquivo excede o tamanho máximo', async () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    Object.defineProperty(file, 'size', { value: 6 * 1024 * 1024 }); // 6MB

    render(
      <TestWrapper>
        <FormImageUpload
          name="test"
          label="Test Image"
          control={{} as any}
          maxSize={5 * 1024 * 1024} // 5MB
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Test Image');
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockShowNotification).toHaveBeenCalledWith({
        type: 'error',
        message: 'imageUpload.errors.maxSize'
      });
    });
  });

  it('deve mostrar erro quando o arquivo não é uma imagem', async () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });

    render(
      <TestWrapper>
        <FormImageUpload
          name="test"
          label="Test Image"
          control={{} as any}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Test Image');
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockShowNotification).toHaveBeenCalledWith({
        type: 'error',
        message: 'imageUpload.errors.invalidType'
      });
    });
  });

  it('deve chamar onUpload quando um arquivo válido é selecionado', async () => {
    const mockOnUpload = jest.fn();
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    render(
      <TestWrapper>
        <FormImageUpload
          name="test"
          label="Test Image"
          control={{} as any}
          onUpload={mockOnUpload}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Test Image');
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockOnUpload).toHaveBeenCalledWith(file);
    });
  });

  it('deve mostrar preview da imagem quando um arquivo é selecionado', async () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const mockFileReader = {
      readAsDataURL: jest.fn(),
      result: 'data:image/jpeg;base64,test',
      onload: null as any,
    };

    global.FileReader = jest.fn(() => mockFileReader) as any;

    render(
      <TestWrapper>
        <FormImageUpload
          name="test"
          label="Test Image"
          control={{} as any}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Test Image');
    fireEvent.change(input, { target: { files: [file] } });

    // Simular o evento onload do FileReader
    mockFileReader.onload();

    await waitFor(() => {
      expect(screen.getByAltText('Test Image')).toBeInTheDocument();
    });
  });

  it('deve remover a imagem quando o botão de remover é clicado', async () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const mockFileReader = {
      readAsDataURL: jest.fn(),
      result: 'data:image/jpeg;base64,test',
      onload: null as any,
    };

    global.FileReader = jest.fn(() => mockFileReader) as any;

    render(
      <TestWrapper>
        <FormImageUpload
          name="test"
          label="Test Image"
          control={{} as any}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Test Image');
    fireEvent.change(input, { target: { files: [file] } });

    // Simular o evento onload do FileReader
    mockFileReader.onload();

    await waitFor(() => {
      expect(screen.getByAltText('Test Image')).toBeInTheDocument();
    });

    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(screen.queryByAltText('Test Image')).not.toBeInTheDocument();
    });
  });

  it('deve mostrar mensagem de erro quando fornecido', () => {
    render(
      <TestWrapper>
        <FormImageUpload
          name="test"
          label="Test Image"
          control={{} as any}
          error="Erro de validação"
        />
      </TestWrapper>
    );

    expect(screen.getByText('Erro de validação')).toBeInTheDocument();
  });

  it('deve mostrar texto de ajuda quando fornecido', () => {
    render(
      <TestWrapper>
        <FormImageUpload
          name="test"
          label="Test Image"
          control={{} as any}
          helperText="Texto de ajuda"
        />
      </TestWrapper>
    );

    expect(screen.getByText('Texto de ajuda')).toBeInTheDocument();
  });

  it('deve estar desabilitado quando a prop disabled é true', () => {
    render(
      <TestWrapper>
        <FormImageUpload
          name="test"
          label="Test Image"
          control={{} as any}
          disabled
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Test Image');
    expect(input).toBeDisabled();
  });
}); 
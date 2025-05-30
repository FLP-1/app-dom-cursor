import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormCepInput } from './FormCepInput';
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

// Mock do IMaskInput
jest.mock('react-imask', () => ({
  IMaskInput: ({ onAccept, ...props }: any) => (
    <input
      {...props}
      data-testid="cep-input"
      onChange={(e) => onAccept(e.target.value)}
    />
  ),
}));

// Componente wrapper para testar com react-hook-form
function TestWrapper({ children }: { children: React.ReactNode }) {
  const { control } = useForm();
  return <>{children}</>;
}

describe('FormCepInput', () => {
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
        <FormCepInput
          name="test"
          label="CEP"
          control={{} as any}
          value=""
          onChange={() => {}}
        />
      </TestWrapper>
    );

    expect(screen.getByText('CEP')).toBeInTheDocument();
    expect(screen.getByTestId('cep-input')).toBeInTheDocument();
  });

  it('deve mostrar asterisco quando required é true', () => {
    render(
      <TestWrapper>
        <FormCepInput
          name="test"
          label="CEP"
          control={{} as any}
          value=""
          onChange={() => {}}
          required
        />
      </TestWrapper>
    );

    const asterisk = screen.getByText('*');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveStyle({ color: 'red' });
  });

  it('deve chamar onChange quando o valor é alterado', () => {
    const handleChange = jest.fn();
    render(
      <TestWrapper>
        <FormCepInput
          name="test"
          label="CEP"
          control={{} as any}
          value=""
          onChange={handleChange}
        />
      </TestWrapper>
    );

    const input = screen.getByTestId('cep-input');
    fireEvent.change(input, { target: { value: '12345-678' } });

    expect(handleChange).toHaveBeenCalledWith('12345-678');
  });

  it('deve mostrar mensagem de erro quando fornecido', () => {
    render(
      <TestWrapper>
        <FormCepInput
          name="test"
          label="CEP"
          control={{} as any}
          value=""
          onChange={() => {}}
          error="Erro de validação"
        />
      </TestWrapper>
    );

    expect(screen.getByText('Erro de validação')).toBeInTheDocument();
  });

  it('deve mostrar texto de ajuda quando fornecido', () => {
    render(
      <TestWrapper>
        <FormCepInput
          name="test"
          label="CEP"
          control={{} as any}
          value=""
          onChange={() => {}}
          helperText="Texto de ajuda"
        />
      </TestWrapper>
    );

    expect(screen.getByText('Texto de ajuda')).toBeInTheDocument();
  });

  it('deve estar desabilitado quando a prop disabled é true', () => {
    render(
      <TestWrapper>
        <FormCepInput
          name="test"
          label="CEP"
          control={{} as any}
          value=""
          onChange={() => {}}
          disabled
        />
      </TestWrapper>
    );

    const input = screen.getByTestId('cep-input');
    expect(input).toBeDisabled();
  });

  it('deve mostrar placeholder quando fornecido', () => {
    render(
      <TestWrapper>
        <FormCepInput
          name="test"
          label="CEP"
          control={{} as any}
          value=""
          onChange={() => {}}
          placeholder="00000-000"
        />
      </TestWrapper>
    );

    const input = screen.getByTestId('cep-input');
    expect(input).toHaveAttribute('placeholder', '00000-000');
  });

  it('deve mostrar botão de busca quando onSearch é fornecido', () => {
    render(
      <TestWrapper>
        <FormCepInput
          name="test"
          label="CEP"
          control={{} as any}
          value=""
          onChange={() => {}}
          onSearch={() => Promise.resolve()}
        />
      </TestWrapper>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('deve chamar onSearch quando o botão de busca é clicado', async () => {
    const handleSearch = jest.fn().mockResolvedValue(undefined);
    render(
      <TestWrapper>
        <FormCepInput
          name="test"
          label="CEP"
          control={{} as any}
          value="12345-678"
          onChange={() => {}}
          onSearch={handleSearch}
        />
      </TestWrapper>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(handleSearch).toHaveBeenCalledWith('12345-678');
    });
  });

  it('deve mostrar notificação de erro quando onSearch falha', async () => {
    const handleSearch = jest.fn().mockRejectedValue(new Error('Erro na busca'));
    render(
      <TestWrapper>
        <FormCepInput
          name="test"
          label="CEP"
          control={{} as any}
          value="12345-678"
          onChange={() => {}}
          onSearch={handleSearch}
        />
      </TestWrapper>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockShowNotification).toHaveBeenCalledWith({
        type: 'error',
        message: 'cepInput.errors.searchError'
      });
    });
  });

  it('deve desabilitar o botão de busca quando o CEP está incompleto', () => {
    render(
      <TestWrapper>
        <FormCepInput
          name="test"
          label="CEP"
          control={{} as any}
          value="12345"
          onChange={() => {}}
          onSearch={() => Promise.resolve()}
        />
      </TestWrapper>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
}); 
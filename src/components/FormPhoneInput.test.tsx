import { render, screen, fireEvent } from '@testing-library/react';
import { FormPhoneInput } from './FormPhoneInput';
import { useForm } from 'react-hook-form';

// Mock do IMaskInput
jest.mock('react-imask', () => ({
  IMaskInput: ({ onAccept, ...props }: any) => (
    <input
      {...props}
      data-testid="phone-input"
      onChange={(e) => onAccept(e.target.value)}
    />
  ),
}));

// Componente wrapper para testar com react-hook-form
function TestWrapper({ children }: { children: React.ReactNode }) {
  const { control } = useForm();
  return <>{children}</>;
}

describe('FormPhoneInput', () => {
  it('deve renderizar corretamente', () => {
    render(
      <TestWrapper>
        <FormPhoneInput
          name="test"
          label="Telefone"
          control={{} as any}
          value=""
          onChange={() => {}}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Telefone')).toBeInTheDocument();
    expect(screen.getByTestId('phone-input')).toBeInTheDocument();
  });

  it('deve mostrar asterisco quando required é true', () => {
    render(
      <TestWrapper>
        <FormPhoneInput
          name="test"
          label="Telefone"
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
        <FormPhoneInput
          name="test"
          label="Telefone"
          control={{} as any}
          value=""
          onChange={handleChange}
        />
      </TestWrapper>
    );

    const input = screen.getByTestId('phone-input');
    fireEvent.change(input, { target: { value: '(11) 99999-9999' } });

    expect(handleChange).toHaveBeenCalledWith('(11) 99999-9999');
  });

  it('deve mostrar mensagem de erro quando fornecido', () => {
    render(
      <TestWrapper>
        <FormPhoneInput
          name="test"
          label="Telefone"
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
        <FormPhoneInput
          name="test"
          label="Telefone"
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
        <FormPhoneInput
          name="test"
          label="Telefone"
          control={{} as any}
          value=""
          onChange={() => {}}
          disabled
        />
      </TestWrapper>
    );

    const input = screen.getByTestId('phone-input');
    expect(input).toBeDisabled();
  });

  it('deve mostrar placeholder quando fornecido', () => {
    render(
      <TestWrapper>
        <FormPhoneInput
          name="test"
          label="Telefone"
          control={{} as any}
          value=""
          onChange={() => {}}
          placeholder="(00) 00000-0000"
        />
      </TestWrapper>
    );

    const input = screen.getByTestId('phone-input');
    expect(input).toHaveAttribute('placeholder', '(00) 00000-0000');
  });
}); 
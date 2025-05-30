import { render, screen, fireEvent } from '@testing-library/react';
import { FormRichText } from './FormRichText';
import { useForm } from 'react-hook-form';

// Mock do ReactQuill
jest.mock('react-quill', () => {
  return function MockReactQuill({ value, onChange }: { value: string; onChange: (value: string) => void }) {
    return (
      <div data-testid="mock-quill">
        <textarea
          data-testid="quill-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Editor de texto rico"
        />
      </div>
    );
  };
});

// Componente wrapper para testar com react-hook-form
function TestWrapper({ children }: { children: React.ReactNode }) {
  const { control } = useForm();
  return <>{children}</>;
}

describe('FormRichText', () => {
  it('deve renderizar corretamente', () => {
    render(
      <TestWrapper>
        <FormRichText
          name="test"
          label="Test Rich Text"
          control={{} as any}
          value=""
          onChange={() => {}}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Test Rich Text')).toBeInTheDocument();
    expect(screen.getByTestId('mock-quill')).toBeInTheDocument();
  });

  it('deve mostrar asterisco quando required é true', () => {
    render(
      <TestWrapper>
        <FormRichText
          name="test"
          label="Test Rich Text"
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
        <FormRichText
          name="test"
          label="Test Rich Text"
          control={{} as any}
          value=""
          onChange={handleChange}
        />
      </TestWrapper>
    );

    const textarea = screen.getByTestId('quill-textarea');
    fireEvent.change(textarea, { target: { value: 'Novo texto' } });

    expect(handleChange).toHaveBeenCalledWith('Novo texto');
  });

  it('deve mostrar mensagem de erro quando fornecido', () => {
    render(
      <TestWrapper>
        <FormRichText
          name="test"
          label="Test Rich Text"
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
        <FormRichText
          name="test"
          label="Test Rich Text"
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
        <FormRichText
          name="test"
          label="Test Rich Text"
          control={{} as any}
          value=""
          onChange={() => {}}
          disabled
        />
      </TestWrapper>
    );

    const textarea = screen.getByTestId('quill-textarea');
    expect(textarea).toBeDisabled();
  });

  it('deve mostrar placeholder quando fornecido', () => {
    render(
      <TestWrapper>
        <FormRichText
          name="test"
          label="Test Rich Text"
          control={{} as any}
          value=""
          onChange={() => {}}
          placeholder="Digite seu texto aqui"
        />
      </TestWrapper>
    );

    const textarea = screen.getByTestId('quill-textarea');
    expect(textarea).toHaveAttribute('placeholder', 'Digite seu texto aqui');
  });
}); 
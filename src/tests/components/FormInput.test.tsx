import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormInput } from '../../components/FormInput';
import { useForm } from 'react-hook-form';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';
import { useTranslation } from 'next-i18next';

// Mock do react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: jest.fn()
}));

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
  const { control } = useForm();
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

describe('FormInput', () => {
  const mockControl = {
    field: {
      onChange: jest.fn(),
      value: '',
      ref: jest.fn()
    },
    fieldState: {
      error: undefined
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useForm as jest.Mock).mockReturnValue({
      control: mockControl
    });
  });

  it('deve renderizar corretamente com props básicas', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <FormInput
          name="teste"
          label="Campo de Teste"
          control={control}
        />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Campo de Teste')).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro quando houver erro de validação', () => {
    const { control } = useForm({
      defaultValues: {
        teste: '',
      },
      mode: 'onChange',
    });

    render(
      <TestWrapper>
        <FormInput
          name="teste"
          label="Campo de Teste"
          control={control}
          rules={{ required: 'Campo obrigatório' }}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Campo de Teste');
    fireEvent.blur(input);

    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
  });

  it('deve aplicar máscara quando fornecida', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <FormInput
          name="teste"
          label="Campo de Teste"
          control={control}
          mask="999.999.999-99"
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Campo de Teste');
    fireEvent.change(input, { target: { value: '12345678900' } });

    expect(input).toHaveValue('123.456.789-00');
  });

  it('deve lidar com diferentes tipos de input', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <FormInput
          name="teste"
          label="Campo de Teste"
          control={control}
          type="number"
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Campo de Teste');
    expect(input).toHaveAttribute('type', 'number');
  });

  it('deve aplicar placeholder quando fornecido', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <FormInput
          name="teste"
          label="Campo de Teste"
          control={control}
          placeholder="Digite algo"
        />
      </TestWrapper>
    );

    expect(screen.getByPlaceholderText('Digite algo')).toBeInTheDocument();
  });

  it('deve lidar com input desabilitado', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <FormInput
          name="teste"
          label="Campo de Teste"
          control={control}
          disabled
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Campo de Teste');
    expect(input).toBeDisabled();
  });

  it('deve lidar com input somente leitura', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <FormInput
          name="teste"
          label="Campo de Teste"
          control={control}
          readOnly
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Campo de Teste');
    expect(input).toHaveAttribute('readonly');
  });

  it('deve lidar com input com valor inicial', () => {
    const { control } = useForm({
      defaultValues: {
        teste: 'Valor Inicial',
      },
    });

    render(
      <TestWrapper>
        <FormInput
          name="teste"
          label="Campo de Teste"
          control={control}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Campo de Teste');
    expect(input).toHaveValue('Valor Inicial');
  });

  it('deve lidar com input com helperText', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <FormInput
          name="teste"
          label="Campo de Teste"
          control={control}
          helperText="Texto de ajuda"
        />
      </TestWrapper>
    );

    expect(screen.getByText('Texto de ajuda')).toBeInTheDocument();
  });

  it('deve lidar com input com tamanho personalizado', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <FormInput
          name="teste"
          label="Campo de Teste"
          control={control}
          size="small"
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Campo de Teste');
    expect(input).toHaveClass('MuiInputBase-inputSizeSmall');
  });

  it('deve lidar com input com variante personalizada', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <FormInput
          name="teste"
          label="Campo de Teste"
          control={control}
          variant="outlined"
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Campo de Teste');
    expect(input).toHaveClass('MuiOutlinedInput-input');
  });

  it('deve lidar com input com cor personalizada', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <FormInput
          name="teste"
          label="Campo de Teste"
          control={control}
          color="secondary"
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Campo de Teste');
    expect(input).toHaveClass('MuiInputBase-colorSecondary');
  });

  it('deve lidar com input com margem personalizada', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <FormInput
          name="teste"
          label="Campo de Teste"
          control={control}
          margin="dense"
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Campo de Teste');
    expect(input).toHaveClass('MuiInputBase-marginDense');
  });

  it('deve lidar com input com ícone de início', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <FormInput
          name="teste"
          label="Campo de Teste"
          control={control}
          startAdornment={<span>R$</span>}
        />
      </TestWrapper>
    );

    expect(screen.getByText('R$')).toBeInTheDocument();
  });

  it('deve lidar com input com ícone de fim', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <FormInput
          name="teste"
          label="Campo de Teste"
          control={control}
          endAdornment={<span>kg</span>}
        />
      </TestWrapper>
    );

    expect(screen.getByText('kg')).toBeInTheDocument();
  });

  it('deve lidar com input com validação personalizada', () => {
    const { control } = useForm({
      defaultValues: {
        teste: '',
      },
      mode: 'onChange',
    });

    render(
      <TestWrapper>
        <FormInput
          name="teste"
          label="Campo de Teste"
          control={control}
          rules={{
            validate: (value) => value.length >= 3 || 'Mínimo de 3 caracteres',
          }}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Campo de Teste');
    fireEvent.change(input, { target: { value: 'ab' } });
    fireEvent.blur(input);

    expect(screen.getByText('Mínimo de 3 caracteres')).toBeInTheDocument();
  });

  it('deve lidar com input com múltiplas validações', () => {
    const { control } = useForm({
      defaultValues: {
        teste: '',
      },
      mode: 'onChange',
    });

    render(
      <TestWrapper>
        <FormInput
          name="teste"
          label="Campo de Teste"
          control={control}
          rules={{
            required: 'Campo obrigatório',
            minLength: {
              value: 3,
              message: 'Mínimo de 3 caracteres',
            },
            maxLength: {
              value: 10,
              message: 'Máximo de 10 caracteres',
            },
          }}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Campo de Teste');
    fireEvent.change(input, { target: { value: 'ab' } });
    fireEvent.blur(input);

    expect(screen.getByText('Mínimo de 3 caracteres')).toBeInTheDocument();
  });

  it('should render input with label', () => {
    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          control={{} as any}
          rules={{ required: true }}
        />
      </TestWrapper>,
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('should render input with placeholder', () => {
    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          placeholder="Test Placeholder"
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
  });

  it('should render input with helper text', () => {
    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          helperText="Test Helper"
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByText('Test Helper')).toBeInTheDocument();
  });

  it('should render input with error message', () => {
    const { control } = useForm();
    const error = { message: 'Test Error' };

    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          control={control}
          error={error}
        />
      </TestWrapper>,
    );

    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });

  it('should render input with custom type', () => {
    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          type="password"
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('should render input with custom size', () => {
    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          size="small"
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveClass('MuiInputBase-sizeSmall');
  });

  it('should render input with custom variant', () => {
    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          variant="outlined"
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveClass('MuiOutlinedInput-root');
  });

  it('should render input with custom color', () => {
    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          color="primary"
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveClass('MuiInputBase-colorPrimary');
  });

  it('should render input with custom fullWidth', () => {
    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          fullWidth
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveClass('MuiInputBase-fullWidth');
  });

  it('should render input with custom disabled', () => {
    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          disabled
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toBeDisabled();
  });

  it('should render input with custom required', () => {
    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          required
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toBeRequired();
  });

  it('should handle input change', () => {
    const { control } = useForm();
    const onChange = jest.fn();

    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          control={control}
          onChange={onChange}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(onChange).toHaveBeenCalled();
  });

  it('should handle input blur', () => {
    const { control } = useForm();
    const onBlur = jest.fn();

    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          control={control}
          onBlur={onBlur}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    fireEvent.blur(input);

    expect(onBlur).toHaveBeenCalled();
  });

  it('should handle input focus', () => {
    const { control } = useForm();
    const onFocus = jest.fn();

    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          control={control}
          onFocus={onFocus}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    fireEvent.focus(input);

    expect(onFocus).toHaveBeenCalled();
  });

  it('should render input with custom inputProps', () => {
    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          control={{} as any}
          inputProps={{ 'data-testid': 'test-input' }}
        />
      </TestWrapper>,
    );

    const input = screen.getByTestId('test-input');
    expect(input).toBeInTheDocument();
  });

  it('should render input with custom FormControlProps', () => {
    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          control={{} as any}
          FormControlProps={{ 'data-testid': 'test-control' }}
        />
      </TestWrapper>,
    );

    const control = screen.getByTestId('test-control');
    expect(control).toBeInTheDocument();
  });

  it('should render input with custom TextFieldProps', () => {
    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          control={{} as any}
          TextFieldProps={{ 'data-testid': 'test-textfield' }}
        />
      </TestWrapper>,
    );

    const textfield = screen.getByTestId('test-textfield');
    expect(textfield).toBeInTheDocument();
  });

  it('should render input with custom value', () => {
    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          value="test"
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveValue('test');
  });

  it('should render input with custom defaultValue', () => {
    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          defaultValue="test"
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveValue('test');
  });

  it('should render input with custom maxLength', () => {
    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          maxLength={10}
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('maxLength', '10');
  });

  it('should render input with custom minLength', () => {
    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          minLength={5}
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('minLength', '5');
  });

  it('should render input with custom pattern', () => {
    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          pattern="[A-Za-z]{3}"
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('pattern', '[A-Za-z]{3}');
  });

  it('should render input with custom readOnly', () => {
    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          readOnly
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('readOnly');
  });

  it('should render input with custom autoComplete', () => {
    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          autoComplete="off"
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('autoComplete', 'off');
  });

  it('should render input with custom autoFocus', () => {
    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          autoFocus
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('autoFocus');
  });

  it('should render input with custom spellCheck', () => {
    render(
      <TestWrapper>
        <FormInput
          name="test"
          label="Test Label"
          spellCheck
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('spellCheck');
  });
}); 
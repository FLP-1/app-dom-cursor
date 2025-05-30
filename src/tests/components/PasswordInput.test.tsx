import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PasswordInput } from '../../components/PasswordInput';
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

describe('PasswordInput', () => {
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

  it('deve renderizar o input de senha corretamente', () => {
    render(
      <PasswordInput
        name="senha"
        label="Senha"
        control={mockControl}
      />
    );

    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'password');
  });

  it('deve exibir valor inicial quando fornecido', () => {
    const mockValue = 'senha123';
    mockControl.field.value = mockValue;

    render(
      <PasswordInput
        name="senha"
        label="Senha"
        control={mockControl}
      />
    );

    expect(screen.getByLabelText('Senha')).toHaveValue(mockValue);
  });

  it('deve chamar onChange quando o valor é alterado', () => {
    render(
      <PasswordInput
        name="senha"
        label="Senha"
        control={mockControl}
      />
    );

    const input = screen.getByLabelText('Senha');
    fireEvent.change(input, { target: { value: 'novaSenha123' } });

    expect(mockControl.field.onChange).toHaveBeenCalledWith('novaSenha123');
  });

  it('deve exibir mensagem de erro quando houver erro de validação', () => {
    const mockError = { message: 'Senha inválida' };
    mockControl.fieldState.error = mockError;

    render(
      <PasswordInput
        name="senha"
        label="Senha"
        control={mockControl}
      />
    );

    expect(screen.getByText('Senha inválida')).toBeInTheDocument();
  });

  it('deve exibir tooltip quando fornecido', () => {
    const tooltip = 'A senha deve ter no mínimo 8 caracteres';
    render(
      <PasswordInput
        name="senha"
        label="Senha"
        control={mockControl}
        tooltip={tooltip}
      />
    );

    const tooltipElement = screen.getByRole('tooltip');
    expect(tooltipElement).toBeInTheDocument();
    expect(tooltipElement).toHaveTextContent(tooltip);
  });

  it('deve aplicar placeholder quando fornecido', () => {
    const placeholder = 'Digite sua senha...';
    render(
      <PasswordInput
        name="senha"
        label="Senha"
        control={mockControl}
        placeholder={placeholder}
      />
    );

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('deve desabilitar o input quando disabled é true', () => {
    render(
      <PasswordInput
        name="senha"
        label="Senha"
        control={mockControl}
        disabled
      />
    );

    expect(screen.getByLabelText('Senha')).toBeDisabled();
  });

  it('deve aplicar classes CSS personalizadas', () => {
    const customClass = 'custom-class';
    render(
      <PasswordInput
        name="senha"
        label="Senha"
        control={mockControl}
        className={customClass}
      />
    );

    expect(screen.getByLabelText('Senha').parentElement).toHaveClass(customClass);
  });

  it('deve alternar visibilidade da senha ao clicar no botão', () => {
    render(
      <PasswordInput
        name="senha"
        label="Senha"
        control={mockControl}
      />
    );

    const input = screen.getByLabelText('Senha');
    const toggleButton = screen.getByRole('button');

    // Inicialmente deve estar como password
    expect(input).toHaveAttribute('type', 'password');

    // Ao clicar no botão, deve mudar para text
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');

    // Ao clicar novamente, deve voltar para password
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('deve exibir ícone de olho fechado quando a senha está oculta', () => {
    render(
      <PasswordInput
        name="senha"
        label="Senha"
        control={mockControl}
      />
    );

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toHaveAttribute('aria-label', 'Mostrar senha');
  });

  it('deve exibir ícone de olho aberto quando a senha está visível', () => {
    render(
      <PasswordInput
        name="senha"
        label="Senha"
        control={mockControl}
      />
    );

    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-label', 'Ocultar senha');
  });

  it('deve renderizar corretamente com props básicas', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <PasswordInput
          name="senha"
          label="Senha"
          control={control}
        />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro quando houver erro de validação', () => {
    const { control } = useForm({
      defaultValues: {
        senha: '',
      },
      mode: 'onChange',
    });

    render(
      <TestWrapper>
        <PasswordInput
          name="senha"
          label="Senha"
          control={control}
          rules={{ required: 'Campo obrigatório' }}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Senha');
    fireEvent.blur(input);

    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
  });

  it('deve alternar visibilidade da senha ao clicar no ícone', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <PasswordInput
          name="senha"
          label="Senha"
          control={control}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Senha');
    const toggleButton = screen.getByRole('button');

    expect(input).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('deve lidar com input desabilitado', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <PasswordInput
          name="senha"
          label="Senha"
          control={control}
          disabled
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Senha');
    expect(input).toBeDisabled();
  });

  it('deve lidar com input somente leitura', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <PasswordInput
          name="senha"
          label="Senha"
          control={control}
          readOnly
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Senha');
    expect(input).toHaveAttribute('readonly');
  });

  it('deve lidar com input com valor inicial', () => {
    const { control } = useForm({
      defaultValues: {
        senha: 'senha123',
      },
    });

    render(
      <TestWrapper>
        <PasswordInput
          name="senha"
          label="Senha"
          control={control}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Senha');
    expect(input).toHaveValue('senha123');
  });

  it('deve lidar com input com helperText', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <PasswordInput
          name="senha"
          label="Senha"
          control={control}
          helperText="A senha deve ter no mínimo 6 caracteres"
        />
      </TestWrapper>
    );

    expect(screen.getByText('A senha deve ter no mínimo 6 caracteres')).toBeInTheDocument();
  });

  it('deve lidar com input com tamanho personalizado', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <PasswordInput
          name="senha"
          label="Senha"
          control={control}
          size="small"
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Senha');
    expect(input).toHaveClass('MuiInputBase-inputSizeSmall');
  });

  it('deve lidar com input com variante personalizada', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <PasswordInput
          name="senha"
          label="Senha"
          control={control}
          variant="outlined"
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Senha');
    expect(input).toHaveClass('MuiOutlinedInput-input');
  });

  it('deve lidar com input com cor personalizada', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <PasswordInput
          name="senha"
          label="Senha"
          control={control}
          color="secondary"
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Senha');
    expect(input).toHaveClass('MuiInputBase-colorSecondary');
  });

  it('deve lidar com input com margem personalizada', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <PasswordInput
          name="senha"
          label="Senha"
          control={control}
          margin="dense"
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Senha');
    expect(input).toHaveClass('MuiInputBase-marginDense');
  });

  it('deve lidar com input com validação personalizada', () => {
    const { control } = useForm({
      defaultValues: {
        senha: '',
      },
      mode: 'onChange',
    });

    render(
      <TestWrapper>
        <PasswordInput
          name="senha"
          label="Senha"
          control={control}
          rules={{
            validate: (value) => value.length >= 6 || 'A senha deve ter no mínimo 6 caracteres',
          }}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Senha');
    fireEvent.change(input, { target: { value: '12345' } });
    fireEvent.blur(input);

    expect(screen.getByText('A senha deve ter no mínimo 6 caracteres')).toBeInTheDocument();
  });

  it('deve lidar com input com múltiplas validações', () => {
    const { control } = useForm({
      defaultValues: {
        senha: '',
      },
      mode: 'onChange',
    });

    render(
      <TestWrapper>
        <PasswordInput
          name="senha"
          label="Senha"
          control={control}
          rules={{
            required: 'Campo obrigatório',
            minLength: {
              value: 6,
              message: 'A senha deve ter no mínimo 6 caracteres',
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
              message: 'A senha deve conter letras e números',
            },
          }}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Senha');
    fireEvent.change(input, { target: { value: '12345' } });
    fireEvent.blur(input);

    expect(screen.getByText('A senha deve ter no mínimo 6 caracteres')).toBeInTheDocument();
  });

  it('deve lidar com input com validação de força da senha', () => {
    const { control } = useForm({
      defaultValues: {
        senha: '',
      },
      mode: 'onChange',
    });

    render(
      <TestWrapper>
        <PasswordInput
          name="senha"
          label="Senha"
          control={control}
          rules={{
            validate: (value) => {
              if (value.length < 8) return 'A senha deve ter no mínimo 8 caracteres';
              if (!/[A-Z]/.test(value)) return 'A senha deve conter pelo menos uma letra maiúscula';
              if (!/[a-z]/.test(value)) return 'A senha deve conter pelo menos uma letra minúscula';
              if (!/\d/.test(value)) return 'A senha deve conter pelo menos um número';
              if (!/[!@#$%^&*]/.test(value)) return 'A senha deve conter pelo menos um caractere especial';
              return true;
            },
          }}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Senha');
    fireEvent.change(input, { target: { value: 'senha123' } });
    fireEvent.blur(input);

    expect(screen.getByText('A senha deve conter pelo menos uma letra maiúscula')).toBeInTheDocument();
  });

  it('should render password input with label', () => {
    render(
      <TestWrapper>
        <PasswordInput
          name="test"
          label="Test Label"
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('should render password input with placeholder', () => {
    render(
      <TestWrapper>
        <PasswordInput
          name="test"
          label="Test Label"
          placeholder="Test Placeholder"
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
  });

  it('should render password input with helper text', () => {
    render(
      <TestWrapper>
        <PasswordInput
          name="test"
          label="Test Label"
          helperText="Test Helper"
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByText('Test Helper')).toBeInTheDocument();
  });

  it('should render password input with error message', () => {
    const { control } = useForm();
    const error = { message: 'Test Error' };

    render(
      <TestWrapper>
        <PasswordInput
          name="test"
          label="Test Label"
          control={control}
          error={error}
        />
      </TestWrapper>,
    );

    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });

  it('should render password input with custom size', () => {
    render(
      <TestWrapper>
        <PasswordInput
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

  it('should render password input with custom variant', () => {
    render(
      <TestWrapper>
        <PasswordInput
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

  it('should render password input with custom color', () => {
    render(
      <TestWrapper>
        <PasswordInput
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

  it('should render password input with custom fullWidth', () => {
    render(
      <TestWrapper>
        <PasswordInput
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

  it('should render password input with custom disabled', () => {
    render(
      <TestWrapper>
        <PasswordInput
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

  it('should render password input with custom required', () => {
    render(
      <TestWrapper>
        <PasswordInput
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

  it('should handle password input change', () => {
    const { control } = useForm();
    const onChange = jest.fn();

    render(
      <TestWrapper>
        <PasswordInput
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

  it('should handle password input blur', () => {
    const { control } = useForm();
    const onBlur = jest.fn();

    render(
      <TestWrapper>
        <PasswordInput
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

  it('should handle password input focus', () => {
    const { control } = useForm();
    const onFocus = jest.fn();

    render(
      <TestWrapper>
        <PasswordInput
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

  it('should render password input with custom inputProps', () => {
    render(
      <TestWrapper>
        <PasswordInput
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

  it('should render password input with custom FormControlProps', () => {
    render(
      <TestWrapper>
        <PasswordInput
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

  it('should render password input with custom TextFieldProps', () => {
    render(
      <TestWrapper>
        <PasswordInput
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

  it('should render password input with custom value', () => {
    render(
      <TestWrapper>
        <PasswordInput
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

  it('should render password input with custom defaultValue', () => {
    render(
      <TestWrapper>
        <PasswordInput
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

  it('should render password input with custom maxLength', () => {
    render(
      <TestWrapper>
        <PasswordInput
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

  it('should render password input with custom minLength', () => {
    render(
      <TestWrapper>
        <PasswordInput
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

  it('should render password input with custom pattern', () => {
    render(
      <TestWrapper>
        <PasswordInput
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

  it('should render password input with custom readOnly', () => {
    render(
      <TestWrapper>
        <PasswordInput
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

  it('should render password input with custom autoComplete', () => {
    render(
      <TestWrapper>
        <PasswordInput
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

  it('should render password input with custom autoFocus', () => {
    render(
      <TestWrapper>
        <PasswordInput
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

  it('should render password input with custom spellCheck', () => {
    render(
      <TestWrapper>
        <PasswordInput
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

  it('should render password input with custom showPassword', () => {
    render(
      <TestWrapper>
        <PasswordInput
          name="test"
          label="Test Label"
          showPassword
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('should render password input with custom hidePassword', () => {
    render(
      <TestWrapper>
        <PasswordInput
          name="test"
          label="Test Label"
          hidePassword
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('should render password input with custom showPasswordIcon', () => {
    render(
      <TestWrapper>
        <PasswordInput
          name="test"
          label="Test Label"
          showPasswordIcon={<span data-testid="show-icon">Show</span>}
          control={{} as any}
        />
      </TestWrapper>,
    );

    const icon = screen.getByTestId('show-icon');
    expect(icon).toBeInTheDocument();
  });

  it('should render password input with custom hidePasswordIcon', () => {
    render(
      <TestWrapper>
        <PasswordInput
          name="test"
          label="Test Label"
          hidePasswordIcon={<span data-testid="hide-icon">Hide</span>}
          control={{} as any}
        />
      </TestWrapper>,
    );

    const icon = screen.getByTestId('hide-icon');
    expect(icon).toBeInTheDocument();
  });

  it('should render password input with custom InputProps', () => {
    render(
      <TestWrapper>
        <PasswordInput
          name="test"
          label="Test Label"
          control={{} as any}
          InputProps={{ 'data-testid': 'test-input-props' }}
        />
      </TestWrapper>,
    );

    const input = screen.getByTestId('test-input-props');
    expect(input).toBeInTheDocument();
  });
}); 
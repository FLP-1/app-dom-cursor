import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormSelect } from '@/components/FormSelect';
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

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const { control } = useForm();

  return <div>{children}</div>;
};

describe('FormSelect', () => {
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

  const mockOptions = [
    { value: '1', label: 'Opção 1' },
    { value: '2', label: 'Opção 2' },
    { value: '3', label: 'Opção 3' }
  ];

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
        <FormSelect
          name="teste"
          label="Campo de Teste"
          control={control}
          options={mockOptions}
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
        <FormSelect
          name="teste"
          label="Campo de Teste"
          control={control}
          options={mockOptions}
          rules={{ required: 'Campo obrigatório' }}
        />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Campo de Teste');
    fireEvent.blur(select);

    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
  });

  it('deve lidar com seleção de opção', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <FormSelect
          name="teste"
          label="Campo de Teste"
          control={control}
          options={mockOptions}
        />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Campo de Teste');
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByText('Opção 2'));

    expect(select).toHaveValue('2');
  });

  it('deve lidar com select desabilitado', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <FormSelect
          name="teste"
          label="Campo de Teste"
          control={control}
          options={mockOptions}
          disabled
        />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Campo de Teste');
    expect(select).toBeDisabled();
  });

  it('deve lidar com select somente leitura', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <FormSelect
          name="teste"
          label="Campo de Teste"
          control={control}
          options={mockOptions}
          readOnly
        />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Campo de Teste');
    expect(select).toHaveAttribute('readonly');
  });

  it('deve lidar com select com valor inicial', () => {
    const { control } = useForm({
      defaultValues: {
        teste: '2',
      },
    });

    render(
      <TestWrapper>
        <FormSelect
          name="teste"
          label="Campo de Teste"
          control={control}
          options={mockOptions}
        />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Campo de Teste');
    expect(select).toHaveValue('2');
  });

  it('deve lidar com select com helperText', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <FormSelect
          name="teste"
          label="Campo de Teste"
          control={control}
          options={mockOptions}
          helperText="Texto de ajuda"
        />
      </TestWrapper>
    );

    expect(screen.getByText('Texto de ajuda')).toBeInTheDocument();
  });

  it('deve lidar com select com tamanho personalizado', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <FormSelect
          name="teste"
          label="Campo de Teste"
          control={control}
          options={mockOptions}
          size="small"
        />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Campo de Teste');
    expect(select).toHaveClass('MuiInputBase-inputSizeSmall');
  });

  it('deve lidar com select com variante personalizada', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <FormSelect
          name="teste"
          label="Campo de Teste"
          control={control}
          options={mockOptions}
          variant="outlined"
        />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Campo de Teste');
    expect(select).toHaveClass('MuiOutlinedInput-input');
  });

  it('deve lidar com select com cor personalizada', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <FormSelect
          name="teste"
          label="Campo de Teste"
          control={control}
          options={mockOptions}
          color="secondary"
        />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Campo de Teste');
    expect(select).toHaveClass('MuiInputBase-colorSecondary');
  });

  it('deve lidar com select com margem personalizada', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <FormSelect
          name="teste"
          label="Campo de Teste"
          control={control}
          options={mockOptions}
          margin="dense"
        />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Campo de Teste');
    expect(select).toHaveClass('MuiInputBase-marginDense');
  });

  it('deve lidar com select com placeholder', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <FormSelect
          name="teste"
          label="Campo de Teste"
          control={control}
          options={mockOptions}
          placeholder="Selecione uma opção"
        />
      </TestWrapper>
    );

    expect(screen.getByText('Selecione uma opção')).toBeInTheDocument();
  });

  it('deve lidar com select com múltipla seleção', () => {
    const { control } = useForm();
    render(
      <TestWrapper>
        <FormSelect
          name="teste"
          label="Campo de Teste"
          control={control}
          options={mockOptions}
          multiple
        />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Campo de Teste');
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByText('Opção 1'));
    fireEvent.click(screen.getByText('Opção 2'));

    expect(select).toHaveValue(['1', '2']);
  });

  it('deve lidar com select com validação personalizada', () => {
    const { control } = useForm({
      defaultValues: {
        teste: '',
      },
      mode: 'onChange',
    });

    render(
      <TestWrapper>
        <FormSelect
          name="teste"
          label="Campo de Teste"
          control={control}
          options={mockOptions}
          rules={{
            validate: (value) => value !== '' || 'Selecione uma opção',
          }}
        />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Campo de Teste');
    fireEvent.blur(select);

    expect(screen.getByText('Selecione uma opção')).toBeInTheDocument();
  });

  it('deve lidar com select com múltiplas validações', () => {
    const { control } = useForm({
      defaultValues: {
        teste: '',
      },
      mode: 'onChange',
    });

    render(
      <TestWrapper>
        <FormSelect
          name="teste"
          label="Campo de Teste"
          control={control}
          options={mockOptions}
          rules={{
            required: 'Campo obrigatório',
            validate: (value) => value !== '1' || 'Opção 1 não é permitida',
          }}
        />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Campo de Teste');
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByText('Opção 1'));
    fireEvent.blur(select);

    expect(screen.getByText('Opção 1 não é permitida')).toBeInTheDocument();
  });

  it('should render select with label', () => {
    render(
      <TestWrapper>
        <FormSelect
          name="test"
          label="Test Label"
          options={mockOptions}
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('should render select with placeholder', () => {
    render(
      <TestWrapper>
        <FormSelect
          name="test"
          label="Test Label"
          placeholder="Test Placeholder"
          options={mockOptions}
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
  });

  it('should render select with helper text', () => {
    render(
      <TestWrapper>
        <FormSelect
          name="test"
          label="Test Label"
          helperText="Test Helper"
          options={mockOptions}
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByText('Test Helper')).toBeInTheDocument();
  });

  it('should render select with error message', () => {
    const { control } = useForm();
    const error = { message: 'Test Error' };

    render(
      <TestWrapper>
        <FormSelect
          name="test"
          label="Test Label"
          options={mockOptions}
          control={control}
          error={error}
        />
      </TestWrapper>,
    );

    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });

  it('should render select with custom size', () => {
    render(
      <TestWrapper>
        <FormSelect
          name="test"
          label="Test Label"
          size="small"
          options={mockOptions}
          control={{} as any}
        />
      </TestWrapper>,
    );

    const select = screen.getByLabelText('Test Label');
    expect(select).toHaveClass('MuiInputBase-sizeSmall');
  });

  it('should render select with custom variant', () => {
    render(
      <TestWrapper>
        <FormSelect
          name="test"
          label="Test Label"
          variant="outlined"
          options={mockOptions}
          control={{} as any}
        />
      </TestWrapper>,
    );

    const select = screen.getByLabelText('Test Label');
    expect(select).toHaveClass('MuiOutlinedInput-root');
  });

  it('should render select with custom color', () => {
    render(
      <TestWrapper>
        <FormSelect
          name="test"
          label="Test Label"
          color="primary"
          options={mockOptions}
          control={{} as any}
        />
      </TestWrapper>,
    );

    const select = screen.getByLabelText('Test Label');
    expect(select).toHaveClass('MuiInputBase-colorPrimary');
  });

  it('should render select with custom fullWidth', () => {
    render(
      <TestWrapper>
        <FormSelect
          name="test"
          label="Test Label"
          fullWidth
          options={mockOptions}
          control={{} as any}
        />
      </TestWrapper>,
    );

    const select = screen.getByLabelText('Test Label');
    expect(select).toHaveClass('MuiInputBase-fullWidth');
  });

  it('should render select with custom disabled', () => {
    render(
      <TestWrapper>
        <FormSelect
          name="test"
          label="Test Label"
          disabled
          options={mockOptions}
          control={{} as any}
        />
      </TestWrapper>,
    );

    const select = screen.getByLabelText('Test Label');
    expect(select).toBeDisabled();
  });

  it('should render select with custom required', () => {
    render(
      <TestWrapper>
        <FormSelect
          name="test"
          label="Test Label"
          required
          options={mockOptions}
          control={{} as any}
        />
      </TestWrapper>,
    );

    const select = screen.getByLabelText('Test Label');
    expect(select).toBeRequired();
  });

  it('should handle select change', () => {
    const { control } = useForm();
    const onChange = jest.fn();

    render(
      <TestWrapper>
        <FormSelect
          name="test"
          label="Test Label"
          options={mockOptions}
          control={control}
          onChange={onChange}
        />
      </TestWrapper>,
    );

    const select = screen.getByLabelText('Test Label');
    fireEvent.change(select, { target: { value: '1' } });

    expect(onChange).toHaveBeenCalled();
  });

  it('should handle select blur', () => {
    const { control } = useForm();
    const onBlur = jest.fn();

    render(
      <TestWrapper>
        <FormSelect
          name="test"
          label="Test Label"
          options={mockOptions}
          control={control}
          onBlur={onBlur}
        />
      </TestWrapper>,
    );

    const select = screen.getByLabelText('Test Label');
    fireEvent.blur(select);

    expect(onBlur).toHaveBeenCalled();
  });

  it('should handle select focus', () => {
    const { control } = useForm();
    const onFocus = jest.fn();

    render(
      <TestWrapper>
        <FormSelect
          name="test"
          label="Test Label"
          options={mockOptions}
          control={control}
          onFocus={onFocus}
        />
      </TestWrapper>,
    );

    const select = screen.getByLabelText('Test Label');
    fireEvent.focus(select);

    expect(onFocus).toHaveBeenCalled();
  });

  it('should render select with custom inputProps', () => {
    render(
      <TestWrapper>
        <FormSelect
          name="test"
          label="Test Label"
          options={mockOptions}
          control={{} as any}
          inputProps={{ 'data-testid': 'test-input' }}
        />
      </TestWrapper>,
    );

    const input = screen.getByTestId('test-input');
    expect(input).toBeInTheDocument();
  });

  it('should render select with custom FormControlProps', () => {
    render(
      <TestWrapper>
        <FormSelect
          name="test"
          label="Test Label"
          options={mockOptions}
          control={{} as any}
          FormControlProps={{ 'data-testid': 'test-control' }}
        />
      </TestWrapper>,
    );

    const control = screen.getByTestId('test-control');
    expect(control).toBeInTheDocument();
  });

  it('should render select with custom SelectProps', () => {
    render(
      <TestWrapper>
        <FormSelect
          name="test"
          label="Test Label"
          options={mockOptions}
          control={{} as any}
          SelectProps={{ 'data-testid': 'test-select' }}
        />
      </TestWrapper>,
    );

    const select = screen.getByTestId('test-select');
    expect(select).toBeInTheDocument();
  });

  it('should render select with custom multiple', () => {
    render(
      <TestWrapper>
        <FormSelect
          name="test"
          label="Test Label"
          options={mockOptions}
          control={{} as any}
          multiple
        />
      </TestWrapper>,
    );

    const select = screen.getByLabelText('Test Label');
    expect(select).toHaveAttribute('multiple');
  });

  it('should render select with custom native', () => {
    render(
      <TestWrapper>
        <FormSelect
          name="test"
          label="Test Label"
          options={mockOptions}
          control={{} as any}
          native
        />
      </TestWrapper>,
    );

    const select = screen.getByLabelText('Test Label');
    expect(select).toHaveAttribute('native');
  });

  it('should render select with custom displayEmpty', () => {
    render(
      <TestWrapper>
        <FormSelect
          name="test"
          label="Test Label"
          options={mockOptions}
          control={{} as any}
          displayEmpty
        />
      </TestWrapper>,
    );

    const select = screen.getByLabelText('Test Label');
    expect(select).toHaveAttribute('displayEmpty');
  });

  it('should render select with custom autoWidth', () => {
    render(
      <TestWrapper>
        <FormSelect
          name="test"
          label="Test Label"
          options={mockOptions}
          control={{} as any}
          autoWidth
        />
      </TestWrapper>,
    );

    const select = screen.getByLabelText('Test Label');
    expect(select).toHaveAttribute('autoWidth');
  });

  it('should render select with custom open', () => {
    render(
      <TestWrapper>
        <FormSelect
          name="test"
          label="Test Label"
          options={mockOptions}
          control={{} as any}
          open
        />
      </TestWrapper>,
    );

    const select = screen.getByLabelText('Test Label');
    expect(select).toHaveAttribute('open');
  });

  it('should render select with custom value', () => {
    render(
      <TestWrapper>
        <FormSelect
          name="test"
          label="Test Label"
          options={mockOptions}
          control={{} as any}
          value="1"
        />
      </TestWrapper>,
    );

    const select = screen.getByLabelText('Test Label');
    expect(select).toHaveValue('1');
  });

  it('should render select with custom defaultValue', () => {
    render(
      <TestWrapper>
        <FormSelect
          name="test"
          label="Test Label"
          options={mockOptions}
          control={{} as any}
          defaultValue="1"
        />
      </TestWrapper>,
    );

    const select = screen.getByLabelText('Test Label');
    expect(select).toHaveValue('1');
  });
}); 
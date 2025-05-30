import { render, screen, fireEvent } from '@testing-library/react';
import { FormDatePicker } from '@/components/FormDatePicker';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const { control } = useForm();

  return <div>{children}</div>;
};

describe('FormDatePicker', () => {
  it('should render datepicker with label', () => {
    render(
      <TestWrapper>
        <FormDatePicker
          name="test"
          label="Test Label"
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('should render datepicker with placeholder', () => {
    render(
      <TestWrapper>
        <FormDatePicker
          name="test"
          label="Test Label"
          placeholder="Test Placeholder"
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
  });

  it('should render datepicker with helper text', () => {
    render(
      <TestWrapper>
        <FormDatePicker
          name="test"
          label="Test Label"
          helperText="Test Helper"
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByText('Test Helper')).toBeInTheDocument();
  });

  it('should render datepicker with error message', () => {
    const { control } = useForm();
    const error = { message: 'Test Error' };

    render(
      <TestWrapper>
        <FormDatePicker
          name="test"
          label="Test Label"
          control={control}
          error={error}
        />
      </TestWrapper>,
    );

    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });

  it('should render datepicker with custom size', () => {
    render(
      <TestWrapper>
        <FormDatePicker
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

  it('should render datepicker with custom variant', () => {
    render(
      <TestWrapper>
        <FormDatePicker
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

  it('should render datepicker with custom color', () => {
    render(
      <TestWrapper>
        <FormDatePicker
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

  it('should render datepicker with custom fullWidth', () => {
    render(
      <TestWrapper>
        <FormDatePicker
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

  it('should render datepicker with custom disabled', () => {
    render(
      <TestWrapper>
        <FormDatePicker
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

  it('should render datepicker with custom required', () => {
    render(
      <TestWrapper>
        <FormDatePicker
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

  it('should handle datepicker change', () => {
    const { control } = useForm();
    const onChange = jest.fn();

    render(
      <TestWrapper>
        <FormDatePicker
          name="test"
          label="Test Label"
          control={control}
          onChange={onChange}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: '2024-01-01' } });

    expect(onChange).toHaveBeenCalled();
  });

  it('should handle datepicker blur', () => {
    const { control } = useForm();
    const onBlur = jest.fn();

    render(
      <TestWrapper>
        <FormDatePicker
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

  it('should handle datepicker focus', () => {
    const { control } = useForm();
    const onFocus = jest.fn();

    render(
      <TestWrapper>
        <FormDatePicker
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

  it('should render datepicker with custom inputProps', () => {
    render(
      <TestWrapper>
        <FormDatePicker
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

  it('should render datepicker with custom FormControlProps', () => {
    render(
      <TestWrapper>
        <FormDatePicker
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

  it('should render datepicker with custom DatePickerProps', () => {
    render(
      <TestWrapper>
        <FormDatePicker
          name="test"
          label="Test Label"
          control={{} as any}
          DatePickerProps={{ 'data-testid': 'test-datepicker' }}
        />
      </TestWrapper>,
    );

    const datepicker = screen.getByTestId('test-datepicker');
    expect(datepicker).toBeInTheDocument();
  });

  it('should render datepicker with custom format', () => {
    render(
      <TestWrapper>
        <FormDatePicker
          name="test"
          label="Test Label"
          control={{} as any}
          format="dd/MM/yyyy"
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('format', 'dd/MM/yyyy');
  });

  it('should render datepicker with custom views', () => {
    render(
      <TestWrapper>
        <FormDatePicker
          name="test"
          label="Test Label"
          control={{} as any}
          views={['year', 'month']}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('views', 'year,month');
  });

  it('should render datepicker with custom minDate', () => {
    render(
      <TestWrapper>
        <FormDatePicker
          name="test"
          label="Test Label"
          control={{} as any}
          minDate={new Date('2024-01-01')}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('minDate', '2024-01-01');
  });

  it('should render datepicker with custom maxDate', () => {
    render(
      <TestWrapper>
        <FormDatePicker
          name="test"
          label="Test Label"
          control={{} as any}
          maxDate={new Date('2024-12-31')}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('maxDate', '2024-12-31');
  });

  it('should render datepicker with custom disablePast', () => {
    render(
      <TestWrapper>
        <FormDatePicker
          name="test"
          label="Test Label"
          control={{} as any}
          disablePast
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('disablePast');
  });

  it('should render datepicker with custom disableFuture', () => {
    render(
      <TestWrapper>
        <FormDatePicker
          name="test"
          label="Test Label"
          control={{} as any}
          disableFuture
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('disableFuture');
  });

  it('should render datepicker with custom openTo', () => {
    render(
      <TestWrapper>
        <FormDatePicker
          name="test"
          label="Test Label"
          control={{} as any}
          openTo="year"
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('openTo', 'year');
  });

  it('should render datepicker with custom orientation', () => {
    render(
      <TestWrapper>
        <FormDatePicker
          name="test"
          label="Test Label"
          control={{} as any}
          orientation="landscape"
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('orientation', 'landscape');
  });

  it('should render datepicker with custom clearable', () => {
    render(
      <TestWrapper>
        <FormDatePicker
          name="test"
          label="Test Label"
          control={{} as any}
          clearable
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('clearable');
  });

  it('should render datepicker with custom clearText', () => {
    render(
      <TestWrapper>
        <FormDatePicker
          name="test"
          label="Test Label"
          control={{} as any}
          clearText="Limpar"
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('clearText', 'Limpar');
  });

  it('should render datepicker with custom okText', () => {
    render(
      <TestWrapper>
        <FormDatePicker
          name="test"
          label="Test Label"
          control={{} as any}
          okText="OK"
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('okText', 'OK');
  });

  it('should render datepicker with custom cancelText', () => {
    render(
      <TestWrapper>
        <FormDatePicker
          name="test"
          label="Test Label"
          control={{} as any}
          cancelText="Cancelar"
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('cancelText', 'Cancelar');
  });

  it('should render datepicker with custom todayText', () => {
    render(
      <TestWrapper>
        <FormDatePicker
          name="test"
          label="Test Label"
          control={{} as any}
          todayText="Hoje"
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('todayText', 'Hoje');
  });

  it('should render datepicker with custom TextFieldProps', () => {
    render(
      <TestWrapper>
        <FormDatePicker
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

  it('should render datepicker with custom value', () => {
    render(
      <TestWrapper>
        <FormDatePicker
          name="test"
          label="Test Label"
          value="2024-01-01"
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveValue('2024-01-01');
  });

  it('should render datepicker with custom defaultValue', () => {
    render(
      <TestWrapper>
        <FormDatePicker
          name="test"
          label="Test Label"
          defaultValue="2024-01-01"
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveValue('2024-01-01');
  });

  it('should render datepicker with custom renderInput', () => {
    render(
      <TestWrapper>
        <FormDatePicker
          name="test"
          label="Test Label"
          renderInput={(params) => <input {...params} data-testid="test-input" />}
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByTestId('test-input');
    expect(input).toBeInTheDocument();
  });
}); 
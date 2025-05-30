import { render, screen, fireEvent } from '@testing-library/react';
import { FormDateTimePicker } from '@/components/FormDateTimePicker';
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

describe('FormDateTimePicker', () => {
  it('should render datetimepicker with label', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
          name="test"
          label="Test Label"
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('should render datetimepicker with placeholder', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
          name="test"
          label="Test Label"
          placeholder="Test Placeholder"
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
  });

  it('should render datetimepicker with helper text', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
          name="test"
          label="Test Label"
          helperText="Test Helper"
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByText('Test Helper')).toBeInTheDocument();
  });

  it('should render datetimepicker with error message', () => {
    const { control } = useForm();
    const error = { message: 'Test Error' };

    render(
      <TestWrapper>
        <FormDateTimePicker
          name="test"
          label="Test Label"
          control={control}
          error={error}
        />
      </TestWrapper>,
    );

    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });

  it('should render datetimepicker with custom size', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
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

  it('should render datetimepicker with custom variant', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
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

  it('should render datetimepicker with custom color', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
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

  it('should render datetimepicker with custom fullWidth', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
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

  it('should render datetimepicker with custom disabled', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
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

  it('should render datetimepicker with custom required', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
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

  it('should handle datetimepicker change', () => {
    const { control } = useForm();
    const onChange = jest.fn();

    render(
      <TestWrapper>
        <FormDateTimePicker
          name="test"
          label="Test Label"
          control={control}
          onChange={onChange}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: '2024-01-01T12:00' } });

    expect(onChange).toHaveBeenCalled();
  });

  it('should handle datetimepicker blur', () => {
    const { control } = useForm();
    const onBlur = jest.fn();

    render(
      <TestWrapper>
        <FormDateTimePicker
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

  it('should handle datetimepicker focus', () => {
    const { control } = useForm();
    const onFocus = jest.fn();

    render(
      <TestWrapper>
        <FormDateTimePicker
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

  it('should render datetimepicker with custom inputProps', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
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

  it('should render datetimepicker with custom FormControlProps', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
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

  it('should render datetimepicker with custom DateTimePickerProps', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
          name="test"
          label="Test Label"
          control={{} as any}
          DateTimePickerProps={{ 'data-testid': 'test-datetimepicker' }}
        />
      </TestWrapper>,
    );

    const datetimepicker = screen.getByTestId('test-datetimepicker');
    expect(datetimepicker).toBeInTheDocument();
  });

  it('should render datetimepicker with custom format', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
          name="test"
          label="Test Label"
          control={{} as any}
          format="dd/MM/yyyy HH:mm"
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('format', 'dd/MM/yyyy HH:mm');
  });

  it('should render datetimepicker with custom views', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
          name="test"
          label="Test Label"
          control={{} as any}
          views={['year', 'month', 'day', 'hours', 'minutes']}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('views', 'year,month,day,hours,minutes');
  });

  it('should render datetimepicker with custom minDate', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
          name="test"
          label="Test Label"
          control={{} as any}
          minDate={new Date('2024-01-01T00:00')}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('minDate', '2024-01-01T00:00');
  });

  it('should render datetimepicker with custom maxDate', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
          name="test"
          label="Test Label"
          control={{} as any}
          maxDate={new Date('2024-12-31T23:59')}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('maxDate', '2024-12-31T23:59');
  });

  it('should render datetimepicker with custom disablePast', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
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

  it('should render datetimepicker with custom disableFuture', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
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

  it('should render datetimepicker with custom openTo', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
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

  it('should render datetimepicker with custom orientation', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
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

  it('should render datetimepicker with custom clearable', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
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

  it('should render datetimepicker with custom clearText', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
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

  it('should render datetimepicker with custom okText', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
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

  it('should render datetimepicker with custom cancelText', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
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

  it('should render datetimepicker with custom todayText', () => {
    render(
      <TestWrapper>
        <FormDateTimePicker
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
}); 
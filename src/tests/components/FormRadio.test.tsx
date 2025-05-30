import { render, screen, fireEvent } from '@testing-library/react';
import { FormRadio } from '@/components/FormRadio';
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

describe('FormRadio', () => {
  it('should render radio with label', () => {
    render(
      <TestWrapper>
        <FormRadio
          name="test"
          label="Test Label"
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('should render radio with helper text', () => {
    render(
      <TestWrapper>
        <FormRadio
          name="test"
          label="Test Label"
          helperText="Test Helper"
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByText('Test Helper')).toBeInTheDocument();
  });

  it('should render radio with error message', () => {
    const { control } = useForm();
    const error = { message: 'Test Error' };

    render(
      <TestWrapper>
        <FormRadio
          name="test"
          label="Test Label"
          control={control}
          error={error}
        />
      </TestWrapper>,
    );

    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });

  it('should render radio with custom size', () => {
    render(
      <TestWrapper>
        <FormRadio
          name="test"
          label="Test Label"
          size="small"
          control={{} as any}
        />
      </TestWrapper>,
    );

    const radio = screen.getByLabelText('Test Label');
    expect(radio).toHaveClass('MuiRadio-sizeSmall');
  });

  it('should render radio with custom color', () => {
    render(
      <TestWrapper>
        <FormRadio
          name="test"
          label="Test Label"
          color="primary"
          control={{} as any}
        />
      </TestWrapper>,
    );

    const radio = screen.getByLabelText('Test Label');
    expect(radio).toHaveClass('MuiRadio-colorPrimary');
  });

  it('should render radio with custom disabled', () => {
    render(
      <TestWrapper>
        <FormRadio
          name="test"
          label="Test Label"
          disabled
          control={{} as any}
        />
      </TestWrapper>,
    );

    const radio = screen.getByLabelText('Test Label');
    expect(radio).toBeDisabled();
  });

  it('should render radio with custom required', () => {
    render(
      <TestWrapper>
        <FormRadio
          name="test"
          label="Test Label"
          required
          control={{} as any}
        />
      </TestWrapper>,
    );

    const radio = screen.getByLabelText('Test Label');
    expect(radio).toBeRequired();
  });

  it('should handle radio change', () => {
    const { control } = useForm();
    const onChange = jest.fn();

    render(
      <TestWrapper>
        <FormRadio
          name="test"
          label="Test Label"
          control={control}
          onChange={onChange}
        />
      </TestWrapper>,
    );

    const radio = screen.getByLabelText('Test Label');
    fireEvent.click(radio);

    expect(onChange).toHaveBeenCalled();
  });

  it('should handle radio blur', () => {
    const { control } = useForm();
    const onBlur = jest.fn();

    render(
      <TestWrapper>
        <FormRadio
          name="test"
          label="Test Label"
          control={control}
          onBlur={onBlur}
        />
      </TestWrapper>,
    );

    const radio = screen.getByLabelText('Test Label');
    fireEvent.blur(radio);

    expect(onBlur).toHaveBeenCalled();
  });

  it('should handle radio focus', () => {
    const { control } = useForm();
    const onFocus = jest.fn();

    render(
      <TestWrapper>
        <FormRadio
          name="test"
          label="Test Label"
          control={control}
          onFocus={onFocus}
        />
      </TestWrapper>,
    );

    const radio = screen.getByLabelText('Test Label');
    fireEvent.focus(radio);

    expect(onFocus).toHaveBeenCalled();
  });

  it('should render radio with custom inputProps', () => {
    render(
      <TestWrapper>
        <FormRadio
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

  it('should render radio with custom FormControlProps', () => {
    render(
      <TestWrapper>
        <FormRadio
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

  it('should render radio with custom FormControlLabelProps', () => {
    render(
      <TestWrapper>
        <FormRadio
          name="test"
          label="Test Label"
          control={{} as any}
          FormControlLabelProps={{ 'data-testid': 'test-label' }}
        />
      </TestWrapper>,
    );

    const label = screen.getByTestId('test-label');
    expect(label).toBeInTheDocument();
  });

  it('should render radio with custom FormHelperTextProps', () => {
    render(
      <TestWrapper>
        <FormRadio
          name="test"
          label="Test Label"
          helperText="Test Helper"
          control={{} as any}
          FormHelperTextProps={{ 'data-testid': 'test-helper' }}
        />
      </TestWrapper>,
    );

    const helper = screen.getByTestId('test-helper');
    expect(helper).toBeInTheDocument();
  });

  it('should render radio with custom RadioProps', () => {
    render(
      <TestWrapper>
        <FormRadio
          name="test"
          label="Test Label"
          control={{} as any}
          RadioProps={{ 'data-testid': 'test-radio' }}
        />
      </TestWrapper>,
    );

    const radio = screen.getByTestId('test-radio');
    expect(radio).toBeInTheDocument();
  });

  it('should render radio with custom checked', () => {
    render(
      <TestWrapper>
        <FormRadio
          name="test"
          label="Test Label"
          control={{} as any}
          checked
        />
      </TestWrapper>,
    );

    const radio = screen.getByLabelText('Test Label');
    expect(radio).toBeChecked();
  });

  it('should render radio with custom defaultChecked', () => {
    render(
      <TestWrapper>
        <FormRadio
          name="test"
          label="Test Label"
          control={{} as any}
          defaultChecked
        />
      </TestWrapper>,
    );

    const radio = screen.getByLabelText('Test Label');
    expect(radio).toBeChecked();
  });

  it('should render radio with custom disableRipple', () => {
    render(
      <TestWrapper>
        <FormRadio
          name="test"
          label="Test Label"
          control={{} as any}
          disableRipple
        />
      </TestWrapper>,
    );

    const radio = screen.getByLabelText('Test Label');
    expect(radio).toHaveAttribute('disableRipple');
  });

  it('should render radio with custom icon', () => {
    render(
      <TestWrapper>
        <FormRadio
          name="test"
          label="Test Label"
          control={{} as any}
          icon={<span data-testid="test-icon">Icon</span>}
        />
      </TestWrapper>,
    );

    const icon = screen.getByTestId('test-icon');
    expect(icon).toBeInTheDocument();
  });

  it('should render radio with custom checkedIcon', () => {
    render(
      <TestWrapper>
        <FormRadio
          name="test"
          label="Test Label"
          control={{} as any}
          checkedIcon={<span data-testid="test-checked-icon">Checked</span>}
        />
      </TestWrapper>,
    );

    const icon = screen.getByTestId('test-checked-icon');
    expect(icon).toBeInTheDocument();
  });
}); 
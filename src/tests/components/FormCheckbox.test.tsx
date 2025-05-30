import { render, screen, fireEvent } from '@testing-library/react';
import { FormCheckbox } from '@/components/FormCheckbox';
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

describe('FormCheckbox', () => {
  it('should render checkbox with label', () => {
    render(
      <TestWrapper>
        <FormCheckbox
          name="test"
          label="Test Label"
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('should render checkbox with helper text', () => {
    render(
      <TestWrapper>
        <FormCheckbox
          name="test"
          label="Test Label"
          helperText="Test Helper"
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByText('Test Helper')).toBeInTheDocument();
  });

  it('should render checkbox with error message', () => {
    const { control } = useForm();
    const error = { message: 'Test Error' };

    render(
      <TestWrapper>
        <FormCheckbox
          name="test"
          label="Test Label"
          control={control}
          error={error}
        />
      </TestWrapper>,
    );

    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });

  it('should render checkbox with custom size', () => {
    render(
      <TestWrapper>
        <FormCheckbox
          name="test"
          label="Test Label"
          size="small"
          control={{} as any}
        />
      </TestWrapper>,
    );

    const checkbox = screen.getByLabelText('Test Label');
    expect(checkbox).toHaveClass('MuiCheckbox-sizeSmall');
  });

  it('should render checkbox with custom color', () => {
    render(
      <TestWrapper>
        <FormCheckbox
          name="test"
          label="Test Label"
          color="primary"
          control={{} as any}
        />
      </TestWrapper>,
    );

    const checkbox = screen.getByLabelText('Test Label');
    expect(checkbox).toHaveClass('MuiCheckbox-colorPrimary');
  });

  it('should render checkbox with custom disabled', () => {
    render(
      <TestWrapper>
        <FormCheckbox
          name="test"
          label="Test Label"
          disabled
          control={{} as any}
        />
      </TestWrapper>,
    );

    const checkbox = screen.getByLabelText('Test Label');
    expect(checkbox).toBeDisabled();
  });

  it('should render checkbox with custom required', () => {
    render(
      <TestWrapper>
        <FormCheckbox
          name="test"
          label="Test Label"
          required
          control={{} as any}
        />
      </TestWrapper>,
    );

    const checkbox = screen.getByLabelText('Test Label');
    expect(checkbox).toBeRequired();
  });

  it('should handle checkbox change', () => {
    const { control } = useForm();
    const onChange = jest.fn();

    render(
      <TestWrapper>
        <FormCheckbox
          name="test"
          label="Test Label"
          control={control}
          onChange={onChange}
        />
      </TestWrapper>,
    );

    const checkbox = screen.getByLabelText('Test Label');
    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalled();
  });

  it('should handle checkbox blur', () => {
    const { control } = useForm();
    const onBlur = jest.fn();

    render(
      <TestWrapper>
        <FormCheckbox
          name="test"
          label="Test Label"
          control={control}
          onBlur={onBlur}
        />
      </TestWrapper>,
    );

    const checkbox = screen.getByLabelText('Test Label');
    fireEvent.blur(checkbox);

    expect(onBlur).toHaveBeenCalled();
  });

  it('should handle checkbox focus', () => {
    const { control } = useForm();
    const onFocus = jest.fn();

    render(
      <TestWrapper>
        <FormCheckbox
          name="test"
          label="Test Label"
          control={control}
          onFocus={onFocus}
        />
      </TestWrapper>,
    );

    const checkbox = screen.getByLabelText('Test Label');
    fireEvent.focus(checkbox);

    expect(onFocus).toHaveBeenCalled();
  });

  it('should render checkbox with custom inputProps', () => {
    render(
      <TestWrapper>
        <FormCheckbox
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

  it('should render checkbox with custom FormControlProps', () => {
    render(
      <TestWrapper>
        <FormCheckbox
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

  it('should render checkbox with custom FormControlLabelProps', () => {
    render(
      <TestWrapper>
        <FormCheckbox
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

  it('should render checkbox with custom FormHelperTextProps', () => {
    render(
      <TestWrapper>
        <FormCheckbox
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

  it('should render checkbox with custom CheckboxProps', () => {
    render(
      <TestWrapper>
        <FormCheckbox
          name="test"
          label="Test Label"
          control={{} as any}
          CheckboxProps={{ 'data-testid': 'test-checkbox' }}
        />
      </TestWrapper>,
    );

    const checkbox = screen.getByTestId('test-checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('should render checkbox with custom checked', () => {
    render(
      <TestWrapper>
        <FormCheckbox
          name="test"
          label="Test Label"
          control={{} as any}
          checked
        />
      </TestWrapper>,
    );

    const checkbox = screen.getByLabelText('Test Label');
    expect(checkbox).toBeChecked();
  });

  it('should render checkbox with custom defaultChecked', () => {
    render(
      <TestWrapper>
        <FormCheckbox
          name="test"
          label="Test Label"
          control={{} as any}
          defaultChecked
        />
      </TestWrapper>,
    );

    const checkbox = screen.getByLabelText('Test Label');
    expect(checkbox).toBeChecked();
  });

  it('should render checkbox with custom indeterminate', () => {
    render(
      <TestWrapper>
        <FormCheckbox
          name="test"
          label="Test Label"
          control={{} as any}
          indeterminate
        />
      </TestWrapper>,
    );

    const checkbox = screen.getByLabelText('Test Label');
    expect(checkbox).toHaveAttribute('indeterminate');
  });

  it('should render checkbox with custom disableRipple', () => {
    render(
      <TestWrapper>
        <FormCheckbox
          name="test"
          label="Test Label"
          control={{} as any}
          disableRipple
        />
      </TestWrapper>,
    );

    const checkbox = screen.getByLabelText('Test Label');
    expect(checkbox).toHaveAttribute('disableRipple');
  });

  it('should render checkbox with custom icon', () => {
    render(
      <TestWrapper>
        <FormCheckbox
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

  it('should render checkbox with custom checkedIcon', () => {
    render(
      <TestWrapper>
        <FormCheckbox
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
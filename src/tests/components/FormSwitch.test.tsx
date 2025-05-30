import { render, screen, fireEvent } from '@testing-library/react';
import { FormSwitch } from '@/components/FormSwitch';
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

describe('FormSwitch', () => {
  it('should render switch with label', () => {
    render(
      <TestWrapper>
        <FormSwitch
          name="test"
          label="Test Label"
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('should render switch with helper text', () => {
    render(
      <TestWrapper>
        <FormSwitch
          name="test"
          label="Test Label"
          helperText="Test Helper"
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByText('Test Helper')).toBeInTheDocument();
  });

  it('should render switch with error message', () => {
    const { control } = useForm();
    const error = { message: 'Test Error' };

    render(
      <TestWrapper>
        <FormSwitch
          name="test"
          label="Test Label"
          control={control}
          error={error}
        />
      </TestWrapper>,
    );

    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });

  it('should render switch with custom size', () => {
    render(
      <TestWrapper>
        <FormSwitch
          name="test"
          label="Test Label"
          size="small"
          control={{} as any}
        />
      </TestWrapper>,
    );

    const switch_ = screen.getByLabelText('Test Label');
    expect(switch_).toHaveClass('MuiSwitch-sizeSmall');
  });

  it('should render switch with custom color', () => {
    render(
      <TestWrapper>
        <FormSwitch
          name="test"
          label="Test Label"
          color="primary"
          control={{} as any}
        />
      </TestWrapper>,
    );

    const switch_ = screen.getByLabelText('Test Label');
    expect(switch_).toHaveClass('MuiSwitch-colorPrimary');
  });

  it('should render switch with custom disabled', () => {
    render(
      <TestWrapper>
        <FormSwitch
          name="test"
          label="Test Label"
          disabled
          control={{} as any}
        />
      </TestWrapper>,
    );

    const switch_ = screen.getByLabelText('Test Label');
    expect(switch_).toBeDisabled();
  });

  it('should render switch with custom required', () => {
    render(
      <TestWrapper>
        <FormSwitch
          name="test"
          label="Test Label"
          required
          control={{} as any}
        />
      </TestWrapper>,
    );

    const switch_ = screen.getByLabelText('Test Label');
    expect(switch_).toBeRequired();
  });

  it('should handle switch change', () => {
    const { control } = useForm();
    const onChange = jest.fn();

    render(
      <TestWrapper>
        <FormSwitch
          name="test"
          label="Test Label"
          control={control}
          onChange={onChange}
        />
      </TestWrapper>,
    );

    const switch_ = screen.getByLabelText('Test Label');
    fireEvent.click(switch_);

    expect(onChange).toHaveBeenCalled();
  });

  it('should handle switch blur', () => {
    const { control } = useForm();
    const onBlur = jest.fn();

    render(
      <TestWrapper>
        <FormSwitch
          name="test"
          label="Test Label"
          control={control}
          onBlur={onBlur}
        />
      </TestWrapper>,
    );

    const switch_ = screen.getByLabelText('Test Label');
    fireEvent.blur(switch_);

    expect(onBlur).toHaveBeenCalled();
  });

  it('should handle switch focus', () => {
    const { control } = useForm();
    const onFocus = jest.fn();

    render(
      <TestWrapper>
        <FormSwitch
          name="test"
          label="Test Label"
          control={control}
          onFocus={onFocus}
        />
      </TestWrapper>,
    );

    const switch_ = screen.getByLabelText('Test Label');
    fireEvent.focus(switch_);

    expect(onFocus).toHaveBeenCalled();
  });

  it('should render switch with custom inputProps', () => {
    render(
      <TestWrapper>
        <FormSwitch
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

  it('should render switch with custom FormControlLabelProps', () => {
    render(
      <TestWrapper>
        <FormSwitch
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

  it('should render switch with custom FormHelperTextProps', () => {
    render(
      <TestWrapper>
        <FormSwitch
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

  it('should render switch with custom FormControlProps', () => {
    render(
      <TestWrapper>
        <FormSwitch
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

  it('should render switch with custom SwitchProps', () => {
    render(
      <TestWrapper>
        <FormSwitch
          name="test"
          label="Test Label"
          control={{} as any}
          SwitchProps={{ 'data-testid': 'test-switch' }}
        />
      </TestWrapper>,
    );

    const switch_ = screen.getByTestId('test-switch');
    expect(switch_).toBeInTheDocument();
  });

  it('should render switch with custom checked', () => {
    render(
      <TestWrapper>
        <FormSwitch
          name="test"
          label="Test Label"
          control={{} as any}
          checked
        />
      </TestWrapper>,
    );

    const switch_ = screen.getByLabelText('Test Label');
    expect(switch_).toBeChecked();
  });

  it('should render switch with custom defaultChecked', () => {
    render(
      <TestWrapper>
        <FormSwitch
          name="test"
          label="Test Label"
          control={{} as any}
          defaultChecked
        />
      </TestWrapper>,
    );

    const switch_ = screen.getByLabelText('Test Label');
    expect(switch_).toBeChecked();
  });
}); 
import { render, screen, fireEvent } from '@testing-library/react';
import { FormSlider } from '@/components/FormSlider';
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

describe('FormSlider', () => {
  it('should render slider with label', () => {
    render(
      <TestWrapper>
        <FormSlider
          name="test"
          label="Test Label"
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('should render slider with helper text', () => {
    render(
      <TestWrapper>
        <FormSlider
          name="test"
          label="Test Label"
          helperText="Test Helper"
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByText('Test Helper')).toBeInTheDocument();
  });

  it('should render slider with error message', () => {
    const { control } = useForm();
    const error = { message: 'Test Error' };

    render(
      <TestWrapper>
        <FormSlider
          name="test"
          label="Test Label"
          control={control}
          error={error}
        />
      </TestWrapper>,
    );

    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });

  it('should render slider with custom size', () => {
    render(
      <TestWrapper>
        <FormSlider
          name="test"
          label="Test Label"
          size="small"
          control={{} as any}
        />
      </TestWrapper>,
    );

    const slider = screen.getByLabelText('Test Label');
    expect(slider).toHaveClass('MuiSlider-sizeSmall');
  });

  it('should render slider with custom color', () => {
    render(
      <TestWrapper>
        <FormSlider
          name="test"
          label="Test Label"
          color="primary"
          control={{} as any}
        />
      </TestWrapper>,
    );

    const slider = screen.getByLabelText('Test Label');
    expect(slider).toHaveClass('MuiSlider-colorPrimary');
  });

  it('should render slider with custom disabled', () => {
    render(
      <TestWrapper>
        <FormSlider
          name="test"
          label="Test Label"
          disabled
          control={{} as any}
        />
      </TestWrapper>,
    );

    const slider = screen.getByLabelText('Test Label');
    expect(slider).toBeDisabled();
  });

  it('should render slider with custom required', () => {
    render(
      <TestWrapper>
        <FormSlider
          name="test"
          label="Test Label"
          required
          control={{} as any}
        />
      </TestWrapper>,
    );

    const slider = screen.getByLabelText('Test Label');
    expect(slider).toBeRequired();
  });

  it('should handle slider change', () => {
    const { control } = useForm();
    const onChange = jest.fn();

    render(
      <TestWrapper>
        <FormSlider
          name="test"
          label="Test Label"
          control={control}
          onChange={onChange}
        />
      </TestWrapper>,
    );

    const slider = screen.getByLabelText('Test Label');
    fireEvent.change(slider, { target: { value: 50 } });

    expect(onChange).toHaveBeenCalled();
  });

  it('should handle slider blur', () => {
    const { control } = useForm();
    const onBlur = jest.fn();

    render(
      <TestWrapper>
        <FormSlider
          name="test"
          label="Test Label"
          control={control}
          onBlur={onBlur}
        />
      </TestWrapper>,
    );

    const slider = screen.getByLabelText('Test Label');
    fireEvent.blur(slider);

    expect(onBlur).toHaveBeenCalled();
  });

  it('should handle slider focus', () => {
    const { control } = useForm();
    const onFocus = jest.fn();

    render(
      <TestWrapper>
        <FormSlider
          name="test"
          label="Test Label"
          control={control}
          onFocus={onFocus}
        />
      </TestWrapper>,
    );

    const slider = screen.getByLabelText('Test Label');
    fireEvent.focus(slider);

    expect(onFocus).toHaveBeenCalled();
  });

  it('should render slider with custom inputProps', () => {
    render(
      <TestWrapper>
        <FormSlider
          name="test"
          label="Test Label"
          control={{} as any}
          inputProps={{ 'data-testid': 'test-input' }}
        />
      </TestWrapper>,
    );

    const slider = screen.getByTestId('test-input');
    expect(slider).toBeInTheDocument();
  });

  it('should render slider with custom FormControlLabelProps', () => {
    render(
      <TestWrapper>
        <FormSlider
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

  it('should render slider with custom FormHelperTextProps', () => {
    render(
      <TestWrapper>
        <FormSlider
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

  it('should render slider with custom FormControlProps', () => {
    render(
      <TestWrapper>
        <FormSlider
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

  it('should render slider with custom SliderProps', () => {
    render(
      <TestWrapper>
        <FormSlider
          name="test"
          label="Test Label"
          control={{} as any}
          SliderProps={{ 'data-testid': 'test-slider' }}
        />
      </TestWrapper>,
    );

    const slider = screen.getByTestId('test-slider');
    expect(slider).toBeInTheDocument();
  });

  it('should render slider with custom marks', () => {
    const marks = [
      { value: 0, label: '0' },
      { value: 50, label: '50' },
      { value: 100, label: '100' },
    ];

    render(
      <TestWrapper>
        <FormSlider
          name="test"
          label="Test Label"
          control={{} as any}
          marks={marks}
        />
      </TestWrapper>,
    );

    marks.forEach((mark) => {
      expect(screen.getByText(mark.label)).toBeInTheDocument();
    });
  });

  it('should render slider with custom min and max', () => {
    render(
      <TestWrapper>
        <FormSlider
          name="test"
          label="Test Label"
          control={{} as any}
          min={0}
          max={100}
        />
      </TestWrapper>,
    );

    const slider = screen.getByLabelText('Test Label');
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '100');
  });

  it('should render slider with custom step', () => {
    render(
      <TestWrapper>
        <FormSlider
          name="test"
          label="Test Label"
          control={{} as any}
          step={10}
        />
      </TestWrapper>,
    );

    const slider = screen.getByLabelText('Test Label');
    expect(slider).toHaveAttribute('step', '10');
  });

  it('should render slider with custom valueLabelDisplay', () => {
    render(
      <TestWrapper>
        <FormSlider
          name="test"
          label="Test Label"
          control={{} as any}
          valueLabelDisplay="auto"
        />
      </TestWrapper>,
    );

    const slider = screen.getByLabelText('Test Label');
    expect(slider).toHaveAttribute('aria-valuetext', '0');
  });

  it('should render slider with custom valueLabelFormat', () => {
    render(
      <TestWrapper>
        <FormSlider
          name="test"
          label="Test Label"
          control={{} as any}
          valueLabelFormat={(value) => `${value}%`}
        />
      </TestWrapper>,
    );

    const slider = screen.getByLabelText('Test Label');
    expect(slider).toHaveAttribute('aria-valuetext', '0%');
  });
}); 
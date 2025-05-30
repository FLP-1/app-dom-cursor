import { render, screen, fireEvent } from '@testing-library/react';
import { FormAutocomplete } from '@/components/FormAutocomplete';
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

describe('FormAutocomplete', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  it('should render autocomplete with label', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('should render autocomplete with placeholder', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          placeholder="Test Placeholder"
          options={options}
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
  });

  it('should render autocomplete with helper text', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          helperText="Test Helper"
          options={options}
          control={{} as any}
        />
      </TestWrapper>,
    );

    expect(screen.getByText('Test Helper')).toBeInTheDocument();
  });

  it('should render autocomplete with error message', () => {
    const { control } = useForm();
    const error = { message: 'Test Error' };

    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          control={control}
          error={error}
        />
      </TestWrapper>,
    );

    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });

  it('should render autocomplete with custom size', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          size="small"
          options={options}
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveClass('MuiInputBase-sizeSmall');
  });

  it('should render autocomplete with custom variant', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          variant="outlined"
          options={options}
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveClass('MuiOutlinedInput-root');
  });

  it('should render autocomplete with custom color', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          color="primary"
          options={options}
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveClass('MuiInputBase-colorPrimary');
  });

  it('should render autocomplete with custom fullWidth', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          fullWidth
          options={options}
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveClass('MuiInputBase-fullWidth');
  });

  it('should render autocomplete with custom disabled', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          disabled
          options={options}
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toBeDisabled();
  });

  it('should render autocomplete with custom required', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          required
          options={options}
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toBeRequired();
  });

  it('should handle autocomplete change', () => {
    const { control } = useForm();
    const onChange = jest.fn();

    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          control={control}
          onChange={onChange}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: 'Option 1' } });

    expect(onChange).toHaveBeenCalled();
  });

  it('should handle autocomplete blur', () => {
    const { control } = useForm();
    const onBlur = jest.fn();

    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          control={control}
          onBlur={onBlur}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    fireEvent.blur(input);

    expect(onBlur).toHaveBeenCalled();
  });

  it('should handle autocomplete focus', () => {
    const { control } = useForm();
    const onFocus = jest.fn();

    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          control={control}
          onFocus={onFocus}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    fireEvent.focus(input);

    expect(onFocus).toHaveBeenCalled();
  });

  it('should render autocomplete with custom inputProps', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          control={{} as any}
          inputProps={{ 'data-testid': 'test-input' }}
        />
      </TestWrapper>,
    );

    const input = screen.getByTestId('test-input');
    expect(input).toBeInTheDocument();
  });

  it('should render autocomplete with custom FormControlProps', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          control={{} as any}
          FormControlProps={{ 'data-testid': 'test-control' }}
        />
      </TestWrapper>,
    );

    const control = screen.getByTestId('test-control');
    expect(control).toBeInTheDocument();
  });

  it('should render autocomplete with custom TextFieldProps', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          control={{} as any}
          TextFieldProps={{ 'data-testid': 'test-textfield' }}
        />
      </TestWrapper>,
    );

    const textfield = screen.getByTestId('test-textfield');
    expect(textfield).toBeInTheDocument();
  });

  it('should render autocomplete with custom value', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          value={options[0]}
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveValue('Option 1');
  });

  it('should render autocomplete with custom defaultValue', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          defaultValue={options[0]}
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveValue('Option 1');
  });

  it('should render autocomplete with custom multiple', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          multiple
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('multiple');
  });

  it('should render autocomplete with custom freeSolo', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          freeSolo
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('freeSolo');
  });

  it('should render autocomplete with custom autoComplete', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          autoComplete
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('autoComplete');
  });

  it('should render autocomplete with custom autoHighlight', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          autoHighlight
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('autoHighlight');
  });

  it('should render autocomplete with custom autoSelect', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          autoSelect
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('autoSelect');
  });

  it('should render autocomplete with custom blurOnSelect', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          blurOnSelect
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('blurOnSelect');
  });

  it('should render autocomplete with custom clearOnBlur', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          clearOnBlur
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('clearOnBlur');
  });

  it('should render autocomplete with custom clearOnEscape', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          clearOnEscape
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('clearOnEscape');
  });

  it('should render autocomplete with custom disableClearable', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          disableClearable
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('disableClearable');
  });

  it('should render autocomplete with custom disableCloseOnSelect', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          disableCloseOnSelect
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('disableCloseOnSelect');
  });

  it('should render autocomplete with custom disableListWrap', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          disableListWrap
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('disableListWrap');
  });

  it('should render autocomplete with custom disableOpenOnFocus', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          disableOpenOnFocus
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('disableOpenOnFocus');
  });

  it('should render autocomplete with custom disablePortal', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          disablePortal
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('disablePortal');
  });

  it('should render autocomplete with custom filterSelectedOptions', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          filterSelectedOptions
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('filterSelectedOptions');
  });

  it('should render autocomplete with custom includeInputInList', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          includeInputInList
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('includeInputInList');
  });

  it('should render autocomplete with custom limitTags', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          limitTags={2}
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('limitTags', '2');
  });

  it('should render autocomplete with custom loading', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          loading
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('loading');
  });

  it('should render autocomplete with custom loadingText', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          loadingText="Loading..."
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('loadingText', 'Loading...');
  });

  it('should render autocomplete with custom noOptionsText', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          noOptionsText="No options"
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('noOptionsText', 'No options');
  });

  it('should render autocomplete with custom open', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          open
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('open');
  });

  it('should render autocomplete with custom openOnFocus', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          openOnFocus
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('openOnFocus');
  });

  it('should render autocomplete with custom openText', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          openText="Open"
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('openText', 'Open');
  });

  it('should render autocomplete with custom popupIcon', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          popupIcon={<span data-testid="test-icon">Icon</span>}
          control={{} as any}
        />
      </TestWrapper>,
    );

    const icon = screen.getByTestId('test-icon');
    expect(icon).toBeInTheDocument();
  });

  it('should render autocomplete with custom renderInput', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          renderInput={(params) => <input {...params} data-testid="test-input" />}
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByTestId('test-input');
    expect(input).toBeInTheDocument();
  });

  it('should render autocomplete with custom renderOption', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          renderOption={(props, option) => (
            <li {...props} data-testid="test-option">
              {option.label}
            </li>
          )}
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    fireEvent.click(input);

    const option = screen.getByTestId('test-option');
    expect(option).toBeInTheDocument();
  });

  it('should render autocomplete with custom renderTags', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          multiple
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <span {...getTagProps({ index })} data-testid="test-tag">
                {option.label}
              </span>
            ))
          }
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: 'Option 1' } });

    const tag = screen.getByTestId('test-tag');
    expect(tag).toBeInTheDocument();
  });

  it('should render autocomplete with custom selectOnFocus', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          selectOnFocus
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('selectOnFocus');
  });

  it('should render autocomplete with custom size', () => {
    render(
      <TestWrapper>
        <FormAutocomplete
          name="test"
          label="Test Label"
          options={options}
          size="small"
          control={{} as any}
        />
      </TestWrapper>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveClass('MuiInputBase-sizeSmall');
  });
}); 
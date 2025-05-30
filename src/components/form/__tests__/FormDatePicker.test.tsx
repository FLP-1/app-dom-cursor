import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormDatePicker } from '../FormDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ptBR from 'date-fns/locale/pt-BR';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      data: null,
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <FormProvider {...methods}>{children}</FormProvider>
    </LocalizationProvider>
  );
};

describe('FormDatePicker', () => {
  it('deve renderizar corretamente', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="data" label="Data" />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Data')).toBeInTheDocument();
  });

  it('deve mostrar erro de validação', async () => {
    const TestWrapperWithValidation = ({ children }: { children: React.ReactNode }) => {
      const methods = useForm({
        defaultValues: {
          data: null,
        },
        mode: 'onChange',
      });

      return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <FormProvider {...methods}>{children}</FormProvider>
        </LocalizationProvider>
      );
    };

    render(
      <TestWrapperWithValidation>
        <FormDatePicker
          name="data"
          label="Data"
          rules={{
            required: 'Data é obrigatória',
          }}
        />
      </TestWrapperWithValidation>
    );

    const input = screen.getByLabelText('Data');
    fireEvent.blur(input);

    expect(await screen.findByText('Data é obrigatória')).toBeInTheDocument();
  });

  it('deve aceitar e exibir o valor selecionado', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="data" label="Data" />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Data');
    fireEvent.change(input, { target: { value: '01/01/2024' } });

    expect(input).toHaveValue('01/01/2024');
  });

  it('deve aceitar e exibir o valor inicial', () => {
    const TestWrapperWithInitialValue = ({ children }: { children: React.ReactNode }) => {
      const methods = useForm({
        defaultValues: {
          data: new Date('2024-01-01'),
        },
      });

      return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <FormProvider {...methods}>{children}</FormProvider>
        </LocalizationProvider>
      );
    };

    render(
      <TestWrapperWithInitialValue>
        <FormDatePicker name="data" label="Data" />
      </TestWrapperWithInitialValue>
    );

    expect(screen.getByLabelText('Data')).toHaveValue('01/01/2024');
  });

  it('deve aceitar e exibir o helperText', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="data" label="Data" helperText="Selecione uma data" />
      </TestWrapper>
    );

    expect(screen.getByText('Selecione uma data')).toBeInTheDocument();
  });

  it('deve aceitar e exibir o placeholder', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="data" label="Data" placeholder="DD/MM/AAAA" />
      </TestWrapper>
    );

    expect(screen.getByPlaceholderText('DD/MM/AAAA')).toBeInTheDocument();
  });

  it('deve aceitar e exibir o disabled', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="data" label="Data" disabled />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Data')).toBeDisabled();
  });

  it('deve aceitar e exibir o required', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="data" label="Data" required />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Data *')).toBeInTheDocument();
  });

  it('deve aceitar e exibir o fullWidth', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="data" label="Data" fullWidth />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Data')).toHaveStyle({ width: '100%' });
  });

  it('deve aceitar e exibir o size', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="data" label="Data" size="small" />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Data')).toHaveAttribute('size', 'small');
  });

  it('deve aceitar e exibir o variant', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="data" label="Data" variant="outlined" />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Data')).toHaveAttribute('variant', 'outlined');
  });

  it('deve aceitar e exibir o color', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="data" label="Data" color="primary" />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Data')).toHaveAttribute('color', 'primary');
  });

  it('deve aceitar e exibir o margin', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="data" label="Data" margin="normal" />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Data')).toHaveAttribute('margin', 'normal');
  });

  it('deve aceitar e exibir o autoFocus', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="data" label="Data" autoFocus />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Data')).toHaveFocus();
  });

  it('deve aceitar e exibir o inputProps', () => {
    render(
      <TestWrapper>
        <FormDatePicker
          name="data"
          label="Data"
          inputProps={{ 'data-testid': 'data-input' }}
        />
      </TestWrapper>
    );

    expect(screen.getByTestId('data-input')).toBeInTheDocument();
  });

  it('deve aceitar e exibir o format', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="data" label="Data" format="dd/MM/yyyy" />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Data');
    fireEvent.change(input, { target: { value: '01/01/2024' } });

    expect(input).toHaveValue('01/01/2024');
  });

  it('deve aceitar e exibir o minDate', () => {
    render(
      <TestWrapper>
        <FormDatePicker
          name="data"
          label="Data"
          minDate={new Date('2024-01-01')}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Data');
    fireEvent.change(input, { target: { value: '31/12/2023' } });

    expect(screen.getByText('Data inválida')).toBeInTheDocument();
  });

  it('deve aceitar e exibir o maxDate', () => {
    render(
      <TestWrapper>
        <FormDatePicker
          name="data"
          label="Data"
          maxDate={new Date('2024-12-31')}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Data');
    fireEvent.change(input, { target: { value: '01/01/2025' } });

    expect(screen.getByText('Data inválida')).toBeInTheDocument();
  });

  it('deve aceitar e exibir o disablePast', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="data" label="Data" disablePast />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Data');
    fireEvent.change(input, { target: { value: '31/12/2023' } });

    expect(screen.getByText('Data inválida')).toBeInTheDocument();
  });

  it('deve aceitar e exibir o disableFuture', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="data" label="Data" disableFuture />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Data');
    fireEvent.change(input, { target: { value: '01/01/2025' } });

    expect(screen.getByText('Data inválida')).toBeInTheDocument();
  });

  it('deve aceitar e exibir o views', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="data" label="Data" views={['year', 'month']} />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Data');
    fireEvent.click(input);

    expect(screen.getByRole('button', { name: 'Ano' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Mês' })).toBeInTheDocument();
  });

  it('deve aceitar e exibir o openTo', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="data" label="Data" openTo="year" />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Data');
    fireEvent.click(input);

    expect(screen.getByRole('button', { name: 'Ano' })).toBeInTheDocument();
  });

  it('deve aceitar e exibir o orientation', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="data" label="Data" orientation="landscape" />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Data');
    fireEvent.click(input);

    expect(screen.getByRole('dialog')).toHaveStyle({ flexDirection: 'row' });
  });
}); 
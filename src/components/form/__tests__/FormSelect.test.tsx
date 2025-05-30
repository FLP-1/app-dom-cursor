import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormSelect } from '../FormSelect';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      estado: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

const options = [
  { value: 'SP', label: 'São Paulo' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'MG', label: 'Minas Gerais' },
];

describe('FormSelect', () => {
  it('deve renderizar corretamente', () => {
    render(
      <TestWrapper>
        <FormSelect name="estado" label="Estado" options={options} />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Estado')).toBeInTheDocument();
  });

  it('deve mostrar erro de validação', async () => {
    const TestWrapperWithValidation = ({ children }: { children: React.ReactNode }) => {
      const methods = useForm({
        defaultValues: {
          estado: '',
        },
        mode: 'onChange',
      });

      return <FormProvider {...methods}>{children}</FormProvider>;
    };

    render(
      <TestWrapperWithValidation>
        <FormSelect
          name="estado"
          label="Estado"
          options={options}
          rules={{
            required: 'Estado é obrigatório',
          }}
        />
      </TestWrapperWithValidation>
    );

    const select = screen.getByLabelText('Estado');
    fireEvent.blur(select);

    expect(await screen.findByText('Estado é obrigatório')).toBeInTheDocument();
  });

  it('deve aceitar e exibir o valor selecionado', () => {
    render(
      <TestWrapper>
        <FormSelect name="estado" label="Estado" options={options} />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Estado');
    fireEvent.change(select, { target: { value: 'SP' } });

    expect(select).toHaveValue('SP');
  });

  it('deve aceitar e exibir o valor inicial', () => {
    const TestWrapperWithInitialValue = ({ children }: { children: React.ReactNode }) => {
      const methods = useForm({
        defaultValues: {
          estado: 'SP',
        },
      });

      return <FormProvider {...methods}>{children}</FormProvider>;
    };

    render(
      <TestWrapperWithInitialValue>
        <FormSelect name="estado" label="Estado" options={options} />
      </TestWrapperWithInitialValue>
    );

    expect(screen.getByLabelText('Estado')).toHaveValue('SP');
  });

  it('deve aceitar e exibir o helperText', () => {
    render(
      <TestWrapper>
        <FormSelect
          name="estado"
          label="Estado"
          options={options}
          helperText="Selecione seu estado"
        />
      </TestWrapper>
    );

    expect(screen.getByText('Selecione seu estado')).toBeInTheDocument();
  });

  it('deve aceitar e exibir o placeholder', () => {
    render(
      <TestWrapper>
        <FormSelect
          name="estado"
          label="Estado"
          options={options}
          placeholder="Selecione um estado"
        />
      </TestWrapper>
    );

    expect(screen.getByText('Selecione um estado')).toBeInTheDocument();
  });

  it('deve aceitar e exibir o disabled', () => {
    render(
      <TestWrapper>
        <FormSelect name="estado" label="Estado" options={options} disabled />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Estado')).toBeDisabled();
  });

  it('deve aceitar e exibir o required', () => {
    render(
      <TestWrapper>
        <FormSelect name="estado" label="Estado" options={options} required />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Estado *')).toBeInTheDocument();
  });

  it('deve aceitar e exibir o fullWidth', () => {
    render(
      <TestWrapper>
        <FormSelect name="estado" label="Estado" options={options} fullWidth />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Estado')).toHaveStyle({ width: '100%' });
  });

  it('deve aceitar e exibir o size', () => {
    render(
      <TestWrapper>
        <FormSelect name="estado" label="Estado" options={options} size="small" />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Estado')).toHaveAttribute('size', 'small');
  });

  it('deve aceitar e exibir o variant', () => {
    render(
      <TestWrapper>
        <FormSelect name="estado" label="Estado" options={options} variant="outlined" />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Estado')).toHaveAttribute('variant', 'outlined');
  });

  it('deve aceitar e exibir o color', () => {
    render(
      <TestWrapper>
        <FormSelect name="estado" label="Estado" options={options} color="primary" />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Estado')).toHaveAttribute('color', 'primary');
  });

  it('deve aceitar e exibir o margin', () => {
    render(
      <TestWrapper>
        <FormSelect name="estado" label="Estado" options={options} margin="normal" />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Estado')).toHaveAttribute('margin', 'normal');
  });

  it('deve aceitar e exibir o autoFocus', () => {
    render(
      <TestWrapper>
        <FormSelect name="estado" label="Estado" options={options} autoFocus />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Estado')).toHaveFocus();
  });

  it('deve aceitar e exibir o inputProps', () => {
    render(
      <TestWrapper>
        <FormSelect
          name="estado"
          label="Estado"
          options={options}
          inputProps={{ 'data-testid': 'estado-select' }}
        />
      </TestWrapper>
    );

    expect(screen.getByTestId('estado-select')).toBeInTheDocument();
  });

  it('deve aceitar e exibir o SelectProps', () => {
    render(
      <TestWrapper>
        <FormSelect
          name="estado"
          label="Estado"
          options={options}
          SelectProps={{ 'data-testid': 'estado-select' }}
        />
      </TestWrapper>
    );

    expect(screen.getByTestId('estado-select')).toBeInTheDocument();
  });

  it('deve aceitar e exibir o multiple', () => {
    const TestWrapperWithMultiple = ({ children }: { children: React.ReactNode }) => {
      const methods = useForm({
        defaultValues: {
          estados: [],
        },
      });

      return <FormProvider {...methods}>{children}</FormProvider>;
    };

    render(
      <TestWrapperWithMultiple>
        <FormSelect name="estados" label="Estados" options={options} multiple />
      </TestWrapperWithMultiple>
    );

    expect(screen.getByLabelText('Estados')).toHaveAttribute('multiple');
  });

  it('deve aceitar e exibir o native', () => {
    render(
      <TestWrapper>
        <FormSelect name="estado" label="Estado" options={options} native />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Estado')).toHaveAttribute('native');
  });
}); 
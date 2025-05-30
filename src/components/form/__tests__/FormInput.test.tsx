import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from '../FormInput';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      nome: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('FormInput', () => {
  it('deve renderizar corretamente', () => {
    render(
      <TestWrapper>
        <FormInput name="nome" label="Nome" />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
  });

  it('deve mostrar erro de validação', async () => {
    const TestWrapperWithValidation = ({ children }: { children: React.ReactNode }) => {
      const methods = useForm({
        defaultValues: {
          nome: '',
        },
        mode: 'onChange',
      });

      return <FormProvider {...methods}>{children}</FormProvider>;
    };

    render(
      <TestWrapperWithValidation>
        <FormInput
          name="nome"
          label="Nome"
          rules={{
            required: 'Nome é obrigatório',
            minLength: {
              value: 3,
              message: 'Nome deve ter no mínimo 3 caracteres',
            },
          }}
        />
      </TestWrapperWithValidation>
    );

    const input = screen.getByLabelText('Nome');
    fireEvent.change(input, { target: { value: 'Jo' } });
    fireEvent.blur(input);

    expect(await screen.findByText('Nome deve ter no mínimo 3 caracteres')).toBeInTheDocument();
  });

  it('deve mostrar erro quando o campo é obrigatório', async () => {
    const TestWrapperWithValidation = ({ children }: { children: React.ReactNode }) => {
      const methods = useForm({
        defaultValues: {
          nome: '',
        },
        mode: 'onChange',
      });

      return <FormProvider {...methods}>{children}</FormProvider>;
    };

    render(
      <TestWrapperWithValidation>
        <FormInput
          name="nome"
          label="Nome"
          rules={{
            required: 'Nome é obrigatório',
          }}
        />
      </TestWrapperWithValidation>
    );

    const input = screen.getByLabelText('Nome');
    fireEvent.blur(input);

    expect(await screen.findByText('Nome é obrigatório')).toBeInTheDocument();
  });

  it('deve aceitar e exibir o valor digitado', () => {
    render(
      <TestWrapper>
        <FormInput name="nome" label="Nome" />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Nome');
    fireEvent.change(input, { target: { value: 'João Silva' } });

    expect(input).toHaveValue('João Silva');
  });

  it('deve aceitar e exibir o valor inicial', () => {
    const TestWrapperWithInitialValue = ({ children }: { children: React.ReactNode }) => {
      const methods = useForm({
        defaultValues: {
          nome: 'João Silva',
        },
      });

      return <FormProvider {...methods}>{children}</FormProvider>;
    };

    render(
      <TestWrapperWithInitialValue>
        <FormInput name="nome" label="Nome" />
      </TestWrapperWithInitialValue>
    );

    expect(screen.getByLabelText('Nome')).toHaveValue('João Silva');
  });

  it('deve aceitar e exibir o helperText', () => {
    render(
      <TestWrapper>
        <FormInput name="nome" label="Nome" helperText="Digite seu nome completo" />
      </TestWrapper>
    );

    expect(screen.getByText('Digite seu nome completo')).toBeInTheDocument();
  });

  it('deve aceitar e exibir o placeholder', () => {
    render(
      <TestWrapper>
        <FormInput name="nome" label="Nome" placeholder="Digite seu nome" />
      </TestWrapper>
    );

    expect(screen.getByPlaceholderText('Digite seu nome')).toBeInTheDocument();
  });

  it('deve aceitar e exibir o tipo do input', () => {
    render(
      <TestWrapper>
        <FormInput name="nome" label="Nome" type="email" />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Nome')).toHaveAttribute('type', 'email');
  });

  it('deve aceitar e exibir o disabled', () => {
    render(
      <TestWrapper>
        <FormInput name="nome" label="Nome" disabled />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Nome')).toBeDisabled();
  });

  it('deve aceitar e exibir o required', () => {
    render(
      <TestWrapper>
        <FormInput name="nome" label="Nome" required />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Nome *')).toBeInTheDocument();
  });

  it('deve aceitar e exibir o fullWidth', () => {
    render(
      <TestWrapper>
        <FormInput name="nome" label="Nome" fullWidth />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Nome')).toHaveStyle({ width: '100%' });
  });

  it('deve aceitar e exibir o size', () => {
    render(
      <TestWrapper>
        <FormInput name="nome" label="Nome" size="small" />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Nome')).toHaveAttribute('size', 'small');
  });

  it('deve aceitar e exibir o variant', () => {
    render(
      <TestWrapper>
        <FormInput name="nome" label="Nome" variant="outlined" />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Nome')).toHaveAttribute('variant', 'outlined');
  });

  it('deve aceitar e exibir o color', () => {
    render(
      <TestWrapper>
        <FormInput name="nome" label="Nome" color="primary" />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Nome')).toHaveAttribute('color', 'primary');
  });

  it('deve aceitar e exibir o margin', () => {
    render(
      <TestWrapper>
        <FormInput name="nome" label="Nome" margin="normal" />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Nome')).toHaveAttribute('margin', 'normal');
  });

  it('deve aceitar e exibir o autoFocus', () => {
    render(
      <TestWrapper>
        <FormInput name="nome" label="Nome" autoFocus />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Nome')).toHaveFocus();
  });

  it('deve aceitar e exibir o autoComplete', () => {
    render(
      <TestWrapper>
        <FormInput name="nome" label="Nome" autoComplete="name" />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Nome')).toHaveAttribute('autoComplete', 'name');
  });

  it('deve aceitar e exibir o inputProps', () => {
    render(
      <TestWrapper>
        <FormInput name="nome" label="Nome" inputProps={{ 'data-testid': 'nome-input' }} />
      </TestWrapper>
    );

    expect(screen.getByTestId('nome-input')).toBeInTheDocument();
  });
}); 
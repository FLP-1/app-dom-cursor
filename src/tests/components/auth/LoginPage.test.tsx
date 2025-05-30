import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import { useAuth } from '../../../contexts/AuthContext';
import { useNotification } from '../../../hooks';
import LoginPage from '../../../pages/auth/login';
import { useForm, FormProvider } from 'react-hook-form';

// Mock dos hooks
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../../../hooks', () => ({
  useNotification: jest.fn(),
}));

// Componente wrapper para o FormProvider
const FormWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({
    defaultValues: {
      cpf: '',
      password: '',
    },
    mode: 'onChange',
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('LoginPage', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockSignIn = jest.fn();
  const mockError = jest.fn();
  const mockSuccess = jest.fn();

  // Função auxiliar para renderizar com FormProvider
  function renderWithFormProvider(children: React.ReactNode) {
    return render(<FormWrapper>{children}</FormWrapper>);
  }

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useAuth as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
      loading: false,
    });
    (useNotification as jest.Mock).mockReturnValue({
      error: mockError,
      success: mockSuccess,
    });
  });

  it('deve renderizar o formulário de login', () => {
    renderWithFormProvider(<LoginPage />);

    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('deve validar CPF inválido', async () => {
    renderWithFormProvider(<LoginPage />);

    const cpfInput = screen.getByLabelText(/cpf/i);
    fireEvent.change(cpfInput, { target: { value: '123' } });
    fireEvent.blur(cpfInput);

    const submitButton = screen.getByRole('button', { name: /entrar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/cpf inválido/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('deve fazer login com sucesso', async () => {
    mockSignIn.mockResolvedValueOnce(undefined);

    renderWithFormProvider(<LoginPage />);

    const cpfInput = screen.getByLabelText(/cpf/i);
    const passwordInput = screen.getByLabelText(/senha/i);

    fireEvent.change(cpfInput, { target: { value: '12345678901' } });
    fireEvent.change(passwordInput, { target: { value: 'Test123!' } });

    const submitButton = screen.getByRole('button', { name: /entrar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('12345678901', 'Test123!');
      expect(mockSuccess).toHaveBeenCalledWith('Login realizado com sucesso!');
    }, { timeout: 3000 });
  });

  it('deve mostrar erro quando login falhar', async () => {
    const errorMessage = 'Credenciais inválidas';
    mockSignIn.mockRejectedValueOnce(new Error(errorMessage));

    renderWithFormProvider(<LoginPage />);

    const cpfInput = screen.getByLabelText(/cpf/i);
    const passwordInput = screen.getByLabelText(/senha/i);

    fireEvent.change(cpfInput, { target: { value: '12345678901' } });
    fireEvent.change(passwordInput, { target: { value: 'Test123!' } });

    const submitButton = screen.getByRole('button', { name: /entrar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockError).toHaveBeenCalledWith(errorMessage);
    }, { timeout: 3000 });
  });

  it('deve mostrar loading durante o login', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
      loading: true,
    });

    renderWithFormProvider(<LoginPage />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled();
  });
}); 
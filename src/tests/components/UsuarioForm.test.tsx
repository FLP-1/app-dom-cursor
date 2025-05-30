import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UsuarioForm } from '../../components/UsuarioForm';
import { useUsuarioForm } from '../../hooks/forms/useUsuarioForm';
import { usuarioService } from '../../services/usuario.service';

// Mock dos hooks e serviços
jest.mock('../../hooks/forms/useUsuarioForm');
jest.mock('../../services/usuario.service');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'pt'
    }
  })
}));

describe('UsuarioForm', () => {
  const mockInitialValues = {
    nome: 'João Silva',
    email: 'joao@email.com',
    senha: 'Senha@123',
    confirmarSenha: 'Senha@123',
    perfil: 'ADMIN',
    ativo: true
  };

  const mockFormHook = {
    control: {},
    handleSubmit: jest.fn(),
    formState: {
      errors: {},
      isSubmitting: false
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useUsuarioForm as jest.Mock).mockReturnValue(mockFormHook);
  });

  it('deve renderizar o formulário corretamente', () => {
    render(<UsuarioForm />);

    expect(screen.getByText('Dados do Usuário')).toBeInTheDocument();
    expect(screen.getByText('Acesso')).toBeInTheDocument();
  });

  it('deve exibir valores iniciais quando fornecidos', () => {
    render(<UsuarioForm initialValues={mockInitialValues} />);

    expect(screen.getByDisplayValue('João Silva')).toBeInTheDocument();
    expect(screen.getByDisplayValue('joao@email.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('ADMIN')).toBeInTheDocument();
  });

  it('deve chamar onSubmit ao enviar o formulário', async () => {
    const mockOnSubmit = jest.fn();
    render(<UsuarioForm onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(mockFormHook.handleSubmit).toHaveBeenCalledWith(mockOnSubmit);
    });
  });

  it('deve exibir erros de validação', () => {
    const mockErrors = {
      nome: { message: 'Nome é obrigatório' },
      email: { message: 'E-mail é obrigatório' },
      senha: { message: 'Senha é obrigatória' },
      confirmarSenha: { message: 'Confirmação de senha é obrigatória' },
      perfil: { message: 'Perfil é obrigatório' }
    };

    (useUsuarioForm as jest.Mock).mockReturnValue({
      ...mockFormHook,
      formState: {
        ...mockFormHook.formState,
        errors: mockErrors
      }
    });

    render(<UsuarioForm />);

    expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('E-mail é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument();
    expect(screen.getByText('Confirmação de senha é obrigatória')).toBeInTheDocument();
    expect(screen.getByText('Perfil é obrigatório')).toBeInTheDocument();
  });

  it('deve mostrar estado de carregamento durante o envio', () => {
    (useUsuarioForm as jest.Mock).mockReturnValue({
      ...mockFormHook,
      formState: {
        ...mockFormHook.formState,
        isSubmitting: true
      }
    });

    render(<UsuarioForm />);

    expect(screen.getByText('Salvando...')).toBeInTheDocument();
  });

  it('deve validar formato de e-mail', async () => {
    render(<UsuarioForm />);

    const emailInput = screen.getByLabelText('E-mail');
    fireEvent.change(emailInput, { target: { value: 'email-invalido' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText('E-mail inválido')).toBeInTheDocument();
    });
  });

  it('deve validar força da senha', async () => {
    render(<UsuarioForm />);

    const senhaInput = screen.getByLabelText('Senha');
    fireEvent.change(senhaInput, { target: { value: '123' } });
    fireEvent.blur(senhaInput);

    await waitFor(() => {
      expect(screen.getByText('A senha deve ter no mínimo 8 caracteres')).toBeInTheDocument();
    });
  });

  it('deve validar confirmação de senha', async () => {
    render(<UsuarioForm />);

    const senhaInput = screen.getByLabelText('Senha');
    const confirmarSenhaInput = screen.getByLabelText('Confirmar Senha');

    fireEvent.change(senhaInput, { target: { value: 'Senha@123' } });
    fireEvent.change(confirmarSenhaInput, { target: { value: 'Senha@456' } });
    fireEvent.blur(confirmarSenhaInput);

    await waitFor(() => {
      expect(screen.getByText('As senhas não conferem')).toBeInTheDocument();
    });
  });

  it('deve mostrar tooltips nos campos', () => {
    render(<UsuarioForm />);

    const tooltips = screen.getAllByRole('tooltip');
    expect(tooltips).toHaveLength(5); // Número total de campos com tooltip
  });
}); 
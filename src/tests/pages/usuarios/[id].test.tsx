import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { UsuarioPage } from '../../../pages/usuarios/[id]';
import { usuarioService } from '../../../services/usuario.service';

// Mock dos hooks e serviços
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

jest.mock('../../../services/usuario.service');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'pt'
    }
  })
}));

describe('UsuarioPage', () => {
  const mockUsuario = {
    id: '1',
    nome: 'João Silva',
    email: 'joao@email.com',
    senha: 'Senha@123',
    confirmarSenha: 'Senha@123',
    perfil: 'ADMIN',
    ativo: true
  };

  const mockRouter = {
    push: jest.fn(),
    query: { id: '1' }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usuarioService.get as jest.Mock).mockResolvedValue(mockUsuario);
  });

  it('deve renderizar a página de edição corretamente', async () => {
    render(<UsuarioPage />);

    await waitFor(() => {
      expect(screen.getByText('Editar Usuário')).toBeInTheDocument();
      expect(screen.getByDisplayValue('João Silva')).toBeInTheDocument();
      expect(screen.getByDisplayValue('joao@email.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('ADMIN')).toBeInTheDocument();
    });
  });

  it('deve renderizar a página de novo usuário corretamente', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });

    render(<UsuarioPage />);

    expect(screen.getByText('Novo Usuário')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toHaveValue('');
    expect(screen.getByLabelText('E-mail')).toHaveValue('');
    expect(screen.getByLabelText('Senha')).toHaveValue('');
    expect(screen.getByLabelText('Confirmar Senha')).toHaveValue('');
  });

  it('deve salvar novo usuário com sucesso', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });
    (usuarioService.create as jest.Mock).mockResolvedValueOnce(mockUsuario);

    render(<UsuarioPage />);

    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'João Silva' } });
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'joao@email.com' } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'Senha@123' } });
    fireEvent.change(screen.getByLabelText('Confirmar Senha'), { target: { value: 'Senha@123' } });
    fireEvent.change(screen.getByLabelText('Perfil'), { target: { value: 'ADMIN' } });

    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(usuarioService.create).toHaveBeenCalled();
      expect(mockRouter.push).toHaveBeenCalledWith('/usuarios');
    });
  });

  it('deve atualizar usuário existente com sucesso', async () => {
    (usuarioService.update as jest.Mock).mockResolvedValueOnce(mockUsuario);

    render(<UsuarioPage />);

    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'João Silva Atualizado' } });
    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(usuarioService.update).toHaveBeenCalledWith('1', expect.any(Object));
      expect(mockRouter.push).toHaveBeenCalledWith('/usuarios');
    });
  });

  it('deve mostrar erro ao falhar ao salvar', async () => {
    const mockError = new Error('Erro ao salvar usuário');
    (usuarioService.create as jest.Mock).mockRejectedValueOnce(mockError);

    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });

    render(<UsuarioPage />);

    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'João Silva' } });
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'joao@email.com' } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'Senha@123' } });
    fireEvent.change(screen.getByLabelText('Confirmar Senha'), { target: { value: 'Senha@123' } });
    fireEvent.change(screen.getByLabelText('Perfil'), { target: { value: 'ADMIN' } });

    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(screen.getByText('Erro ao salvar usuário')).toBeInTheDocument();
    });
  });

  it('deve validar campos obrigatórios', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });

    render(<UsuarioPage />);

    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('E-mail é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument();
      expect(screen.getByText('Confirmação de senha é obrigatória')).toBeInTheDocument();
      expect(screen.getByText('Perfil é obrigatório')).toBeInTheDocument();
    });
  });

  it('deve validar formato de e-mail', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });

    render(<UsuarioPage />);

    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'email-invalido' } });
    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(screen.getByText('E-mail inválido')).toBeInTheDocument();
    });
  });

  it('deve validar força da senha', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });

    render(<UsuarioPage />);

    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Confirmar Senha'), { target: { value: '123' } });
    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(screen.getByText('A senha deve ter no mínimo 8 caracteres')).toBeInTheDocument();
    });
  });

  it('deve validar confirmação de senha', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });

    render(<UsuarioPage />);

    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'Senha@123' } });
    fireEvent.change(screen.getByLabelText('Confirmar Senha'), { target: { value: 'Senha@456' } });
    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(screen.getByText('As senhas não conferem')).toBeInTheDocument();
    });
  });
}); 
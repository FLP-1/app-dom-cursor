import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { UsuariosPage } from '../../../pages/usuarios';
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

describe('UsuariosPage', () => {
  const mockUsuario = {
    id: '1',
    nome: 'João Silva',
    email: 'joao@email.com',
    perfil: 'ADMIN',
    ativo: true
  };

  const mockRouter = {
    push: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usuarioService.list as jest.Mock).mockResolvedValue({
      data: [mockUsuario],
      total: 1,
      page: 1,
      limit: 10
    });
  });

  it('deve renderizar a página corretamente', async () => {
    render(<UsuariosPage />);

    expect(screen.getByText('Usuários')).toBeInTheDocument();
    expect(screen.getByText('Novo Usuário')).toBeInTheDocument();
    expect(screen.getByText('João Silva')).toBeInTheDocument();
  });

  it('deve navegar para a página de novo usuário ao clicar no botão', () => {
    render(<UsuariosPage />);

    fireEvent.click(screen.getByText('Novo Usuário'));

    expect(mockRouter.push).toHaveBeenCalledWith('/usuarios/novo');
  });

  it('deve navegar para a página de edição ao clicar no botão de editar', () => {
    render(<UsuariosPage />);

    fireEvent.click(screen.getByTestId('edit-button-1'));

    expect(mockRouter.push).toHaveBeenCalledWith('/usuarios/1');
  });

  it('deve abrir modal de confirmação ao clicar no botão de excluir', () => {
    render(<UsuariosPage />);

    fireEvent.click(screen.getByTestId('delete-button-1'));

    expect(screen.getByText('Confirmar Exclusão')).toBeInTheDocument();
    expect(screen.getByText('Tem certeza que deseja excluir este usuário?')).toBeInTheDocument();
  });

  it('deve excluir usuário ao confirmar exclusão', async () => {
    (usuarioService.delete as jest.Mock).mockResolvedValueOnce(undefined);

    render(<UsuariosPage />);

    fireEvent.click(screen.getByTestId('delete-button-1'));
    fireEvent.click(screen.getByText('Confirmar'));

    await waitFor(() => {
      expect(usuarioService.delete).toHaveBeenCalledWith('1');
      expect(usuarioService.list).toHaveBeenCalled();
    });
  });

  it('deve filtrar usuários por nome', async () => {
    render(<UsuariosPage />);

    const searchInput = screen.getByPlaceholderText('Buscar por nome ou e-mail');
    fireEvent.change(searchInput, { target: { value: 'João' } });

    await waitFor(() => {
      expect(usuarioService.list).toHaveBeenCalledWith({ nome: 'João' });
    });
  });

  it('deve filtrar usuários por e-mail', async () => {
    render(<UsuariosPage />);

    const searchInput = screen.getByPlaceholderText('Buscar por nome ou e-mail');
    fireEvent.change(searchInput, { target: { value: 'joao@email.com' } });

    await waitFor(() => {
      expect(usuarioService.list).toHaveBeenCalledWith({ email: 'joao@email.com' });
    });
  });

  it('deve filtrar usuários por perfil', async () => {
    render(<UsuariosPage />);

    const perfilSelect = screen.getByLabelText('Perfil');
    fireEvent.change(perfilSelect, { target: { value: 'ADMIN' } });

    await waitFor(() => {
      expect(usuarioService.list).toHaveBeenCalledWith({ perfil: 'ADMIN' });
    });
  });

  it('deve mostrar mensagem de erro ao falhar ao carregar usuários', async () => {
    const mockError = new Error('Erro ao carregar usuários');
    (usuarioService.list as jest.Mock).mockRejectedValueOnce(mockError);

    render(<UsuariosPage />);

    await waitFor(() => {
      expect(screen.getByText('Erro ao carregar usuários')).toBeInTheDocument();
    });
  });

  it('deve mostrar mensagem de erro ao falhar ao excluir usuário', async () => {
    const mockError = new Error('Erro ao excluir usuário');
    (usuarioService.delete as jest.Mock).mockRejectedValueOnce(mockError);

    render(<UsuariosPage />);

    fireEvent.click(screen.getByTestId('delete-button-1'));
    fireEvent.click(screen.getByText('Confirmar'));

    await waitFor(() => {
      expect(screen.getByText('Erro ao excluir usuário')).toBeInTheDocument();
    });
  });

  it('deve mostrar mensagem quando não houver usuários', async () => {
    (usuarioService.list as jest.Mock).mockResolvedValueOnce({
      data: [],
      total: 0,
      page: 1,
      limit: 10
    });

    render(<UsuariosPage />);

    await waitFor(() => {
      expect(screen.getByText('Nenhum usuário encontrado')).toBeInTheDocument();
    });
  });
}); 
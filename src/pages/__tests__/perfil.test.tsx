import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PerfilPage from '../perfil';
import { useAuth } from '../../hooks/useAuth';
import { messages } from '../../utils/messages';

// Mock do hook useAuth
jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

// Mock do fetch global
global.fetch = jest.fn();

describe('PerfilPage', () => {
  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    phone: '11999999999',
    cep: '12345678',
    logradouro: 'Rua Teste',
    numero: '123',
    complemento: 'Apto 1',
    bairro: 'Centro',
    cidade: 'São Paulo',
    estado: 'SP',
  };

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      loading: false,
    });

    (global.fetch as jest.Mock).mockClear();
  });

  it('deve renderizar a página de perfil com os dados do usuário', () => {
    render(<PerfilPage />);

    expect(screen.getByLabelText('Nome')).toHaveValue(mockUser.name);
    expect(screen.getByLabelText('Email')).toHaveValue(mockUser.email);
    expect(screen.getByLabelText('Telefone')).toHaveValue(mockUser.phone);
    expect(screen.getByLabelText('CEP')).toHaveValue(mockUser.cep);
    expect(screen.getByLabelText('Logradouro')).toHaveValue(mockUser.logradouro);
    expect(screen.getByLabelText('Número')).toHaveValue(mockUser.numero);
    expect(screen.getByLabelText('Complemento')).toHaveValue(mockUser.complemento);
    expect(screen.getByLabelText('Bairro')).toHaveValue(mockUser.bairro);
    expect(screen.getByLabelText('Cidade')).toHaveValue(mockUser.cidade);
    expect(screen.getByLabelText('Estado')).toHaveValue(mockUser.estado);
  });

  it('deve mostrar mensagem de carregamento quando os dados estão sendo carregados', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: true,
    });

    render(<PerfilPage />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('deve atualizar o perfil com sucesso', async () => {
    const updatedUser = { ...mockUser, name: 'Updated Name' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(updatedUser),
    });

    render(<PerfilPage />);

    const nameInput = screen.getByLabelText('Nome');
    fireEvent.change(nameInput, { target: { value: 'Updated Name' } });

    const submitButton = screen.getByText('Salvar Alterações');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/perfil', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...mockUser, name: 'Updated Name' }),
      });
    });

    expect(screen.getByText(messages.perfil.sucesso.atualizado)).toBeInTheDocument();
  });

  it('deve mostrar mensagem de erro quando a atualização falha', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<PerfilPage />);

    const submitButton = screen.getByText('Salvar Alterações');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(messages.perfil.erro.atualizacao)).toBeInTheDocument();
    });
  });

  it('deve validar campos obrigatórios', async () => {
    render(<PerfilPage />);

    const nameInput = screen.getByLabelText('Nome');
    fireEvent.change(nameInput, { target: { value: '' } });

    const submitButton = screen.getByText('Salvar Alterações');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(messages.perfil.validacao.nome)).toBeInTheDocument();
    });
  });

  it('deve mostrar componente de verificação de email quando o botão é clicado', () => {
    render(<PerfilPage />);

    const verifyEmailButton = screen.getByText('Verificar Email');
    fireEvent.click(verifyEmailButton);

    expect(screen.getByText('Verificação de Email')).toBeInTheDocument();
  });

  it('deve mostrar componente de verificação de telefone quando o botão é clicado', () => {
    render(<PerfilPage />);

    const verifyPhoneButton = screen.getByText('Verificar Celular');
    fireEvent.click(verifyPhoneButton);

    expect(screen.getByText('Verificação de Celular')).toBeInTheDocument();
  });

  it('deve desabilitar o campo de email durante a verificação', () => {
    render(<PerfilPage />);

    const verifyEmailButton = screen.getByText('Verificar Email');
    fireEvent.click(verifyEmailButton);

    expect(screen.getByLabelText('Email')).toBeDisabled();
  });

  it('deve desabilitar o campo de telefone durante a verificação', () => {
    render(<PerfilPage />);

    const verifyPhoneButton = screen.getByText('Verificar Celular');
    fireEvent.click(verifyPhoneButton);

    expect(screen.getByLabelText('Telefone')).toBeDisabled();
  });
}); 
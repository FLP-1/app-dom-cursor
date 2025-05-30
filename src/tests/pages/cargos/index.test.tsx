import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { CargosPage } from '../../../pages/cargos';
import { cargoService } from '../../../services/cargo.service';

// Mock dos hooks e serviços
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

jest.mock('../../../services/cargo.service');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'pt'
    }
  })
}));

describe('CargosPage', () => {
  const mockCargo = {
    id: '1',
    codigo: '1234-5',
    nome: 'Auxiliar de Serviços Gerais',
    descricao: 'Realiza serviços de limpeza e manutenção',
    categoria: '10',
    salarioBase: 1500,
    jornadaTrabalho: '40h',
    requisitos: 'Ensino Fundamental Completo',
    beneficios: 'Vale Transporte, Vale Refeição',
    ativo: true
  };

  const mockRouter = {
    push: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (cargoService.list as jest.Mock).mockResolvedValue({
      data: [mockCargo],
      total: 1,
      page: 1,
      limit: 10
    });
  });

  it('deve renderizar a página corretamente', async () => {
    render(<CargosPage />);

    expect(screen.getByText('Cargos')).toBeInTheDocument();
    expect(screen.getByText('Novo Cargo')).toBeInTheDocument();
    expect(screen.getByText('Auxiliar de Serviços Gerais')).toBeInTheDocument();
  });

  it('deve navegar para a página de novo cargo ao clicar no botão', () => {
    render(<CargosPage />);

    fireEvent.click(screen.getByText('Novo Cargo'));

    expect(mockRouter.push).toHaveBeenCalledWith('/cargos/novo');
  });

  it('deve navegar para a página de edição ao clicar no botão de editar', () => {
    render(<CargosPage />);

    fireEvent.click(screen.getByTestId('edit-button-1'));

    expect(mockRouter.push).toHaveBeenCalledWith('/cargos/1');
  });

  it('deve abrir modal de confirmação ao clicar no botão de excluir', () => {
    render(<CargosPage />);

    fireEvent.click(screen.getByTestId('delete-button-1'));

    expect(screen.getByText('Confirmar Exclusão')).toBeInTheDocument();
    expect(screen.getByText('Tem certeza que deseja excluir este cargo?')).toBeInTheDocument();
  });

  it('deve excluir cargo ao confirmar exclusão', async () => {
    (cargoService.delete as jest.Mock).mockResolvedValueOnce(undefined);

    render(<CargosPage />);

    fireEvent.click(screen.getByTestId('delete-button-1'));
    fireEvent.click(screen.getByText('Confirmar'));

    await waitFor(() => {
      expect(cargoService.delete).toHaveBeenCalledWith('1');
      expect(cargoService.list).toHaveBeenCalled();
    });
  });

  it('deve filtrar cargos por nome', async () => {
    render(<CargosPage />);

    const searchInput = screen.getByPlaceholderText('Buscar por nome ou código');
    fireEvent.change(searchInput, { target: { value: 'Auxiliar' } });

    await waitFor(() => {
      expect(cargoService.list).toHaveBeenCalledWith({ nome: 'Auxiliar' });
    });
  });

  it('deve filtrar cargos por código', async () => {
    render(<CargosPage />);

    const searchInput = screen.getByPlaceholderText('Buscar por nome ou código');
    fireEvent.change(searchInput, { target: { value: '1234-5' } });

    await waitFor(() => {
      expect(cargoService.list).toHaveBeenCalledWith({ codigo: '1234-5' });
    });
  });

  it('deve mostrar mensagem de erro ao falhar ao carregar cargos', async () => {
    const mockError = new Error('Erro ao carregar cargos');
    (cargoService.list as jest.Mock).mockRejectedValueOnce(mockError);

    render(<CargosPage />);

    await waitFor(() => {
      expect(screen.getByText('Erro ao carregar cargos')).toBeInTheDocument();
    });
  });

  it('deve mostrar mensagem de erro ao falhar ao excluir cargo', async () => {
    const mockError = new Error('Erro ao excluir cargo');
    (cargoService.delete as jest.Mock).mockRejectedValueOnce(mockError);

    render(<CargosPage />);

    fireEvent.click(screen.getByTestId('delete-button-1'));
    fireEvent.click(screen.getByText('Confirmar'));

    await waitFor(() => {
      expect(screen.getByText('Erro ao excluir cargo')).toBeInTheDocument();
    });
  });

  it('deve mostrar mensagem quando não houver cargos', async () => {
    (cargoService.list as jest.Mock).mockResolvedValueOnce({
      data: [],
      total: 0,
      page: 1,
      limit: 10
    });

    render(<CargosPage />);

    await waitFor(() => {
      expect(screen.getByText('Nenhum cargo encontrado')).toBeInTheDocument();
    });
  });
}); 
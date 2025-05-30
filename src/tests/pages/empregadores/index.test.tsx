import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { EmpregadoresPage } from '../../../pages/empregadores';
import { empregadorService } from '../../../services/empregador.service';

// Mock dos hooks e serviços
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

jest.mock('../../../services/empregador.service');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'pt'
    }
  })
}));

describe('EmpregadoresPage', () => {
  const mockEmpregador = {
    id: '1',
    cpf: '123.456.789-00',
    nomeCompleto: 'João Silva',
    dataNascimento: '1980-01-01',
    sexo: 'M',
    nacionalidade: 'Brasileiro',
    grauInstrucao: 'Ensino Superior',
    nomeMae: 'Maria Silva',
    endereco: 'Rua das Flores',
    numero: '123',
    bairro: 'Centro',
    cep: '12345-678',
    municipio: 'São Paulo',
    uf: 'SP',
    telefone: '(11) 98765-4321',
    email: 'joao@email.com',
    dataAdmissao: '2024-01-01',
    matricula: '12345',
    categoria: '10',
    remuneracao: 5000,
    cargoId: '1234-5',
    jornadaTrabalho: '40h',
    ctpsNumero: '123456',
    ctpsSerie: '1234',
    ctpsUf: 'SP',
    pisPasep: '123.45678.90-1'
  };

  const mockRouter = {
    push: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (empregadorService.list as jest.Mock).mockResolvedValue({
      data: [mockEmpregador],
      total: 1,
      page: 1,
      limit: 10
    });
  });

  it('deve renderizar a página corretamente', async () => {
    render(<EmpregadoresPage />);

    expect(screen.getByText('Empregadores')).toBeInTheDocument();
    expect(screen.getByText('Novo Empregador')).toBeInTheDocument();
    expect(screen.getByText('João Silva')).toBeInTheDocument();
  });

  it('deve navegar para a página de novo empregador ao clicar no botão', () => {
    render(<EmpregadoresPage />);

    fireEvent.click(screen.getByText('Novo Empregador'));

    expect(mockRouter.push).toHaveBeenCalledWith('/empregadores/novo');
  });

  it('deve navegar para a página de edição ao clicar no botão de editar', () => {
    render(<EmpregadoresPage />);

    fireEvent.click(screen.getByTestId('edit-button-1'));

    expect(mockRouter.push).toHaveBeenCalledWith('/empregadores/1');
  });

  it('deve abrir modal de confirmação ao clicar no botão de excluir', () => {
    render(<EmpregadoresPage />);

    fireEvent.click(screen.getByTestId('delete-button-1'));

    expect(screen.getByText('Confirmar Exclusão')).toBeInTheDocument();
    expect(screen.getByText('Tem certeza que deseja excluir este empregador?')).toBeInTheDocument();
  });

  it('deve excluir empregador ao confirmar exclusão', async () => {
    (empregadorService.delete as jest.Mock).mockResolvedValueOnce(undefined);

    render(<EmpregadoresPage />);

    fireEvent.click(screen.getByTestId('delete-button-1'));
    fireEvent.click(screen.getByText('Confirmar'));

    await waitFor(() => {
      expect(empregadorService.delete).toHaveBeenCalledWith('1');
      expect(empregadorService.list).toHaveBeenCalled();
    });
  });

  it('deve filtrar empregadores por nome', async () => {
    render(<EmpregadoresPage />);

    const searchInput = screen.getByPlaceholderText('Buscar por nome ou CPF');
    fireEvent.change(searchInput, { target: { value: 'João' } });

    await waitFor(() => {
      expect(empregadorService.list).toHaveBeenCalledWith({ nome: 'João' });
    });
  });

  it('deve filtrar empregadores por CPF', async () => {
    render(<EmpregadoresPage />);

    const searchInput = screen.getByPlaceholderText('Buscar por nome ou CPF');
    fireEvent.change(searchInput, { target: { value: '123.456.789-00' } });

    await waitFor(() => {
      expect(empregadorService.list).toHaveBeenCalledWith({ cpf: '123.456.789-00' });
    });
  });

  it('deve mostrar mensagem de erro ao falhar ao carregar empregadores', async () => {
    const mockError = new Error('Erro ao carregar empregadores');
    (empregadorService.list as jest.Mock).mockRejectedValueOnce(mockError);

    render(<EmpregadoresPage />);

    await waitFor(() => {
      expect(screen.getByText('Erro ao carregar empregadores')).toBeInTheDocument();
    });
  });

  it('deve mostrar mensagem de erro ao falhar ao excluir empregador', async () => {
    const mockError = new Error('Erro ao excluir empregador');
    (empregadorService.delete as jest.Mock).mockRejectedValueOnce(mockError);

    render(<EmpregadoresPage />);

    fireEvent.click(screen.getByTestId('delete-button-1'));
    fireEvent.click(screen.getByText('Confirmar'));

    await waitFor(() => {
      expect(screen.getByText('Erro ao excluir empregador')).toBeInTheDocument();
    });
  });

  it('deve mostrar mensagem quando não houver empregadores', async () => {
    (empregadorService.list as jest.Mock).mockResolvedValueOnce({
      data: [],
      total: 0,
      page: 1,
      limit: 10
    });

    render(<EmpregadoresPage />);

    await waitFor(() => {
      expect(screen.getByText('Nenhum empregador encontrado')).toBeInTheDocument();
    });
  });
}); 
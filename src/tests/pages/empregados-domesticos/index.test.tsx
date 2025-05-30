import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import EmpregadosDomesticosPage from '../../pages/empregados-domesticos';
import { empregadoDomesticoService } from '../../services/empregado-domestico.service';

// Mock dos hooks e serviços
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

jest.mock('../../services/empregado-domestico.service');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'pt'
    }
  })
}));

describe('EmpregadosDomesticosPage', () => {
  const mockEmpregados = [
    {
      id: '1',
      cpf: '123.456.789-00',
      nomeCompleto: 'José da Silva',
      dataNascimento: '1990-01-01',
      sexo: 'M',
      nacionalidade: 'Brasileiro',
      grauInstrucao: 'Ensino Médio',
      nomeMae: 'Maria da Silva',
      endereco: 'Rua das Flores',
      numero: '123',
      bairro: 'Centro',
      cep: '12345-678',
      municipio: 'São Paulo',
      uf: 'SP',
      telefone: '(11) 98765-4321',
      email: 'jose@email.com',
      dataAdmissao: '2024-01-01',
      matricula: '12345',
      categoria: '21',
      remuneracao: 1500,
      cargoId: '5121-05',
      jornadaTrabalho: '44h',
      ctpsNumero: '123456',
      ctpsSerie: '1234',
      ctpsUf: 'SP',
      pisPasep: '123.45678.90-1',
      empregadorId: '1'
    }
  ];

  const mockRouter = {
    push: jest.fn(),
    query: {}
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (empregadoDomesticoService.list as jest.Mock).mockResolvedValue({
      data: mockEmpregados,
      total: 1,
      page: 1,
      limit: 10
    });
  });

  it('deve renderizar a página corretamente', async () => {
    render(<EmpregadosDomesticosPage />);

    await waitFor(() => {
      expect(screen.getByText('Empregados Domésticos')).toBeInTheDocument();
      expect(screen.getByText('Novo Empregado')).toBeInTheDocument();
      expect(screen.getByText('José da Silva')).toBeInTheDocument();
    });
  });

  it('deve navegar para a página de novo empregado ao clicar no botão', async () => {
    render(<EmpregadosDomesticosPage />);

    const novoButton = screen.getByText('Novo Empregado');
    fireEvent.click(novoButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/empregados-domesticos/novo');
  });

  it('deve navegar para a página de edição ao clicar no botão de editar', async () => {
    render(<EmpregadosDomesticosPage />);

    await waitFor(() => {
      const editarButton = screen.getByTestId('edit-button-1');
      fireEvent.click(editarButton);
    });

    expect(mockRouter.push).toHaveBeenCalledWith('/empregados-domesticos/1');
  });

  it('deve abrir o modal de confirmação ao clicar no botão de excluir', async () => {
    render(<EmpregadosDomesticosPage />);

    await waitFor(() => {
      const excluirButton = screen.getByTestId('delete-button-1');
      fireEvent.click(excluirButton);
    });

    expect(screen.getByText('Confirmar Exclusão')).toBeInTheDocument();
    expect(screen.getByText('Tem certeza que deseja excluir este empregado doméstico?')).toBeInTheDocument();
  });

  it('deve excluir o empregado ao confirmar a exclusão', async () => {
    (empregadoDomesticoService.delete as jest.Mock).mockResolvedValueOnce({});

    render(<EmpregadosDomesticosPage />);

    await waitFor(() => {
      const excluirButton = screen.getByTestId('delete-button-1');
      fireEvent.click(excluirButton);
    });

    const confirmarButton = screen.getByText('Confirmar');
    fireEvent.click(confirmarButton);

    await waitFor(() => {
      expect(empregadoDomesticoService.delete).toHaveBeenCalledWith('1');
      expect(empregadoDomesticoService.list).toHaveBeenCalledTimes(2);
    });
  });

  it('deve filtrar empregados por nome', async () => {
    render(<EmpregadosDomesticosPage />);

    const searchInput = screen.getByPlaceholderText('Buscar por nome ou CPF');
    fireEvent.change(searchInput, { target: { value: 'José' } });

    await waitFor(() => {
      expect(empregadoDomesticoService.list).toHaveBeenCalledWith({ nome: 'José' });
    });
  });

  it('deve filtrar empregados por CPF', async () => {
    render(<EmpregadosDomesticosPage />);

    const searchInput = screen.getByPlaceholderText('Buscar por nome ou CPF');
    fireEvent.change(searchInput, { target: { value: '123.456.789-00' } });

    await waitFor(() => {
      expect(empregadoDomesticoService.list).toHaveBeenCalledWith({ cpf: '123.456.789-00' });
    });
  });

  it('deve mostrar mensagem de erro ao falhar ao carregar empregados', async () => {
    const mockError = new Error('Erro ao carregar empregados');
    (empregadoDomesticoService.list as jest.Mock).mockRejectedValueOnce(mockError);

    render(<EmpregadosDomesticosPage />);

    await waitFor(() => {
      expect(screen.getByText('Erro ao carregar empregados domésticos')).toBeInTheDocument();
    });
  });

  it('deve mostrar mensagem de erro ao falhar ao excluir empregado', async () => {
    const mockError = new Error('Erro ao excluir empregado');
    (empregadoDomesticoService.delete as jest.Mock).mockRejectedValueOnce(mockError);

    render(<EmpregadosDomesticosPage />);

    await waitFor(() => {
      const excluirButton = screen.getByTestId('delete-button-1');
      fireEvent.click(excluirButton);
    });

    const confirmarButton = screen.getByText('Confirmar');
    fireEvent.click(confirmarButton);

    await waitFor(() => {
      expect(screen.getByText('Erro ao excluir empregado doméstico')).toBeInTheDocument();
    });
  });

  it('deve mostrar mensagem quando não houver empregados', async () => {
    (empregadoDomesticoService.list as jest.Mock).mockResolvedValueOnce({
      data: [],
      total: 0,
      page: 1,
      limit: 10
    });

    render(<EmpregadosDomesticosPage />);

    await waitFor(() => {
      expect(screen.getByText('Nenhum empregado doméstico encontrado')).toBeInTheDocument();
    });
  });
}); 
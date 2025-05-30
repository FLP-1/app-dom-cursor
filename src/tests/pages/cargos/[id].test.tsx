import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { CargoPage } from '../../../pages/cargos/[id]';
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

describe('CargoPage', () => {
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
    push: jest.fn(),
    query: { id: '1' }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (cargoService.get as jest.Mock).mockResolvedValue(mockCargo);
  });

  it('deve renderizar a página de edição corretamente', async () => {
    render(<CargoPage />);

    await waitFor(() => {
      expect(screen.getByText('Editar Cargo')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Auxiliar de Serviços Gerais')).toBeInTheDocument();
      expect(screen.getByDisplayValue('1234-5')).toBeInTheDocument();
    });
  });

  it('deve renderizar a página de novo cargo corretamente', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });

    render(<CargoPage />);

    expect(screen.getByText('Novo Cargo')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toHaveValue('');
    expect(screen.getByLabelText('Código')).toHaveValue('');
  });

  it('deve salvar novo cargo com sucesso', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });
    (cargoService.create as jest.Mock).mockResolvedValueOnce(mockCargo);

    render(<CargoPage />);

    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Auxiliar de Serviços Gerais' } });
    fireEvent.change(screen.getByLabelText('Código'), { target: { value: '1234-5' } });
    // Preencher outros campos obrigatórios...

    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(cargoService.create).toHaveBeenCalled();
      expect(mockRouter.push).toHaveBeenCalledWith('/cargos');
    });
  });

  it('deve atualizar cargo existente com sucesso', async () => {
    (cargoService.update as jest.Mock).mockResolvedValueOnce(mockCargo);

    render(<CargoPage />);

    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Auxiliar de Serviços Gerais Atualizado' } });
    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(cargoService.update).toHaveBeenCalledWith('1', expect.any(Object));
      expect(mockRouter.push).toHaveBeenCalledWith('/cargos');
    });
  });

  it('deve mostrar erro ao falhar ao salvar', async () => {
    const mockError = new Error('Erro ao salvar cargo');
    (cargoService.create as jest.Mock).mockRejectedValueOnce(mockError);

    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });

    render(<CargoPage />);

    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Auxiliar de Serviços Gerais' } });
    fireEvent.change(screen.getByLabelText('Código'), { target: { value: '1234-5' } });
    // Preencher outros campos obrigatórios...

    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(screen.getByText('Erro ao salvar cargo')).toBeInTheDocument();
    });
  });

  it('deve validar campos obrigatórios', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });

    render(<CargoPage />);

    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Código é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Categoria é obrigatória')).toBeInTheDocument();
      expect(screen.getByText('Salário Base é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Jornada de Trabalho é obrigatória')).toBeInTheDocument();
    });
  });

  it('deve validar formato do código', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });

    render(<CargoPage />);

    fireEvent.change(screen.getByLabelText('Código'), { target: { value: '123' } });
    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(screen.getByText('Código inválido')).toBeInTheDocument();
    });
  });

  it('deve validar salário base negativo', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });

    render(<CargoPage />);

    fireEvent.change(screen.getByLabelText('Salário Base'), { target: { value: '-1000' } });
    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(screen.getByText('Salário Base não pode ser negativo')).toBeInTheDocument();
    });
  });
}); 
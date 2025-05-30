import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormCEP } from '../FormCEP';
import { messages } from '../../../utils/messages';

// Mock do fetch global
global.fetch = jest.fn();

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('FormCEP', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('deve renderizar corretamente', () => {
    render(
      <TestWrapper>
        <FormCEP name="cep" label="CEP" />
      </TestWrapper>
    );

    expect(screen.getByLabelText('CEP')).toBeInTheDocument();
  });

  it('deve buscar endereço com sucesso', async () => {
    const mockEndereco = {
      cep: '12345-678',
      logradouro: 'Rua Teste',
      bairro: 'Bairro Teste',
      localidade: 'Cidade Teste',
      uf: 'TS',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockEndereco),
    });

    render(
      <TestWrapper>
        <FormCEP name="cep" label="CEP" />
      </TestWrapper>
    );

    const cepInput = screen.getByLabelText('CEP');
    fireEvent.change(cepInput, { target: { value: '12345678' } });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/12345678/json/');
    });

    expect(screen.getByText(messages.cep.sucesso)).toBeInTheDocument();
  });

  it('deve mostrar erro quando o CEP é inválido', async () => {
    render(
      <TestWrapper>
        <FormCEP name="cep" label="CEP" />
      </TestWrapper>
    );

    const cepInput = screen.getByLabelText('CEP');
    fireEvent.change(cepInput, { target: { value: '123' } });

    expect(global.fetch).not.toHaveBeenCalled();
    expect(screen.getByText(messages.cep.invalido)).toBeInTheDocument();
  });

  it('deve mostrar erro quando a busca falha', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(
      <TestWrapper>
        <FormCEP name="cep" label="CEP" />
      </TestWrapper>
    );

    const cepInput = screen.getByLabelText('CEP');
    fireEvent.change(cepInput, { target: { value: '12345678' } });

    await waitFor(() => {
      expect(screen.getByText(messages.cep.erro)).toBeInTheDocument();
    });
  });

  it('deve mostrar erro quando o CEP não é encontrado', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ erro: true }),
    });

    render(
      <TestWrapper>
        <FormCEP name="cep" label="CEP" />
      </TestWrapper>
    );

    const cepInput = screen.getByLabelText('CEP');
    fireEvent.change(cepInput, { target: { value: '12345678' } });

    await waitFor(() => {
      expect(screen.getByText(messages.cep.naoEncontrado)).toBeInTheDocument();
    });
  });

  it('deve limpar caracteres não numéricos do CEP', async () => {
    const mockEndereco = {
      cep: '12345-678',
      logradouro: 'Rua Teste',
      bairro: 'Bairro Teste',
      localidade: 'Cidade Teste',
      uf: 'TS',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockEndereco),
    });

    render(
      <TestWrapper>
        <FormCEP name="cep" label="CEP" />
      </TestWrapper>
    );

    const cepInput = screen.getByLabelText('CEP');
    fireEvent.change(cepInput, { target: { value: '123.456-78' } });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/12345678/json/');
    });
  });

  it('deve mostrar loading durante a busca', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => new Promise(resolve => {
      setTimeout(() => {
        resolve({
          ok: true,
          json: () => Promise.resolve({
            cep: '12345-678',
            logradouro: 'Rua Teste',
            bairro: 'Bairro Teste',
            localidade: 'Cidade Teste',
            uf: 'TS',
          }),
        });
      }, 100);
    }));

    render(
      <TestWrapper>
        <FormCEP name="cep" label="CEP" />
      </TestWrapper>
    );

    const cepInput = screen.getByLabelText('CEP');
    fireEvent.change(cepInput, { target: { value: '12345678' } });

    expect(screen.getByText('Buscando...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Buscando...')).not.toBeInTheDocument();
    });
  });

  it('deve chamar onSuccess quando a busca é bem-sucedida', async () => {
    const mockEndereco = {
      cep: '12345-678',
      logradouro: 'Rua Teste',
      bairro: 'Bairro Teste',
      localidade: 'Cidade Teste',
      uf: 'TS',
    };

    const onSuccess = jest.fn();

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockEndereco),
    });

    render(
      <TestWrapper>
        <FormCEP name="cep" label="CEP" onSuccess={onSuccess} />
      </TestWrapper>
    );

    const cepInput = screen.getByLabelText('CEP');
    fireEvent.change(cepInput, { target: { value: '12345678' } });

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith(mockEndereco);
    });
  });
}); 
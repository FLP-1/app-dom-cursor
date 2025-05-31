import { renderHook, act } from '@testing-library/react-hooks';
import { useEmpregadorForm } from '../../hooks/forms/useEmpregadorForm';
import { empregadorService } from '../../services/empregador.service';

// Mock dos serviços
jest.mock('../../services/empregador.service');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'pt'
    }
  })
}));

describe('useEmpregadorForm', () => {
  const mockInitialValues = {
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve inicializar o hook com valores padrão', () => {
    const { result } = renderHook(() => useEmpregadorForm());

    expect(result.current.control).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.formState.errors).toEqual({});
    expect(result.current.formState.isSubmitting).toBe(false);
  });

  it('deve inicializar o hook com valores iniciais', () => {
    const { result } = renderHook(() => useEmpregadorForm(mockInitialValues));

    expect(result.current.control).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.formState.errors).toEqual({});
    expect(result.current.formState.isSubmitting).toBe(false);
  });

  it('deve criar um novo empregador com sucesso', async () => {
    const mockResponse = { ...mockInitialValues, id: '1' };
    (empregadorService.create as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useEmpregadorForm());

    await act(async () => {
      await result.current.handleSubmit(mockInitialValues)();
    });

    expect(empregadorService.create).toHaveBeenCalledWith(mockInitialValues);
  });

  it('deve atualizar um empregador existente com sucesso', async () => {
    const mockResponse = { ...mockInitialValues, id: '1' };
    (empregadorService.update as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useEmpregadorForm({ ...mockInitialValues, id: '1' }));

    await act(async () => {
      await result.current.handleSubmit(mockInitialValues)();
    });

    expect(empregadorService.update).toHaveBeenCalledWith('1', mockInitialValues);
  });

  it('deve validar CPF inválido', async () => {
    const { result } = renderHook(() => useEmpregadorForm());

    const invalidCPF = { ...mockInitialValues, cpf: '123.456.789-99' };

    await act(async () => {
      await result.current.handleSubmit(invalidCPF)();
    });

    expect(empregadorService.create).not.toHaveBeenCalled();
    expect(result.current.formState.errors.cpf).toBeDefined();
  });

  it('deve validar CEP inválido', async () => {
    const { result } = renderHook(() => useEmpregadorForm());

    const invalidCEP = { ...mockInitialValues, cep: '12345-67' };

    await act(async () => {
      await result.current.handleSubmit(invalidCEP)();
    });

    expect(empregadorService.create).not.toHaveBeenCalled();
    expect(result.current.formState.errors.cep).toBeDefined();
  });

  it('deve validar PIS inválido', async () => {
    const { result } = renderHook(() => useEmpregadorForm());

    const invalidPIS = { ...mockInitialValues, pisPasep: '123.45678.90-9' };

    await act(async () => {
      await result.current.handleSubmit(invalidPIS)();
    });

    expect(empregadorService.create).not.toHaveBeenCalled();
    expect(result.current.formState.errors.pisPasep).toBeDefined();
  });

  it('deve validar UF inválida', async () => {
    const { result } = renderHook(() => useEmpregadorForm());

    const invalidUF = { ...mockInitialValues, uf: 'XX' };

    await act(async () => {
      await result.current.handleSubmit(invalidUF)();
    });

    expect(empregadorService.create).not.toHaveBeenCalled();
    expect(result.current.formState.errors.uf).toBeDefined();
  });

  it('deve validar remuneração negativa', async () => {
    const { result } = renderHook(() => useEmpregadorForm());

    const negativeSalary = { ...mockInitialValues, remuneracao: -1000 };

    await act(async () => {
      await result.current.handleSubmit(negativeSalary)();
    });

    expect(empregadorService.create).not.toHaveBeenCalled();
    expect(result.current.formState.errors.remuneracao).toBeDefined();
  });

  it('deve validar campos obrigatórios', async () => {
    const { result } = renderHook(() => useEmpregadorForm());

    const emptyValues = {
      cpf: '',
      nomeCompleto: '',
      dataNascimento: '',
      sexo: '',
      nacionalidade: '',
      grauInstrucao: '',
      nomeMae: '',
      endereco: '',
      numero: '',
      bairro: '',
      cep: '',
      municipio: '',
      uf: '',
      telefone: '',
      email: '',
      dataAdmissao: '',
      matricula: '',
      categoria: '',
      remuneracao: 0,
      cargoId: '',
      jornadaTrabalho: '',
      ctpsNumero: '',
      ctpsSerie: '',
      ctpsUf: '',
      pisPasep: ''
    };

    await act(async () => {
      await result.current.handleSubmit(emptyValues)();
    });

    expect(empregadorService.create).not.toHaveBeenCalled();
    expect(result.current.formState.errors.cpf).toBeDefined();
    expect(result.current.formState.errors.nomeCompleto).toBeDefined();
    expect(result.current.formState.errors.dataNascimento).toBeDefined();
    expect(result.current.formState.errors.sexo).toBeDefined();
    expect(result.current.formState.errors.nacionalidade).toBeDefined();
    expect(result.current.formState.errors.nomeMae).toBeDefined();
    expect(result.current.formState.errors.endereco).toBeDefined();
    expect(result.current.formState.errors.numero).toBeDefined();
    expect(result.current.formState.errors.bairro).toBeDefined();
    expect(result.current.formState.errors.cep).toBeDefined();
    expect(result.current.formState.errors.municipio).toBeDefined();
    expect(result.current.formState.errors.uf).toBeDefined();
    expect(result.current.formState.errors.telefone).toBeDefined();
    expect(result.current.formState.errors.dataAdmissao).toBeDefined();
    expect(result.current.formState.errors.matricula).toBeDefined();
    expect(result.current.formState.errors.categoria).toBeDefined();
    expect(result.current.formState.errors.remuneracao).toBeDefined();
    expect(result.current.formState.errors.cargoId).toBeDefined();
    expect(result.current.formState.errors.jornadaTrabalho).toBeDefined();
    expect(result.current.formState.errors.ctpsNumero).toBeDefined();
    expect(result.current.formState.errors.ctpsSerie).toBeDefined();
    expect(result.current.formState.errors.ctpsUf).toBeDefined();
    expect(result.current.formState.errors.pisPasep).toBeDefined();
  });

  it('deve mostrar erro ao falhar ao criar empregador', async () => {
    const mockError = new Error('Erro ao criar empregador');
    (empregadorService.create as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useEmpregadorForm());

    await act(async () => {
      await result.current.handleSubmit(mockInitialValues)();
    });

    expect(empregadorService.create).toHaveBeenCalledWith(mockInitialValues);
    expect(result.current.formState.errors).toBeDefined();
  });

  it('deve mostrar erro ao falhar ao atualizar empregador', async () => {
    const mockError = new Error('Erro ao atualizar empregador');
    (empregadorService.update as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useEmpregadorForm({ ...mockInitialValues, id: '1' }));

    await act(async () => {
      await result.current.handleSubmit(mockInitialValues)();
    });

    expect(empregadorService.update).toHaveBeenCalledWith('1', mockInitialValues);
    expect(result.current.formState.errors).toBeDefined();
  });
}); 
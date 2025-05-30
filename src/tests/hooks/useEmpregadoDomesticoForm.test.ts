import { renderHook, act } from '@testing-library/react-hooks';
import { useEmpregadoDomesticoForm } from '../../hooks/forms/useEmpregadoDomesticoForm';
import { empregadoDomesticoService } from '../../services/empregado-domestico.service';

// Mock dos serviços
jest.mock('../../services/empregado-domestico.service');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'pt'
    }
  })
}));

describe('useEmpregadoDomesticoForm', () => {
  const mockInitialValues = {
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
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve inicializar o hook com valores padrão', () => {
    const { result } = renderHook(() => useEmpregadoDomesticoForm());

    expect(result.current.control).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.formState.errors).toEqual({});
    expect(result.current.formState.isSubmitting).toBe(false);
  });

  it('deve inicializar o hook com valores iniciais', () => {
    const { result } = renderHook(() => useEmpregadoDomesticoForm(mockInitialValues));

    expect(result.current.control).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.formState.errors).toEqual({});
    expect(result.current.formState.isSubmitting).toBe(false);
  });

  it('deve criar um novo empregado doméstico com sucesso', async () => {
    const mockResponse = { ...mockInitialValues, id: '1' };
    (empregadoDomesticoService.create as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useEmpregadoDomesticoForm());

    await act(async () => {
      await result.current.handleSubmit(mockInitialValues)();
    });

    expect(empregadoDomesticoService.create).toHaveBeenCalledWith(mockInitialValues);
  });

  it('deve atualizar um empregado doméstico existente com sucesso', async () => {
    const mockResponse = { ...mockInitialValues, id: '1' };
    (empregadoDomesticoService.update as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useEmpregadoDomesticoForm({ ...mockInitialValues, id: '1' }));

    await act(async () => {
      await result.current.handleSubmit(mockInitialValues)();
    });

    expect(empregadoDomesticoService.update).toHaveBeenCalledWith('1', mockInitialValues);
  });

  it('deve validar CPF inválido', async () => {
    const { result } = renderHook(() => useEmpregadoDomesticoForm());

    const invalidCPF = { ...mockInitialValues, cpf: '123.456.789-99' };

    await act(async () => {
      await result.current.handleSubmit(invalidCPF)();
    });

    expect(empregadoDomesticoService.create).not.toHaveBeenCalled();
    expect(result.current.formState.errors.cpf).toBeDefined();
  });

  it('deve validar CEP inválido', async () => {
    const { result } = renderHook(() => useEmpregadoDomesticoForm());

    const invalidCEP = { ...mockInitialValues, cep: '12345-67' };

    await act(async () => {
      await result.current.handleSubmit(invalidCEP)();
    });

    expect(empregadoDomesticoService.create).not.toHaveBeenCalled();
    expect(result.current.formState.errors.cep).toBeDefined();
  });

  it('deve validar PIS inválido', async () => {
    const { result } = renderHook(() => useEmpregadoDomesticoForm());

    const invalidPIS = { ...mockInitialValues, pisPasep: '123.45678.90-9' };

    await act(async () => {
      await result.current.handleSubmit(invalidPIS)();
    });

    expect(empregadoDomesticoService.create).not.toHaveBeenCalled();
    expect(result.current.formState.errors.pisPasep).toBeDefined();
  });

  it('deve validar UF inválida', async () => {
    const { result } = renderHook(() => useEmpregadoDomesticoForm());

    const invalidUF = { ...mockInitialValues, uf: 'XX' };

    await act(async () => {
      await result.current.handleSubmit(invalidUF)();
    });

    expect(empregadoDomesticoService.create).not.toHaveBeenCalled();
    expect(result.current.formState.errors.uf).toBeDefined();
  });

  it('deve validar remuneração negativa', async () => {
    const { result } = renderHook(() => useEmpregadoDomesticoForm());

    const negativeSalary = { ...mockInitialValues, remuneracao: -1000 };

    await act(async () => {
      await result.current.handleSubmit(negativeSalary)();
    });

    expect(empregadoDomesticoService.create).not.toHaveBeenCalled();
    expect(result.current.formState.errors.remuneracao).toBeDefined();
  });

  it('deve validar campos obrigatórios', async () => {
    const { result } = renderHook(() => useEmpregadoDomesticoForm());

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
      pisPasep: '',
      empregadorId: ''
    };

    await act(async () => {
      await result.current.handleSubmit(emptyValues)();
    });

    expect(empregadoDomesticoService.create).not.toHaveBeenCalled();
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

  it('deve mostrar erro ao falhar ao criar empregado doméstico', async () => {
    const mockError = new Error('Erro ao criar empregado doméstico');
    (empregadoDomesticoService.create as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useEmpregadoDomesticoForm());

    await act(async () => {
      await result.current.handleSubmit(mockInitialValues)();
    });

    expect(empregadoDomesticoService.create).toHaveBeenCalledWith(mockInitialValues);
    expect(result.current.formState.errors).toBeDefined();
  });

  it('deve mostrar erro ao falhar ao atualizar empregado doméstico', async () => {
    const mockError = new Error('Erro ao atualizar empregado doméstico');
    (empregadoDomesticoService.update as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useEmpregadoDomesticoForm({ ...mockInitialValues, id: '1' }));

    await act(async () => {
      await result.current.handleSubmit(mockInitialValues)();
    });

    expect(empregadoDomesticoService.update).toHaveBeenCalledWith('1', mockInitialValues);
    expect(result.current.formState.errors).toBeDefined();
  });
}); 
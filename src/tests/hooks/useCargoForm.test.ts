import { renderHook, act } from '@testing-library/react-hooks';
import { useCargoForm } from '../../hooks/forms/useCargoForm';
import { cargoService } from '../../services/cargo.service';

// Mock dos serviços
jest.mock('../../services/cargo.service');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'pt'
    }
  })
}));

describe('useCargoForm', () => {
  const mockInitialValues = {
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve inicializar o hook com valores padrão', () => {
    const { result } = renderHook(() => useCargoForm());

    expect(result.current.control).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.formState.errors).toEqual({});
    expect(result.current.formState.isSubmitting).toBe(false);
  });

  it('deve inicializar o hook com valores iniciais', () => {
    const { result } = renderHook(() => useCargoForm(mockInitialValues));

    expect(result.current.control).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.formState.errors).toEqual({});
    expect(result.current.formState.isSubmitting).toBe(false);
  });

  it('deve criar um novo cargo com sucesso', async () => {
    const mockResponse = { ...mockInitialValues, id: '1' };
    (cargoService.create as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useCargoForm());

    await act(async () => {
      await result.current.handleSubmit(mockInitialValues)();
    });

    expect(cargoService.create).toHaveBeenCalledWith(mockInitialValues);
  });

  it('deve atualizar um cargo existente com sucesso', async () => {
    const mockResponse = { ...mockInitialValues, id: '1' };
    (cargoService.update as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useCargoForm({ ...mockInitialValues, id: '1' }));

    await act(async () => {
      await result.current.handleSubmit(mockInitialValues)();
    });

    expect(cargoService.update).toHaveBeenCalledWith('1', mockInitialValues);
  });

  it('deve validar código inválido', async () => {
    const { result } = renderHook(() => useCargoForm());

    const invalidCode = { ...mockInitialValues, codigo: '123' };

    await act(async () => {
      await result.current.handleSubmit(invalidCode)();
    });

    expect(cargoService.create).not.toHaveBeenCalled();
    expect(result.current.formState.errors.codigo).toBeDefined();
  });

  it('deve validar salário base negativo', async () => {
    const { result } = renderHook(() => useCargoForm());

    const negativeSalary = { ...mockInitialValues, salarioBase: -1000 };

    await act(async () => {
      await result.current.handleSubmit(negativeSalary)();
    });

    expect(cargoService.create).not.toHaveBeenCalled();
    expect(result.current.formState.errors.salarioBase).toBeDefined();
  });

  it('deve validar campos obrigatórios', async () => {
    const { result } = renderHook(() => useCargoForm());

    const emptyValues = {
      codigo: '',
      nome: '',
      descricao: '',
      categoria: '',
      salarioBase: 0,
      jornadaTrabalho: '',
      requisitos: '',
      beneficios: '',
      ativo: true
    };

    await act(async () => {
      await result.current.handleSubmit(emptyValues)();
    });

    expect(cargoService.create).not.toHaveBeenCalled();
    expect(result.current.formState.errors.codigo).toBeDefined();
    expect(result.current.formState.errors.nome).toBeDefined();
    expect(result.current.formState.errors.categoria).toBeDefined();
    expect(result.current.formState.errors.salarioBase).toBeDefined();
    expect(result.current.formState.errors.jornadaTrabalho).toBeDefined();
  });

  it('deve mostrar erro ao falhar ao criar cargo', async () => {
    const mockError = new Error('Erro ao criar cargo');
    (cargoService.create as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useCargoForm());

    await act(async () => {
      await result.current.handleSubmit(mockInitialValues)();
    });

    expect(cargoService.create).toHaveBeenCalledWith(mockInitialValues);
    expect(result.current.formState.errors).toBeDefined();
  });

  it('deve mostrar erro ao falhar ao atualizar cargo', async () => {
    const mockError = new Error('Erro ao atualizar cargo');
    (cargoService.update as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useCargoForm({ ...mockInitialValues, id: '1' }));

    await act(async () => {
      await result.current.handleSubmit(mockInitialValues)();
    });

    expect(cargoService.update).toHaveBeenCalledWith('1', mockInitialValues);
    expect(result.current.formState.errors).toBeDefined();
  });
}); 
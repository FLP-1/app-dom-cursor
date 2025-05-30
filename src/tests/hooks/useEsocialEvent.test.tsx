import { renderHook, act } from '@testing-library/react-hooks';
import { useEsocialEvent } from '@/hooks/useEsocialEvent';
import { EsocialEventService } from '@/services/EsocialEventService';
import { TipoEventoEsocial } from '@/types/esocial';
import { TestWrapper } from '@/tests/utils/TestWrapper';

jest.mock('@/services/EsocialEventService');
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

describe('useEsocialEvent', () => {
  const mockEvent = {
    id: '1',
    tipo: TipoEventoEsocial.S2400,
    data: new Date(),
    payload: {
      cpf: '12345678901',
      dataInicioBeneficio: new Date(),
      tipoBeneficio: '01',
      valorBeneficio: 1500.00,
      dataFimBeneficio: null,
      motivoFimBeneficio: '',
      observacao: 'Teste de benefício'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useEsocialEvent(), {
      wrapper: TestWrapper,
    });

    expect(result.current.tipo).toBe(TipoEventoEsocial.S2200);
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.errors).toEqual({});
    expect(result.current.control).toBeDefined();
  });

  it('should handle form submission for new event', async () => {
    const mockCreate = jest.spyOn(EsocialEventService, 'create').mockResolvedValueOnce({} as any);

    const { result } = renderHook(() => useEsocialEvent(), {
      wrapper: TestWrapper,
    });

    const formData = {
      tipo: TipoEventoEsocial.S2206,
      data: new Date(),
      payload: {
        cpf: '12345678900',
        dataAlteracao: new Date(),
        tipoAlteracao: '1',
        motivoAlteracao: 'Alteração de cargo',
        cargo: 'Desenvolvedor',
        salario: 5000,
        jornadaTrabalho: '40 horas',
        tipoRegimePrevidenciario: '1',
        dataInicioAlteracao: new Date(),
        dataFimAlteracao: new Date(),
        naturezaAlteracao: '1'
      }
    };

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(mockCreate).toHaveBeenCalledWith(formData);
  });

  it('should handle form submission for existing event', async () => {
    const mockUpdate = jest.spyOn(EsocialEventService, 'update').mockResolvedValueOnce({} as any);

    const { result } = renderHook(() => useEsocialEvent('123'), {
      wrapper: TestWrapper,
    });

    const formData = {
      tipo: TipoEventoEsocial.S2206,
      data: new Date(),
      payload: {
        cpf: '12345678900',
        dataAlteracao: new Date(),
        tipoAlteracao: '1',
        motivoAlteracao: 'Alteração de cargo',
        cargo: 'Desenvolvedor',
        salario: 5000,
        jornadaTrabalho: '40 horas',
        tipoRegimePrevidenciario: '1',
        dataInicioAlteracao: new Date(),
        dataFimAlteracao: new Date(),
        naturezaAlteracao: '1'
      }
    };

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(mockUpdate).toHaveBeenCalledWith('123', formData);
  });

  it('should handle event sending', async () => {
    const mockEnviar = jest.spyOn(EsocialEventService, 'enviar').mockResolvedValueOnce({} as any);

    const { result } = renderHook(() => useEsocialEvent('123'), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.handleEnviar();
    });

    expect(mockEnviar).toHaveBeenCalledWith('123');
  });

  it('deve carregar evento existente', async () => {
    const mockEvent = {
      id: '1',
      tipo: TipoEventoEsocial.S2210,
      data: '2024-03-20T10:00:00Z',
      status: 'PENDENTE',
      payload: {
        cpf: '12345678900',
        dataAcidente: '2024-03-20',
        horaAcidente: '14:30',
        tipoAcidente: '1',
        localAcidente: '1',
        codigoCNAE: '1234567',
        descricaoAcidente: 'Descrição do acidente',
        parteAtingida: 'Braço direito',
        agenteCausador: 'Queda',
        tipoCat: '1',
        numeroCat: '123456',
        dataEmissaoCat: '2024-03-20',
        dataRegistroCat: '2024-03-20',
        dataAfastamento: '2024-03-20',
        dataRetorno: '2024-04-04',
        diasAfastamento: 15,
        cid: 'S42.0',
        cidDescricao: 'Fratura da clavícula',
        observacao: 'Observação do acidente'
      }
    };

    (EsocialEventService.getById as jest.Mock).mockResolvedValueOnce(mockEvent);

    const { result, waitForNextUpdate } = renderHook(() => useEsocialEvent('1'), {
      wrapper: TestWrapper,
    });

    await waitForNextUpdate();

    expect(EsocialEventService.getById).toHaveBeenCalledWith('1');
  });

  it('deve criar novo evento S2210', async () => {
    const { result } = renderHook(() => useEsocialEvent(), {
      wrapper: TestWrapper,
    });

    const formData = {
      tipo: TipoEventoEsocial.S2210,
      data: new Date(),
      payload: {
        cpf: '12345678900',
        dataAcidente: '2024-03-20',
        horaAcidente: '14:30',
        tipoAcidente: '1',
        localAcidente: '1',
        codigoCNAE: '1234567',
        descricaoAcidente: 'Descrição do acidente',
        parteAtingida: 'Braço direito',
        agenteCausador: 'Queda',
        tipoCat: '1',
        numeroCat: '123456',
        dataEmissaoCat: '2024-03-20',
        dataRegistroCat: '2024-03-20',
        dataAfastamento: '2024-03-20',
        dataRetorno: '2024-04-04',
        diasAfastamento: 15,
        cid: 'S42.0',
        cidDescricao: 'Fratura da clavícula',
        observacao: 'Observação do acidente'
      }
    };

    await act(async () => {
      await result.current.handleSubmit(formData);
    });

    expect(EsocialEventService.create).toHaveBeenCalledWith(formData);
  });

  it('deve atualizar evento S2210 existente', async () => {
    const { result } = renderHook(() => useEsocialEvent('1'), {
      wrapper: TestWrapper,
    });

    const formData = {
      tipo: TipoEventoEsocial.S2210,
      data: new Date(),
      payload: {
        cpf: '12345678900',
        dataAcidente: '2024-03-20',
        horaAcidente: '14:30',
        tipoAcidente: '1',
        localAcidente: '1',
        codigoCNAE: '1234567',
        descricaoAcidente: 'Descrição do acidente',
        parteAtingida: 'Braço direito',
        agenteCausador: 'Queda',
        tipoCat: '1',
        numeroCat: '123456',
        dataEmissaoCat: '2024-03-20',
        dataRegistroCat: '2024-03-20',
        dataAfastamento: '2024-03-20',
        dataRetorno: '2024-04-04',
        diasAfastamento: 15,
        cid: 'S42.0',
        cidDescricao: 'Fratura da clavícula',
        observacao: 'Observação do acidente'
      }
    };

    await act(async () => {
      await result.current.handleSubmit(formData);
    });

    expect(EsocialEventService.update).toHaveBeenCalledWith('1', formData);
  });

  it('deve enviar evento S2210', async () => {
    const { result } = renderHook(() => useEsocialEvent('1'), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.handleSend();
    });

    expect(EsocialEventService.enviar).toHaveBeenCalledWith('1');
  });

  it('deve tratar erro ao criar evento S2210', async () => {
    const { result } = renderHook(() => useEsocialEvent(), {
      wrapper: TestWrapper,
    });

    const error = new Error('Erro ao criar evento');
    (EsocialEventService.create as jest.Mock).mockRejectedValueOnce(error);

    const formData = {
      tipo: TipoEventoEsocial.S2210,
      data: new Date(),
      payload: {
        cpf: '12345678900',
        dataAcidente: '2024-03-20',
        horaAcidente: '14:30',
        tipoAcidente: '1',
        localAcidente: '1',
        codigoCNAE: '1234567',
        descricaoAcidente: 'Descrição do acidente',
        parteAtingida: 'Braço direito',
        agenteCausador: 'Queda',
        tipoCat: '1',
        numeroCat: '123456',
        dataEmissaoCat: '2024-03-20',
        dataRegistroCat: '2024-03-20',
        dataAfastamento: '2024-03-20',
        dataRetorno: '2024-04-04',
        diasAfastamento: 15,
        cid: 'S42.0',
        cidDescricao: 'Fratura da clavícula',
        observacao: 'Observação do acidente'
      }
    };

    await act(async () => {
      await result.current.handleSubmit(formData);
    });

    expect(result.current.errors).toEqual({});
  });

  it('deve criar novo evento S2230', async () => {
    const { result } = renderHook(() => useEsocialEvent(), {
      wrapper: TestWrapper,
    });

    const formData = {
      tipo: TipoEventoEsocial.S2230,
      data: new Date(),
      payload: {
        cpf: '12345678900',
        dataInicioAfastamento: '2024-03-20',
        dataFimAfastamento: '2024-04-04',
        motivoAfastamento: '1',
        tipoAfastamento: '1',
        codigoCNAE: '1234567',
        cid: 'S42.0',
        cidDescricao: 'Fratura da clavícula',
        numeroCat: '123456',
        dataEmissaoCat: '2024-03-20',
        dataRegistroCat: '2024-03-20',
        diasAfastamento: 15,
        observacao: 'Observação do afastamento'
      }
    };

    await act(async () => {
      await result.current.handleSubmit(formData);
    });

    expect(EsocialEventService.create).toHaveBeenCalledWith(formData);
  });

  it('deve atualizar evento S2230 existente', async () => {
    const { result } = renderHook(() => useEsocialEvent('1'), {
      wrapper: TestWrapper,
    });

    const formData = {
      tipo: TipoEventoEsocial.S2230,
      data: new Date(),
      payload: {
        cpf: '12345678900',
        dataInicioAfastamento: '2024-03-20',
        dataFimAfastamento: '2024-04-04',
        motivoAfastamento: '1',
        tipoAfastamento: '1',
        codigoCNAE: '1234567',
        cid: 'S42.0',
        cidDescricao: 'Fratura da clavícula',
        numeroCat: '123456',
        dataEmissaoCat: '2024-03-20',
        dataRegistroCat: '2024-03-20',
        diasAfastamento: 15,
        observacao: 'Observação do afastamento'
      }
    };

    await act(async () => {
      await result.current.handleSubmit(formData);
    });

    expect(EsocialEventService.update).toHaveBeenCalledWith('1', formData);
  });

  it('deve enviar evento S2230', async () => {
    const { result } = renderHook(() => useEsocialEvent('1'), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.handleSend();
    });

    expect(EsocialEventService.enviar).toHaveBeenCalledWith('1');
  });

  it('deve tratar erro ao criar evento S2230', async () => {
    const { result } = renderHook(() => useEsocialEvent(), {
      wrapper: TestWrapper,
    });

    const error = new Error('Erro ao criar evento');
    (EsocialEventService.create as jest.Mock).mockRejectedValueOnce(error);

    const formData = {
      tipo: TipoEventoEsocial.S2230,
      data: new Date(),
      payload: {
        cpf: '12345678900',
        dataInicioAfastamento: '2024-03-20',
        dataFimAfastamento: '2024-04-04',
        motivoAfastamento: '1',
        tipoAfastamento: '1',
        codigoCNAE: '1234567',
        cid: 'S42.0',
        cidDescricao: 'Fratura da clavícula',
        numeroCat: '123456',
        dataEmissaoCat: '2024-03-20',
        dataRegistroCat: '2024-03-20',
        diasAfastamento: 15,
        observacao: 'Observação do afastamento'
      }
    };

    await act(async () => {
      await result.current.handleSubmit(formData);
    });

    expect(result.current.errors).toEqual({});
  });

  it('deve criar um novo evento S2240', async () => {
    const mockEvent = {
      tipo: TipoEventoEsocial.S2240,
      data: new Date(),
      payload: {
        cpf: '12345678900',
        dataInicio: new Date(),
        dataFim: undefined,
        codigoCNAE: '1234567',
        codigoFatorRisco: '123',
        descricaoFatorRisco: 'Ruído',
        intensidade: 'ALTA',
        tecnicasUtilizadas: 'Medição de ruído',
        tecnologiasUtilizadas: 'Dosímetro',
        epiUtilizado: 'Protetor auricular',
        epcUtilizado: 'Cabine acústica',
        caUtilizado: 'CA-123',
        observacao: 'Teste',
      },
    };

    const { result } = renderHook(() => useEsocialEvent(), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.onSubmit(mockEvent);
    });

    expect(EsocialEventService.create).toHaveBeenCalledWith(mockEvent);
  });

  it('deve atualizar um evento S2240 existente', async () => {
    const mockEvent = {
      tipo: TipoEventoEsocial.S2240,
      data: new Date(),
      payload: {
        cpf: '12345678900',
        dataInicio: new Date(),
        dataFim: undefined,
        codigoCNAE: '1234567',
        codigoFatorRisco: '123',
        descricaoFatorRisco: 'Ruído',
        intensidade: 'ALTA',
        tecnicasUtilizadas: 'Medição de ruído',
        tecnologiasUtilizadas: 'Dosímetro',
        epiUtilizado: 'Protetor auricular',
        epcUtilizado: 'Cabine acústica',
        caUtilizado: 'CA-123',
        observacao: 'Teste',
      },
    };

    const { result } = renderHook(() => useEsocialEvent('123'), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.onSubmit(mockEvent);
    });

    expect(EsocialEventService.update).toHaveBeenCalledWith('123', mockEvent);
  });

  it('deve enviar um evento S2240', async () => {
    const { result } = renderHook(() => useEsocialEvent(), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.enviarEvento('123');
    });

    expect(EsocialEventService.enviar).toHaveBeenCalledWith('123');
  });

  it('deve lidar com erro ao criar evento S2240', async () => {
    const mockEvent = {
      tipo: TipoEventoEsocial.S2240,
      data: new Date(),
      payload: {
        cpf: '12345678900',
        dataInicio: new Date(),
        dataFim: undefined,
        codigoCNAE: '1234567',
        codigoFatorRisco: '123',
        descricaoFatorRisco: 'Ruído',
        intensidade: 'ALTA',
        tecnicasUtilizadas: 'Medição de ruído',
        tecnologiasUtilizadas: 'Dosímetro',
        epiUtilizado: 'Protetor auricular',
        epcUtilizado: 'Cabine acústica',
        caUtilizado: 'CA-123',
        observacao: 'Teste',
      },
    };

    jest.spyOn(EsocialEventService, 'create').mockRejectedValueOnce(new Error('Erro ao criar evento'));

    const { result } = renderHook(() => useEsocialEvent(), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.onSubmit(mockEvent);
    });

    expect(EsocialEventService.create).toHaveBeenCalledWith(mockEvent);
  });

  it('deve criar um novo evento S2250', async () => {
    const mockEvent = {
      tipo: TipoEventoEsocial.S2250,
      data: new Date(),
      payload: {
        cpf: '12345678900',
        dataInicio: new Date(),
        dataFim: new Date(),
        tipoAvisoPrevio: '1',
        motivoDesligamento: 'Pedido de demissão',
        observacao: 'Teste',
      },
    };

    const { result } = renderHook(() => useEsocialEvent(), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.onSubmit(mockEvent);
    });

    expect(EsocialEventService.create).toHaveBeenCalledWith(mockEvent);
  });

  it('deve atualizar um evento S2250 existente', async () => {
    const mockEvent = {
      tipo: TipoEventoEsocial.S2250,
      data: new Date(),
      payload: {
        cpf: '12345678900',
        dataInicio: new Date(),
        dataFim: new Date(),
        tipoAvisoPrevio: '1',
        motivoDesligamento: 'Pedido de demissão',
        observacao: 'Teste',
      },
    };

    const { result } = renderHook(() => useEsocialEvent('123'), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.onSubmit(mockEvent);
    });

    expect(EsocialEventService.update).toHaveBeenCalledWith('123', mockEvent);
  });

  it('deve enviar um evento S2250', async () => {
    const { result } = renderHook(() => useEsocialEvent(), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.enviarEvento('123');
    });

    expect(EsocialEventService.enviar).toHaveBeenCalledWith('123');
  });

  it('deve lidar com erro ao criar evento S2250', async () => {
    const mockEvent = {
      tipo: TipoEventoEsocial.S2250,
      data: new Date(),
      payload: {
        cpf: '12345678900',
        dataInicio: new Date(),
        dataFim: new Date(),
        tipoAvisoPrevio: '1',
        motivoDesligamento: 'Pedido de demissão',
        observacao: 'Teste',
      },
    };

    jest.spyOn(EsocialEventService, 'create').mockRejectedValueOnce(new Error('Erro ao criar evento'));

    const { result } = renderHook(() => useEsocialEvent(), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.onSubmit(mockEvent);
    });

    expect(EsocialEventService.create).toHaveBeenCalledWith(mockEvent);
  });

  it('deve criar um novo evento S2299', async () => {
    const mockEvent = {
      tipo: TipoEventoEsocial.S2299,
      data: new Date(),
      payload: {
        cpf: '12345678900',
        dataDesligamento: new Date(),
        motivoDesligamento: 'Pedido de demissão',
        observacao: 'Teste',
      },
    };

    const { result } = renderHook(() => useEsocialEvent(), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.onSubmit(mockEvent);
    });

    expect(EsocialEventService.create).toHaveBeenCalledWith(mockEvent);
  });

  it('deve atualizar um evento S2299 existente', async () => {
    const mockEvent = {
      tipo: TipoEventoEsocial.S2299,
      data: new Date(),
      payload: {
        cpf: '12345678900',
        dataDesligamento: new Date(),
        motivoDesligamento: 'Pedido de demissão',
        observacao: 'Teste',
      },
    };

    const { result } = renderHook(() => useEsocialEvent('123'), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.onSubmit(mockEvent);
    });

    expect(EsocialEventService.update).toHaveBeenCalledWith('123', mockEvent);
  });

  it('deve enviar um evento S2299', async () => {
    const { result } = renderHook(() => useEsocialEvent(), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.enviarEvento('123');
    });

    expect(EsocialEventService.enviar).toHaveBeenCalledWith('123');
  });

  it('deve lidar com erro ao criar evento S2299', async () => {
    const mockEvent = {
      tipo: TipoEventoEsocial.S2299,
      data: new Date(),
      payload: {
        cpf: '12345678900',
        dataDesligamento: new Date(),
        motivoDesligamento: 'Pedido de demissão',
        observacao: 'Teste',
      },
    };

    jest.spyOn(EsocialEventService, 'create').mockRejectedValueOnce(new Error('Erro ao criar evento'));

    const { result } = renderHook(() => useEsocialEvent(), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.onSubmit(mockEvent);
    });

    expect(EsocialEventService.create).toHaveBeenCalledWith(mockEvent);
  });

  it('deve criar um novo evento S2400', async () => {
    const { result } = renderHook(() => useEsocialEvent(TipoEventoEsocial.S2400), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.onSubmit(mockEvent);
    });

    expect(EsocialEventService.create).toHaveBeenCalledWith(mockEvent);
  });

  it('deve atualizar um evento S2400 existente', async () => {
    const { result } = renderHook(() => useEsocialEvent(TipoEventoEsocial.S2400), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.onUpdate(mockEvent);
    });

    expect(EsocialEventService.update).toHaveBeenCalledWith(mockEvent.id, mockEvent);
  });

  it('deve enviar um evento S2400', async () => {
    const { result } = renderHook(() => useEsocialEvent(TipoEventoEsocial.S2400), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.onSend(mockEvent.id);
    });

    expect(EsocialEventService.enviar).toHaveBeenCalledWith(mockEvent.id);
  });

  it('deve lidar com erro ao criar evento S2400', async () => {
    jest.spyOn(EsocialEventService, 'create').mockRejectedValueOnce(new Error('Erro ao criar evento'));

    const { result } = renderHook(() => useEsocialEvent(TipoEventoEsocial.S2400), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.onSubmit(mockEvent);
    });

    expect(EsocialEventService.create).toHaveBeenCalledWith(mockEvent);
  });
}); 
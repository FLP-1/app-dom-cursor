import { renderHook, act } from '@testing-library/react-hooks';
import { useEsocialS2250Form } from '@/hooks/useEsocialS2250Form';
import { useEsocialEvent } from '@/hooks/useEsocialEvent';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

// Mock dos hooks
jest.mock('@/hooks/useEsocialEvent');
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));
jest.mock('notistack', () => ({
  useSnackbar: jest.fn()
}));
jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}));

describe('useEsocialS2250Form', () => {
  const mockRouter = {
    push: jest.fn(),
    query: {}
  };

  const mockEnqueueSnackbar = jest.fn();

  const mockCreateEvent = jest.fn();
  const mockUpdateEvent = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSnackbar as jest.Mock).mockReturnValue({ enqueueSnackbar: mockEnqueueSnackbar });
    (useEsocialEvent as jest.Mock).mockReturnValue({
      createEvent: mockCreateEvent,
      updateEvent: mockUpdateEvent,
      loading: false,
      error: null
    });
  });

  it('deve inicializar com os valores padrão', () => {
    const { result } = renderHook(() => useEsocialS2250Form());

    expect(result.current.control).toBeDefined();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('deve criar um novo evento quando não houver ID', async () => {
    const { result } = renderHook(() => useEsocialS2250Form());

    const formData = {
      payload: {
        cpf: '123.456.789-00',
        dataAviso: new Date(),
        dataInicioAviso: new Date(),
        dataFimAviso: new Date(),
        tipoAviso: '1',
        codigoMotivoAviso: '1',
        motivoAviso: 'Teste',
        dataDesligamento: new Date(),
        indenizacao: {
          valor: 1000,
          dataPagamento: new Date()
        },
        observacao: 'Teste'
      }
    };

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(mockCreateEvent).toHaveBeenCalledWith({
      tipo: 'S2250',
      payload: formData.payload
    });
    expect(mockEnqueueSnackbar).toHaveBeenCalledWith('esocial:messages.eventoCriado', { variant: 'success' });
    expect(mockRouter.push).toHaveBeenCalledWith('/esocial/eventos');
  });

  it('deve atualizar um evento existente quando houver ID', async () => {
    mockRouter.query.id = '123';
    const { result } = renderHook(() => useEsocialS2250Form());

    const formData = {
      payload: {
        cpf: '123.456.789-00',
        dataAviso: new Date(),
        dataInicioAviso: new Date(),
        dataFimAviso: new Date(),
        tipoAviso: '1',
        codigoMotivoAviso: '1',
        motivoAviso: 'Teste',
        dataDesligamento: new Date(),
        indenizacao: {
          valor: 1000,
          dataPagamento: new Date()
        },
        observacao: 'Teste'
      }
    };

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(mockUpdateEvent).toHaveBeenCalledWith('123', {
      tipo: 'S2250',
      payload: formData.payload
    });
    expect(mockEnqueueSnackbar).toHaveBeenCalledWith('esocial:messages.eventoAtualizado', { variant: 'success' });
    expect(mockRouter.push).toHaveBeenCalledWith('/esocial/eventos');
  });

  it('deve mostrar mensagem de erro quando houver falha', async () => {
    const error = new Error('Erro ao salvar');
    mockCreateEvent.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useEsocialS2250Form());

    const formData = {
      payload: {
        cpf: '123.456.789-00',
        dataAviso: new Date(),
        dataInicioAviso: new Date(),
        dataFimAviso: new Date(),
        tipoAviso: '1',
        codigoMotivoAviso: '1',
        motivoAviso: 'Teste',
        dataDesligamento: new Date(),
        indenizacao: {
          valor: 1000,
          dataPagamento: new Date()
        },
        observacao: 'Teste'
      }
    };

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(mockEnqueueSnackbar).toHaveBeenCalledWith('esocial:messages.erroSalvarEvento', { variant: 'error' });
  });
}); 
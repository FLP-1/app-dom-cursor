import { renderHook, act } from '@testing-library/react';
import { useS1000Form } from '@/hooks/esocial/useS1000Form';
import { useEsocialApi } from '@/hooks/useEsocialApi';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';

// Mock dos hooks
jest.mock('@/hooks/useEsocialApi');
jest.mock('notistack');
jest.mock('next/navigation');

describe('useS1000Form', () => {
  const mockCreateEvent = jest.fn();
  const mockUpdateEvent = jest.fn();
  const mockEnqueueSnackbar = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useEsocialApi as jest.Mock).mockReturnValue({
      createEvent: mockCreateEvent,
      updateEvent: mockUpdateEvent,
    });
    (useSnackbar as jest.Mock).mockReturnValue({
      enqueueSnackbar: mockEnqueueSnackbar,
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useS1000Form());

    expect(result.current.methods.getValues()).toEqual({
      ideEmpregador: {
        tpInsc: '1',
        nrInsc: '',
        iniValid: '',
      },
      infoCadastro: {
        classTrib: '01',
        indCoop: '0',
        indConstr: '0',
        indDesFolha: '0',
        indOpcCP: '0',
        indPorte: '0',
        indOptRegEletron: '0',
        indEntEd: 'N',
        indEtt: 'N',
        indAcordoIsenMulta: '0',
        sitPJ: '0',
      },
    });
  });

  it('should initialize with provided values', () => {
    const initialData = {
      ideEmpregador: {
        tpInsc: '2',
        nrInsc: '12345678901',
        iniValid: '2024-01',
      },
    };

    const { result } = renderHook(() => useS1000Form(initialData));

    expect(result.current.methods.getValues()).toEqual({
      ...initialData,
      infoCadastro: {
        classTrib: '01',
        indCoop: '0',
        indConstr: '0',
        indDesFolha: '0',
        indOpcCP: '0',
        indPorte: '0',
        indOptRegEletron: '0',
        indEntEd: 'N',
        indEtt: 'N',
        indAcordoIsenMulta: '0',
        sitPJ: '0',
      },
    });
  });

  it('should handle create event successfully', async () => {
    const { result } = renderHook(() => useS1000Form());

    const formData = {
      ideEmpregador: {
        tpInsc: '1',
        nrInsc: '12345678901234',
        iniValid: '2024-01',
      },
      infoCadastro: {
        classTrib: '01',
        indCoop: '0',
        indConstr: '0',
        indDesFolha: '0',
        indOpcCP: '0',
        indPorte: '0',
        indOptRegEletron: '0',
        indEntEd: 'N',
        indEtt: 'N',
        indAcordoIsenMulta: '0',
        sitPJ: '0',
      },
    };

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(mockCreateEvent).toHaveBeenCalledWith('S-1000', formData);
    expect(mockEnqueueSnackbar).toHaveBeenCalledWith('messages.success.create', {
      variant: 'success',
    });
    expect(mockPush).toHaveBeenCalledWith('/esocial/events');
  });

  it('should handle update event successfully', async () => {
    const initialData = {
      ideEmpregador: {
        tpInsc: '1',
        nrInsc: '12345678901234',
        iniValid: '2024-01',
      },
    };

    const { result } = renderHook(() => useS1000Form(initialData));

    const formData = {
      ...initialData,
      infoCadastro: {
        classTrib: '01',
        indCoop: '0',
        indConstr: '0',
        indDesFolha: '0',
        indOpcCP: '0',
        indPorte: '0',
        indOptRegEletron: '0',
        indEntEd: 'N',
        indEtt: 'N',
        indAcordoIsenMulta: '0',
        sitPJ: '0',
      },
    };

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(mockUpdateEvent).toHaveBeenCalledWith('S-1000', formData);
    expect(mockEnqueueSnackbar).toHaveBeenCalledWith('messages.success.update', {
      variant: 'success',
    });
    expect(mockPush).toHaveBeenCalledWith('/esocial/events');
  });

  it('should handle error on submit', async () => {
    const { result } = renderHook(() => useS1000Form());

    mockCreateEvent.mockRejectedValueOnce(new Error('API Error'));

    const formData = {
      ideEmpregador: {
        tpInsc: '1',
        nrInsc: '12345678901234',
        iniValid: '2024-01',
      },
      infoCadastro: {
        classTrib: '01',
        indCoop: '0',
        indConstr: '0',
        indDesFolha: '0',
        indOpcCP: '0',
        indPorte: '0',
        indOptRegEletron: '0',
        indEntEd: 'N',
        indEtt: 'N',
        indAcordoIsenMulta: '0',
        sitPJ: '0',
      },
    };

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(mockEnqueueSnackbar).toHaveBeenCalledWith('messages.error.generic', {
      variant: 'error',
    });
  });
}); 
import { renderHook, act } from '@testing-library/react';
import { useS1202Form } from '../useS1202Form';
import { useEsocialApi } from '@/hooks/useEsocialApi';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';

// Mock dos hooks
jest.mock('@/hooks/useEsocialApi');
jest.mock('notistack');
jest.mock('next/navigation');

describe('useS1202Form', () => {
  const mockCreateEvent = jest.fn();
  const mockUpdateEvent = jest.fn();
  const mockEnqueueSnackbar = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useEsocialApi as jest.Mock).mockReturnValue({
      createEvent: mockCreateEvent,
      updateEvent: mockUpdateEvent
    });
    (useSnackbar as jest.Mock).mockReturnValue({
      enqueueSnackbar: mockEnqueueSnackbar
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush
    });
  });

  it('should handle form submission for new event', async () => {
    const { result } = renderHook(() => useS1202Form());

    const formData = {
      ideEvento: {
        indRetif: 1,
        perApur: '2024-01'
      },
      ideEmpregador: {
        tpInsc: 1,
        nrInsc: '12345678901234'
      },
      ideTrabalhador: {
        cpfTrab: '12345678901'
      },
      dmDev: [{
        ideDmDev: '123',
        codCateg: 101,
        infoPerApur: {
          ideEstabLot: [{
            tpInsc: 1,
            nrInsc: '12345678901234',
            codLotacao: '123',
            detVerbas: [{
              codRubr: '123',
              ideTabRubr: '123',
              qtdRubr: 1,
              vrRubr: 1000,
              indApurIR: 1
            }]
          }]
        }
      }]
    };

    mockCreateEvent.mockResolvedValueOnce({ id: '123' });

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(mockCreateEvent).toHaveBeenCalledWith('S-1202', formData);
    expect(mockEnqueueSnackbar).toHaveBeenCalledWith(
      expect.any(String),
      { variant: 'success' }
    );
    expect(mockPush).toHaveBeenCalledWith('/esocial/events/s-1202/123');
  });

  it('should handle form submission for existing event', async () => {
    const { result } = renderHook(() => useS1202Form('123'));

    const formData = {
      ideEvento: {
        indRetif: 2,
        nrRecibo: '12345678901234567890123456789012345678901234',
        perApur: '2024-01'
      },
      ideEmpregador: {
        tpInsc: 1,
        nrInsc: '12345678901234'
      },
      ideTrabalhador: {
        cpfTrab: '12345678901'
      },
      dmDev: [{
        ideDmDev: '123',
        codCateg: 101,
        infoPerApur: {
          ideEstabLot: [{
            tpInsc: 1,
            nrInsc: '12345678901234',
            codLotacao: '123',
            detVerbas: [{
              codRubr: '123',
              ideTabRubr: '123',
              qtdRubr: 1,
              vrRubr: 1000,
              indApurIR: 1
            }]
          }]
        }
      }]
    };

    mockUpdateEvent.mockResolvedValueOnce({ id: '123' });

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(mockUpdateEvent).toHaveBeenCalledWith('S-1202', '123', formData);
    expect(mockEnqueueSnackbar).toHaveBeenCalledWith(
      expect.any(String),
      { variant: 'success' }
    );
    expect(mockPush).toHaveBeenCalledWith('/esocial/events/s-1202/123');
  });

  it('should handle submission errors', async () => {
    const { result } = renderHook(() => useS1202Form());

    const formData = {
      ideEvento: {
        indRetif: 1,
        perApur: '2024-01'
      },
      ideEmpregador: {
        tpInsc: 1,
        nrInsc: '12345678901234'
      },
      ideTrabalhador: {
        cpfTrab: '12345678901'
      },
      dmDev: [{
        ideDmDev: '123',
        codCateg: 101,
        infoPerApur: {
          ideEstabLot: [{
            tpInsc: 1,
            nrInsc: '12345678901234',
            codLotacao: '123',
            detVerbas: [{
              codRubr: '123',
              ideTabRubr: '123',
              qtdRubr: 1,
              vrRubr: 1000,
              indApurIR: 1
            }]
          }]
        }
      }]
    };

    const error = new Error('API Error');
    mockCreateEvent.mockRejectedValueOnce(error);

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(mockEnqueueSnackbar).toHaveBeenCalledWith(
      expect.any(String),
      { variant: 'error' }
    );
  });
}); 
import { render, screen, waitFor } from '@testing-library/react';
import CreateS1202Page from '../create/page';
import EditS1202Page from '../[id]/edit/page';
import { useEsocialApi } from '@/hooks/useEsocialApi';
import { useParams } from 'next/navigation';

// Mock dos hooks
jest.mock('@/hooks/useEsocialApi');
jest.mock('next/navigation');
jest.mock('notistack', () => ({
  useSnackbar: () => ({
    enqueueSnackbar: jest.fn()
  })
}));

describe('S-1202 Pages', () => {
  const mockGetEvent = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useEsocialApi as jest.Mock).mockReturnValue({
      getEvent: mockGetEvent
    });
  });

  describe('CreateS1202Page', () => {
    it('should render create page correctly', () => {
      render(<CreateS1202Page />);

      expect(screen.getByText(/S-1202/i)).toBeInTheDocument();
      expect(screen.getByRole('form')).toBeInTheDocument();
    });
  });

  describe('EditS1202Page', () => {
    beforeEach(() => {
      (useParams as jest.Mock).mockReturnValue({ id: '123' });
    });

    it('should render edit page correctly', async () => {
      const mockEventData = {
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

      mockGetEvent.mockResolvedValueOnce(mockEventData);

      render(<EditS1202Page />);

      expect(screen.getByText(/S-1202/i)).toBeInTheDocument();
      expect(screen.getByRole('form')).toBeInTheDocument();

      await waitFor(() => {
        expect(mockGetEvent).toHaveBeenCalledWith('S-1202', '123');
      });
    });

    it('should handle error when loading event', async () => {
      mockGetEvent.mockRejectedValueOnce(new Error('API Error'));

      render(<EditS1202Page />);

      await waitFor(() => {
        expect(mockGetEvent).toHaveBeenCalledWith('S-1202', '123');
      });
    });
  });
}); 
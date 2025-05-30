import { render, screen, waitFor } from '@testing-library/react';
import { S2250Form } from '@/components/esocial/events/S2250Form';
import { useForm } from 'react-hook-form';
import { useEsocialTabela } from '@/hooks/useEsocialTabela';
import { useTranslation } from 'next-i18next';

// Mock dos hooks
jest.mock('@/hooks/useEsocialTabela');
jest.mock('next-i18next', () => ({
  useTranslation: jest.fn()
}));

const mockMotivosAviso = [
  { codigo: '1', descricao: 'Motivo 1' },
  { codigo: '2', descricao: 'Motivo 2' }
];

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const { control } = useForm({
    defaultValues: {
      payload: {
        cpf: '',
        dataAviso: new Date(),
        dataInicioAviso: new Date(),
        dataFimAviso: new Date(),
        tipoAviso: '1',
        codigoMotivoAviso: '',
        motivoAviso: '',
        dataDesligamento: new Date(),
        indenizacao: {
          valor: 0,
          dataPagamento: new Date()
        },
        observacao: ''
      }
    }
  });

  return <>{children}</>;
};

describe('S2250Form', () => {
  beforeEach(() => {
    (useEsocialTabela as jest.Mock).mockReturnValue({
      getTabela: jest.fn().mockResolvedValue({ itens: mockMotivosAviso })
    });

    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key
    });
  });

  it('deve renderizar todos os campos do formulário', async () => {
    render(
      <FormWrapper>
        <S2250Form control={useForm().control} />
      </FormWrapper>
    );

    await waitFor(() => {
      expect(screen.getByLabelText('esocial:events.S2250.cpf')).toBeInTheDocument();
      expect(screen.getByLabelText('esocial:events.S2250.dataAviso')).toBeInTheDocument();
      expect(screen.getByLabelText('esocial:events.S2250.dataInicioAviso')).toBeInTheDocument();
      expect(screen.getByLabelText('esocial:events.S2250.dataFimAviso')).toBeInTheDocument();
      expect(screen.getByLabelText('esocial:events.S2250.tipoAviso')).toBeInTheDocument();
      expect(screen.getByLabelText('esocial:events.S2250.codigoMotivoAviso')).toBeInTheDocument();
      expect(screen.getByLabelText('esocial:events.S2250.motivoAviso')).toBeInTheDocument();
      expect(screen.getByLabelText('esocial:events.S2250.dataDesligamento')).toBeInTheDocument();
      expect(screen.getByLabelText('esocial:events.S2250.indenizacao.valor')).toBeInTheDocument();
      expect(screen.getByLabelText('esocial:events.S2250.indenizacao.dataPagamento')).toBeInTheDocument();
      expect(screen.getByLabelText('esocial:events.S2250.observacao')).toBeInTheDocument();
    });
  });

  it('deve carregar os motivos de aviso da tabela', async () => {
    render(
      <FormWrapper>
        <S2250Form control={useForm().control} />
      </FormWrapper>
    );

    await waitFor(() => {
      expect(useEsocialTabela().getTabela).toHaveBeenCalledWith('25');
    });
  });

  it('deve renderizar as opções de tipo de aviso corretamente', async () => {
    render(
      <FormWrapper>
        <S2250Form control={useForm().control} />
      </FormWrapper>
    );

    await waitFor(() => {
      const tipoAvisoSelect = screen.getByLabelText('esocial:events.S2250.tipoAviso');
      expect(tipoAvisoSelect).toHaveTextContent('esocial:events.S2250.tipoAviso.trabalhador');
      expect(tipoAvisoSelect).toHaveTextContent('esocial:events.S2250.tipoAviso.empregador');
    });
  });
}); 
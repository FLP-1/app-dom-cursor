import { render, screen } from '@testing-library/react';
import { S1202Form } from '../S1202Form';
import { useForm } from 'react-hook-form';
import { S1202Schema } from '@/schemas/esocial/S1202Schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider } from 'react-hook-form';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    resolver: zodResolver(S1202Schema),
    defaultValues: {
      ideEvento: {
        indRetif: 1,
        nrRecibo: '',
        perApur: '',
        indApuracao: 1,
        indGuia: 1,
        tpAmb: 1,
        procEmi: 1,
        verProc: '1.0'
      },
      ideEmpregador: {
        tpInsc: 1,
        nrInsc: ''
      },
      ideTrabalhador: {
        cpfTrab: '',
        nisTrab: ''
      },
      dmDev: [{
        ideDmDev: '',
        codCateg: 0,
        infoPerApur: {
          ideEstabLot: [{
            tpInsc: 1,
            nrInsc: '',
            codLotacao: '',
            detVerbas: [{
              codRubr: '',
              ideTabRubr: '',
              qtdRubr: 0,
              vrRubr: 0,
              indApurIR: 0
            }]
          }]
        }
      }]
    }
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('S1202Form', () => {
  it('should render all form fields', () => {
    render(
      <TestWrapper>
        <S1202Form control={useForm().control} />
      </TestWrapper>
    );

    // Verificar campos do ideEvento
    expect(screen.getByLabelText(/indRetif/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nrRecibo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/perApur/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/indApuracao/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/indGuia/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tpAmb/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/procEmi/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/verProc/i)).toBeInTheDocument();

    // Verificar campos do ideEmpregador
    expect(screen.getByLabelText(/tpInsc/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nrInsc/i)).toBeInTheDocument();

    // Verificar campos do ideTrabalhador
    expect(screen.getByLabelText(/cpfTrab/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nisTrab/i)).toBeInTheDocument();

    // Verificar campos do dmDev
    expect(screen.getByLabelText(/ideDmDev/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/codCateg/i)).toBeInTheDocument();

    // Verificar campos do infoPerApur
    expect(screen.getByLabelText(/tpInsc/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nrInsc/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/codLotacao/i)).toBeInTheDocument();

    // Verificar campos do detVerbas
    expect(screen.getByLabelText(/codRubr/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ideTabRubr/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/qtdRubr/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/vrRubr/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/indApurIR/i)).toBeInTheDocument();
  });

  it('should validate required fields', async () => {
    const { container } = render(
      <TestWrapper>
        <S1202Form control={useForm().control} />
      </TestWrapper>
    );

    const form = container.querySelector('form');
    form?.dispatchEvent(new Event('submit'));

    // Verificar mensagens de erro
    expect(await screen.findByText(/indRetif é obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/perApur é obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/tpInsc é obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/nrInsc é obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/cpfTrab é obrigatório/i)).toBeInTheDocument();
  });
}); 
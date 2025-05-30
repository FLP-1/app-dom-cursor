import { render, screen, fireEvent } from '@testing-library/react';
import { S1202DmDevForm } from '../S1202DmDevForm';
import { useForm } from 'react-hook-form';
import { S1202Schema } from '@/schemas/esocial/S1202Schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider } from 'react-hook-form';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<S1202Schema>({
    resolver: zodResolver(S1202Schema),
    defaultValues: {
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

describe('S1202DmDevForm', () => {
  it('should render all form fields', () => {
    render(
      <TestWrapper>
        <S1202DmDevForm control={useForm().control} />
      </TestWrapper>
    );

    // Verificar campos do dmDev
    expect(screen.getByLabelText(/ideDmDev/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/codCateg/i)).toBeInTheDocument();

    // Verificar campos do ideEstabLot
    expect(screen.getByLabelText(/tpInsc/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nrInsc/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/codLotacao/i)).toBeInTheDocument();

    // Verificar campos do detVerbas
    expect(screen.getByLabelText(/codRubr/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ideTabRubr/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/qtdRubr/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/vrRubr/i)).toBeInTheDocument();
  });

  it('should add new dmDev when clicking add button', () => {
    render(
      <TestWrapper>
        <S1202DmDevForm control={useForm().control} />
      </TestWrapper>
    );

    const addButton = screen.getByLabelText(/adicionar/i);
    fireEvent.click(addButton);

    // Verificar se os campos do novo dmDev foram adicionados
    const ideDmDevFields = screen.getAllByLabelText(/ideDmDev/i);
    expect(ideDmDevFields).toHaveLength(2);
  });

  it('should remove dmDev when clicking remove button', () => {
    render(
      <TestWrapper>
        <S1202DmDevForm control={useForm().control} />
      </TestWrapper>
    );

    const removeButton = screen.getByLabelText(/remover/i);
    fireEvent.click(removeButton);

    // Verificar se os campos foram removidos
    expect(screen.queryByLabelText(/ideDmDev/i)).not.toBeInTheDocument();
  });

  it('should validate required fields', async () => {
    const { container } = render(
      <TestWrapper>
        <S1202DmDevForm control={useForm().control} />
      </TestWrapper>
    );

    const form = container.querySelector('form');
    form?.dispatchEvent(new Event('submit'));

    // Verificar mensagens de erro
    expect(await screen.findByText(/ideDmDev é obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/codCateg é obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/tpInsc é obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/nrInsc é obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/codLotacao é obrigatório/i)).toBeInTheDocument();
  });
}); 
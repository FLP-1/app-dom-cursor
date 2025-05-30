import { render, screen } from '@testing-library/react';
import { S2210Form } from '@/components/esocial/events/S2210Form';
import { useForm } from 'react-hook-form';
import { TipoEventoEsocial } from '@/types/esocial';

const TestWrapper = () => {
  const { control } = useForm({
    defaultValues: {
      tipo: TipoEventoEsocial.S2210,
      data: new Date(),
      cpf: '12345678900',
      dataAcidente: new Date(),
      horaAcidente: '14:30',
      tipoAcidente: '1',
      localAcidente: '1',
      codigoCNAE: '1234567',
      descricaoAcidente: 'Descrição do acidente',
      parteAtingida: 'Braço direito',
      agenteCausador: 'Queda',
      tipoCat: '1',
      numeroCat: '123456',
      dataEmissaoCat: new Date(),
      dataRegistroCat: new Date(),
      dataAfastamento: new Date(),
      dataRetorno: new Date(),
      diasAfastamento: 15,
      cid: 'S42.0',
      cidDescricao: 'Fratura da clavícula',
      observacao: 'Observação do acidente'
    }
  });

  return <S2210Form control={control} />;
};

describe('S2210Form', () => {
  it('deve renderizar todos os campos obrigatórios', () => {
    render(<TestWrapper />);

    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data do acidente/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hora do acidente/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tipo do acidente/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/local do acidente/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/código cnae/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descrição do acidente/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/parte atingida/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/agente causador/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tipo de cat/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/número da cat/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de emissão da cat/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de registro da cat/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de afastamento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dias de afastamento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cid/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descrição do cid/i)).toBeInTheDocument();
  });

  it('deve renderizar as opções do tipo de acidente', () => {
    render(<TestWrapper />);

    const tipoAcidenteSelect = screen.getByLabelText(/tipo do acidente/i);
    expect(tipoAcidenteSelect).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(7); // 6 opções + 1 placeholder
    expect(screen.getByText(/típico/i)).toBeInTheDocument();
    expect(screen.getByText(/doença do trabalho/i)).toBeInTheDocument();
    expect(screen.getByText(/trajeto/i)).toBeInTheDocument();
    expect(screen.getByText(/outras doenças/i)).toBeInTheDocument();
    expect(screen.getByText(/acidente fatal/i)).toBeInTheDocument();
    expect(screen.getByText(/acidente com óbito/i)).toBeInTheDocument();
  });

  it('deve renderizar as opções do local do acidente', () => {
    render(<TestWrapper />);

    const localAcidenteSelect = screen.getByLabelText(/local do acidente/i);
    expect(localAcidenteSelect).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(5); // 4 opções + 1 placeholder
    expect(screen.getByText(/estabelecimento do empregador/i)).toBeInTheDocument();
    expect(screen.getByText(/estabelecimento de terceiros/i)).toBeInTheDocument();
    expect(screen.getByText(/via pública/i)).toBeInTheDocument();
    expect(screen.getByText(/área rural/i)).toBeInTheDocument();
  });

  it('deve renderizar as opções do tipo de CAT', () => {
    render(<TestWrapper />);

    const tipoCatSelect = screen.getByLabelText(/tipo de cat/i);
    expect(tipoCatSelect).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4); // 3 opções + 1 placeholder
    expect(screen.getByText(/inicial/i)).toBeInTheDocument();
    expect(screen.getByText(/reabertura/i)).toBeInTheDocument();
    expect(screen.getByText(/comunicação de óbito/i)).toBeInTheDocument();
  });
}); 
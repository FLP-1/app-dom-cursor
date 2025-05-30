import { render, screen } from '@testing-library/react';
import { S1000Form } from '@/components/esocial/events/S1000Form';
import { useForm } from 'react-hook-form';
import { S1000Schema } from '@/schemas/esocial/S1000Schema';

const TestWrapper = () => {
  const { control } = useForm<S1000Schema>();
  return <S1000Form control={control} />;
};

describe('S1000Form', () => {
  it('should render all form fields', () => {
    render(<TestWrapper />);

    // Verificar campos de identificação do empregador
    expect(screen.getByLabelText(/tipo de inscrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/número de inscrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/início de validade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fim de validade/i)).toBeInTheDocument();

    // Verificar campos de informações de cadastro
    expect(screen.getByLabelText(/classificação tributária/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cooperativa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/construtora/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/desfolha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/opção de contribuição previdenciária/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/porte/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/opção de registro eletrônico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/entidade educativa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ett/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/registro ett/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/acordo de isenção de multa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/situação PJ/i)).toBeInTheDocument();

    // Verificar campos de contrato de aprendizagem
    expect(screen.getByLabelText(/processo judicial/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contém entidade educativa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tipo de inscrição entidade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/número de inscrição entidade/i)).toBeInTheDocument();

    // Verificar campos de dados de isenção
    expect(screen.getByLabelText(/identificação da minuta de lei/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/número do certificado/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de emissão do certificado/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de vencimento do certificado/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/número do protocolo de renovação/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data do protocolo de renovação/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data do dou/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/página do dou/i)).toBeInTheDocument();

    // Verificar campos de informações do órgão público
    expect(screen.getByLabelText(/identificação da entidade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cnpj da entidade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/situação da entidade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nome do ente/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/uf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/código do município/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/rpps/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subteto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data do decreto/i)).toBeInTheDocument();

    // Verificar campos de informações de organização internacional
    expect(screen.getByLabelText(/acordo de isenção de multa/i)).toBeInTheDocument();
  });
}); 
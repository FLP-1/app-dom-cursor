import { PrismaClient } from '@prisma/client';
import { TipoDocumentoEsocial, TipoOcorrenciaEsocial } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedEsocialTabelas() {
  try {
    // Limpar tabelas existentes
    await prisma.esocialTabelaItem.deleteMany();
    await prisma.esocialTabela.deleteMany();

    // Tabela 1 - Categorias de Trabalhadores
    await prisma.esocialTabela.create({
      data: {
        codigo: '1',
        nome: 'Categorias de Trabalhadores',
        descricao: 'Categorias de trabalhadores para o eSocial',
        versao: '1.0',
        dataInicio: new Date('2024-01-01'),
        itens: {
          create: [
            {
              codigo: '101',
              descricao: 'Empregado - Geral',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '102',
              descricao: 'Empregado - Trabalhador Rural',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '103',
              descricao: 'Empregado - Aprendiz',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '104',
              descricao: 'Empregado - Doméstico',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '105',
              descricao: 'Empregado - Contrato Temporário',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '106',
              descricao: 'Trabalhador Avulso',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '107',
              descricao: 'Contribuinte Individual',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '108',
              descricao: 'Segurado Especial',
              dataInicio: new Date('2024-01-01')
            }
          ]
        }
      }
    });

    // Tabela 2 - Financiamento da Aposentadoria Especial
    await prisma.esocialTabela.create({
      data: {
        codigo: '2',
        nome: 'Financiamento da Aposentadoria Especial',
        descricao: 'Códigos de financiamento da aposentadoria especial',
        versao: '1.0',
        dataInicio: new Date('2024-01-01'),
        itens: {
          create: [
            {
              codigo: '1',
              descricao: 'Segurado empregado, exceto doméstico e trabalhador avulso',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '2',
              descricao: 'Segurado empregado doméstico',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '3',
              descricao: 'Segurado trabalhador avulso',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '4',
              descricao: 'Segurado contribuinte individual',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '5',
              descricao: 'Segurado especial',
              dataInicio: new Date('2024-01-01')
            }
          ]
        }
      }
    });

    // Tabela 3 - Natureza das Rubricas da Folha de Pagamento
    await prisma.esocialTabela.create({
      data: {
        codigo: '3',
        nome: 'Natureza das Rubricas da Folha de Pagamento',
        descricao: 'Natureza das rubricas da folha de pagamento',
        versao: '1.0',
        dataInicio: new Date('2024-01-01'),
        itens: {
          create: [
            {
              codigo: '1',
              descricao: 'Proventos',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '2',
              descricao: 'Descontos',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '3',
              descricao: 'Informações Complementares',
              dataInicio: new Date('2024-01-01')
            }
          ]
        }
      }
    });

    // Tabela 4 - Códigos e Alíquotas de FPAS/Terceiros
    await prisma.esocialTabela.create({
      data: {
        codigo: '4',
        nome: 'Códigos e Alíquotas de FPAS/Terceiros',
        descricao: 'Códigos e alíquotas de FPAS/Terceiros',
        versao: '1.0',
        dataInicio: new Date('2024-01-01'),
        itens: {
          create: [
            {
              codigo: '501',
              descricao: 'Empregador - Doméstico',
              valor: '8.00',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '502',
              descricao: 'Empregador - Contribuinte Individual',
              valor: '5.00',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '503',
              descricao: 'Empregador - Segurado Especial',
              valor: '2.00',
              dataInicio: new Date('2024-01-01')
            }
          ]
        }
      }
    });

    // Tabela 5 - Tipos de Inscrição
    await prisma.esocialTabela.create({
      data: {
        codigo: '5',
        nome: 'Tipos de Inscrição',
        descricao: 'Tipos de inscrição no eSocial',
        versao: '1.0',
        dataInicio: new Date('2024-01-01'),
        itens: {
          create: [
            {
              codigo: '1',
              descricao: 'CNPJ',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '2',
              descricao: 'CPF',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '3',
              descricao: 'CAEPF',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '4',
              descricao: 'CNO',
              dataInicio: new Date('2024-01-01')
            }
          ]
        }
      }
    });

    // Tabela 6 - Países
    await prisma.esocialTabela.create({
      data: {
        codigo: '6',
        nome: 'Países',
        descricao: 'Códigos de países',
        versao: '1.0',
        dataInicio: new Date('2024-01-01'),
        itens: {
          create: [
            {
              codigo: '105',
              descricao: 'Brasil',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '376',
              descricao: 'Brasil - Exterior',
              dataInicio: new Date('2024-01-01')
            }
          ]
        }
      }
    });

    // Tabela 7 - Tipos de Dependente
    await prisma.esocialTabela.create({
      data: {
        codigo: '7',
        nome: 'Tipos de Dependente',
        descricao: 'Tipos de dependente para o eSocial',
        versao: '1.0',
        dataInicio: new Date('2024-01-01'),
        itens: {
          create: [
            {
              codigo: '01',
              descricao: 'Cônjuge',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '02',
              descricao: 'Companheiro(a) com o(a) qual tenha filho ou viva há mais de 5 (cinco) anos ou possua Declaração de União Estável',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '03',
              descricao: 'Filho(a) ou enteado(a) até 21 anos',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '04',
              descricao: 'Filho(a) ou enteado(a) universitário(a) ou cursando escola técnica de 2º grau até 24 anos',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '06',
              descricao: 'Irmão(ã), neto(a) ou bisneto(a) sem arrimo dos pais, do(a) qual detenha a guarda judicial, até 21 anos',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '07',
              descricao: 'Irmão(ã), neto(a) ou bisneto(a) sem arrimo dos pais, universitário(a) ou cursando escola técnica de 2° grau, até 24 anos',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '09',
              descricao: 'Pais, avós e bisavós',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '10',
              descricao: 'Menor pobre até 21 anos',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '11',
              descricao: 'A pessoa absolutamente incapaz, da qual seja tutor ou curador',
              dataInicio: new Date('2024-01-01')
            },
            {
              codigo: '12',
              descricao: 'Ex-cônjuge',
              dataInicio: new Date('2024-01-01')
            }
          ]
        }
      }
    });

    // Tabela 8 - Tipos de Documento
    await prisma.esocialTabela.create({
      data: {
        codigo: '8',
        nome: 'Tipos de Documento',
        descricao: 'Tipos de documento para o eSocial',
        versao: '1.0',
        dataInicio: new Date('2024-01-01'),
        itens: {
          create: [
            { codigo: 'RG', descricao: 'Registro Geral', dataInicio: new Date('2024-01-01') },
            { codigo: 'CPF', descricao: 'Cadastro de Pessoa Física', dataInicio: new Date('2024-01-01') },
            { codigo: 'PIS', descricao: 'Programa de Integração Social', dataInicio: new Date('2024-01-01') },
            { codigo: 'CTPS', descricao: 'Carteira de Trabalho e Previdência Social', dataInicio: new Date('2024-01-01') },
            { codigo: 'CERTIDAO_NASCIMENTO', descricao: 'Certidão de Nascimento', dataInicio: new Date('2024-01-01') },
            { codigo: 'CERTIDAO_CASAMENTO', descricao: 'Certidão de Casamento', dataInicio: new Date('2024-01-01') },
            { codigo: 'COMPROVANTE_RESIDENCIA', descricao: 'Comprovante de Residência', dataInicio: new Date('2024-01-01') },
            { codigo: 'COMPROVANTE_ESCOLARIDADE', descricao: 'Comprovante de Escolaridade', dataInicio: new Date('2024-01-01') },
            { codigo: 'ATESTADO_MEDICO', descricao: 'Atestado Médico', dataInicio: new Date('2024-01-01') },
            { codigo: 'LAUDO_MEDICO', descricao: 'Laudo Médico', dataInicio: new Date('2024-01-01') },
            { codigo: 'DECLARACAO_ACIDENTE', descricao: 'Declaração de Acidente', dataInicio: new Date('2024-01-01') },
            { codigo: 'OUTROS', descricao: 'Outros', dataInicio: new Date('2024-01-01') }
          ]
        }
      }
    });

    // Tabela 9 - Tipos de Ocorrência
    await prisma.esocialTabela.create({
      data: {
        codigo: '9',
        nome: 'Tipos de Ocorrência',
        descricao: 'Tipos de ocorrência para o eSocial',
        versao: '1.0',
        dataInicio: new Date('2024-01-01'),
        itens: {
          create: [
            { codigo: 'AFASTAMENTO_ACIDENTE_TRABALHO', descricao: 'Afastamento por acidente de trabalho', dataInicio: new Date('2024-01-01') },
            { codigo: 'AFASTAMENTO_AUXILIO_DOENCA', descricao: 'Afastamento por auxílio doença', dataInicio: new Date('2024-01-01') },
            { codigo: 'AFASTAMENTO_LICENCA_MATERNIDADE', descricao: 'Afastamento por licença maternidade', dataInicio: new Date('2024-01-01') },
            { codigo: 'AFASTAMENTO_LICENCA_PATERNIDADE', descricao: 'Afastamento por licença paternidade', dataInicio: new Date('2024-01-01') },
            { codigo: 'AFASTAMENTO_SERVICO_MILITAR', descricao: 'Afastamento por serviço militar', dataInicio: new Date('2024-01-01') },
            { codigo: 'FALTA_ABONADA', descricao: 'Falta abonada', dataInicio: new Date('2024-01-01') },
            { codigo: 'FALTA_NAO_ABONADA', descricao: 'Falta não abonada', dataInicio: new Date('2024-01-01') },
            { codigo: 'FERIAS_GOZO', descricao: 'Férias em gozo', dataInicio: new Date('2024-01-01') },
            { codigo: 'FERIAS_ABONO', descricao: 'Férias abono', dataInicio: new Date('2024-01-01') },
            { codigo: 'OUTROS', descricao: 'Outros', dataInicio: new Date('2024-01-01') }
          ]
        }
      }
    });

    // Tabela 10: Tipos de Evento
    await prisma.esocialTabela.create({
      data: {
        codigo: '10',
        nome: 'Tipos de Evento',
        descricao: 'Tipos de eventos do eSocial',
        versao: '1.0',
        dataInicio: new Date(),
        itens: {
          create: [
            { codigo: 'S2200', descricao: 'Cadastramento Inicial do Vínculo', dataInicio: new Date() },
            { codigo: 'S2205', descricao: 'Alteração de Dados Cadastrais', dataInicio: new Date() },
            { codigo: 'S2206', descricao: 'Alteração de Contrato de Trabalho', dataInicio: new Date() },
            { codigo: 'S2210', descricao: 'Comunicação de Acidente de Trabalho', dataInicio: new Date() },
            { codigo: 'S2220', descricao: 'Monitoramento da Saúde do Trabalhador', dataInicio: new Date() },
            { codigo: 'S2230', descricao: 'Afastamento Temporário', dataInicio: new Date() },
            { codigo: 'S2240', descricao: 'Condições Ambientais do Trabalho', dataInicio: new Date() },
            { codigo: 'S2300', descricao: 'Trabalhador Sem Vínculo de Emprego/Estatutário', dataInicio: new Date() },
            { codigo: 'S2399', descricao: 'Trabalhador Sem Vínculo de Emprego/Estatutário - Término', dataInicio: new Date() },
            { codigo: 'S2400', descricao: 'Cadastro de Benefícios Previdenciários', dataInicio: new Date() },
            { codigo: 'S3000', descricao: 'Exclusão de Eventos', dataInicio: new Date() },
            { codigo: 'S5001', descricao: 'Informações das Contribuições Sociais por Trabalhador', dataInicio: new Date() },
            { codigo: 'S5002', descricao: 'Imposto de Renda Retido na Fonte', dataInicio: new Date() },
            { codigo: 'S5003', descricao: 'Contribuições Sociais Consolidadas', dataInicio: new Date() },
            { codigo: 'S5011', descricao: 'Informações das Contribuições Sociais por Trabalhador', dataInicio: new Date() },
            { codigo: 'S5012', descricao: 'Imposto de Renda Retido na Fonte', dataInicio: new Date() },
            { codigo: 'S5013', descricao: 'Contribuições Sociais Consolidadas', dataInicio: new Date() }
          ]
        }
      }
    });

    // Tabela 11: Status de Evento
    await prisma.esocialTabela.create({
      data: {
        codigo: '11',
        nome: 'Status de Evento',
        descricao: 'Status possíveis para eventos do eSocial',
        versao: '1.0',
        dataInicio: new Date(),
        itens: {
          create: [
            { codigo: 'PENDENTE', descricao: 'Pendente de envio', dataInicio: new Date() },
            { codigo: 'ENVIADO', descricao: 'Enviado ao eSocial', dataInicio: new Date() },
            { codigo: 'PROCESSADO', descricao: 'Processado com sucesso', dataInicio: new Date() },
            { codigo: 'REJEITADO', descricao: 'Rejeitado pelo eSocial', dataInicio: new Date() },
            { codigo: 'ERRO', descricao: 'Erro no processamento', dataInicio: new Date() }
          ]
        }
      }
    });

    console.log('Tabelas do eSocial criadas com sucesso!');
  } catch (error) {
    console.error('Erro ao criar tabelas do eSocial:', error);
    throw error;
  }
} 
/**
 * Arquivo: seed.ts
 * Caminho: prisma/seed.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-12
 * Descrição: Arquivo do projeto.
 */

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { seedEsocialTabelas } from './seed/esocial-tabelas';

const prisma = new PrismaClient();

async function main() {
  try {
    // Limpeza das tabelas (ordem importa por FK)
    await prisma.parcelaOperacaoFinanceira.deleteMany({});
    await prisma.operacaoFinanceira.deleteMany({});
    await prisma.pagamento.deleteMany({});
    await prisma.planoUsuario.deleteMany({});
    await prisma.plano.deleteMany({});
    await prisma.validacaoTelefone.deleteMany({});
    await prisma.validacaoEmail.deleteMany({});
    await prisma.registroPonto.deleteMany({});
    await prisma.configuracaoPonto.deleteMany({});
    await prisma.ocorrencia.deleteMany({});
    await prisma.document.deleteMany({});
    await prisma.message.deleteMany({});
    await prisma.task.deleteMany({});
    await prisma.shoppingItem.deleteMany({});
    await prisma.payment.deleteMany({});
    await prisma.evaluation.deleteMany({});
    await prisma.alert.deleteMany({});
    await prisma.passwordReset.deleteMany({});
    await prisma.userGroup.deleteMany({});
    await prisma.userPartner.deleteMany({});
    await prisma.compra.deleteMany({});
    await prisma.group.deleteMany({});
    await prisma.partner.deleteMany({});
    await prisma.empregadorDomestico.deleteMany({});
    await prisma.cboCargo.deleteMany({});
    await prisma.user.deleteMany({});
    // Adicione outras tabelas conforme necessário

    // Seed das tabelas do eSocial
    await seedEsocialTabelas();

    // Criar usuário administrador
    const admin = await prisma.user.upsert({
      where: { email: 'admin@dom.com' },
      update: {},
      create: {
        email: 'admin@dom.com',
        name: 'Administrador',
        cpf: '11111111200',
        phone: '11999999999',
        password: await bcrypt.hash('admin123', 10),
        userType: 'ADMIN',
      },
    });

    // Criar usuário empregador
    const empregador = await prisma.user.upsert({
      where: { email: 'empregador@dom.com' },
      update: {},
      create: {
        email: 'empregador@dom.com',
        name: 'Empregador',
        cpf: '22222222303',
        phone: '11988888888',
        password: await bcrypt.hash('empregador123', 10),
        userType: 'EMPREGADOR',
      },
    });

    // Criar cargo
    const cargo = await prisma.cboCargo.upsert({
      where: { codigo: '5121-05' },
      update: {},
      create: {
        codigo: '5121-05',
        descricao: 'Empregado doméstico nos serviços gerais',
        observacao: 'Cargo padrão para empregados domésticos',
      },
    });

    // Criar empregado doméstico
    const empregadoDomestico = await prisma.empregadorDomestico.upsert({
      where: { cpf: '44444444525' },
      update: {},
      create: {
        nomeCompleto: 'Maria Silva',
        cpf: '44444444525',
        dataNascimento: new Date('1990-01-01'),
        sexo: 'F',
        nacionalidade: 'BRASILEIRA',
        grauInstrucao: 'ENSINO_MEDIO_COMPLETO',
        nomeMae: 'Ana Silva',
        endereco: 'Rua Teste',
        numero: '123',
        bairro: 'Centro',
        cep: '01234-567',
        municipio: 'São Paulo',
        uf: 'SP',
        telefone: '11977777777',
        email: 'maria@email.com',
        dataAdmissao: new Date('2024-01-01'),
        matricula: '001',
        categoria: 'EMPREGADO_DOMESTICO',
        remuneracao: 1500.00,
        cargoId: cargo.codigo,
        jornadaTrabalho: '44',
        ctpsNumero: '123456',
        ctpsSerie: '1234',
        ctpsUf: 'SP',
        pisPasep: '12345678901',
        userId: empregador.id,
      },
    });

    // Criar empregado doméstico - João Souza
    const empregadoJoao = await prisma.empregadorDomestico.upsert({
      where: { cpf: '55555555636' },
      update: {},
      create: {
        nomeCompleto: 'João Souza',
        cpf: '55555555636',
        dataNascimento: new Date('1985-05-15'),
        sexo: 'M',
        nacionalidade: 'BRASILEIRA',
        grauInstrucao: 'ENSINO_FUNDAMENTAL_COMPLETO',
        nomeMae: 'Clara Souza',
        endereco: 'Rua das Flores',
        numero: '456',
        bairro: 'Jardim',
        cep: '04567-890',
        municipio: 'São Paulo',
        uf: 'SP',
        telefone: '11966666666',
        email: 'joao@email.com',
        dataAdmissao: new Date('2023-12-01'),
        matricula: '002',
        categoria: 'EMPREGADO_DOMESTICO',
        remuneracao: 1700.00,
        cargoId: cargo.codigo,
        jornadaTrabalho: '44',
        ctpsNumero: '654321',
        ctpsSerie: '4321',
        ctpsUf: 'SP',
        pisPasep: '23456789012',
        userId: empregador.id,
      },
    });

    // Criar empregado doméstico - Ana Paula
    const empregadoAna = await prisma.empregadorDomestico.upsert({
      where: { cpf: '66666666747' },
      update: {},
      create: {
        nomeCompleto: 'Ana Paula',
        cpf: '66666666747',
        dataNascimento: new Date('1992-09-20'),
        sexo: 'F',
        nacionalidade: 'BRASILEIRA',
        grauInstrucao: 'ENSINO_SUPERIOR_INCOMPLETO',
        nomeMae: 'Beatriz Paula',
        endereco: 'Av. Brasil',
        numero: '789',
        bairro: 'Vila Nova',
        cep: '02345-678',
        municipio: 'São Paulo',
        uf: 'SP',
        telefone: '11955555555',
        email: 'ana@email.com',
        dataAdmissao: new Date('2024-02-10'),
        matricula: '003',
        categoria: 'EMPREGADO_DOMESTICO',
        remuneracao: 1800.00,
        cargoId: cargo.codigo,
        jornadaTrabalho: '44',
        ctpsNumero: '789123',
        ctpsSerie: '5678',
        ctpsUf: 'SP',
        pisPasep: '34567890123',
        userId: empregador.id,
      },
    });

    // Criar grupo padrão
    const grupo = await prisma.group.upsert({
      where: { id: '1' },
      update: {},
      create: {
        id: '1',
        name: 'Grupo Principal',
        address: 'Rua Principal, 123',
      },
    });

    // Criar tarefa de exemplo
    const tarefa = await prisma.task.upsert({
      where: { id: '1' },
      update: {},
      create: {
        id: '1',
        title: 'Tarefa de Exemplo',
        description: 'Esta é uma tarefa de exemplo',
        status: 'PENDING',
        prioridade: 'MEDIA',
        groupId: grupo.id,
        createdBy: admin.id,
      },
    });

    // Criar planos de assinatura conforme docs/Plano de Assinatura.txt
    await prisma.plano.upsert({
      where: { id: '1' },
      update: {},
      create: {
        id: '1',
        nome: 'Plano Free',
        descricao: 'Deguste o DOM sem compromisso: 15 dias gratuitos para experimentar a gestão que organiza até seus sonhos mais bagunçados!\nBenefícios: Dashboard básico, registro de ponto limitado, upload de documentos (até 50MB) e suporte via comunidade.',
        valor: 0,
        quantidadeEventos: 10, // limitado
        nivelSuporte: 'Comunidade',
        ativo: true,
      },
    });
    await prisma.plano.upsert({
      where: { id: '2' },
      update: {},
      create: {
        id: '2',
        nome: 'Plano "Lar Doce Lar"',
        descricao: 'Cansado de ser o CEO da sua casa? Com este plano, você terceiriza a bagunça e foca no que realmente importa: maratonar séries!\nBenefícios: Dashboard personalizado, gestão de tarefas colaborativa, registro de ponto inteligente, gestão de documentos (até 100MB) e suporte prioritário.',
        valor: 29.9,
        quantidadeEventos: 100,
        nivelSuporte: 'Prioritário',
        ativo: true,
      },
    });
    await prisma.plano.upsert({
      where: { id: '3' },
      update: {},
      create: {
        id: '3',
        nome: 'Plano "Super Doméstica"',
        descricao: 'Transforme sua casa em um paraíso da organização! Com este plano, até Marie Kondo sentiria inveja.\nBenefícios: Benefícios do "Lar Doce Lar" + gestão financeira simplificada, comunicação unificada (chat e videochamadas), assistente virtual (comandos de voz), gestão de compras e alertas personalizados.',
        valor: 49.9,
        quantidadeEventos: 200,
        nivelSuporte: 'Prioritário',
        ativo: true,
      },
    });
    await prisma.plano.upsert({
      where: { id: '4' },
      update: {},
      create: {
        id: '4',
        nome: 'Plano "Ultra Pro"',
        descricao: 'O plano que vai te dar superpoderes domésticos! Organize, planeje e execute com a eficiência de um ninja.\nBenefícios: Tudo do "Super Doméstica" + integração com wearables, relatórios personalizados, gamificação (sistema de recompensas), gestão de planos de assinatura, integração com eSocial Doméstico, gestão de empréstimos e adiantamentos.',
        valor: 79.9,
        quantidadeEventos: 500,
        nivelSuporte: 'VIP',
        ativo: true,
      },
    });
    await prisma.plano.upsert({
      where: { id: '5' },
      update: {},
      create: {
        id: '5',
        nome: 'Plano "Parceria Master"',
        descricao: 'Seja nosso parceiro e conquiste o mundo (ou pelo menos, o mercado doméstico) conosco! Juntos, somos imbatíveis!\nBenefícios: Customização da interface (white label), acesso a dados estratégicos do mercado, suporte técnico especializado, participação em eventos exclusivos e gestão de múltiplos núcleos.',
        valor: 0, // ou null, pois é "Fale conosco"
        quantidadeEventos: 9999, // ilimitado
        nivelSuporte: 'Especializado',
        ativo: false,
      },
    });

    // Associar usuário ao grupo
    await prisma.userGroup.upsert({
      where: { id: '1' },
      update: {},
      create: {
        id: '1',
        userId: admin.id,
        groupId: grupo.id,
        role: 'ADMIN',
      },
    });

    // --- eSocial: Eventos principais para doméstico ---
    const eventosDomestico = [
      { codigo: 'S-1000', nome: 'Informações do Empregador', descricao: 'Informações do Empregador/Contribuinte/Órgão Público', versao: 'S-1.3', dataInicio: new Date('2023-01-01') },
      { codigo: 'S-1200', nome: 'Remuneração RGPS', descricao: 'Remuneração do trabalhador vinculado ao RGPS', versao: 'S-1.3', dataInicio: new Date('2023-01-01') },
      { codigo: 'S-2200', nome: 'Admissão de Trabalhador', descricao: 'Cadastramento Inicial do Vínculo e Admissão/Ingresso de Trabalhador', versao: 'S-1.3', dataInicio: new Date('2023-01-01') },
      { codigo: 'S-2205', nome: 'Alteração Cadastral', descricao: 'Alteração de Dados Cadastrais do Trabalhador', versao: 'S-1.3', dataInicio: new Date('2023-01-01') },
      { codigo: 'S-2206', nome: 'Alteração Contratual', descricao: 'Alteração de Contrato de Trabalho/Relação Estatutária', versao: 'S-1.3', dataInicio: new Date('2023-01-01') },
      { codigo: 'S-2210', nome: 'CAT', descricao: 'Comunicação de Acidente de Trabalho', versao: 'S-1.3', dataInicio: new Date('2023-01-01') },
      { codigo: 'S-2220', nome: 'Exame Médico', descricao: 'Monitoramento da Saúde do Trabalhador', versao: 'S-1.3', dataInicio: new Date('2023-01-01') },
      { codigo: 'S-2230', nome: 'Afastamento', descricao: 'Afastamento Temporário', versao: 'S-1.3', dataInicio: new Date('2023-01-01') },
      { codigo: 'S-2240', nome: 'Agentes Nocivos', descricao: 'Condições Ambientais do Trabalho – Agentes Nocivos', versao: 'S-1.3', dataInicio: new Date('2023-01-01') },
      { codigo: 'S-2250', nome: 'Aviso Prévio', descricao: 'Aviso Prévio', versao: 'S-1.3', dataInicio: new Date('2023-01-01') },
      { codigo: 'S-2299', nome: 'Desligamento', descricao: 'Desligamento', versao: 'S-1.3', dataInicio: new Date('2023-01-01') },
    ];
    for (const evento of eventosDomestico) {
      await prisma.esocialEvento.upsert({
        where: { codigo: evento.codigo },
        update: {},
        create: evento,
      });
    }

    // --- eSocial: Tabela 1 - Categoria de Trabalhador ---
    const tabela1 = await prisma.esocialTabela.upsert({
      where: { codigo: '1' },
      update: {},
      create: {
        codigo: '1',
        nome: 'Categoria de Trabalhador',
        descricao: 'Tabela 1 do eSocial',
        versao: 'S-1.3',
        dataInicio: new Date('2023-01-01'),
      }
    });
    await prisma.esocialTabelaItem.createMany({
      data: [
        { tabelaId: tabela1.id, codigo: '101', descricao: 'Empregado - Geral', dataInicio: new Date('2023-01-01') },
        { tabelaId: tabela1.id, codigo: '111', descricao: 'Empregado Doméstico', dataInicio: new Date('2023-01-01') },
        { tabelaId: tabela1.id, codigo: '301', descricao: 'Contribuinte Individual', dataInicio: new Date('2023-01-01') },
        { tabelaId: tabela1.id, codigo: '741', descricao: 'Microempreendedor Individual (MEI)', dataInicio: new Date('2023-01-01') },
      ],
      skipDuplicates: true,
    });

    // --- eSocial: Tabela 2 - Tipos de Inscrição ---
    const tabela2 = await prisma.esocialTabela.upsert({
      where: { codigo: '2' },
      update: {},
      create: {
        codigo: '2',
        nome: 'Tipos de Inscrição',
        descricao: 'Tabela 2 do eSocial',
        versao: 'S-1.3',
        dataInicio: new Date('2023-01-01'),
      }
    });
    await prisma.esocialTabelaItem.createMany({
      data: [
        { tabelaId: tabela2.id, codigo: '1', descricao: 'CNPJ', dataInicio: new Date('2023-01-01') },
        { tabelaId: tabela2.id, codigo: '2', descricao: 'CPF', dataInicio: new Date('2023-01-01') },
        { tabelaId: tabela2.id, codigo: '3', descricao: 'NIT/PIS/PASEP', dataInicio: new Date('2023-01-01') },
      ],
      skipDuplicates: true,
    });

    // --- eSocial: Tabela 18 - Motivos de Afastamento ---
    const tabela18 = await prisma.esocialTabela.upsert({
      where: { codigo: '18' },
      update: {},
      create: {
        codigo: '18',
        nome: 'Motivos de Afastamento',
        descricao: 'Tabela 18 do eSocial',
        versao: 'S-1.3',
        dataInicio: new Date('2023-01-01'),
      }
    });
    await prisma.esocialTabelaItem.createMany({
      data: [
        { tabelaId: tabela18.id, codigo: '01', descricao: 'Acidente/doença relacionada ao trabalho', dataInicio: new Date('2023-01-01') },
        { tabelaId: tabela18.id, codigo: '03', descricao: 'Acidente/doença não relacionada ao trabalho', dataInicio: new Date('2023-01-01') },
        { tabelaId: tabela18.id, codigo: '06', descricao: 'Licença maternidade', dataInicio: new Date('2023-01-01') },
        { tabelaId: tabela18.id, codigo: '15', descricao: 'Afastamento por serviço militar', dataInicio: new Date('2023-01-01') },
        { tabelaId: tabela18.id, codigo: '16', descricao: 'Licença remunerada', dataInicio: new Date('2023-01-01') },
        { tabelaId: tabela18.id, codigo: '17', descricao: 'Licença não remunerada', dataInicio: new Date('2023-01-01') },
        { tabelaId: tabela18.id, codigo: '21', descricao: 'Afastamento para exercício de mandato sindical', dataInicio: new Date('2023-01-01') },
        { tabelaId: tabela18.id, codigo: '24', descricao: 'Afastamento para exercício de mandato eletivo', dataInicio: new Date('2023-01-01') },
      ],
      skipDuplicates: true,
    });

    // --- eSocial: Tabela 19 - Motivos de Desligamento ---
    const tabela19 = await prisma.esocialTabela.upsert({
      where: { codigo: '19' },
      update: {},
      create: {
        codigo: '19',
        nome: 'Motivos de Desligamento',
        descricao: 'Tabela 19 do eSocial',
        versao: 'S-1.3',
        dataInicio: new Date('2023-01-01'),
      }
    });
    await prisma.esocialTabelaItem.createMany({
      data: [
        { tabelaId: tabela19.id, codigo: '01', descricao: 'Rescisão sem justa causa pelo empregador', dataInicio: new Date('2023-01-01') },
        { tabelaId: tabela19.id, codigo: '02', descricao: 'Rescisão com justa causa pelo empregador', dataInicio: new Date('2023-01-01') },
        { tabelaId: tabela19.id, codigo: '03', descricao: 'Pedido de demissão pelo empregado', dataInicio: new Date('2023-01-01') },
        { tabelaId: tabela19.id, codigo: '04', descricao: 'Rescisão por acordo entre as partes', dataInicio: new Date('2023-01-01') },
        { tabelaId: tabela19.id, codigo: '05', descricao: 'Término do contrato a termo', dataInicio: new Date('2023-01-01') },
        { tabelaId: tabela19.id, codigo: '06', descricao: 'Morte do empregado', dataInicio: new Date('2023-01-01') },
        { tabelaId: tabela19.id, codigo: '07', descricao: 'Morte do empregador individual', dataInicio: new Date('2023-01-01') },
        { tabelaId: tabela19.id, codigo: '08', descricao: 'Aposentadoria', dataInicio: new Date('2023-01-01') },
      ],
      skipDuplicates: true,
    });

    // Seeds de tarefas do dia a dia doméstico
    await prisma.task.createMany({
      data: [
        {
          id: '2',
          title: 'Faxina da casa',
          description: 'Limpar todos os cômodos, tirar pó, passar pano e organizar objetos.',
          status: 'PENDING',
          prioridade: 'ALTA',
          groupId: grupo.id,
          createdBy: admin.id,
        },
        {
          id: '3',
          title: 'Arrumar quartos',
          description: 'Organizar roupas, arrumar camas e limpar móveis dos quartos.',
          status: 'PENDING',
          prioridade: 'MEDIA',
          groupId: grupo.id,
          createdBy: empregador.id,
        },
        {
          id: '4',
          title: 'Cozinhar almoço',
          description: 'Preparar arroz, feijão, carne e salada para o almoço.',
          status: 'PENDING',
          prioridade: 'ALTA',
          groupId: grupo.id,
          createdBy: empregador.id,
        },
        {
          id: '5',
          title: 'Cozinhar jantar',
          description: 'Preparar sopa e sanduíches para o jantar.',
          status: 'PENDING',
          prioridade: 'MEDIA',
          groupId: grupo.id,
          createdBy: admin.id,
        },
        {
          id: '6',
          title: 'Lavar roupas',
          description: 'Separar roupas por cor e lavar na máquina.',
          status: 'PENDING',
          prioridade: 'BAIXA',
          groupId: grupo.id,
          createdBy: empregador.id,
        },
      ],
      skipDuplicates: true,
    });

    // Seeds de lista de compras
    await prisma.compra.createMany({
      data: [
        { id: '1', produto: 'Arroz', quantidade: 5, unidade: 'kg', valor: 30, dataCompra: new Date(), status: 'PENDENTE', grupoId: grupo.id, usuarioId: empregador.id },
        { id: '2', produto: 'Feijão', quantidade: 2, unidade: 'kg', valor: 18, dataCompra: new Date(), status: 'PENDENTE', grupoId: grupo.id, usuarioId: empregador.id },
        { id: '3', produto: 'Carne', quantidade: 1, unidade: 'kg', valor: 40, dataCompra: new Date(), status: 'PENDENTE', grupoId: grupo.id, usuarioId: empregador.id },
        { id: '4', produto: 'Batata', quantidade: 3, unidade: 'kg', valor: 12, dataCompra: new Date(), status: 'PENDENTE', grupoId: grupo.id, usuarioId: empregador.id },
        { id: '5', produto: 'Cenoura', quantidade: 2, unidade: 'kg', valor: 8, dataCompra: new Date(), status: 'PENDENTE', grupoId: grupo.id, usuarioId: empregador.id },
        { id: '6', produto: 'Sabão em pó', quantidade: 2, unidade: 'un', valor: 20, dataCompra: new Date(), status: 'PENDENTE', grupoId: grupo.id, usuarioId: empregador.id },
        { id: '7', produto: 'Desinfetante', quantidade: 2, unidade: 'un', valor: 10, dataCompra: new Date(), status: 'PENDENTE', grupoId: grupo.id, usuarioId: empregador.id },
        { id: '8', produto: 'Esponja', quantidade: 4, unidade: 'un', valor: 6, dataCompra: new Date(), status: 'PENDENTE', grupoId: grupo.id, usuarioId: empregador.id },
        { id: '9', produto: 'Detergente', quantidade: 3, unidade: 'un', valor: 9, dataCompra: new Date(), status: 'PENDENTE', grupoId: grupo.id, usuarioId: empregador.id },
      ],
      skipDuplicates: true,
    });

    // Seeds de mensagens de alerta
    await prisma.alert.createMany({
      data: [
        {
          id: '1',
          message: 'Não foi possível registrar o ponto, verifique sua conexão.',
          type: 'ERRO',
          createdBy: admin.id,
          createdAt: new Date(),
        },
        {
          id: '2',
          message: 'O estoque de sabão em pó está acabando, lembre-se de comprar.',
          type: 'AVISO',
          createdBy: empregador.id,
          createdAt: new Date(),
        },
        {
          id: '3',
          message: 'Parabéns! A casa está ficando impecável, continue assim!',
          type: 'MOTIVACIONAL',
          createdBy: empregador.id,
          createdAt: new Date(),
        },
        {
          id: '4',
          message: 'Faltam 10 minutos para o início da faxina.',
          type: 'LEMBRETE',
          createdBy: admin.id,
          createdAt: new Date(),
        },
        {
          id: '5',
          message: 'O prazo para entrega da lista de compras termina hoje.',
          type: 'VENCIMENTO',
          createdBy: empregador.id,
          createdAt: new Date(),
        },
      ],
      skipDuplicates: true,
    });

    // Logs para depuração dos IDs
    console.log('empregador.id', empregador.id);
    console.log('empregadoDomestico.id', empregadoDomestico.id);
    console.log('empregadoJoao.id', empregadoJoao.id);
    console.log('empregadoAna.id', empregadoAna.id);

    // Comentando o loop de criação dos registros de ponto para testar seed mínimo
    const empregados = [empregadoDomestico, empregadoJoao, empregadoAna];
    const tipos = ['ENTRADA', 'SAIDA'];
    const now = new Date();
    for (const empregado of empregados) {
      for (let d = 1; d <= 3; d++) {
        for (const tipo of tipos) {
          await prisma.registroPonto.create({
            data: {
              dataHora: new Date(now.getFullYear(), now.getMonth(), now.getDate() - d, tipo === 'ENTRADA' ? 8 : 17, 0, 0),
              tipo,
              usuarioId: empregador.id,
              empregadoDomesticoId: empregado.id,
              latitude: -23.55052,
              longitude: -46.633308,
              timezone: 'America/Sao_Paulo',
              dispositivo: 'SeedScript',
              ip: '127.0.0.1',
              validado: true,
            },
          });
        }
      }
    }

    // Buscar ou criar o tipoId do evento S-2200
    let tipoS2200 = await prisma.esocialEventType.findUnique({ where: { codigo: 'S-2200' } });
    if (!tipoS2200) {
      tipoS2200 = await prisma.esocialEventType.create({
        data: {
          codigo: 'S-2200',
          descricao: 'Admissão do trabalhador',
        },
      });
    }

    // Criar evento eSocial S-2200 (Admissão) para cada empregado
    for (const empregado of [empregadoDomestico, empregadoJoao, empregadoAna]) {
      await prisma.esocialEvent.create({
        data: {
          codigo: 'S-2200',
          descricao: 'Admissão do trabalhador',
          tipoId: tipoS2200.id,
          status: 'PENDING',
          empregadorId: empregador.id,
          usuarioId: empregador.id,
        },
      });
    }

    // Operações financeiras para Maria Silva
    await prisma.operacaoFinanceira.create({
      data: {
        tipo: 'EMPRESTIMO',
        valor: 1200.00,
        dataOperacao: new Date('2024-03-01'),
        dataVencimento: new Date('2024-09-01'),
        formaPagamento: 'PIX',
        observacao: 'Empréstimo para reforma',
        status: 'PENDENTE',
        usuarioId: empregador.id,
        empregadoDomesticoId: empregadoDomestico.id,
        parcelas: {
          create: [
            {
              numero: 1,
              valor: 400.00,
              dataVencimento: new Date('2024-09-01'),
              status: 'PENDENTE',
            },
            {
              numero: 2,
              valor: 400.00,
              dataVencimento: new Date('2024-10-01'),
              status: 'PENDENTE',
            },
            {
              numero: 3,
              valor: 400.00,
              dataVencimento: new Date('2024-11-01'),
              status: 'PENDENTE',
            },
          ],
        },
      },
    });

    // Operação financeira para João Souza
    await prisma.operacaoFinanceira.create({
      data: {
        tipo: 'ADIANTAMENTO',
        valor: 500.00,
        dataOperacao: new Date('2024-04-10'),
        dataVencimento: new Date('2024-05-10'),
        formaPagamento: 'DINHEIRO',
        observacao: 'Adiantamento de salário',
        status: 'APROVADO',
        usuarioId: empregador.id,
        empregadoDomesticoId: empregadoJoao.id,
      },
    });

    // Operação financeira para Ana Paula
    await prisma.operacaoFinanceira.create({
      data: {
        tipo: 'EMPRESTIMO',
        valor: 900.00,
        dataOperacao: new Date('2024-02-15'),
        dataVencimento: new Date('2024-08-15'),
        formaPagamento: 'TRANSFERENCIA',
        observacao: 'Empréstimo para estudos',
        status: 'PENDENTE',
        usuarioId: empregador.id,
        empregadoDomesticoId: empregadoAna.id,
        parcelas: {
          create: [
            {
              numero: 1,
              valor: 300.00,
              dataVencimento: new Date('2024-08-15'),
              status: 'PENDENTE',
            },
            {
              numero: 2,
              valor: 300.00,
              dataVencimento: new Date('2024-09-15'),
              status: 'PENDENTE',
            },
            {
              numero: 3,
              valor: 300.00,
              dataVencimento: new Date('2024-10-15'),
              status: 'PENDENTE',
            },
          ],
        },
      },
    });

    const count = await prisma.configuracaoGlobal.count();
    if (count === 0) {
      await prisma.configuracaoGlobal.createMany({
        data: [
          {
            chave: 'tema',
            valor: 'claro',
            descricao: 'Tema padrão do sistema',
          },
          {
            chave: 'idioma',
            valor: 'pt-BR',
            descricao: 'Idioma padrão',
          },
          {
            chave: 'notificacoes',
            valor: 'true',
            descricao: 'Notificações ativadas',
          },
        ],
      });
      console.log('Configurações globais populadas com sucesso!');
    } else {
      console.log('Configurações globais já existem.');
    }

    console.log('Seed concluído com sucesso!');
  } catch (error) {
    console.error('Erro ao executar seed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
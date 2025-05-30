import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { seedEsocialTabelas } from './seed/esocial-tabelas';

const prisma = new PrismaClient();

async function main() {
  try {
    // Seed das tabelas do eSocial
    await seedEsocialTabelas();

    // Criar usuário administrador
    const admin = await prisma.user.upsert({
      where: { email: 'admin@dom.com' },
      update: {},
      create: {
        email: 'admin@dom.com',
        name: 'Administrador',
        cpf: '12345678900',
        phone: '11999999999',
        password: await bcrypt.hash('admin123', 10),
      },
    });

    // Criar usuário empregador
    const empregador = await prisma.user.upsert({
      where: { email: 'empregador@dom.com' },
      update: {},
      create: {
        email: 'empregador@dom.com',
        name: 'Empregador',
        cpf: '98765432100',
        phone: '11988888888',
        password: await bcrypt.hash('empregador123', 10),
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

    // Criar empregador doméstico
    const empregadorDomestico = await prisma.empregadorDomestico.upsert({
      where: { cpf: '11122233344' },
      update: {},
      create: {
        nomeCompleto: 'Maria Silva',
        cpf: '11122233344',
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

    // Criar planos
    const planoBasico = await prisma.plano.upsert({
      where: {
        id: "1"
      },
      update: {},
      create: {
        id: "1",
        nome: "Plano Básico",
        descricao: "Ideal para pequenos empregadores",
        valor: 29.9,
        quantidadeEventos: 50,
        nivelSuporte: "Básico",
        ativo: true
      }
    });

    const planoPro = await prisma.plano.upsert({
      where: {
        id: "2"
      },
      update: {},
      create: {
        id: "2",
        nome: "Plano Profissional",
        descricao: "Perfeito para empregadores que precisam de mais recursos",
        valor: 49.9,
        quantidadeEventos: 150,
        nivelSuporte: "Prioritário",
        ativo: true
      }
    });

    const planoEmpresarial = await prisma.plano.upsert({
      where: {
        id: "3"
      },
      update: {},
      create: {
        id: "3",
        nome: "Plano Empresarial",
        descricao: "Solução completa para empresas com múltiplos empregados",
        valor: 99.9,
        quantidadeEventos: 500,
        nivelSuporte: "VIP",
        ativo: true
      }
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
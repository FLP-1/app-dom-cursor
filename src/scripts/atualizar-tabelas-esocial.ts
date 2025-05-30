import { PrismaClient } from '@prisma/client';
import { EsocialTabelaService } from '../services/esocial-tabela.service';
import axios from 'axios';

const prisma = new PrismaClient();
const esocialTabelaService = new EsocialTabelaService();

interface TabelaEsocial {
  codigo: string;
  nome: string;
  descricao: string;
  versao: string;
  dataInicio: Date;
  itens: {
    codigo: string;
    descricao: string;
    valor?: string;
    dataInicio: Date;
    dataFim?: Date;
  }[];
}

async function atualizarTabelasEsocial() {
  try {
    // Aqui você deve implementar a lógica para buscar as tabelas atualizadas do eSocial
    // Por exemplo, através de uma API do governo ou um arquivo XML
    const tabelasAtualizadas: TabelaEsocial[] = await buscarTabelasAtualizadas();

    for (const tabela of tabelasAtualizadas) {
      // Verifica se a tabela já existe
      const tabelaExistente = await esocialTabelaService.getTabela(tabela.codigo);

      if (tabelaExistente) {
        // Se a versão for diferente, atualiza a tabela
        if (tabelaExistente.versao !== tabela.versao) {
          await esocialTabelaService.atualizarTabela(tabela.codigo, {
            nome: tabela.nome,
            descricao: tabela.descricao,
            versao: tabela.versao,
            dataInicio: tabela.dataInicio
          });

          // Atualiza os itens da tabela
          for (const item of tabela.itens) {
            const itemExistente = await esocialTabelaService.getItemTabela(tabela.codigo, item.codigo);

            if (itemExistente) {
              // Se o item existir, atualiza
              await esocialTabelaService.atualizarItemTabela(tabela.codigo, item.codigo, {
                descricao: item.descricao,
                valor: item.valor,
                dataInicio: item.dataInicio,
                dataFim: item.dataFim
              });
            } else {
              // Se o item não existir, adiciona
              await esocialTabelaService.adicionarItemTabela(tabela.codigo, {
                codigo: item.codigo,
                descricao: item.descricao,
                valor: item.valor,
                dataInicio: item.dataInicio,
                dataFim: item.dataFim,
                ativo: true
              });
            }
          }
        }
      } else {
        // Se a tabela não existir, cria
        await prisma.esocialTabela.create({
          data: {
            codigo: tabela.codigo,
            nome: tabela.nome,
            descricao: tabela.descricao,
            versao: tabela.versao,
            dataInicio: tabela.dataInicio,
            itens: {
              create: tabela.itens.map(item => ({
                codigo: item.codigo,
                descricao: item.descricao,
                valor: item.valor,
                dataInicio: item.dataInicio,
                dataFim: item.dataFim,
                ativo: true
              }))
            }
          }
        });
      }
    }

    console.log('Tabelas do eSocial atualizadas com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar tabelas do eSocial:', error);
    throw error;
  }
}

async function buscarTabelasAtualizadas(): Promise<TabelaEsocial[]> {
  // Aqui você deve implementar a lógica para buscar as tabelas atualizadas
  // Por exemplo, através de uma API do governo ou um arquivo XML
  // Este é apenas um exemplo
  try {
    const response = await axios.get('https://api.esocial.gov.br/tabelas');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar tabelas atualizadas:', error);
    throw error;
  }
}

// Executa o script
atualizarTabelasEsocial()
  .catch((error) => {
    console.error('Erro ao executar script:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
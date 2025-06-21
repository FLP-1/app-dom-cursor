/**
 * Arquivo: receitaFederal.ts
 * Caminho: src/services/receitaFederal.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de consulta de dados da Receita Federal
 */

import { api } from './api';

export interface DadosCPF {
  cpf: string;
  nome: string;
  dataNascimento: string;
  sexo: 'M' | 'F';
  situacao: 'REGULAR' | 'SUSPENSA' | 'TITULAR_FALECIDO' | 'PENDENTE_DE_DECLARACAO' | 'CANCELADA';
  dataInscricao: string;
  digitoVerificador: string;
  comarca: string;
  uf: string;
}

export async function consultarCPF(cpf: string): Promise<DadosCPF> {
  try {
    // Aqui você deve implementar a integração real com a API da Receita Federal
    // Por enquanto, vamos simular uma resposta
    const response = await api.get(`/receita-federal/cpf/${cpf}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao consultar CPF:', error);
    throw new Error('Não foi possível consultar os dados do CPF');
  }
} 

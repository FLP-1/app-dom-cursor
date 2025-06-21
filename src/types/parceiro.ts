/**
 * Arquivo: parceiro.ts
 * Caminho: src/types/parceiro.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Tipos de parceiros
 */

export interface Parceiro {
  id: string;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  endereco: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cep: string;
  municipio: string;
  uf: string;
  responsavel: string;
  observacao?: string;
  createdAt: string;
  updatedAt: string;
} 

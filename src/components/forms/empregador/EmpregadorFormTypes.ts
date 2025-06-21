/**
 * Arquivo: EmpregadorFormTypes.ts
 * Caminho: src/components/forms/empregador/EmpregadorFormTypes.ts
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Tipos e interfaces para o formulário de cadastro de empregador.
 */

export interface EmpregadorFormValues {
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
} 

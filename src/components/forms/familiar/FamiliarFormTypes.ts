/**
 * Arquivo: FamiliarFormTypes.ts
 * Caminho: src/components/forms/familiar/FamiliarFormTypes.ts
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Tipos e interfaces para o formulário de cadastro de familiar.
 */

export interface FamiliarFormValues {
  nome: string;
  cpf: string;
  dataNascimento: string;
  parentesco: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
} 

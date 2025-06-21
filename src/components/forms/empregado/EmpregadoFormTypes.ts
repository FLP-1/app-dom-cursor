/**
 * Arquivo: EmpregadoFormTypes.ts
 * Caminho: src/components/forms/empregado/EmpregadoFormTypes.ts
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Tipos e interfaces para o formulário de cadastro de empregado.
 */

export interface EmpregadoFormValues {
  nome: string;
  cpf: string;
  dataNascimento: string;
  cargo: string;
  salario: string;
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

/**
 * Arquivo: empregador.ts
 * Caminho: src/types/empregador.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Tipos de empregador doméstico
 */

export interface Empregador {
  id: string;
  cpf: string;
  nomeCompleto: string;
  dataNascimento: string; // ISO date
  sexo: 'M' | 'F';
  nacionalidade: string;
  grauInstrucao: string;
  nomeMae: string;
  endereco: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cep: string;
  municipio: string;
  uf: string;
  telefone: string;
  telefoneAlternativo?: string;
  email: string;
  emailAlternativo?: string;
  nomeSocial?: string;
  estadoCivil?: 'SOLTEIRO' | 'CASADO' | 'DIVORCIADO' | 'VIUVO' | 'SEPARADO';
  racaCor?: 'BRANCA' | 'PRETA' | 'PARDA' | 'AMARELA' | 'INDIGENA';
  dataAdmissao: string; // ISO date
  matricula: string;
  categoria: string;
  remuneracao: number;
  cargoId: string;
  jornadaTrabalho: string;
  ctpsNumero: string;
  ctpsSerie: string;
  ctpsUf: string;
  pisPasep: string;
  empregadorId: string;
  createdAt: string;
  updatedAt: string;
  userId?: string;
  user?: unknown;
  alertas?: unknown[];
  compras?: unknown[];
  documentos?: unknown[];
  cargo?: unknown;
}

export interface EmpregadorFormValues extends Omit<Empregador, 'id' | 'createdAt' | 'updatedAt' | 'user' | 'alertas' | 'compras' | 'documentos' | 'cargo'> {
  cargoId: string;
}

export interface EmpregadorResponse {
  data: Empregador;
  message: string;
}

export interface EmpregadorListResponse {
  data: Empregador[];
  total: number;
  page: number;
  limit: number;
}

export interface EmpregadorError {
  message: string;
  code: string;
  field?: string;
} 
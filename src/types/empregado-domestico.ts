export interface CboCargo {
  codigo: string;
  descricao: string;
}

export interface DependenteEmpregado {
  nome: string;
  parentesco: 'FILHO' | 'CONJUGE' | 'PAI' | 'MAE' | 'OUTRO';
  dataNascimento: string;
  cpf?: string;
}

export interface EmpregadoDomestico {
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
  dependentes?: DependenteEmpregado[];
  deficiencia?: string;
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
  cargo?: CboCargo;
}

export interface EmpregadoDomesticoFormValues extends Omit<EmpregadoDomestico, 'id' | 'createdAt' | 'updatedAt' | 'user' | 'alertas' | 'compras' | 'documentos' | 'cargo'> {
  cargoId: string;
}

export interface EmpregadoDomesticoResponse {
  data: EmpregadoDomestico;
  message: string;
}

export interface EmpregadoDomesticoListResponse {
  data: EmpregadoDomestico[];
  total: number;
  page: number;
  limit: number;
}

export interface EmpregadoDomesticoError {
  message: string;
  code: string;
  field?: string;
} 
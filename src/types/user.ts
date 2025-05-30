import { EmpregadorDomestico } from './empregador-domestico';

export enum TipoUsuario {
  ADMIN = 'ADMIN',
  EMPREGADOR = 'EMPREGADOR',
  EMPREGADO = 'EMPREGADO',
}

export interface User {
  id: string;
  nome: string;
  email: string;
  senha: string;
  tipo: TipoUsuario;
  ativo: boolean;
  ultimoAcesso?: Date;
  empregadoresDomesticos: EmpregadorDomestico[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserFilter {
  nome?: string;
  email?: string;
  tipo?: TipoUsuario;
  ativo?: boolean;
}

export interface UserFormData {
  nome: string;
  email: string;
  senha: string;
  tipo: TipoUsuario;
  ativo: boolean;
}

export interface LoginFormData {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  user: Omit<User, 'senha'>;
} 
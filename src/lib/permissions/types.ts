/**
 * Arquivo: types.ts
 * Caminho: src/lib/permissions/types.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

export enum UserRole {
  ADMIN = 'ADMIN',
  PARTNER = 'PARTNER',
  EMPLOYER = 'EMPLOYER',
  EMPLOYEE = 'EMPLOYEE',
  FAMILY = 'FAMILY',
}

export interface Permission {
  action: string;
  subject: string;
  conditions?: Record<string, unknown>;
}

export interface RolePermissions {
  [key: string]: {
    permissions: Permission[];
    inherits?: UserRole[];
  };
}

export interface UserPermissions {
  role: UserRole;
  partnerId?: string;
  employerId?: string;
  customPermissions?: Permission[];
} 

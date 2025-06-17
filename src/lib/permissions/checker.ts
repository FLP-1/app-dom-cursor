/**
 * Arquivo: checker.ts
 * Caminho: src/lib/permissions/checker.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { UserPermissions, Permission, rolePermissions } from './types';

export class PermissionChecker {
  private userPermissions: UserPermissions;

  constructor(userPermissions: UserPermissions) {
    this.userPermissions = userPermissions;
  }

  private hasPermission(permission: Permission): boolean {
    const role = this.userPermissions.role;
    const roleDef = rolePermissions[role];

    if (!roleDef) return false;

    // Verifica permissões diretas
    const hasDirectPermission = roleDef.permissions.some(
      (p) => p.action === permission.action && p.subject === permission.subject
    );

    if (hasDirectPermission) return true;

    // Verifica permissões herdadas
    if (roleDef.inherits) {
      return roleDef.inherits.some((inheritedRole) => {
        const inheritedDef = rolePermissions[inheritedRole];
        return inheritedDef?.permissions.some(
          (p) => p.action === permission.action && p.subject === permission.subject
        );
      });
    }

    // Verifica permissões customizadas
    if (this.userPermissions.customPermissions) {
      return this.userPermissions.customPermissions.some(
        (p) => p.action === permission.action && p.subject === permission.subject
      );
    }

    return false;
  }

  can(action: string, subject: string, conditions?: Record<string, unknown>): boolean {
    const permission: Permission = { action, subject, conditions };
    return this.hasPermission(permission);
  }

  cannot(action: string, subject: string, conditions?: Record<string, unknown>): boolean {
    return !this.can(action, subject, conditions);
  }
} 

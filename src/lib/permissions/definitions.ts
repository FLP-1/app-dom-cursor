import { UserRole, RolePermissions } from './types';

export const rolePermissions: RolePermissions = {
  [UserRole.ADMIN]: {
    permissions: [
      { action: 'manage', subject: 'all' },
      { action: 'create', subject: 'partner' },
      { action: 'read', subject: 'partner' },
      { action: 'update', subject: 'partner' },
      { action: 'delete', subject: 'partner' },
    ],
  },
  [UserRole.PARTNER]: {
    permissions: [
      { action: 'manage', subject: 'employer' },
      { action: 'read', subject: 'financial' },
      { action: 'create', subject: 'alert' },
      { action: 'read', subject: 'alert' },
      { action: 'update', subject: 'alert' },
      { action: 'delete', subject: 'alert' },
    ],
  },
  [UserRole.EMPLOYER]: {
    permissions: [
      { action: 'manage', subject: 'employee' },
      { action: 'manage', subject: 'document' },
      { action: 'manage', subject: 'shopping' },
      { action: 'manage', subject: 'task' },
      { action: 'create', subject: 'alert' },
      { action: 'read', subject: 'alert' },
      { action: 'update', subject: 'alert' },
      { action: 'delete', subject: 'alert' },
    ],
  },
  [UserRole.EMPLOYEE]: {
    permissions: [
      { action: 'read', subject: 'document' },
      { action: 'create', subject: 'document' },
      { action: 'manage', subject: 'shopping' },
      { action: 'manage', subject: 'timeRecord' },
      { action: 'read', subject: 'alert' },
    ],
  },
  [UserRole.FAMILY]: {
    permissions: [
      { action: 'manage', subject: 'shopping' },
      { action: 'read', subject: 'task' },
      { action: 'create', subject: 'task' },
      { action: 'read', subject: 'alert' },
    ],
  },
}; 
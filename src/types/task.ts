export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum TaskPriority {
  BAIXA = 'BAIXA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  prioridade: TaskPriority;
  foto?: string;
  dataVencimento?: string;
  dataConclusao?: string;
  observacoes?: string;
  createdAt: string;
  updatedAt: string;
  groupId: string;
  assignedTo?: string;
  createdBy: string;
  // Para exibição, pode-se expandir para incluir nomes dos usuários
  responsavelNome?: string;
  criadorNome?: string;
} 
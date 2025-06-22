/**
 * Arquivo: alert.ts
 * Caminho: src/types/alert.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Tipos para sistema de alertas expandido com documentos e ponto
 */

// Tipo base para alertas
export interface Alert {
  id: string;
  type: string;
  message: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'ACTIVE' | 'RESOLVED' | 'DISMISSED';
  channels: ('EMAIL' | 'SMS' | 'PUSH' | 'WHATSAPP')[];
  criteria: Record<string, unknown>;
  preferences: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  resolvedAt?: Date;
  resolvedBy?: string;
}

// Filtros para alertas
export interface AlertFilter {
  type?: string;
  severity?: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
  message?: string;
  createdBy?: string;
}

// Alertas específicos para documentos
export interface DocumentAlert {
  id: string;
  documentId: string;
  documentName: string;
  documentType: string;
  expirationDate: Date;
  daysUntilExpiration: number;
  isOverdue: boolean;
  message: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  channels: ('EMAIL' | 'SMS' | 'PUSH' | 'WHATSAPP')[];
  criteria: {
    daysUntilExpiration: number;
    isOverdue: boolean;
  };
  preferences: {
    notifyBefore: number; // dias antes do vencimento
    repeatNotification: boolean;
  };
}

// Alertas específicos para ponto
export interface TimeRecordAlert {
  id: string;
  timeRecordId: string;
  empregadoId: string;
  empregadoName: string;
  date: Date;
  type: 'OVERTIME' | 'HOLIDAY_WORK' | 'MISSING_RECORD' | 'LATE_ARRIVAL' | 'EARLY_DEPARTURE';
  message: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  channels: ('EMAIL' | 'SMS' | 'PUSH' | 'WHATSAPP')[];
  criteria: {
    overtimeHours?: number;
    holidayDate?: string;
    missingRecordDate?: string;
    lateArrivalMinutes?: number;
    earlyDepartureMinutes?: number;
  };
  preferences: {
    notifyImmediately: boolean;
    notifyDaily: boolean;
    notifyWeekly: boolean;
  };
}

// Configurações de alertas do usuário
export interface AlertSettings {
  id: string;
  userId: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  whatsappNotifications: boolean;
  documentExpirationDays: number; // dias antes do vencimento para alertar
  timeRecordReminderHours: number; // horas antes do registro para lembrar
  holidayWorkNotification: boolean;
  overtimeNotification: boolean;
  missingRecordNotification: boolean;
  quietHours: {
    enabled: boolean;
    startTime: string; // formato HH:mm
    endTime: string; // formato HH:mm
  };
  createdAt: Date;
  updatedAt: Date;
}

// Notificações enviadas
export interface AlertNotification {
  id: string;
  alertId: string;
  type: 'EMAIL' | 'SMS' | 'PUSH' | 'WHATSAPP';
  recipient: string;
  message: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'PENDING' | 'SENT' | 'FAILED' | 'DELIVERED';
  sentAt?: Date;
  deliveredAt?: Date;
  errorMessage?: string;
  retryCount: number;
  maxRetries: number;
}

// Template de mensagens para alertas
export interface AlertTemplate {
  id: string;
  type: string;
  title: string;
  message: string;
  variables: string[]; // variáveis que podem ser substituídas
  channels: ('EMAIL' | 'SMS' | 'PUSH' | 'WHATSAPP')[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Estatísticas de alertas
export interface AlertStats {
  total: number;
  active: number;
  resolved: number;
  dismissed: number;
  bySeverity: {
    LOW: number;
    MEDIUM: number;
    HIGH: number;
    URGENT: number;
  };
  byType: {
    DOCUMENT_EXPIRATION: number;
    TIME_RECORD: number;
    PAYMENT: number;
    TASK: number;
    OTHER: number;
  };
  byChannel: {
    EMAIL: number;
    SMS: number;
    PUSH: number;
    WHATSAPP: number;
  };
}

// Webhook para notificações externas
export interface AlertWebhook {
  id: string;
  name: string;
  url: string;
  events: string[]; // tipos de eventos que disparam o webhook
  headers: Record<string, string>;
  isActive: boolean;
  lastTriggered?: Date;
  successCount: number;
  failureCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Cronograma de alertas
export interface AlertSchedule {
  id: string;
  name: string;
  description: string;
  cronExpression: string; // expressão cron para agendamento
  alertType: string;
  criteria: Record<string, unknown>;
  isActive: boolean;
  lastRun?: Date;
  nextRun?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Resposta da API de alertas
export interface AlertApiResponse {
  success: boolean;
  data?: Alert | Alert[] | AlertStats;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Payload para criação de alertas
export interface CreateAlertPayload {
  type: string;
  message: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  channels: ('EMAIL' | 'SMS' | 'PUSH' | 'WHATSAPP')[];
  criteria: Record<string, unknown>;
  preferences: Record<string, unknown>;
  metadata?: {
    documentId?: string;
    timeRecordId?: string;
    empregadoId?: string;
    [key: string]: unknown;
  };
}

// Payload para atualização de alertas
export interface UpdateAlertPayload {
  message?: string;
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status?: 'ACTIVE' | 'RESOLVED' | 'DISMISSED';
  channels?: ('EMAIL' | 'SMS' | 'PUSH' | 'WHATSAPP')[];
  criteria?: Record<string, unknown>;
  preferences?: Record<string, unknown>;
} 
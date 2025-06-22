/**
 * Arquivo: alert.messages.ts
 * Caminho: src/i18n/messages/alert.messages.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Mensagens centralizadas para o sistema de alertas
 */

export const alertMessages = {
  pt: {
    // Títulos e cabeçalhos
    title: 'Alertas e Notificações',
    subtitle: 'Central de alertas e notificações do sistema',
    urgentTitle: 'Urgentes',
    importantTitle: 'Importantes',
    documentsTitle: 'Documentos',
    timeRecordsTitle: 'Ponto',
    
    // Seções
    documentsSection: 'Documentos com Vencimento',
    timeRecordsSection: 'Alertas de Ponto',
    otherAlertsSection: 'Outros Alertas',
    
    // Estados
    noAlerts: 'Nenhum alerta ativo',
    noAlertsMessage: 'Tudo está em ordem! Não há notificações pendentes.',
    loading: 'Carregando alertas...',
    error: 'Erro ao carregar alertas',
    
    // Ações
    update: 'Atualizar',
    view: 'Ver',
    resolve: 'Resolver',
    dismiss: 'Dispensar',
    settings: 'Configurações',
    
    // Tooltips
    viewDocument: 'Visualizar detalhes do documento',
    viewRecord: 'Visualizar detalhes do registro de ponto',
    resolveAlert: 'Marcar alerta como resolvido',
    dismissAlert: 'Dispensar este alerta',
    alertSettings: 'Configurar preferências de notificações e alertas',
    updateAlerts: 'Atualizar lista de alertas',
    
    // Mensagens de documento
    expiresIn: 'Vence em {dias} dias',
    expirationDate: 'Vencimento: {data}',
    documentType: 'Tipo: {tipo}',
    
    // Mensagens de ponto
    timeRecordType: 'Tipo: {tipo}',
    recordDate: 'Data: {data}',
    employeeName: 'Empregado: {nome}',
    
    // Severidades
    severity: {
      URGENT: 'Urgente',
      HIGH: 'Alto',
      MEDIUM: 'Médio',
      LOW: 'Baixo'
    },
    
    // Tipos de alerta
    alertType: {
      DOCUMENT_EXPIRATION: 'Vencimento de Documento',
      TIME_RECORD: 'Registro de Ponto',
      PAYMENT: 'Pagamento',
      TASK: 'Tarefa',
      OTHER: 'Outro'
    },
    
    // Tipos de ponto
    timeRecordType: {
      OVERTIME: 'Horas Extras',
      HOLIDAY_WORK: 'Trabalho em Feriado',
      MISSING_RECORD: 'Registro Faltante',
      LATE_ARRIVAL: 'Chegada Tardia',
      EARLY_DEPARTURE: 'Saída Antecipada'
    },
    
    // Mensagens de erro
    errors: {
      loadFailed: 'Erro ao carregar alertas',
      actionFailed: 'Erro ao executar ação',
      updateFailed: 'Erro ao atualizar alerta',
      deleteFailed: 'Erro ao excluir alerta',
      createFailed: 'Erro ao criar alerta'
    },
    
    // Mensagens de sucesso
    success: {
      alertResolved: 'Alerta marcado como resolvido',
      alertDismissed: 'Alerta dispensado',
      alertUpdated: 'Alerta atualizado',
      alertCreated: 'Alerta criado',
      alertDeleted: 'Alerta excluído'
    },
    
    // Configurações
    settings: {
      title: 'Configurações de Alertas',
      emailNotifications: 'Notificações por E-mail',
      smsNotifications: 'Notificações por SMS',
      pushNotifications: 'Notificações Push',
      whatsappNotifications: 'Notificações WhatsApp',
      documentExpirationDays: 'Dias antes do vencimento',
      timeRecordReminderHours: 'Horas antes do registro',
      holidayWorkNotification: 'Trabalho em feriados',
      overtimeNotification: 'Horas extras',
      missingRecordNotification: 'Registros faltantes',
      quietHours: 'Horário silencioso',
      quietHoursEnabled: 'Ativar horário silencioso',
      quietHoursStart: 'Início',
      quietHoursEnd: 'Fim',
      save: 'Salvar configurações',
      cancel: 'Cancelar'
    }
  },
  
  en: {
    // Titles and headers
    title: 'Alerts and Notifications',
    subtitle: 'System alerts and notifications center',
    urgentTitle: 'Urgent',
    importantTitle: 'Important',
    documentsTitle: 'Documents',
    timeRecordsTitle: 'Time Records',
    
    // Sections
    documentsSection: 'Documents with Expiration',
    timeRecordsSection: 'Time Record Alerts',
    otherAlertsSection: 'Other Alerts',
    
    // States
    noAlerts: 'No active alerts',
    noAlertsMessage: 'Everything is in order! No pending notifications.',
    loading: 'Loading alerts...',
    error: 'Error loading alerts',
    
    // Actions
    update: 'Update',
    view: 'View',
    resolve: 'Resolve',
    dismiss: 'Dismiss',
    settings: 'Settings',
    
    // Tooltips
    viewDocument: 'View document details',
    viewRecord: 'View time record details',
    resolveAlert: 'Mark alert as resolved',
    dismissAlert: 'Dismiss this alert',
    alertSettings: 'Configure notification and alert preferences',
    updateAlerts: 'Refresh alerts list',
    
    // Document messages
    expiresIn: 'Expires in {dias} days',
    expirationDate: 'Expiration: {data}',
    documentType: 'Type: {tipo}',
    
    // Time record messages
    timeRecordType: 'Type: {tipo}',
    recordDate: 'Date: {data}',
    employeeName: 'Employee: {nome}',
    
    // Severities
    severity: {
      URGENT: 'Urgent',
      HIGH: 'High',
      MEDIUM: 'Medium',
      LOW: 'Low'
    },
    
    // Alert types
    alertType: {
      DOCUMENT_EXPIRATION: 'Document Expiration',
      TIME_RECORD: 'Time Record',
      PAYMENT: 'Payment',
      TASK: 'Task',
      OTHER: 'Other'
    },
    
    // Time record types
    timeRecordType: {
      OVERTIME: 'Overtime',
      HOLIDAY_WORK: 'Holiday Work',
      MISSING_RECORD: 'Missing Record',
      LATE_ARRIVAL: 'Late Arrival',
      EARLY_DEPARTURE: 'Early Departure'
    },
    
    // Error messages
    errors: {
      loadFailed: 'Failed to load alerts',
      actionFailed: 'Failed to execute action',
      updateFailed: 'Failed to update alert',
      deleteFailed: 'Failed to delete alert',
      createFailed: 'Failed to create alert'
    },
    
    // Success messages
    success: {
      alertResolved: 'Alert marked as resolved',
      alertDismissed: 'Alert dismissed',
      alertUpdated: 'Alert updated',
      alertCreated: 'Alert created',
      alertDeleted: 'Alert deleted'
    },
    
    // Settings
    settings: {
      title: 'Alert Settings',
      emailNotifications: 'Email Notifications',
      smsNotifications: 'SMS Notifications',
      pushNotifications: 'Push Notifications',
      whatsappNotifications: 'WhatsApp Notifications',
      documentExpirationDays: 'Days before expiration',
      timeRecordReminderHours: 'Hours before record',
      holidayWorkNotification: 'Holiday work',
      overtimeNotification: 'Overtime',
      missingRecordNotification: 'Missing records',
      quietHours: 'Quiet Hours',
      quietHoursEnabled: 'Enable quiet hours',
      quietHoursStart: 'Start',
      quietHoursEnd: 'End',
      save: 'Save settings',
      cancel: 'Cancel'
    }
  }
}; 
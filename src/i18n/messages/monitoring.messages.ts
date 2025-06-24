/**
 * Arquivo: monitoring.messages.ts
 * Caminho: src/i18n/messages/monitoring.messages.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Mensagens para o serviço de monitoramento
 */

export const monitoringMessages = {
  pt: {
    status: {
      healthy: 'Saudável',
      degraded: 'Degradado',
      down: 'Fora do ar'
    },
    services: {
      database: 'Banco de Dados',
      email: 'Email',
      stripe: 'Stripe',
      esocial: 'eSocial',
      whatsapp: 'WhatsApp',
      sms: 'SMS',
      push: 'Push Notifications'
    },
    alerts: {
      down: {
        title: 'Serviço Fora do Ar',
        message: 'O serviço {service} está fora do ar',
        severity: 'Crítico'
      },
      degraded: {
        title: 'Serviço Degradado',
        message: 'O serviço {service} está com performance degradada',
        severity: 'Médio'
      },
      recovered: {
        title: 'Serviço Recuperado',
        message: 'O serviço {service} foi recuperado',
        severity: 'Baixo'
      }
    },
    errors: {
      startError: 'Erro ao iniciar monitoramento',
      stopError: 'Erro ao parar monitoramento',
      healthCheckError: 'Erro ao verificar saúde do serviço',
      alertError: 'Erro ao criar alerta',
      configError: 'Erro na configuração de monitoramento',
      serviceNotFound: 'Serviço não encontrado',
      invalidConfig: 'Configuração inválida'
    },
    messages: {
      monitoringStarted: 'Monitoramento iniciado',
      monitoringStopped: 'Monitoramento parado',
      serviceAdded: 'Serviço adicionado ao monitoramento',
      serviceRemoved: 'Serviço removido do monitoramento',
      healthCheckCompleted: 'Verificação de saúde concluída',
      alertCreated: 'Alerta criado',
      alertResolved: 'Alerta resolvido'
    },
    summary: {
      total: 'Total',
      healthy: 'Saudáveis',
      degraded: 'Degradados',
      down: 'Fora do ar',
      overallStatus: 'Status Geral'
    },
    details: {
      responseTime: 'Tempo de Resposta',
      lastCheck: 'Última Verificação',
      error: 'Erro',
      uptime: 'Tempo de Atividade',
      availability: 'Disponibilidade'
    }
  },
  en: {
    status: {
      healthy: 'Healthy',
      degraded: 'Degraded',
      down: 'Down'
    },
    services: {
      database: 'Database',
      email: 'Email',
      stripe: 'Stripe',
      esocial: 'eSocial',
      whatsapp: 'WhatsApp',
      sms: 'SMS',
      push: 'Push Notifications'
    },
    alerts: {
      down: {
        title: 'Service Down',
        message: 'Service {service} is down',
        severity: 'Critical'
      },
      degraded: {
        title: 'Service Degraded',
        message: 'Service {service} has degraded performance',
        severity: 'Medium'
      },
      recovered: {
        title: 'Service Recovered',
        message: 'Service {service} has been recovered',
        severity: 'Low'
      }
    },
    errors: {
      startError: 'Error starting monitoring',
      stopError: 'Error stopping monitoring',
      healthCheckError: 'Error checking service health',
      alertError: 'Error creating alert',
      configError: 'Monitoring configuration error',
      serviceNotFound: 'Service not found',
      invalidConfig: 'Invalid configuration'
    },
    messages: {
      monitoringStarted: 'Monitoring started',
      monitoringStopped: 'Monitoring stopped',
      serviceAdded: 'Service added to monitoring',
      serviceRemoved: 'Service removed from monitoring',
      healthCheckCompleted: 'Health check completed',
      alertCreated: 'Alert created',
      alertResolved: 'Alert resolved'
    },
    summary: {
      total: 'Total',
      healthy: 'Healthy',
      degraded: 'Degraded',
      down: 'Down',
      overallStatus: 'Overall Status'
    },
    details: {
      responseTime: 'Response Time',
      lastCheck: 'Last Check',
      error: 'Error',
      uptime: 'Uptime',
      availability: 'Availability'
    }
  }
}; 
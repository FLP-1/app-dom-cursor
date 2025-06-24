/**
 * Arquivo: push.messages.ts
 * Caminho: src/i18n/messages/push.messages.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Mensagens para o serviço de Push Notifications
 */

export const pushMessages = {
  pt: {
    welcome: {
      title: 'Bem-vindo ao DOM',
      message: 'Olá {name}, seu cadastro foi realizado com sucesso.',
      success: 'Notificação de boas-vindas enviada',
      error: 'Erro ao enviar notificação de boas-vindas'
    },
    passwordReset: {
      title: 'Redefinição de Senha',
      message: 'Sua senha foi redefinida com sucesso.',
      success: 'Notificação de redefinição enviada',
      error: 'Erro ao enviar notificação de redefinição'
    },
    timeRecord: {
      entry: {
        title: 'Ponto Registrado',
        message: 'Entrada registrada às {time}'
      },
      exit: {
        title: 'Saída Registrada',
        message: 'Saída registrada às {time}'
      },
      break: {
        title: 'Intervalo Registrado',
        message: 'Intervalo registrado às {time}'
      },
      success: 'Notificação de ponto enviada',
      error: 'Erro ao enviar notificação de ponto'
    },
    document: {
      title: 'Novo Documento',
      message: 'Documento "{documentName}" foi adicionado.',
      success: 'Notificação de documento enviada',
      error: 'Erro ao enviar notificação de documento'
    },
    esocial: {
      title: 'Evento eSocial',
      message: 'Evento {event} {status}.',
      success: 'Notificação de eSocial enviada',
      error: 'Erro ao enviar notificação de eSocial'
    },
    notification: {
      title: 'Notificação',
      message: 'Você tem uma nova notificação',
      success: 'Notificação enviada com sucesso',
      error: 'Erro ao enviar notificação'
    },
    errors: {
      sendError: 'Erro ao enviar notificação push',
      listError: 'Erro ao listar notificações push',
      getError: 'Erro ao obter notificação push',
      deleteError: 'Erro ao remover notificação push',
      configError: 'Erro ao obter configuração de push',
      updateConfigError: 'Erro ao atualizar configuração de push',
      testConfigError: 'Erro ao testar configuração de push',
      subscriptionError: 'Erro ao gerenciar subscrição',
      userNotFound: 'Usuário não encontrado',
      noSubscriptions: 'Nenhuma subscrição ativa encontrada'
    },
    status: {
      pending: 'Pendente',
      sent: 'Enviado',
      received: 'Recebido',
      clicked: 'Clicado',
      failed: 'Falha',
      cancelled: 'Cancelado'
    },
    types: {
      system: 'Sistema',
      user: 'Usuário',
      company: 'Empresa',
      timeRecord: 'Ponto',
      occurrence: 'Ocorrência',
      document: 'Documento',
      esocial: 'eSocial',
      backup: 'Backup',
      security: 'Segurança'
    },
    actions: {
      subscribe: 'Inscrever-se',
      unsubscribe: 'Cancelar inscrição',
      enable: 'Ativar notificações',
      disable: 'Desativar notificações',
      view: 'Visualizar',
      dismiss: 'Descartar'
    }
  },
  en: {
    welcome: {
      title: 'Welcome to DOM',
      message: 'Hello {name}, your registration was successful.',
      success: 'Welcome notification sent successfully',
      error: 'Error sending welcome notification'
    },
    passwordReset: {
      title: 'Password Reset',
      message: 'Your password has been reset successfully.',
      success: 'Password reset notification sent successfully',
      error: 'Error sending password reset notification'
    },
    timeRecord: {
      entry: {
        title: 'Time Recorded',
        message: 'Entry recorded at {time}'
      },
      exit: {
        title: 'Exit Recorded',
        message: 'Exit recorded at {time}'
      },
      break: {
        title: 'Break Recorded',
        message: 'Break recorded at {time}'
      },
      success: 'Time record notification sent successfully',
      error: 'Error sending time record notification'
    },
    document: {
      title: 'New Document',
      message: 'Document "{documentName}" has been added.',
      success: 'Document notification sent successfully',
      error: 'Error sending document notification'
    },
    esocial: {
      title: 'eSocial Event',
      message: 'Event {event} {status}.',
      success: 'eSocial notification sent successfully',
      error: 'Error sending eSocial notification'
    },
    notification: {
      title: 'Notification',
      message: 'You have a new notification',
      success: 'Notification sent successfully',
      error: 'Error sending notification'
    },
    errors: {
      sendError: 'Error sending push notification',
      listError: 'Error listing push notifications',
      getError: 'Error getting push notification',
      deleteError: 'Error deleting push notification',
      configError: 'Error getting push configuration',
      updateConfigError: 'Error updating push configuration',
      testConfigError: 'Error testing push configuration',
      subscriptionError: 'Error managing subscription',
      userNotFound: 'User not found',
      noSubscriptions: 'No active subscriptions found'
    },
    status: {
      pending: 'Pending',
      sent: 'Sent',
      received: 'Received',
      clicked: 'Clicked',
      failed: 'Failed',
      cancelled: 'Cancelled'
    },
    types: {
      system: 'System',
      user: 'User',
      company: 'Company',
      timeRecord: 'Time Record',
      occurrence: 'Occurrence',
      document: 'Document',
      esocial: 'eSocial',
      backup: 'Backup',
      security: 'Security'
    },
    actions: {
      subscribe: 'Subscribe',
      unsubscribe: 'Unsubscribe',
      enable: 'Enable notifications',
      disable: 'Disable notifications',
      view: 'View',
      dismiss: 'Dismiss'
    }
  }
}; 
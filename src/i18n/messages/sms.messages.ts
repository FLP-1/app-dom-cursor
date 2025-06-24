/**
 * Arquivo: sms.messages.ts
 * Caminho: src/i18n/messages/sms.messages.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Mensagens para o serviço de SMS
 */

export const smsMessages = {
  pt: {
    verification: {
      title: 'Código de Verificação',
      message: 'Seu código de verificação DOM é: {code}. Válido por 15 minutos.',
      success: 'Código de verificação enviado com sucesso',
      error: 'Erro ao enviar código de verificação'
    },
    passwordReset: {
      title: 'Redefinição de Senha',
      message: 'Seu código para redefinir senha DOM é: {code}. Válido por 15 minutos.',
      success: 'Código de redefinição enviado com sucesso',
      error: 'Erro ao enviar código de redefinição'
    },
    welcome: {
      title: 'Bem-vindo ao DOM',
      message: 'Bem-vindo ao DOM, {name}! Seu cadastro foi realizado com sucesso.',
      success: 'Mensagem de boas-vindas enviada',
      error: 'Erro ao enviar mensagem de boas-vindas'
    },
    notification: {
      title: 'Notificação',
      message: '{title}: {message}',
      success: 'Notificação enviada com sucesso',
      error: 'Erro ao enviar notificação'
    },
    errors: {
      invalidNumber: 'Número de telefone inválido',
      invalidMessage: 'Mensagem inválida ou excede o limite de 160 caracteres',
      providerUnavailable: 'Provedor de SMS indisponível',
      insufficientBalance: 'Saldo insuficiente',
      configurationError: 'Erro na configuração do SMS',
      sendError: 'Erro ao enviar SMS',
      listError: 'Erro ao listar SMS',
      getError: 'Erro ao obter SMS',
      deleteError: 'Erro ao remover SMS',
      configError: 'Erro ao obter configuração de SMS',
      updateConfigError: 'Erro ao atualizar configuração de SMS',
      testConfigError: 'Erro ao testar configuração de SMS'
    },
    status: {
      pending: 'Pendente',
      sent: 'Enviado',
      delivered: 'Entregue',
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
    }
  },
  en: {
    verification: {
      title: 'Verification Code',
      message: 'Your DOM verification code is: {code}. Valid for 15 minutes.',
      success: 'Verification code sent successfully',
      error: 'Error sending verification code'
    },
    passwordReset: {
      title: 'Password Reset',
      message: 'Your DOM password reset code is: {code}. Valid for 15 minutes.',
      success: 'Password reset code sent successfully',
      error: 'Error sending password reset code'
    },
    welcome: {
      title: 'Welcome to DOM',
      message: 'Welcome to DOM, {name}! Your registration was successful.',
      success: 'Welcome message sent successfully',
      error: 'Error sending welcome message'
    },
    notification: {
      title: 'Notification',
      message: '{title}: {message}',
      success: 'Notification sent successfully',
      error: 'Error sending notification'
    },
    errors: {
      invalidNumber: 'Invalid phone number',
      invalidMessage: 'Invalid message or exceeds 160 character limit',
      providerUnavailable: 'SMS provider unavailable',
      insufficientBalance: 'Insufficient balance',
      configurationError: 'SMS configuration error',
      sendError: 'Error sending SMS',
      listError: 'Error listing SMS',
      getError: 'Error getting SMS',
      deleteError: 'Error deleting SMS',
      configError: 'Error getting SMS configuration',
      updateConfigError: 'Error updating SMS configuration',
      testConfigError: 'Error testing SMS configuration'
    },
    status: {
      pending: 'Pending',
      sent: 'Sent',
      delivered: 'Delivered',
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
    }
  }
}; 
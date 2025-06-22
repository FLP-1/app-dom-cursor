/**
 * Arquivo: email.messages.ts
 * Caminho: src/i18n/messages/email.messages.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Mensagens centralizadas para templates de email em português e inglês.
 */

export const emailMessages = {
  pt: {
    verification: {
      title: "Verificação de Email",
      greeting: "Olá,",
      codeMessage: "Seu código de verificação é:",
      codeExpiration: "Este código é válido por 15 minutos.",
      ignoreMessage: "Se você não solicitou esta verificação, por favor ignore este email."
    },
    passwordReset: {
      title: "Redefinição de Senha",
      greeting: "Olá,",
      requestMessage: "Recebemos uma solicitação para redefinir sua senha no DOM.",
      actionMessage: "Para prosseguir com a redefinição de senha, clique no botão abaixo:",
      ignoreMessage: "Se você não solicitou a redefinição de senha, por favor ignore este email.",
      linkExpiration: "Este link é válido por 1 hora."
    },
    validation: {
      title: "Validação de Email",
      codeMessage: "Seu código de validação é:",
      codeExpiration: "Este código expira em 30 minutos."
    }
  },
  en: {
    verification: {
      title: "Email Verification",
      greeting: "Hello,",
      codeMessage: "Your verification code is:",
      codeExpiration: "This code is valid for 15 minutes.",
      ignoreMessage: "If you did not request this verification, please ignore this email."
    },
    passwordReset: {
      title: "Password Reset",
      greeting: "Hello,",
      requestMessage: "We received a request to reset your password in DOM.",
      actionMessage: "To proceed with the password reset, click the button below:",
      ignoreMessage: "If you did not request the password reset, please ignore this email.",
      linkExpiration: "This link is valid for 1 hour."
    },
    validation: {
      title: "Email Validation",
      codeMessage: "Your validation code is:",
      codeExpiration: "This code expires in 30 minutes."
    }
  }
}; 
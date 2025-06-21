/**
 * Arquivo: sendgrid.service.ts
 * Caminho: src/services/sendgrid.service.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de envio de email com SendGrid
 */

import sgMail from '@sendgrid/mail';
import { LogService, TipoLog, CategoriaLog } from '@/services/log.service';

interface EmailOptions {
  to: string;
  from?: string;
  subject: string;
  text?: string;
  html?: string;
  templateId?: string;
  dynamicTemplateData?: Record<string, unknown>;
}

export class SendGridService {
  private static instance: SendGridService;
  private initialized = false;

  private constructor() {}

  static getInstance(): SendGridService {
    if (!SendGridService.instance) {
      SendGridService.instance = new SendGridService();
    }
    return SendGridService.instance;
  }

  async initialize() {
    if (!this.initialized) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
      this.initialized = true;
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      await this.initialize();

      const msg = {
        to: options.to,
        from: options.from || process.env.SENDGRID_FROM_EMAIL || '',
        subject: options.subject,
        text: options.text,
        html: options.html,
        templateId: options.templateId,
        dynamicTemplateData: options.dynamicTemplateData,
      };

      await sgMail.send(msg);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.EMAIL,
        mensagem: 'Email enviado com sucesso',
        detalhes: { to: options.to, subject: options.subject }
      });

      return true;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.EMAIL,
        mensagem: 'Erro ao enviar email',
        detalhes: { error, options }
      });

      return false;
    }
  }

  async sendTemplateEmail(
    to: string,
    templateId: string,
    dynamicTemplateData: Record<string, unknown>
  ): Promise<boolean> {
    return this.sendEmail({
      to,
      subject: typeof dynamicTemplateData.subject === 'string' ? dynamicTemplateData.subject : 'Notificação',
      templateId,
      dynamicTemplateData
    });
  }

  async sendWelcomeEmail(to: string, name: string): Promise<boolean> {
    return this.sendTemplateEmail(to, 'd-welcome-template-id', {
      name,
      subject: 'Bem-vindo ao DOM!'
    });
  }

  async sendPasswordResetEmail(to: string, resetToken: string): Promise<boolean> {
    return this.sendTemplateEmail(to, 'd-password-reset-template-id', {
      resetToken,
      subject: 'Recuperação de Senha'
    });
  }

  async sendNotificationEmail(to: string, notification: unknown): Promise<boolean> {
    const subject = typeof notification === 'object' && notification && 'title' in notification && typeof (notification as any).title === 'string'
      ? (notification as any).title
      : 'Notificação';
    return this.sendTemplateEmail(to, 'd-notification-template-id', {
      notification,
      subject
    });
  }
} 

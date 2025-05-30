import { sendEmail } from '../../lib/email';
import nodemailer from 'nodemailer';

// Mock do nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(),
}));

describe('Email Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve enviar email com sucesso', async () => {
    const emailOptions = {
      to: 'test@example.com',
      subject: 'Test Subject',
      html: '<p>Test content</p>',
    };

    const mockTransporter = {
      sendMail: jest.fn().mockResolvedValue({ messageId: 'test-message-id' }),
    };

    (nodemailer.createTransport as jest.Mock).mockReturnValue(mockTransporter);

    await sendEmail(emailOptions);

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    expect(mockTransporter.sendMail).toHaveBeenCalledWith({
      from: process.env.SMTP_FROM,
      ...emailOptions,
    });
  });

  it('deve lançar erro quando falhar ao enviar email', async () => {
    const emailOptions = {
      to: 'test@example.com',
      subject: 'Test Subject',
      html: '<p>Test content</p>',
    };

    const mockTransporter = {
      sendMail: jest.fn().mockRejectedValue(new Error('SMTP error')),
    };

    (nodemailer.createTransport as jest.Mock).mockReturnValue(mockTransporter);

    await expect(sendEmail(emailOptions)).rejects.toThrow('Falha ao enviar e-mail');
  });
}); 
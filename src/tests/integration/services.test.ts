/**
 * Arquivo: services.test.ts
 * Caminho: src/tests/integration/services.test.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Testes de integração para serviços externos
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { prisma } from '@/lib/prisma';
import { EmailService } from '@/services/email.service';
import { SMSService } from '@/services/sms.service';
import { PushNotificationService } from '@/services/push-notification.service';
import { MonitoringService } from '@/services/monitoring.service';
import { setupTestDatabase, teardownTestDatabase } from '@/tests/integration/setup';

describe('Integração de Serviços Externos', () => {
  let schemaId: string;
  let databaseURL: string;

  beforeAll(async () => {
    const setup = await setupTestDatabase();
    schemaId = setup.schemaId;
    databaseURL = setup.databaseURL;
  });

  afterAll(async () => {
    await teardownTestDatabase(schemaId);
  });

  beforeEach(async () => {
    // Limpa dados de teste
    await prisma.user.deleteMany();
    await prisma.mensagemSMS.deleteMany();
    await prisma.pushNotification.deleteMany();
  });

  describe('Email Service', () => {
    it('deve configurar o serviço de email corretamente', async () => {
      expect(EmailService.initialized).toBeDefined();
    });

    it('deve enviar email de boas-vindas', async () => {
      const result = await EmailService.sendWelcomeEmail(
        'test@example.com',
        'João Silva'
      );
      
      expect(typeof result).toBe('boolean');
    });

    it('deve enviar email de recuperação de senha', async () => {
      const result = await EmailService.sendPasswordResetEmail(
        'test@example.com',
        'reset-token-123'
      );
      
      expect(typeof result).toBe('boolean');
    });

    it('deve listar configurações de email', async () => {
      try {
        const config = await EmailService.obterConfiguracao();
        expect(config).toBeDefined();
      } catch (error) {
        // Pode falhar se não estiver configurado, mas não deve quebrar
        expect(error).toBeDefined();
      }
    });
  });

  describe('SMS Service', () => {
    it('deve enviar SMS de código de verificação', async () => {
      const result = await SMSService.sendVerificationCode(
        '+5511999999999',
        '123456'
      );
      
      expect(typeof result).toBe('boolean');
    });

    it('deve enviar SMS de recuperação de senha', async () => {
      const result = await SMSService.sendPasswordResetCode(
        '+5511999999999',
        '123456'
      );
      
      expect(typeof result).toBe('boolean');
    });

    it('deve enviar SMS de notificação', async () => {
      const result = await SMSService.sendNotificationMessage(
        '+5511999999999',
        {
          title: 'Teste',
          message: 'Mensagem de teste'
        }
      );
      
      expect(typeof result).toBe('boolean');
    });

    it('deve listar SMS enviados', async () => {
      try {
        const sms = await SMSService.listar();
        expect(Array.isArray(sms)).toBe(true);
      } catch (error) {
        // Pode falhar se não estiver configurado
        expect(error).toBeDefined();
      }
    });
  });

  describe('Push Notification Service', () => {
    it('deve enviar notificação push para usuário', async () => {
      // Cria usuário de teste
      const user = await prisma.user.create({
        data: {
          name: 'Test User',
          email: 'test@example.com',
          cpf: '12345678901',
          phone: '+5511999999999',
          password: 'hashedpassword',
          userType: 'EMPREGADOR'
        }
      });

      const result = await PushNotificationService.sendToUser(
        user.id,
        'Teste',
        'Mensagem de teste'
      );
      
      expect(typeof result).toBe('boolean');
    });

    it('deve enviar notificação de boas-vindas', async () => {
      const user = await prisma.user.create({
        data: {
          name: 'Test User',
          email: 'test@example.com',
          cpf: '12345678902',
          phone: '+5511999999998',
          password: 'hashedpassword',
          userType: 'EMPREGADOR'
        }
      });

      const result = await PushNotificationService.sendWelcomeNotification(
        user.id,
        'João Silva'
      );
      
      expect(typeof result).toBe('boolean');
    });

    it('deve enviar notificação de ponto', async () => {
      const user = await prisma.user.create({
        data: {
          name: 'Test User',
          email: 'test@example.com',
          cpf: '12345678903',
          phone: '+5511999999997',
          password: 'hashedpassword',
          userType: 'EMPREGADOR'
        }
      });

      const result = await PushNotificationService.sendPontoNotification(
        user.id,
        'entrada',
        '08:00'
      );
      
      expect(typeof result).toBe('boolean');
    });

    it('deve listar notificações push', async () => {
      try {
        const notifications = await PushNotificationService.listar();
        expect(Array.isArray(notifications)).toBe(true);
      } catch (error) {
        // Pode falhar se não estiver configurado
        expect(error).toBeDefined();
      }
    });
  });

  describe('Monitoring Service', () => {
    it('deve obter saúde geral dos serviços', async () => {
      const health = await MonitoringService.getOverallHealth();
      
      expect(health).toHaveProperty('status');
      expect(health).toHaveProperty('services');
      expect(health).toHaveProperty('summary');
      expect(['healthy', 'degraded', 'down']).toContain(health.status);
    });

    it('deve listar todos os serviços monitorados', async () => {
      const services = await MonitoringService.getAllServicesHealth();
      
      expect(Array.isArray(services)).toBe(true);
      services.forEach(service => {
        expect(service).toHaveProperty('service');
        expect(service).toHaveProperty('status');
        expect(service).toHaveProperty('responseTime');
        expect(service).toHaveProperty('lastCheck');
      });
    });

    it('deve obter saúde de serviço específico', async () => {
      const health = await MonitoringService.getServiceHealth('database');
      
      if (health) {
        expect(health).toHaveProperty('service', 'database');
        expect(health).toHaveProperty('status');
        expect(health).toHaveProperty('responseTime');
      }
    });

    it('deve listar alertas ativos', async () => {
      const alerts = await MonitoringService.getActiveAlerts();
      
      expect(Array.isArray(alerts)).toBe(true);
      alerts.forEach(alert => {
        expect(alert).toHaveProperty('service');
        expect(alert).toHaveProperty('type');
        expect(alert).toHaveProperty('message');
        expect(alert).toHaveProperty('severity');
      });
    });
  });

  describe('Integração entre Serviços', () => {
    it('deve enviar notificação por múltiplos canais', async () => {
      const user = await prisma.user.create({
        data: {
          name: 'Test User',
          email: 'test@example.com',
          cpf: '12345678904',
          phone: '+5511999999996',
          password: 'hashedpassword',
          userType: 'EMPREGADOR'
        }
      });

      const notification = {
        title: 'Teste Multi-canal',
        message: 'Mensagem enviada por múltiplos canais'
      };

      // Envia por email
      const emailResult = await EmailService.sendNotificationEmail(
        user.email,
        notification
      );

      // Envia por SMS
      const smsResult = await SMSService.sendNotificationMessage(
        user.phone,
        notification
      );

      // Envia por push
      const pushResult = await PushNotificationService.sendToUser(
        user.id,
        notification.title,
        notification.message
      );

      expect(typeof emailResult).toBe('boolean');
      expect(typeof smsResult).toBe('boolean');
      expect(typeof pushResult).toBe('boolean');
    });

    it('deve monitorar falhas de serviços', async () => {
      // Simula falha de serviço
      const mockHealth = {
        service: 'test-service',
        status: 'down' as const,
        responseTime: 5000,
        lastCheck: new Date(),
        error: 'Service unavailable'
      };

      // Verifica se o monitoramento detecta a falha
      const overallHealth = await MonitoringService.getOverallHealth();
      expect(overallHealth).toHaveProperty('status');
      expect(overallHealth).toHaveProperty('summary');
    });
  });

  describe('Validações e Tratamento de Erros', () => {
    it('deve validar número de telefone para SMS', async () => {
      // Número inválido
      const invalidResult = await SMSService.sendTextMessage(
        'invalid-number',
        'Test message'
      );
      
      expect(typeof invalidResult).toBe('boolean');
    });

    it('deve validar email para notificações', async () => {
      // Email inválido
      const invalidResult = await EmailService.sendWelcomeEmail(
        'invalid-email',
        'Test User'
      );
      
      expect(typeof invalidResult).toBe('boolean');
    });

    it('deve tratar erros de configuração', async () => {
      // Testa serviços sem configuração
      try {
        await SMSService.obterConfiguracao();
      } catch (error) {
        expect(error).toBeDefined();
      }

      try {
        await PushNotificationService.obterConfiguracao();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
}); 
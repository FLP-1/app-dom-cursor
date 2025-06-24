/**
 * Arquivo: monitoring.service.ts
 * Caminho: src/services/monitoring.service.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Serviço de monitoramento para acompanhar a saúde dos serviços externos
 */

import axios from 'axios';
import { LogService, TipoLog, CategoriaLog } from '@/services/log.service';
import { prisma } from '@/lib/prisma';
import { CacheService } from '@/services/cache.service';
import { monitoringMessages } from '@/i18n/messages/monitoring.messages';

/**
 * Serviço de Monitoramento
 * @description Monitora a saúde dos serviços externos
 * @author DOM
 * @version 1.0.0
 * @since 2025-01-27
 */

export interface ServiceHealth {
  service: string;
  status: 'healthy' | 'degraded' | 'down';
  responseTime: number;
  lastCheck: Date;
  error?: string;
  details?: Record<string, unknown>;
}

export interface MonitoringConfig {
  id: string;
  service: string;
  url: string;
  method: 'GET' | 'POST' | 'HEAD';
  timeout: number;
  interval: number;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MonitoringAlert {
  id: string;
  service: string;
  type: 'down' | 'degraded' | 'recovered';
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  resolvedAt?: Date;
}

class MonitoringManager {
  private static instance: MonitoringManager;
  private readonly services: Map<string, MonitoringConfig> = new Map();
  private readonly healthCache: Map<string, ServiceHealth> = new Map();
  private readonly checkIntervals: Map<string, NodeJS.Timeout> = new Map();

  private constructor() {
    this.initializeDefaultServices();
  }

  static getInstance(): MonitoringManager {
    if (!MonitoringManager.instance) {
      MonitoringManager.instance = new MonitoringManager();
    }
    return MonitoringManager.instance;
  }

  private initializeDefaultServices() {
    // Serviços padrão para monitorar
    const defaultServices = [
      {
        service: 'database',
        url: '/api/health/database',
        method: 'GET' as const,
        timeout: 5000,
        interval: 30000, // 30 segundos
        enabled: true
      },
      {
        service: 'email',
        url: '/api/health/email',
        method: 'GET' as const,
        timeout: 10000,
        interval: 60000, // 1 minuto
        enabled: true
      },
      {
        service: 'stripe',
        url: '/api/health/stripe',
        method: 'GET' as const,
        timeout: 10000,
        interval: 120000, // 2 minutos
        enabled: true
      },
      {
        service: 'esocial',
        url: '/api/health/esocial',
        method: 'GET' as const,
        timeout: 15000,
        interval: 300000, // 5 minutos
        enabled: true
      },
      {
        service: 'whatsapp',
        url: '/api/health/whatsapp',
        method: 'GET' as const,
        timeout: 10000,
        interval: 120000, // 2 minutos
        enabled: true
      },
      {
        service: 'sms',
        url: '/api/health/sms',
        method: 'GET' as const,
        timeout: 10000,
        interval: 120000, // 2 minutos
        enabled: true
      },
      {
        service: 'push',
        url: '/api/health/push',
        method: 'GET' as const,
        timeout: 5000,
        interval: 60000, // 1 minuto
        enabled: true
      }
    ];

    defaultServices.forEach(config => {
      this.services.set(config.service, {
        id: config.service,
        ...config,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
  }

  async startMonitoring(): Promise<void> {
    try {
      for (const [serviceName, config] of this.services) {
        if (config.enabled) {
          await this.startServiceMonitoring(serviceName, config);
        }
      }

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: monitoringMessages.pt.messages.monitoringStarted,
        detalhes: { servicesCount: this.services.size }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: monitoringMessages.pt.errors.startError,
        detalhes: { error }
      });
    }
  }

  async stopMonitoring(): Promise<void> {
    try {
      for (const interval of this.checkIntervals.values()) {
        clearInterval(interval);
      }
      this.checkIntervals.clear();

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.SISTEMA,
        mensagem: monitoringMessages.pt.messages.monitoringStopped
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: monitoringMessages.pt.errors.stopError,
        detalhes: { error }
      });
    }
  }

  private async startServiceMonitoring(serviceName: string, config: MonitoringConfig): Promise<void> {
    // Executa verificação inicial
    await this.checkServiceHealth(serviceName, config);

    // Configura verificação periódica
    const interval = setInterval(async () => {
      await this.checkServiceHealth(serviceName, config);
    }, config.interval);

    this.checkIntervals.set(serviceName, interval);
  }

  private async checkServiceHealth(serviceName: string, config: MonitoringConfig): Promise<void> {
    const startTime = Date.now();
    let status: ServiceHealth['status'] = 'healthy';
    let error: string | undefined;
    let details: Record<string, unknown> | undefined;

    try {
      const response = await axios({
        method: config.method,
        url: config.url,
        timeout: config.timeout,
        validateStatus: () => true // Aceita qualquer status para monitoramento
      });

      const responseTime = Date.now() - startTime;

      if (response.status >= 500) {
        status = 'down';
        error = `HTTP ${response.status}: ${response.statusText}`;
      } else if (response.status >= 400 || responseTime > config.timeout * 0.8) {
        status = 'degraded';
        error = response.status >= 400 ? `HTTP ${response.status}` : 'Response time degraded';
      }

      details = {
        statusCode: response.status,
        responseTime,
        responseSize: response.data ? JSON.stringify(response.data).length : 0
      };

      await this.updateServiceHealth(serviceName, {
        service: serviceName,
        status,
        responseTime,
        lastCheck: new Date(),
        error,
        details
      });

    } catch (err) {
      const responseTime = Date.now() - startTime;
      status = 'down';
      error = err instanceof Error ? err.message : 'Unknown error';

      await this.updateServiceHealth(serviceName, {
        service: serviceName,
        status,
        responseTime,
        lastCheck: new Date(),
        error,
        details: { error: err }
      });
    }
  }

  private async updateServiceHealth(serviceName: string, health: ServiceHealth): Promise<void> {
    const previousHealth = this.healthCache.get(serviceName);
    this.healthCache.set(serviceName, health);

    // Verifica se houve mudança de status
    if (previousHealth && previousHealth.status !== health.status) {
      await this.createAlert(serviceName, health, previousHealth);
    }

    // Salva no banco de dados
    try {
      await prisma.serviceHealth.upsert({
        where: { service: serviceName },
        update: {
          status: health.status,
          responseTime: health.responseTime,
          lastCheck: health.lastCheck,
          error: health.error,
          details: health.details,
          updatedAt: new Date()
        },
        create: {
          service: serviceName,
          status: health.status,
          responseTime: health.responseTime,
          lastCheck: health.lastCheck,
          error: health.error,
          details: health.details,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
    } catch (error) {
      console.error(`Erro ao salvar saúde do serviço ${serviceName}:`, error);
    }
  }

  private async createAlert(
    serviceName: string, 
    currentHealth: ServiceHealth, 
    previousHealth: ServiceHealth
  ): Promise<void> {
    let type: MonitoringAlert['type'];
    let severity: MonitoringAlert['severity'];
    let message: string;

    if (currentHealth.status === 'down') {
      type = 'down';
      severity = 'critical';
      message = `Serviço ${serviceName} está fora do ar`;
    } else if (currentHealth.status === 'degraded') {
      type = 'degraded';
      severity = 'medium';
      message = `Serviço ${serviceName} está com performance degradada`;
    } else {
      type = 'recovered';
      severity = 'low';
      message = `Serviço ${serviceName} foi recuperado`;
    }

    try {
      await prisma.monitoringAlert.create({
        data: {
          service: serviceName,
          type,
          message,
          severity,
          createdAt: new Date()
        }
      });

      await LogService.create({
        tipo: type === 'recovered' ? TipoLog.INFO : TipoLog.WARNING,
        categoria: CategoriaLog.SISTEMA,
        mensagem: message,
        detalhes: {
          service: serviceName,
          previousStatus: previousHealth.status,
          currentStatus: currentHealth.status,
          responseTime: currentHealth.responseTime,
          error: currentHealth.error
        }
      });
    } catch (error) {
      console.error(`Erro ao criar alerta para ${serviceName}:`, error);
    }
  }

  async getServiceHealth(serviceName: string): Promise<ServiceHealth | null> {
    return this.healthCache.get(serviceName) || null;
  }

  async getAllServicesHealth(): Promise<ServiceHealth[]> {
    return Array.from(this.healthCache.values());
  }

  async getOverallHealth(): Promise<{
    status: 'healthy' | 'degraded' | 'down';
    services: ServiceHealth[];
    summary: {
      total: number;
      healthy: number;
      degraded: number;
      down: number;
    };
  }> {
    const services = await this.getAllServicesHealth();
    
    const summary = {
      total: services.length,
      healthy: services.filter(s => s.status === 'healthy').length,
      degraded: services.filter(s => s.status === 'degraded').length,
      down: services.filter(s => s.status === 'down').length
    };

    let overallStatus: 'healthy' | 'degraded' | 'down' = 'healthy';
    if (summary.down > 0) {
      overallStatus = 'down';
    } else if (summary.degraded > 0) {
      overallStatus = 'degraded';
    }

    return {
      status: overallStatus,
      services,
      summary
    };
  }

  async getActiveAlerts(): Promise<MonitoringAlert[]> {
    try {
      return await prisma.monitoringAlert.findMany({
        where: {
          resolvedAt: null
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    } catch (error) {
      console.error('Erro ao buscar alertas ativos:', error);
      return [];
    }
  }

  async resolveAlert(alertId: string): Promise<void> {
    try {
      await prisma.monitoringAlert.update({
        where: { id: alertId },
        data: {
          resolvedAt: new Date()
        }
      });
    } catch (error) {
      console.error('Erro ao resolver alerta:', error);
    }
  }

  async addService(config: Omit<MonitoringConfig, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    const newConfig: MonitoringConfig = {
      id: config.service,
      ...config,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.services.set(config.service, newConfig);

    if (config.enabled) {
      await this.startServiceMonitoring(config.service, newConfig);
    }
  }

  async removeService(serviceName: string): Promise<void> {
    const interval = this.checkIntervals.get(serviceName);
    if (interval) {
      clearInterval(interval);
      this.checkIntervals.delete(serviceName);
    }

    this.services.delete(serviceName);
    this.healthCache.delete(serviceName);
  }
}

const monitoringManager = MonitoringManager.getInstance();

export const MonitoringService = {
  async startMonitoring(): Promise<void> {
    return monitoringManager.startMonitoring();
  },

  async stopMonitoring(): Promise<void> {
    return monitoringManager.stopMonitoring();
  },

  async getServiceHealth(serviceName: string): Promise<ServiceHealth | null> {
    return monitoringManager.getServiceHealth(serviceName);
  },

  async getAllServicesHealth(): Promise<ServiceHealth[]> {
    return monitoringManager.getAllServicesHealth();
  },

  async getOverallHealth(): Promise<{
    status: 'healthy' | 'degraded' | 'down';
    services: ServiceHealth[];
    summary: {
      total: number;
      healthy: number;
      degraded: number;
      down: number;
    };
  }> {
    return monitoringManager.getOverallHealth();
  },

  async getActiveAlerts(): Promise<MonitoringAlert[]> {
    return monitoringManager.getActiveAlerts();
  },

  async resolveAlert(alertId: string): Promise<void> {
    return monitoringManager.resolveAlert(alertId);
  },

  async addService(config: Omit<MonitoringConfig, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    return monitoringManager.addService(config);
  },

  async removeService(serviceName: string): Promise<void> {
    return monitoringManager.removeService(serviceName);
  }
};

export const monitoringService = MonitoringService; 
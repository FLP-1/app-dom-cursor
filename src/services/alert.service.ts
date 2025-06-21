/**
 * Arquivo: alert.service.ts
 * Caminho: src/services/alert.service.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de alertas
 */

// Tipo provisório para Alert, ajuste conforme necessário
export interface Alert {
  id?: string;
  mensagem?: string;
  tipo?: string;
  [key: string]: unknown;
}

export function getAlerts(): Alert[] {
  return [];
}

export function addAlert(alert: Alert): Alert {
  // mock
  return alert;
}

export const AlertService = {
  async getAlerts(filters?: Record<string, any>): Promise<Alert[]> {
    try {
      let url = '/api/alerts';
      if (filters) {
        const params = new URLSearchParams();
        if (filters.type) params.append('type', filters.type);
        if (filters.severity) params.append('severity', filters.severity);
        if (filters.startDate) params.append('startDate', new Date(filters.startDate).toISOString());
        if (filters.endDate) params.append('endDate', new Date(filters.endDate).toISOString());
        if (filters.message) params.append('message', filters.message);
        const query = params.toString();
        if (query) url += `?${query}`;
      }
      const token = localStorage.getItem('token'); // ajuste conforme seu fluxo de auth
      const response = await fetch(url, {
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
      });
      if (!response.ok) throw new Error('Erro ao buscar alertas');
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar alertas:', error);
      return [];
    }
  },
  async addAlert(alert: Alert): Promise<Alert | null> {
    try {
      const token = localStorage.getItem('token'); // ajuste conforme seu fluxo de auth
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(alert),
      });
      if (!response.ok) throw new Error('Erro ao adicionar alerta');
      return await response.json();
    } catch (error) {
      console.error('Erro ao adicionar alerta:', error);
      return null;
    }
  },
  async remove(id: string): Promise<boolean> {
    try {
      const token = localStorage.getItem('token'); // ajuste conforme seu fluxo de auth
      const response = await fetch(`/api/alerts/${id}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
      });
      if (!response.ok) throw new Error('Erro ao remover alerta');
      return true;
    } catch (error) {
      console.error('Erro ao remover alerta:', error);
      return false;
    }
  },
}; 

/**
 * Arquivo: index.ts
 * Caminho: src/pages/api/ponto/index.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Endpoint da API para fornecer dados de ponto eletrônico.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { PontoData } from '@/hooks/usePontoData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PontoData>
) {
  const today = new Date().toISOString().split('T')[0];
  const currentTime = new Date().toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const mockData: PontoData = {
    todayRecords: [
      {
        id: '1',
        employeeId: 'EMP001',
        employeeName: 'Maria Silva',
        date: today,
        time: '08:00',
        type: 'entrada',
        location: 'Recepção',
        device: 'Terminal 01',
        status: 'normal'
      },
      {
        id: '2',
        employeeId: 'EMP001',
        employeeName: 'Maria Silva',
        date: today,
        time: '12:00',
        type: 'intervalo_inicio',
        location: 'Recepção',
        device: 'Terminal 01',
        status: 'normal'
      },
      {
        id: '3',
        employeeId: 'EMP001',
        employeeName: 'Maria Silva',
        date: today,
        time: '13:00',
        type: 'intervalo_fim',
        location: 'Recepção',
        device: 'Terminal 01',
        status: 'normal'
      }
    ],
    weeklySummary: [
      {
        date: '2025-01-20',
        totalHours: 8,
        workedHours: 7.5,
        breakHours: 0.5,
        overtimeHours: 0,
        lateMinutes: 0,
        earlyLeaveMinutes: 0,
        records: [
          {
            id: 'w1',
            employeeId: 'EMP001',
            employeeName: 'Maria Silva',
            date: '2025-01-20',
            time: '08:00',
            type: 'entrada',
            status: 'normal'
          },
          {
            id: 'w2',
            employeeId: 'EMP001',
            employeeName: 'Maria Silva',
            date: '2025-01-20',
            time: '17:30',
            type: 'saida',
            status: 'normal'
          }
        ]
      },
      {
        date: '2025-01-21',
        totalHours: 8,
        workedHours: 8,
        breakHours: 1,
        overtimeHours: 0,
        lateMinutes: 15,
        earlyLeaveMinutes: 0,
        records: [
          {
            id: 'w3',
            employeeId: 'EMP001',
            employeeName: 'Maria Silva',
            date: '2025-01-21',
            time: '08:15',
            type: 'entrada',
            status: 'atraso'
          },
          {
            id: 'w4',
            employeeId: 'EMP001',
            employeeName: 'Maria Silva',
            date: '2025-01-21',
            time: '17:00',
            type: 'saida',
            status: 'normal'
          }
        ]
      },
      {
        date: '2025-01-22',
        totalHours: 8,
        workedHours: 8.5,
        breakHours: 1,
        overtimeHours: 0.5,
        lateMinutes: 0,
        earlyLeaveMinutes: 0,
        records: [
          {
            id: 'w5',
            employeeId: 'EMP001',
            employeeName: 'Maria Silva',
            date: '2025-01-22',
            time: '08:00',
            type: 'entrada',
            status: 'normal'
          },
          {
            id: 'w6',
            employeeId: 'EMP001',
            employeeName: 'Maria Silva',
            date: '2025-01-22',
            time: '17:30',
            type: 'saida',
            status: 'horas_extras'
          }
        ]
      }
    ],
    monthlyStats: {
      totalWorkedDays: 22,
      totalHours: 176,
      averageHoursPerDay: 8,
      overtimeHours: 12,
      lateDays: 3
    },
    recentRecords: [
      {
        id: 'r1',
        employeeId: 'EMP001',
        employeeName: 'Maria Silva',
        date: '2025-01-26',
        time: '08:00',
        type: 'entrada',
        status: 'normal'
      },
      {
        id: 'r2',
        employeeId: 'EMP001',
        employeeName: 'Maria Silva',
        date: '2025-01-26',
        time: '17:00',
        type: 'saida',
        status: 'normal'
      },
      {
        id: 'r3',
        employeeId: 'EMP002',
        employeeName: 'João Santos',
        date: '2025-01-26',
        time: '08:30',
        type: 'entrada',
        status: 'atraso'
      }
    ],
    upcomingBreaks: [
      {
        id: 'b1',
        employeeId: 'EMP001',
        employeeName: 'Maria Silva',
        date: today,
        time: '12:00',
        type: 'intervalo_inicio',
        status: 'normal'
      },
      {
        id: 'b2',
        employeeId: 'EMP002',
        employeeName: 'João Santos',
        date: today,
        time: '12:30',
        type: 'intervalo_inicio',
        status: 'normal'
      }
    ]
  };

  res.status(200).json(mockData);
} 

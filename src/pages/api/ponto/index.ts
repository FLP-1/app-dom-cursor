/**
 * Arquivo: index.ts
 * Caminho: src/pages/api/ponto/index.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: API completa para gerenciamento de registros de ponto eletrônico integrada ao banco de dados via Prisma.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';
import { PontoData, PontoRecord, PontoSummary } from '@/hooks/usePontoData';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PontoData | { error: string }>
) {
  try {
    // Verificar autenticação
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.id) {
      return res.status(401).json({ error: 'Não autorizado' });
    }

    const userId = session.user.id;

    switch (req.method) {
      case 'GET':
        return await getPontoData(req, res, userId);
      case 'POST':
        return await createPontoRecord(req, res, userId);
      default:
        return res.status(405).json({ error: 'Método não permitido' });
    }
  } catch (error) {
    console.error('Erro na API de ponto:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function getPontoData(
  req: NextApiRequest,
  res: NextApiResponse<PontoData>,
  userId: string
) {
  try {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // Buscar registros de hoje
    const todayRecords = await prisma.timeRecord.findMany({
      where: {
        userId,
        data: {
          gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
          lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
        },
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        entrada: 'asc',
      },
    });

    // Buscar resumo semanal
    const weeklyRecords = await prisma.timeRecord.findMany({
      where: {
        userId,
        data: {
          gte: startOfWeek,
          lte: endOfWeek,
        },
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        data: 'asc',
      },
    });

    // Buscar registros recentes (últimos 7 dias)
    const recentRecords = await prisma.timeRecord.findMany({
      where: {
        userId,
        data: {
          gte: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        data: 'desc',
        entrada: 'desc',
      },
      take: 10,
    });

    // Buscar intervalos próximos (hoje)
    const upcomingBreaks = await prisma.timeRecord.findMany({
      where: {
        userId,
        data: {
          gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
          lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
        },
        inicioIntervalo: {
          gte: today,
        },
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        inicioIntervalo: 'asc',
      },
    });

    // Calcular estatísticas mensais
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const monthlyRecords = await prisma.timeRecord.findMany({
      where: {
        userId,
        data: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    const monthlyStats = calculateMonthlyStats(monthlyRecords);

    // Processar dados para o formato esperado pelo frontend
    const processedData: PontoData = {
      todayRecords: todayRecords.map(record => processTimeRecord(record)),
      weeklySummary: processWeeklySummary(weeklyRecords),
      monthlyStats,
      recentRecords: recentRecords.map(record => processTimeRecord(record)),
      upcomingBreaks: upcomingBreaks.map(record => processTimeRecord(record)),
    };

    return res.status(200).json(processedData);
  } catch (error) {
    console.error('Erro ao buscar dados de ponto:', error);
    throw error;
  }
}

async function createPontoRecord(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean } | { error: string }>,
  userId: string
) {
  try {
    const { type, time, location, notes } = req.body;

    if (!type || !time) {
      return res.status(400).json({ error: 'Tipo e horário são obrigatórios' });
    }

    const recordTime = new Date(time);
    const recordDate = new Date(recordTime.getFullYear(), recordTime.getMonth(), recordTime.getDate());

    // Verificar se já existe registro para este dia
    let existingRecord = await prisma.timeRecord.findFirst({
      where: {
        userId,
        data: recordDate,
      },
    });

    if (!existingRecord) {
      // Criar novo registro
      existingRecord = await prisma.timeRecord.create({
        data: {
          userId,
          data: recordDate,
        },
      });
    }

    // Atualizar o registro com base no tipo
    const updateData: any = {};
    
    switch (type) {
      case 'entrada':
        updateData.entrada = recordTime;
        updateData.geoEntrada = location;
        updateData.deviceEntrada = req.headers['user-agent'] || 'Unknown';
        break;
      case 'saida':
        updateData.saida = recordTime;
        updateData.geoSaida = location;
        updateData.deviceSaida = req.headers['user-agent'] || 'Unknown';
        break;
      case 'intervalo_inicio':
        updateData.inicioIntervalo = recordTime;
        updateData.geoInicioIntervalo = location;
        updateData.deviceInicioIntervalo = req.headers['user-agent'] || 'Unknown';
        break;
      case 'intervalo_fim':
        updateData.fimIntervalo = recordTime;
        updateData.geoFimIntervalo = location;
        updateData.deviceFimIntervalo = req.headers['user-agent'] || 'Unknown';
        break;
      default:
        return res.status(400).json({ error: 'Tipo de registro inválido' });
    }

    if (notes) {
      updateData.observacao = notes;
    }

    // Calcular horas trabalhadas e extras
    if (updateData.saida && existingRecord.entrada) {
      const workedHours = (updateData.saida.getTime() - existingRecord.entrada.getTime()) / (1000 * 60 * 60);
      updateData.horasTrabalhadas = Math.max(0, workedHours);
      
      // Considerar horas extras se trabalhou mais de 8 horas
      if (workedHours > 8) {
        updateData.horasExtras = workedHours - 8;
      }
    }

    await prisma.timeRecord.update({
      where: { id: existingRecord.id },
      data: updateData,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao criar registro de ponto:', error);
    throw error;
  }
}

function processTimeRecord(record: any): PontoRecord {
  const getRecordType = (record: any): 'entrada' | 'saida' | 'intervalo_inicio' | 'intervalo_fim' => {
    if (record.entrada) return 'entrada';
    if (record.saida) return 'saida';
    if (record.inicioIntervalo) return 'intervalo_inicio';
    if (record.fimIntervalo) return 'intervalo_fim';
    return 'entrada';
  };

  const getRecordTime = (record: any): string => {
    if (record.entrada) return record.entrada.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    if (record.saida) return record.saida.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    if (record.inicioIntervalo) return record.inicioIntervalo.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    if (record.fimIntervalo) return record.fimIntervalo.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return '';
  };

  const getRecordStatus = (record: any): 'normal' | 'atraso' | 'saida_antecipada' | 'horas_extras' => {
    // Lógica simplificada para determinar status
    if (record.horasExtras > 0) return 'horas_extras';
    if (record.entrada && record.entrada.getHours() > 8) return 'atraso';
    return 'normal';
  };

  return {
    id: record.id,
    employeeId: record.userId,
    employeeName: record.user?.name || 'Usuário',
    date: record.data.toISOString().split('T')[0],
    time: getRecordTime(record),
    type: getRecordType(record),
    location: record.geoEntrada || record.geoSaida || record.geoInicioIntervalo || record.geoFimIntervalo || '',
    device: record.deviceEntrada || record.deviceSaida || record.deviceInicioIntervalo || record.deviceFimIntervalo || '',
    notes: record.observacao || '',
    status: getRecordStatus(record),
  };
}

function processWeeklySummary(records: any[]): PontoSummary[] {
  const groupedByDate = records.reduce((acc, record) => {
    const date = record.data.toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(record);
    return acc;
  }, {});

  return Object.entries(groupedByDate).map(([date, dayRecords]: [string, any]) => {
    const workedHours = dayRecords.reduce((total: number, record: any) => {
      if (record.horasTrabalhadas) {
        return total + record.horasTrabalhadas;
      }
      return total;
    }, 0);

    const overtimeHours = dayRecords.reduce((total: number, record: any) => {
      if (record.horasExtras) {
        return total + record.horasExtras;
      }
      return total;
    }, 0);

    const breakHours = dayRecords.reduce((total: number, record: any) => {
      if (record.inicioIntervalo && record.fimIntervalo) {
        return total + (record.fimIntervalo.getTime() - record.inicioIntervalo.getTime()) / (1000 * 60 * 60);
      }
      return total;
    }, 0);

    return {
      date,
      totalHours: 8,
      workedHours: Math.round(workedHours * 100) / 100,
      breakHours: Math.round(breakHours * 100) / 100,
      overtimeHours: Math.round(overtimeHours * 100) / 100,
      lateMinutes: 0, // Implementar lógica de atraso
      earlyLeaveMinutes: 0, // Implementar lógica de saída antecipada
      records: dayRecords.map((record: any) => processTimeRecord(record)),
    };
  });
}

function calculateMonthlyStats(records: any[]) {
  const totalWorkedDays = records.length;
  const totalHours = records.reduce((total, record) => total + (record.horasTrabalhadas || 0), 0);
  const overtimeHours = records.reduce((total, record) => total + (record.horasExtras || 0), 0);
  const lateDays = records.filter(record => record.entrada && record.entrada.getHours() > 8).length;

  return {
    totalWorkedDays,
    totalHours: Math.round(totalHours * 100) / 100,
    averageHoursPerDay: totalWorkedDays > 0 ? Math.round((totalHours / totalWorkedDays) * 100) / 100 : 0,
    overtimeHours: Math.round(overtimeHours * 100) / 100,
    lateDays,
  };
} 
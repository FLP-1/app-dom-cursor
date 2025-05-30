import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../../database/db';
import { verifyToken } from '../../../utils/token';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    // Verifica o token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    // Busca as estatísticas
    const stats = await pool.query(`
      SELECT
        COUNT(*) as total_alerts,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_alerts,
        COUNT(CASE WHEN severity = 'urgent' THEN 1 END) as urgent_alerts,
        COUNT(CASE WHEN created_at >= NOW() - INTERVAL '24 hours' THEN 1 END) as recent_alerts
      FROM alerts
    `);

    return res.status(200).json({
      totalAlerts: parseInt(stats.rows[0].total_alerts),
      activeAlerts: parseInt(stats.rows[0].active_alerts),
      urgentAlerts: parseInt(stats.rows[0].urgent_alerts),
      recentAlerts: parseInt(stats.rows[0].recent_alerts),
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
} 
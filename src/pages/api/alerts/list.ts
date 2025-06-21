/**
 * Arquivo: list.ts
 * Caminho: src/pages/api/alerts/list.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: API para listar alertas
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import { verifyToken } from '@/utils/auth';

// Configure your PostgreSQL connection pool using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'dom',
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed, use GET' });
  }

  // Verify authentication token
  const authUser = verifyToken(req, res);
  if (!authUser) {
    return; // Response already sent by verifyToken
  }

  try {
    const client = await pool.connect();
    let query = 'SELECT * FROM alerts';
    const queryParams = [];
    let whereClauses = [];

    // Implement authorization logic for listing alerts
    if (authUser.userType === 'Empregador') {
      whereClauses.push('created_by = $' + (queryParams.length + 1));
      queryParams.push(authUser.userId);
    } else if (authUser.userType !== 'Administrador') {
      // Other user types (Empregado, Familiar, Parceiro) - Placeholder for listing relevant alerts
      // TODO: Implement logic to list alerts relevant to other user types based on criteria
      // For now, deny access or return empty for non-admin/employer
      client.release();
      return res.status(403).json({ message: 'Permissão negada para listar alertas para este tipo de usuário (ainda não implementado).' });
    }

    // Filtros recebidos via query params
    const { type, severity, startDate, endDate, message } = req.query;
    if (type) {
      whereClauses.push('type = $' + (queryParams.length + 1));
      queryParams.push(type);
    }
    if (severity) {
      whereClauses.push('severity = $' + (queryParams.length + 1));
      queryParams.push(severity);
    }
    if (startDate) {
      whereClauses.push('created_at >= $' + (queryParams.length + 1));
      queryParams.push(new Date(startDate as string));
    }
    if (endDate) {
      whereClauses.push('created_at <= $' + (queryParams.length + 1));
      queryParams.push(new Date(endDate as string));
    }
    if (message) {
      whereClauses.push('message ILIKE $' + (queryParams.length + 1));
      queryParams.push(`%${message}%`);
    }

    if (whereClauses.length > 0) {
      query += ' WHERE ' + whereClauses.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    const result = await client.query(query, queryParams);

    client.release();

    res.status(200).json(result.rows);

  } catch (err) {
    console.error('Database error listing alerts:', err);
    res.status(500).json({ message: 'Erro ao listar alertas.' });
  }
} 

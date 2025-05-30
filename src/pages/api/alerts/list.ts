import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import { verifyToken } from '../../utils/auth';

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

    // Implement authorization logic for listing alerts
    if (authUser.userType === 'Empregador') {
      // Employers list alerts they created
      query += ' WHERE created_by = $1';
      queryParams.push(authUser.userId);
    } else if (authUser.userType !== 'Administrador') {
      // Other user types (Empregado, Familiar, Parceiro) - Placeholder for listing relevant alerts
      // TODO: Implement logic to list alerts relevant to other user types based on criteria
      // For now, deny access or return empty for non-admin/employer
      client.release();
      return res.status(403).json({ message: 'Permissão negada para listar alertas para este tipo de usuário (ainda não implementado).' });
    }

    // Admins list all alerts (no WHERE clause added)

    // Optional: Add ordering (e.g., ORDER BY created_at DESC)
    query += ' ORDER BY created_at DESC';

    const result = await client.query(query, queryParams);

    client.release();

    res.status(200).json(result.rows);

  } catch (err) {
    console.error('Database error listing alerts:', err);
    res.status(500).json({ message: 'Erro ao listar alertas.' });
  }
} 
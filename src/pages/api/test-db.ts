/**
 * Arquivo: test-db.ts
 * Caminho: src/pages/api/test-db.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: API para testar conexão com o banco de dados
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

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

  try {
    const client = await pool.connect();

    // Test the connection and check basic read permission by counting users
    const result = await client.query('SELECT COUNT(*) FROM users;');

    client.release();

    res.status(200).json({ message: 'Conexão com o banco de dados e permissões básicas OK.', userCount: result.rows[0].count });

  } catch (err) {
    console.error('Database connection or permission error:', err);
    res.status(500).json({ message: 'Erro ao conectar ou verificar permissões no banco de dados.', error: err.message });
  }
} 

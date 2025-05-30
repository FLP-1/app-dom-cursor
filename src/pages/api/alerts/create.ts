import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import { verifyToken } from '../../utils/auth'; // Import the auth utility

// Configure your PostgreSQL connection pool using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'dom',
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed, use POST' });
  }

  // Verify authentication token
  const authUser = verifyToken(req, res);
  if (!authUser) {
    return; // Response already sent by verifyToken
  }

  // Check if the user has permission to create alerts (Administrador or Empregador)
  if (authUser.userType !== 'Administrador' && authUser.userType !== 'Empregador') {
    return res.status(403).json({ message: 'Permissão negada. Somente administradores e empregadores podem criar alertas.' });
  }

  const { type, criteria, preferences, message, severity, channels } = req.body; // Include new fields
  const createdBy = authUser.userId;

  // Basic validation (updated to include new fields)
  if (!type || !criteria || !preferences || !message || !severity || !channels) {
    return res.status(400).json({ message: 'Campos obrigatórios faltando para o alerta (tipo, critérios, preferências, mensagem, severidade, canais).' });
  }

  // Basic validation for channels type (should be an array)
  if (!Array.isArray(channels)) {
      return res.status(400).json({ message: 'Canais de notificação devem ser fornecidos como uma lista (array).' });
  }

  // Basic validation for severity value
   const validSeverities = ['baixa', 'média', 'severa', 'urgente'];
   if (!validSeverities.includes(severity)) {
       return res.status(400).json({ message: 'Nível de severidade inválido. Use: baixa, média, severa, urgente.' });
   }

  try {
    const client = await pool.connect();

    // Insert the new alert into the alerts table (updated query)
    const result = await client.query(
      'INSERT INTO alerts (type, criteria, preferences, message, severity, channels, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING alert_id',
      [type, criteria, preferences, message, severity, channels, createdBy]
    );

    client.release();

    res.status(201).json({ message: 'Alerta criado com sucesso!', alertId: result.rows[0].alert_id });

  } catch (err) {
    console.error('Database error creating alert:', err);
    res.status(500).json({ message: 'Erro ao criar alerta.' });
  }
} 
/**
 * Arquivo: [alertId].ts
 * Caminho: src/pages/api/alerts/[alertId].ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: API para gerenciar alertas
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import { verifyToken } from '../../../utils/auth'; // Adjust import path as needed

// Configure your PostgreSQL connection pool using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'dom',
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verify authentication token for all methods
  const authUser = verifyToken(req, res);
  if (!authUser) {
    return; // Response already sent by verifyToken
  }

  const { alertId } = req.query; // Get alertId from dynamic route segment

  // Basic validation for alertId
  if (!alertId || typeof alertId !== 'string') {
    return res.status(400).json({ message: 'ID do alerta inválido.' });
  }

  const alertIdInt = parseInt(alertId, 10);
  if (isNaN(alertIdInt)) {
       return res.status(400).json({ message: 'ID do alerta inválido.' });
  }

  let client;
  try {
    client = await pool.connect();

    // Check if the alert exists and get its creator
    const checkAlert = await client.query('SELECT created_by FROM alerts WHERE alert_id = $1', [alertIdInt]);

    if(checkAlert.rows.length === 0) {
        client.release();
        return res.status(404).json({ message: 'Alerta não encontrado.' });
    }

    const alertCreatorId = checkAlert.rows[0].created_by;
    const isAdmin = authUser.userType === 'Administrador';
    const isCreator = authUser.userId === alertCreatorId;

    // --- Authorization Logic --- //
    // Admins can perform any action
    // Creators can perform any action on their own alerts
    // Other users: depends on the method and relevance (TODO for relevance logic)

    if (req.method === 'GET') {
      // Allow Admin or Creator to view, others if relevant (TODO)
       if (!isAdmin && !isCreator) {
            // TODO: Implement logic to allow viewing alerts relevant to other user types based on criteria
             client.release();
             return res.status(403).json({ message: 'Permissão negada para visualizar este alerta.' });
       }

        const result = await client.query('SELECT * FROM alerts WHERE alert_id = $1', [alertIdInt]);
        client.release();
        res.status(200).json(result.rows[0]);

    } else if (req.method === 'PUT') {
       // Allow Admin or Creator to update
       if (!isAdmin && !isCreator) {
          client.release();
          return res.status(403).json({ message: 'Permissão negada para atualizar este alerta.' });
       }

      const { type, criteria, preferences, message, severity, channels } = req.body;

      // Basic validation for update fields
      if (!type || !criteria || !preferences || !message || !severity || !channels) {
        client.release();
        return res.status(400).json({ message: 'Campos obrigatórios faltando para a atualização.' });
      }
        if (!Array.isArray(channels)) {
             client.release();
            return res.status(400).json({ message: 'Canais de notificação devem ser fornecidos como uma lista (array).' });
        }
         const validSeverities = ['baixa', 'média', 'severa', 'urgente'];
         if (!validSeverities.includes(severity)) {
             client.release();
             return res.status(400).json({ message: 'Nível de severidade inválido. Use: baixa, média, severa, urgente.' });
         }

       const result = await client.query(
         'UPDATE alerts SET type = $1, criteria = $2, preferences = $3, message = $4, severity = $5, channels = $6, updated_at = CURRENT_TIMESTAMP WHERE alert_id = $7 RETURNING *' , // RETURNING * to get the updated row
         [type, criteria, preferences, message, severity, channels, alertIdInt]
       );

        client.release();
        res.status(200).json({ message: 'Alerta atualizado com sucesso!', alert: result.rows[0] });

    } else if (req.method === 'DELETE') {
        // Allow Admin or Creator to delete
        if (!isAdmin && !isCreator) {
            client.release();
            return res.status(403).json({ message: 'Permissão negada para excluir este alerta.' });
        }

       await client.query('DELETE FROM alerts WHERE alert_id = $1', [alertIdInt]);

        client.release();
        res.status(200).json({ message: 'Alerta excluído com sucesso!' });

    } else {
      // Handle any other HTTP methods
      client.release();
      res.status(405).json({ message: 'Method Not Allowed' });
    }

  } catch (err) {
    console.error('Database error processing alert request:', err);
    // Ensure client is released in case of error before query execution
     if (client) client.release();
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
} 
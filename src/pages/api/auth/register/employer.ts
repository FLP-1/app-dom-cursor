/**
 * Arquivo: employer.ts
 * Caminho: src/pages/api/auth/register/employer.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: API para cadastro de empregadores
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import { validateCPF, validatePhoneNumber } from '@/utils/validations';

// TODO: Configure your PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'dom',
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { cpf, password, name, preferredName, email, phone, termsAccepted } = req.body;

  // Basic validation
  if (!cpf || !password || !name || !termsAccepted) {
    return res.status(400).json({ message: 'Campos obrigatórios faltando.' });
  }

  // Validate CPF using the shared function
  const cleanCpf = cpf.replace(/\D/g, '');
  if (!validateCPF(cleanCpf)) {
      return res.status(400).json({ message: 'CPF inválido.' });
  }

  // Validate phone number using the shared function
  const cleanPhone = phone.replace(/\D/g, '');
  if (phone && !validatePhoneNumber(cleanPhone)) {
      return res.status(400).json({ message: 'Número de telefone inválido.' });
  }

  // Basic email format validation
  if (email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json({ message: 'Formato de e-mail inválido.' });
  }

  try {
    const client = await pool.connect();

    // Check if CPF or email already exists
    const checkUser = await client.query(
      'SELECT user_id FROM users WHERE cpf = $1 OR email = $2',
      [cpf, email]
    );

    if (checkUser.rows.length > 0) {
      client.release();
      return res.status(409).json({ message: 'CPF ou e-mail já cadastrado.' });
    }

    // Hash password
    const saltRounds = 10; // You can adjust this
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert the new user
    const result = await client.query(
      'INSERT INTO users (cpf, password_hash, user_type, name, preferred_name, email, phone, terms_accepted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING user_id',
      [cpf, passwordHash, 'Empregador', name, preferredName, email, phone, termsAccepted]
    );

    client.release();

    // TODO: Implement token generation and return to frontend for auto-login
    // For now, just return success
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', userId: result.rows[0].user_id });

  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
} 

import { pool } from './db';
import fs from 'fs';
import path from 'path';

async function initializeDatabase() {
  try {
    // Lê o arquivo de schema
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Executa o schema
    await pool.query(schema);
    console.log('Banco de dados inicializado com sucesso!');
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Executa a inicialização
initializeDatabase(); 
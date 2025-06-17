/**
 * Arquivo: test-connection.ts
 * Caminho: src/database/test-connection.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { testConnection } from './db';

async function main() {
  console.log('Testando conexão com o banco de dados...');
  const connected = await testConnection();
  
  if (connected) {
    console.log('✅ Conexão estabelecida com sucesso!');
  } else {
    console.error('❌ Falha ao conectar com o banco de dados.');
    process.exit(1);
  }
}

main(); 

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
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function setupTestDatabase() {
  const schemaId = `test_${uuidv4()}`;
  const databaseURL = generateDatabaseURL(schemaId);
  process.env.DATABASE_URL = databaseURL;

  // Executa as migrações no banco de dados de teste
  execSync('npx prisma migrate deploy', {
    env: {
      ...process.env,
      DATABASE_URL: databaseURL,
    },
  });

  return {
    schemaId,
    databaseURL,
  };
}

export async function teardownTestDatabase(schemaId: string) {
  await prisma.$executeRawUnsafe(
    `DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`
  );
  await prisma.$disconnect();
}

function generateDatabaseURL(schemaId: string): string {
  const baseURL = process.env.DATABASE_URL || '';
  const url = new URL(baseURL);
  url.searchParams.set('schema', schemaId);
  return url.toString();
} 
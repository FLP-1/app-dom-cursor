import { config } from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env.test
config({ path: '.env.test' });

// Configura as variáveis de ambiente padrão para os testes
process.env.SMTP_HOST = 'smtp.test.com';
process.env.SMTP_PORT = '587';
process.env.SMTP_SECURE = 'false';
process.env.SMTP_USER = 'test@test.com';
process.env.SMTP_PASS = 'test_password';
process.env.SMTP_FROM = 'test@test.com';

// Configura o ambiente de teste
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.NEXTAUTH_URL = 'http://localhost:3000';
process.env.NEXTAUTH_SECRET = 'test-secret'; 
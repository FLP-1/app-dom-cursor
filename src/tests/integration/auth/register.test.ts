import { PrismaClient } from '@prisma/client';
import { createMocks } from 'node-mocks-http';
import handler from '../../../pages/api/auth/register';
import '../setup';

const prisma = new PrismaClient();

describe('Register API Integration', () => {
  it('deve registrar um novo usuário com sucesso', async () => {
    const userData = {
      name: 'Test User',
      cpf: '12345678901',
      email: 'test@example.com',
      phone: '11999999999',
      password: 'Test123!',
    };

    const { req, res } = createMocks({
      method: 'POST',
      body: userData,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    const response = JSON.parse(res._getData());
    expect(response).toMatchObject({
      name: userData.name,
      cpf: userData.cpf,
      email: userData.email,
    });

    // Verificar se o usuário foi criado no banco
    const user = await prisma.user.findUnique({
      where: { cpf: userData.cpf },
    });

    expect(user).toBeTruthy();
    expect(user?.name).toBe(userData.name);
    expect(user?.email).toBe(userData.email);
  });

  it('deve retornar erro se CPF já estiver cadastrado', async () => {
    // Criar um usuário primeiro
    const existingUser = await prisma.user.create({
      data: {
        name: 'Existing User',
        cpf: '12345678901',
        email: 'existing@example.com',
        phone: '11999999999',
        password: 'hashed_password',
        role: 'USER',
      },
    });

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'Test User',
        cpf: existingUser.cpf,
        email: 'test@example.com',
        phone: '11999999999',
        password: 'Test123!',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'CPF já cadastrado',
    });
  });

  it('deve validar os campos obrigatórios', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: '',
        cpf: '',
        email: '',
        phone: '',
        password: '',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    const response = JSON.parse(res._getData());
    expect(response.message).toBeTruthy();
  });
}); 
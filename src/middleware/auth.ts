/**
 * Arquivo: auth.ts
 * Caminho: src/middleware/auth.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

// Rotas públicas que não precisam de autenticação
const PUBLIC_ROUTES = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/api/auth',
  '/api/validacao',
];

// Rotas que precisam de autenticação mas não de validação de campos
const AUTH_ONLY_ROUTES = [
  '/validacao-campos',
  '/api/validacao-campos',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verifica se é uma rota pública
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Obtém o token do header Authorization
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verifica o token
    const decoded = verify(token, process.env.JWT_SECRET || 'default_secret') as { userId: string };

    // Busca o usuário no banco
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Verifica se é uma rota que precisa apenas de autenticação
    if (AUTH_ONLY_ROUTES.some(route => pathname.startsWith(route))) {
      return NextResponse.next();
    }

    // Verifica se os campos foram validados
    const validacaoCampos = request.cookies.get('validacao_campos')?.value;
    if (!validacaoCampos) {
      return NextResponse.redirect(new URL('/validacao-campos', request.url));
    }

    const { email, telefone } = JSON.parse(validacaoCampos);
    if (!email?.validado || !telefone?.validado) {
      return NextResponse.redirect(new URL('/validacao-campos', request.url));
    }

    // Adiciona o usuário ao request para uso posterior
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', user.id);
    requestHeaders.set('x-user-role', user.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 

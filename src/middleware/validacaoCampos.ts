/**
 * Arquivo: validacaoCampos.ts
 * Caminho: src/middleware/validacaoCampos.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Lista de rotas que não precisam de validação
const ROTAS_LIVRES = [
  '/',
  '/login',
  '/cadastro',
  '/planos',
  '/api/auth',
  '/api/validacao',
];

export function middleware(request: NextRequest) {
  // Verificar se a rota atual está na lista de rotas livres
  if (ROTAS_LIVRES.some(rota => request.nextUrl.pathname.startsWith(rota))) {
    return NextResponse.next();
  }

  // Obter dados do usuário da sessão
  const session = request.cookies.get('session')?.value;
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Verificar se os campos foram validados
  const validacaoCampos = request.cookies.get('validacao_campos')?.value;
  if (!validacaoCampos) {
    return NextResponse.redirect(new URL('/validacao-campos', request.url));
  }

  const { email, telefone } = JSON.parse(validacaoCampos);
  if (!email?.validado || !telefone?.validado) {
    return NextResponse.redirect(new URL('/validacao-campos', request.url));
  }

  return NextResponse.next();
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
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 

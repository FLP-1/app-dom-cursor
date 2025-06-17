/**
 * Arquivo: react.tsx
 * Caminho: src/__mocks__/next-auth/react.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { SessionProvider, useSession, signIn, signOut } from 'next-auth/react';
import { ReactNode } from 'react';

// Mock do useSession
export const useSession = jest.fn(() => ({
  data: {
    user: {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
  status: 'authenticated',
}));

// Mock do signIn
export const signIn = jest.fn(() => Promise.resolve({ ok: true }));

// Mock do signOut
export const signOut = jest.fn(() => Promise.resolve({ ok: true }));

// Mock do SessionProvider
export const MockSessionProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

// Exportar os mocks
const nextAuthReactMock = {
  useSession,
  signIn,
  signOut,
  SessionProvider: MockSessionProvider,
};

export default nextAuthReactMock;

export const getSession = jest.fn();
export const getProviders = jest.fn();
export const getCsrfToken = jest.fn(); 

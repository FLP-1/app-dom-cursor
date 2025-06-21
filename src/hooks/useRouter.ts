/**
 * Arquivo: useRouter.ts
 * Caminho: src/hooks/useRouter.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

export const useRouter = () => {
  return {
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
    locale: 'pt-BR',
    locales: ['pt-BR', 'en'],
    defaultLocale: 'pt-BR',
  };
}; 

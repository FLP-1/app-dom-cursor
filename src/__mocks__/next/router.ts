/**
 * Arquivo: router.ts
 * Caminho: src/__mocks__/next/router.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

// Mock do router do Next.js
const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  pathname: '/',
  query: {},
  asPath: '/',
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isReady: true,
  isLocaleDomain: false,
  isPreview: false,
  locale: 'pt-BR',
  locales: ['pt-BR'],
  defaultLocale: 'pt-BR',
  domainLocales: [],
  basePath: '',
};

// Mock do useRouter
const useRouter = () => mockRouter;

// Exportar o mock para uso nos testes
export { useRouter, mockRouter as mockNextRouter };

export const withRouter = (Component: React.ComponentType) => Component; 

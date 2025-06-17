/**
 * Arquivo: jest.setup.js
 * Caminho: src/config/jest/jest.setup.js
 * Criado em: 2024-03-19
 * Última atualização: 2024-03-19
 * Descrição: Configuração de setup do Jest para testes
 */

// Importa as configurações do ambiente de teste
import '@testing-library/jest-dom';

// Configurar globais
const { TextEncoder, TextDecoder } = require('util');

// Configurar globais
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock das variáveis de ambiente
process.env.JWT_SECRET = 'test-secret';
process.env.SMTP_HOST = 'smtp.test.com';
process.env.SMTP_PORT = '587';
process.env.SMTP_SECURE = 'false';
process.env.SMTP_USER = 'test@test.com';
process.env.SMTP_PASS = 'test_password';
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock do fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
  })
);

// Mock do window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock do ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock do IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock do window.scrollTo
window.scrollTo = jest.fn();

// Mock do window.getComputedStyle
window.getComputedStyle = jest.fn(() => ({
  getPropertyValue: jest.fn(),
}));

// Mock do Element.prototype.getBoundingClientRect
Element.prototype.getBoundingClientRect = jest.fn(() => ({
  width: 120,
  height: 120,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
}));

// Mock do Prisma
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    $connect: jest.fn(),
    $disconnect: jest.fn(),
    // Adicione aqui outros métodos do Prisma que você usa
  })),
}));

// Mock do Next.js
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

jest.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

jest.mock('next/link', () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

// Limpar todos os mocks após cada teste
afterEach(() => {
  jest.clearAllMocks();
  localStorageMock.clear();
});

// Limpar todos os mocks antes de cada teste
beforeEach(() => {
  jest.clearAllMocks();
  localStorageMock.clear();
});

// Configurações globais do Jest
global.console = {
  ...console,
  // Desabilita logs de erro durante os testes
  error: jest.fn(),
  warn: jest.fn(),
  // Mantém logs de info e debug
  info: console.info,
  debug: console.debug,
}; 
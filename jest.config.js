/**
 * Arquivo: jest.config.js
 * Caminho: jest.config.js
 * Criado em: 2024-03-19
 * Última atualização: 2024-03-19
 * Descrição: Configuração do Jest para testes
 */

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Fornece o caminho para o seu aplicativo Next.js para carregar next.config.js e .env
  dir: './',
});

// Configuração personalizada do Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/src/config/jest/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  resolver: '<rootDir>/src/config/jest/jest.resolver.js',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/*.spec.{js,jsx,ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  verbose: true,
};

// Cria e exporta a configuração do Jest
module.exports = createJestConfig(customJestConfig); 
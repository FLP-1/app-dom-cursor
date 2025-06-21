/**
 * Arquivo: jest.config.js
 * Caminho: jest.config.js
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-03
 * Descrição: Configuração do Jest
 */

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/services/(.*)$': '<rootDir>/src/services/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^@/store/(.*)$': '<rootDir>/src/store/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@/config/(.*)$': '<rootDir>/src/config/$1',
    '^@/constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@/mocks/(.*)$': '<rootDir>/src/__mocks__/$1',
    '^@/tests/(.*)$': '<rootDir>/src/tests/$1',
    '.*TextareaAutosize.*': '<rootDir>/src/__mocks__/@mui/base/TextareaAutosize.js',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/coverage/',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['@swc/jest'],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  verbose: true,
  testTimeout: 10000,
  maxWorkers: '50%',
  bail: 1,
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true,
  moduleDirectories: ['node_modules', '<rootDir>'],
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>/src'],
};

module.exports = createJestConfig(customJestConfig); 
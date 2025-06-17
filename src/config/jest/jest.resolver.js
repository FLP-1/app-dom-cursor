/**
 * Arquivo: jest.resolver.js
 * Caminho: src/config/jest/jest.resolver.js
 * Criado em: 2024-03-19
 * Última atualização: 2024-03-19
 * Descrição: Resolvedor de módulos para testes Jest
 */

const path = require('path');

module.exports = (path, options) => {
  // Resolve módulos do src
  if (path.startsWith('@/')) {
    return require.resolve(path.replace('@/', './src/'), options);
  }

  // Resolve módulos do node_modules
  return options.defaultResolver(path, options);
}; 
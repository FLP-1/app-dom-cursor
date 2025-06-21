/**
 * Arquivo: jest.resolver.js
 * Caminho: jest.resolver.js
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-01
 * Descrição: Arquivo do projeto.
 */

const path = require('path');

module.exports = (path, options) => {
  // Resolver padrão do Jest
  const defaultResolver = options.defaultResolver;
  
  // Lista de extensões para tentar
  const extensions = ['.ts', '.tsx', '.js', '.jsx', '.json'];
  
  // Tenta resolver o módulo com cada extensão
  for (const ext of extensions) {
    try {
      const resolvedPath = defaultResolver(path + ext, options);
      if (resolvedPath) return resolvedPath;
    } catch (e) {
      // Ignora erros e continua tentando
    }
  }
  
  // Se não encontrou, tenta resolver sem extensão
  try {
    return defaultResolver(path, options);
  } catch (e) {
    // Se ainda não encontrou, tenta resolver como diretório
    try {
      return defaultResolver(path + '/index', options);
    } catch (e) {
      // Se nada funcionou, retorna null
      return null;
    }
  }
}; 